import assert from "node:assert/strict";
import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";

async function main() {
  const directory = await mkdtemp(path.join(os.tmpdir(), "portfolio-json-test-"));
  process.env.PORTFOLIO_DATA_DIR = directory;
  const { jsonStore: store, reorder } = await import("../src/lib/json-store");
  try {
    assert.ok(await store.project.count() > 0, "Initial content is available");
    const project = await store.project.create({ data: {
      title: "JSON test", slug: "json-storage-test", type: "side", description: "Test", image: "/images/profil1.jpg",
      tech: { create: [{ name: "TypeScript", order: 0 }] },
    }, include: { tech: true } });
    assert.equal(project.tech[0].name, "TypeScript");
    await store.project.update({ where: { id: project.id }, data: {
      title: "Updated", tech: { createMany: { data: [{ name: "Next.js", order: 0 }] } },
    } });
    const updated = await store.project.findUniqueOrThrow({ where: { id: project.id }, include: { tech: true } });
    assert.equal(updated.title, "Updated");
    assert.deepEqual(updated.tech.map(t => t.name), ["Next.js"]);
    const snapshot = await readFile(path.join(directory, "portfolio.json"), "utf8");
    await assert.rejects(store.project.create({ data: { title: "Duplicate", slug: "json-storage-test", type: "side", description: "Test", image: "" } }));
    assert.equal(await readFile(path.join(directory, "portfolio.json"), "utf8"), snapshot, "Failed writes leave content unchanged");
    await assert.rejects(reorder("project", [{ id: project.id, order: 99 }, { id: -1, order: 0 }]));
    assert.equal((await store.project.findUniqueOrThrow({ where: { id: project.id } })).order, 0, "Reorder rolls back on error");
    await Promise.all(Array.from({ length: 12 }, (_, index) => store.familiarTech.create({ data: { name: `Concurrent ${index}` } })));
    const concurrent = (await store.familiarTech.findMany()).filter(row => row.name.startsWith("Concurrent "));
    assert.equal(concurrent.length, 12);
    assert.equal(new Set(concurrent.map(row => row.id)).size, 12, "Concurrent writes preserve unique IDs");
    await store.project.delete({ where: { id: project.id } });
    assert.equal(await store.projectTech.count({ where: { projectId: project.id } }), 0, "Delete cascades to children");
    const next = await store.project.create({ data: { title: "Next", slug: "next-json-test", type: "side", description: "Test", image: "" } });
    assert.ok(next.id > project.id, "IDs are not reused");
    await writeFile(path.join(directory, "portfolio.json"), "broken JSON");
    await assert.rejects(store.project.count(), "Corrupt content must not silently reset");
    console.log("PASS: initial content, CRUD, relations, persistence, duplicate slugs, rollback, concurrent writes, cascade, IDs, corrupt-file handling");
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
}
main().catch(error => { console.error(error); process.exitCode = 1; });
