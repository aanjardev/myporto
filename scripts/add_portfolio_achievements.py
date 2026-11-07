"""Import the three user-supplied 2026 credentials without replacing admin edits."""
import copy
from datetime import datetime, timezone
import os
from pathlib import Path

from add_portfolio_projects import ROOT, update_file

ACHIEVEMENTS = [
    {
        "title": "1st Place — APTIKOMFEST 2026 Hackathon, East Java",
        "slug": "aptikomfest-2026-hackathon-east-java-1st-place",
        "type": "award",
        "issuer": "Asosiasi Pendidikan Tinggi Informatika dan Komputer (APTIKOM)",
        "date": "2026-10-04",
        "credentialId": None,
        "credentialUrl": None,
        "description": "Awarded 1st Place at the East Java provincial level in the APTIKOM Hackathon category of APTIKOMFEST 2026, representing Universitas Negeri Malang. Our three-person team developed LaporPak — an orchestration platform for village public services and complaints using conversational AI through WhatsApp. The certificate names Muhammad Farel Alfathir, Aan Anjar Setyowati, and Ferdiansyah Dwana Putra Santoso as the project team. The competition took place from September 1 to October 4, 2026.",
        "image": "/images/credentials/aptikomfest-2026-east-java.jpg",
        "skills": ["Conversational AI", "Public Service Innovation", "WhatsApp Integration", "Team Collaboration"],
    },
    {
        "title": "Gold Award — International Innovation & Invention Competition 2026 (IIICe2026)",
        "slug": "iiice2026-gold-award",
        "type": "award",
        "issuer": "Universiti Tun Hussein Onn Malaysia (UTHM)",
        "date": "2026-08-05",
        "credentialId": "UTHM.FKEE.AF/1242/2026",
        "credentialUrl": None,
        "description": "Awarded Gold at the International Innovation & Invention Competition 2026 (IIICe2026) on August 5, 2026, for the team project Sustainable Waste Management System Based on Integrated Risk Assessment and System Dynamics for Net Landfill Load Forecasting at Butus Landfill. Associated with Universitas Negeri Malang, the project focuses on sustainable waste management by integrating risk assessment and system dynamics to forecast landfill loads. The certificate recognizes a five-person team including Aan Anjar Setyowati.",
        "image": "/images/credentials/iiice2026-gold-award.jpg",
        "skills": ["Sustainable Waste Management", "Risk Assessment", "System Dynamics", "Landfill Load Forecasting", "Team Collaboration"],
    },
    {
        "title": "IT Essentials",
        "slug": "cisco-it-essentials-2026",
        "type": "certification",
        "issuer": "Cisco Networking Academy",
        "date": "2026-07-21",
        "credentialId": None,
        "credentialUrl": "https://www.credly.com/badges/3194209f-0369-4a98-a41f-17e455bf921f",
        "description": "Completed IT Essentials 8 through Cisco Networking Academy, offered by Universitas Negeri Malang, on July 21, 2026. Achieved a final class grade of 95.97%.",
        "image": "/images/credentials/cisco-it-essentials-2026.jpg",
        "skills": ["Computer Hardware", "Networking"],
    },
]


def append_achievements(store):
    tables, sequences = store["tables"], store["sequences"]
    rows = tables.setdefault("credential", [])
    pending = [item for item in ACHIEVEMENTS if not any(
        row["slug"] == item["slug"] or row["title"] == item["title"] or (
            item["credentialUrl"] and row.get("credentialUrl") == item["credentialUrl"]
        ) for row in rows
    )]
    if not pending:
        return []
    # Put new achievements first, keeping the relative order of older entries.
    first_order = min((row.get("order", 0) for row in rows), default=0)
    for row in rows:
        row["order"] = row.get("order", 0) + len(pending)

    def insert(table, data):
        records = tables.setdefault(table, [])
        new_id = max(sequences.get(table, 0), max((row["id"] for row in records), default=0)) + 1
        record = {"id": new_id, **data}
        records.append(record)
        sequences[table] = new_id
        return record

    for index, source in enumerate(pending):
        data = copy.deepcopy(source)
        skills = data.pop("skills")
        now = datetime.now(timezone.utc).isoformat()
        credential = insert("credential", {**data, "expiryDate": None, "isVisible": True,
            "order": first_order + index, "createdAt": now, "updatedAt": now})
        for order, name in enumerate(skills):
            insert("credentialSkill", {"credentialId": credential["id"], "name": name, "order": order})
    return [item["slug"] for item in pending]


if __name__ == "__main__":
    initial = ROOT / "data" / "portfolio.initial.json"
    active = Path(os.environ.get("PORTFOLIO_DATA_DIR", str(ROOT / "data"))) / "portfolio.json"
    for filename in dict.fromkeys([active, initial]):
        print(f"{filename.name}: added {update_file(filename, initial, append_achievements)}")
