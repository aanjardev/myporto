"""Append the four approved projects without replacing existing admin content.

Run from any directory: python scripts/add_portfolio_projects.py
Re-running skips projects whose slug OR GitHub URL already exists.
"""

import copy
import json
import os
from pathlib import Path
import tempfile
import time
from datetime import datetime, timezone

ROOT = Path(__file__).resolve().parents[1]
PROJECTS = [
    {
        "title": "PiketAgain! — Classroom Cleaning & Ethics Game",
        "slug": "piketagain",
        "type": "side",
        "category": "Educational Game",
        "client": None,
        "description": "A classroom-cleaning game that brings ethical choices into everyday school responsibilities, developed by a three-person team for a Game Development course.",
        "longDescription": "PiketAgain! combines classroom-cleaning activities with an emphasis on ethics and responsibility. Players interact with the classroom environment, complete quests, and follow their cleaning progress while responding to situations involving other characters. As team leader, I developed the original concept, designed the game systems, and contributed to implementation alongside two other developers. The team shared implementation work across the game's systems.",
        "challenge": "The design challenge was to connect cleaning tasks with ethical situations while keeping objectives and interactions understandable to players.",
        "solution": "The implementation combines interactable classroom objects, quest and progress tracking, NPC dialogue, a timer, and badge systems to support the cleaning-and-ethics concept.",
        "myRole": "Team Lead & Game Developer",
        "teamSize": "3 people",
        "goal": "Encourage players to reflect on responsibility and ethical conduct through an interactive classroom-cleaning game.",
        "outcome": "Developed as a three-person Game Development course project. A public playable build is not linked yet.",
        "githubUrl": "https://github.com/aanjardev/piketagain",
        "liveUrl": None,
        "tech": ["Unity", "C#"],
        "features": ["Interactive classroom-cleaning tasks", "Quest and cleaning-progress tracking", "NPC interactions and dialogue", "Timer and win/lose screens", "Badge collection and persistence"],
        "responsibilities": ["Led the three-person development team", "Conceived the cleaning-and-ethics game idea", "Designed game systems and interactions", "Contributed to implementation across game systems"],
        "highlights": ["Course project combining classroom cleaning and ethics", "Team leadership alongside hands-on game development"],
    },
    {
        "title": "Village Profile Website — KKN Community Project",
        "slug": "village-profile-website",
        "type": "social",
        "category": "Village Website",
        "client": None,
        "description": "A village information website and content-management system developed by a seven-person KKN team to organize village profiles, public information, and local potential.",
        "longDescription": "Developed as part of a KKN community-service project, this website brings together village identity, organizational information, news, agendas, tourism, UMKM, public documents, and service information. An administrative interface supports content management. I led the seven-person team and worked as a full stack developer. The project was developed but was not adopted by the village; it is presented here as a development project rather than an operational village service.",
        "challenge": "The information-design challenge was to organize a broad range of village content while giving administrators a practical way to maintain it.",
        "solution": "A Laravel application separates public information pages from authenticated administration, with content modules for village information, news, agendas, local potential, documents, and services.",
        "myRole": "Team Lead & Full Stack Developer",
        "teamSize": "7 people",
        "goal": "Provide a central place for village information and showcase local tourism and small businesses.",
        "outcome": "Developed during KKN by a seven-person team. The village did not adopt the website, and no public demo is currently linked.",
        "githubUrl": "https://github.com/aanjardev/profil-desa",
        "liveUrl": None,
        "tech": ["Laravel", "PHP", "Blade", "JavaScript"],
        "features": ["Village profile and organizational information", "News, announcements, and activity agendas", "Tourism and UMKM listings", "Photo galleries and public documents", "Service information and content administration"],
        "responsibilities": ["Led the seven-person KKN project team", "Contributed to planning the village information structure", "Developed public-facing and administrative functionality", "Implemented application features across the full stack"],
        "highlights": ["Community-service project developed during KKN", "Public information and administration in one application"],
    },
    {
        "title": "TK ABA 8 Kepanjen — School Profile Website",
        "slug": "tk-aba-8-kepanjen",
        "type": "freelance",
        "category": "School Website",
        "client": "TK ABA 8 Kepanjen",
        "description": "A school profile website with an administrative workspace for managing school information, teachers, programs, news, achievements, and registration content.",
        "longDescription": "A freelance website for TK ABA 8 Kepanjen, developed independently across the full stack. The public website presents school information, programs, teachers, curriculum, news, achievements, and contact details, alongside a registration flow. Administrative pages allow school content to be maintained through a dedicated interface. The application uses Next.js and React, with Prisma and MySQL for structured content management.",
        "challenge": "The implementation challenge was to present a range of school information clearly while allowing content to be updated through an administrative interface.",
        "solution": "The application combines public school-information pages with authenticated content-management modules backed by Prisma and MySQL.",
        "myRole": "Solo Full Stack Developer",
        "teamSize": "1 person",
        "goal": "Help families explore the school and provide a practical way to maintain its website content.",
        "outcome": "Independently developed the school website and administrative application for TK ABA 8 Kepanjen.",
        "githubUrl": "https://github.com/aanjardev/TK-aba8",
        "liveUrl": "https://tkaba8kepanjen.sch.id",
        "tech": ["Next.js", "React", "TypeScript", "Tailwind CSS", "Prisma", "MySQL"],
        "features": ["School profile, history, and vision information", "Teacher, program, and curriculum pages", "News and achievement publishing", "Registration and contact pages", "Authenticated school content administration"],
        "responsibilities": ["Independently developed the freelance project", "Implemented public school pages and administrative workflows", "Integrated structured content storage with Prisma and MySQL", "Built content-management and registration functionality"],
        "highlights": ["Solo full stack delivery", "School information and content management in one application"],
    },
    {
        "title": "SIBAS — Waste Bank Management System",
        "slug": "sibas-waste-bank-management",
        "type": "freelance",
        "category": "Web Application",
        "client": None,
        "description": "A waste-bank management application covering members, waste deposits, savings, inventory, cooperative purchases, and reporting, with separate member and admin workflows.",
        "longDescription": "SIBAS is a freelance waste-bank management application that I developed independently. Member-facing pages provide access to deposit history, purchase history, savings, notifications, and reports. Administrative modules handle members, waste categories and deposits, savings, inventory, cooperative sales, and reporting. Laravel powers the application, with PDF and spreadsheet libraries supporting report exports.",
        "challenge": "The workflow-design challenge was to connect waste deposits, member savings, inventory, and cooperative transactions while keeping member and administrative responsibilities separate.",
        "solution": "The Laravel application organizes operations into member and admin areas, with dedicated modules for deposits, savings, inventory, checkout, and PDF or spreadsheet report exports.",
        "myRole": "Solo Full Stack Developer",
        "teamSize": "1 person",
        "goal": "Support organized waste-bank operations and give members access to their transaction and savings information.",
        "outcome": "Independently developed the waste-bank management application and its member and administrative workflows.",
        "githubUrl": "https://github.com/aanjardev/sibas-app",
        "liveUrl": "https://sibas.site",
        "tech": ["Laravel", "PHP", "Blade", "JavaScript", "Dompdf", "PhpSpreadsheet"],
        "features": ["Member management and member dashboards", "Waste categories and deposit recording", "Savings and transaction histories", "Inventory and cooperative point of sale", "PDF and spreadsheet report exports"],
        "responsibilities": ["Independently developed the freelance application", "Implemented member and administrative workflows", "Built deposit, savings, inventory, and sales modules", "Integrated PDF and spreadsheet reporting"],
        "highlights": ["Solo full stack development", "Connected waste-bank and cooperative transaction workflows"],
    },
]


