const aliases: Record<string, string[]> = {
  "firebase/supabase": ["firebase", "supabase"],
  "git&github": ["git", "github"],
  "sheets&appsscript": ["googlesheets", "googleappsscript"],
  "esp32/iot": ["esp32", "iot"],
};
const normalize = (value: string) => value.toLowerCase().replace(/\s+/g, "");
export function matchesTechFilter(tech: string, filter: string) {
  const actual = normalize(tech);
  const requested = normalize(filter);
  return (aliases[requested] || [requested]).some(
    (candidate) =>
      actual === candidate ||
      new RegExp(
        "^" +
          candidate.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") +
          "[0-9]+(?:\\.[0-9]+)*$",
      ).test(actual) ||
      (candidate === "googlesheets" && actual === "googlesheetsapi"),
  );
}
