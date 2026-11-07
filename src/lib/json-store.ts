/* eslint-disable @typescript-eslint/no-explicit-any */
// Keep the existing query types while storing all runtime data in local JSON.
import type { PrismaClient } from "@prisma/client";
import { mkdir, readFile, writeFile, rename, rm } from "node:fs/promises";
import path from "node:path";
import { randomUUID } from "node:crypto";

type Row = Record<string, any>;
type Store = { tables: Record<string, Row[]>; sequences: Record<string, number> };
const directory = process.env.PORTFOLIO_DATA_DIR || path.join(process.cwd(), "data");
const filename = path.join(directory, "portfolio.json");
const relations: Record<string, Record<string, [string, string]>> = {
  heroContent: { photos: ["heroPhoto", "heroId"], stats: ["heroStat", "heroId"], socials: ["socialLink", "heroId"] },
  project: { tech: ["projectTech", "projectId"], screenshots: ["projectScreenshot", "projectId"], features: ["projectFeature", "projectId"], responsibilities: ["projectResponsibility", "projectId"], highlights: ["projectHighlight", "projectId"] },
  workExperience: { tech: ["workExperienceTech", "expId"] },
  credential: { skills: ["credentialSkill", "credentialId"] },
};
const models = ["heroContent", "heroPhoto", "heroStat", "socialLink", "project", "projectTech", "projectScreenshot", "projectFeature", "projectResponsibility", "projectHighlight", "workExperience", "workExperienceTech", "credential", "credentialSkill", "techStackItem", "familiarTech"] as const;
async function load(): Promise<Store> {
  try { return JSON.parse(await readFile(filename, "utf8")); }
  catch (error) {
    if ((error as NodeJS.ErrnoException).code !== "ENOENT") throw error;
    return JSON.parse(await readFile(path.join(process.cwd(), "data", "portfolio.initial.json"), "utf8"));
  }
}
async function mutate<T>(operation: (store: Store) => T): Promise<T> {
  await mkdir(directory, { recursive: true });
  const lock = `${filename}.lock`;
  const started = Date.now();
  while (true) {
    try { await mkdir(lock); break; }
    catch (error) {
      if ((error as NodeJS.ErrnoException).code !== "EEXIST") throw error;
      if (Date.now() - started > 15000) throw new Error("Penyimpanan sedang sibuk. Coba lagi; jika server sempat berhenti paksa, hapus data/portfolio.json.lock setelah server dihentikan.");
      await new Promise(resolve => setTimeout(resolve, 40));
    }
  }
  const temporary = `${filename}.${randomUUID()}.tmp`;
  try {
    const store = await load();
    const result = operation(store);
    await writeFile(temporary, JSON.stringify(store, null, 2) + "\n", "utf8");
    await rename(temporary, filename);
    return result;
  } finally {
    await rm(temporary, { force: true });
    await rm(lock, { recursive: true, force: true });
  }
}
function matches(row: Row, where: Row = {}) { return Object.entries(where).every(([key, value]) => row[key] === value); }
function query(store: Store, model: string, args: Row = {}): Row[] {
  let rows = (store.tables[model] || []).filter(row => matches(row, args.where));
  if (args.orderBy) {
    const sorts = Array.isArray(args.orderBy) ? args.orderBy : [args.orderBy];
    rows = [...rows].sort((a, b) => {
      for (const sort of sorts) for (const [key, direction] of Object.entries(sort)) {
        const comparison = a[key] < b[key] ? -1 : a[key] > b[key] ? 1 : 0;
        if (comparison) return direction === "desc" ? -comparison : comparison;
      }
      return 0;
    });
  }
  return rows.map(row => {
    const result = { ...row };
    for (const [key, options] of Object.entries(args.include || {})) {
      const relation = relations[model]?.[key];
      if (relation && options) result[key] = query(store, relation[0], { ...(options === true ? {} : options as Row), where: { [relation[1]]: row.id } });
    }
    return args.select ? Object.fromEntries(Object.keys(args.select).filter(key => args.select[key]).map(key => [key, result[key]])) : result;
  });
}
function saveRow(store: Store, model: string, data: Row, existing?: Row): Row {
  const nested = relations[model] || {};
  const scalar = Object.fromEntries(Object.entries(data).filter(([key, value]) => !(key in nested) && key !== "id" && value !== undefined));
  if (scalar.slug && (store.tables[model] || []).some(row => row.slug === scalar.slug && row.id !== existing?.id)) throw new Error("Slug sudah digunakan");
  const now = new Date().toISOString();
  const row = existing || { id: (store.sequences[model] || 0) + 1, order: 0, ...(model in relations || model === "techStackItem" ? { isVisible: true } : {}), createdAt: now };
  Object.assign(row, scalar, { id: existing?.id ?? row.id, updatedAt: now });
  if (!existing) {
    store.sequences[model] = row.id;
    (store.tables[model] ||= []).push(row);
  }
  for (const [key, [child, foreignKey]] of Object.entries(nested)) {
    const input = data[key];
    if (!input) continue;
    if (existing) removeRows(store, child, { [foreignKey]: row.id });
    for (const item of input.create || input.createMany?.data || []) saveRow(store, child, { ...item, [foreignKey]: row.id });
  }
  return { ...row };
}
function removeRows(store: Store, model: string, where?: Row) {
  const rows = (store.tables[model] || []).filter(row => matches(row, where));
  for (const row of rows) for (const [child, foreignKey] of Object.values(relations[model] || {})) removeRows(store, child, { [foreignKey]: row.id });
  store.tables[model] = (store.tables[model] || []).filter(row => !matches(row, where));
  return { count: rows.length };
}
const delegates = Object.fromEntries(models.map(model => [model, {
  findMany: async (args?: Row) => query(await load(), model, args),
  findFirst: async (args?: Row) => query(await load(), model, args)[0] || null,
  findUnique: async (args?: Row) => query(await load(), model, args)[0] || null,
  findUniqueOrThrow: async (args?: Row) => { const row = query(await load(), model, args)[0]; if (!row) throw new Error("Data tidak ditemukan"); return row; },
  count: async (args?: Row) => query(await load(), model, args).length,
  create: async (args: Row) => mutate(store => { const row = saveRow(store, model, args.data); return query(store, model, { ...args, where: { id: row.id } })[0]; }),
  createMany: async (args: Row) => mutate(store => { for (const data of args.data) saveRow(store, model, data); return { count: args.data.length }; }),
  update: async (args: Row) => mutate(store => { const row = (store.tables[model] || []).find(row => matches(row, args.where)); if (!row) throw new Error("Data tidak ditemukan"); saveRow(store, model, args.data, row); return query(store, model, { ...args, where: { id: row.id } })[0]; }),
  delete: async (args: Row) => mutate(store => { const row = (store.tables[model] || []).find(row => matches(row, args.where)); if (!row) throw new Error("Data tidak ditemukan"); removeRows(store, model, args.where); return row; }),
  deleteMany: async (args?: Row) => mutate(store => removeRows(store, model, args?.where)),
}]));
// Only the delegate methods above are supported; no Prisma client is instantiated.
export const jsonStore = delegates as unknown as Pick<PrismaClient, typeof models[number]>;
export async function reorder(model: "project" | "credential", items: { id: number; order: number }[]) {
  return mutate(store => {
    for (const item of items) {
      if (!Number.isInteger(item.id) || !Number.isInteger(item.order)) throw new Error("Urutan tidak valid");
      const row = store.tables[model]?.find(row => row.id === item.id);
      if (!row) throw new Error("Data tidak ditemukan");
      row.order = item.order;
    }
  });
}