def github_key(value):
    return (value or "").lower().rstrip("/").removesuffix(".git")


def append_projects(store):
    """Modify only new project rows, child rows, and their ID sequences."""
    tables, sequences = store["tables"], store["sequences"]

    def insert(table, fields):
        rows = tables.setdefault(table, [])
        new_id = max(sequences.get(table, 0), max((r["id"] for r in rows), default=0)) + 1
        row = {"id": new_id, **fields}
        rows.append(row)
        sequences[table] = new_id
        return row

    added = []
    order = max((p.get("order", 0) for p in tables.get("project", [])), default=-1) + 1
    for source in PROJECTS:
        if any(p["slug"] == source["slug"] or github_key(p.get("githubUrl")) == github_key(source["githubUrl"]) for p in tables.get("project", [])):
            continue
        data = copy.deepcopy(source)
        nested = {key: data.pop(key) for key in ["tech", "features", "responsibilities", "highlights"]}
        now = datetime.now(timezone.utc).isoformat()
        project = insert("project", {
            **data, "period": None, "image": f"/images/projects/{source['slug']}-cover.svg",
            "order": order, "isVisible": True, "createdAt": now, "updatedAt": now,
        })
        for key, values in nested.items():
            table, field = {"tech": ("projectTech", "name"), "features": ("projectFeature", "text"), "responsibilities": ("projectResponsibility", "text"), "highlights": ("projectHighlight", "text")}[key]
            for index, value in enumerate(values):
                insert(table, {"projectId": project["id"], field: value, "order": index})
        added.append(project["slug"])
        order += 1
    return added


def update_file(filename, fallback, append=append_projects):
    filename.parent.mkdir(parents=True, exist_ok=True)
    lock = Path(str(filename) + ".lock")
    started = time.monotonic()
    while True:
        try:
            lock.mkdir()
            break
        except FileExistsError:
            if time.monotonic() - started > 15:
                raise TimeoutError(f"Storage is busy: {lock}")
            time.sleep(0.04)
    temporary = None
    try:
        store = json.loads((filename if filename.exists() else fallback).read_text(encoding="utf-8"))
        added = append(store)
        if added:
            with tempfile.NamedTemporaryFile(mode="w", encoding="utf-8", dir=filename.parent, delete=False, suffix=".tmp") as file:
                temporary = Path(file.name)
                json.dump(store, file, ensure_ascii=False, indent=2)
                file.write("\n")
            os.replace(temporary, filename)
        return added
    finally:
        if temporary and temporary.exists():
            temporary.unlink()
        lock.rmdir()


if __name__ == "__main__":
    initial = ROOT / "data" / "portfolio.initial.json"
    active = Path(os.environ.get("PORTFOLIO_DATA_DIR", str(ROOT / "data"))) / "portfolio.json"
    for filename in dict.fromkeys([active, initial]):
        print(f"{filename.name}: added {update_file(filename, initial)}")
