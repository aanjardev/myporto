const fs = require('fs');
const p = JSON.parse(fs.readFileSync('data/portfolio.json', 'utf8'));
p.tables.credential.forEach(c => {
  console.log(`${c.id} | ${c.type.padEnd(14)} | ${c.date} | ${c.title}`);
});

