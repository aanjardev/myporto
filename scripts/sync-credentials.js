const fs = require('fs');
const path = require('path');

const portfolioPath = path.join(__dirname, '..', 'data', 'portfolio.json');
const credentialsDataPath = path.join(__dirname, '..', 'src', 'data', 'credentialsData.ts');

const data = JSON.parse(fs.readFileSync(portfolioPath, 'utf8'));
const creds = data.tables.credential || [];
const skills = data.tables.credentialSkill || [];

const fullCreds = creds
  .filter((c) => c.isVisible !== false)
  .sort((a, b) => a.order - b.order)
  .map((c) => {
    const credSkills = skills
      .filter((s) => s.credentialId === c.id)
      .sort((a, b) => a.order - b.order)
      .map((s) => s.name);

    return {
      id: c.id,
      title: c.title,
      slug: c.slug,
      type: c.type,
      issuer: c.issuer,
      date: c.date,
      expiryDate: c.expiryDate ?? null,
      credentialId: c.credentialId ?? null,
      credentialUrl: c.credentialUrl ?? null,
      description: c.description,
      skills: credSkills,
      image: c.image,
    };
  });

const fileContent = `import { Credential } from "@/types/credential";

export const credentialsData: Credential[] = ${JSON.stringify(fullCreds, null, 2)};
`;

fs.writeFileSync(credentialsDataPath, fileContent, 'utf8');
console.log(`Successfully synced ${fullCreds.length} credentials to src/data/credentialsData.ts`);

