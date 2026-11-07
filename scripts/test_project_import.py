"""Run: python scripts/test_project_import.py"""
import copy
import json
from pathlib import Path
import tempfile
import unittest

from add_portfolio_projects import PROJECTS, ROOT, append_projects, update_file


class ProjectImportTests(unittest.TestCase):
    def setUp(self):
        self.original = json.loads((ROOT / "data/portfolio.initial.json").read_text(encoding="utf-8"))
        # Work from a pre-import fixture even after the real content is imported.
        slugs = {p["slug"] for p in PROJECTS}
        ids = {p["id"] for p in self.original["tables"]["project"] if p["slug"] in slugs}
        for table, rows in self.original["tables"].items():
            if table == "project":
                self.original["tables"][table] = [p for p in rows if p["id"] not in ids]
            elif table.startswith("project"):
                self.original["tables"][table] = [r for r in rows if r.get("projectId") not in ids]

    def test_append_preserves_existing_content_and_order(self):
        store = copy.deepcopy(self.original)
        added = append_projects(store)
        self.assertEqual(added, [p["slug"] for p in PROJECTS])
        for table, rows in self.original["tables"].items():
            self.assertEqual(store["tables"][table][:len(rows)], rows)
        new_projects = store["tables"]["project"][-4:]
        start = max((p.get("order", 0) for p in self.original["tables"]["project"]), default=-1) + 1
        self.assertEqual([p["order"] for p in new_projects], list(range(start, start + 4)))
        for project in new_projects:
            self.assertTrue(project["isVisible"])
            self.assertIsNone(project["period"])
            self.assertTrue((ROOT / "public" / project["image"].lstrip("/")).exists())
            self.assertTrue(any(t["projectId"] == project["id"] for t in store["tables"]["projectTech"]))
        before = copy.deepcopy(store)
        self.assertEqual(append_projects(store), [])
        self.assertEqual(store, before)

    def test_deduplicates_by_url_or_slug_without_overwriting_edits(self):
        store = copy.deepcopy(self.original)
        append_projects(store)
        store["tables"]["project"][-4]["slug"] = "admin-renamed-piketagain"
        store["tables"]["project"][-4]["githubUrl"] = PROJECTS[0]["githubUrl"].upper() + ".git/"
        store["tables"]["project"][-3]["githubUrl"] = "https://github.com/another/location"
        before = copy.deepcopy(store)
        self.assertEqual(append_projects(store), [])
        self.assertEqual(store, before)

    def test_active_and_initial_keep_their_own_content(self):
        with tempfile.TemporaryDirectory(prefix="portfolio-import-") as directory:
            initial = Path(directory) / "portfolio.initial.json"
            active = Path(directory) / "portfolio.json"
            initial.write_text(json.dumps(self.original), encoding="utf-8")
            edited = copy.deepcopy(self.original)
            edited["tables"]["project"][0]["title"] = "Admin custom title"
            active.write_text(json.dumps(edited), encoding="utf-8")
            update_file(active, initial)
            update_file(initial, initial)
            self.assertEqual(json.loads(active.read_text())["tables"]["project"][0]["title"], "Admin custom title")
            self.assertEqual(json.loads(initial.read_text())["tables"]["project"][0]["title"], self.original["tables"]["project"][0]["title"])
            before = active.read_bytes()
            self.assertEqual(update_file(active, initial), [])
            self.assertEqual(active.read_bytes(), before)


if __name__ == "__main__":
    unittest.main()
