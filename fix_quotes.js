const fs = require("fs");

function fix(p) {
  let c = fs.readFileSync(p, "utf8");
  const before = c;
  c = c.replace(
    '- q: "Why is "works on mainnet" not enough to claim a bounty?"',
    "  - q: 'Why is \"works on mainnet\" not enough to claim a bounty?'"
  );
  c = c.replace(
    '- q: "What moves a submission from duplicate to "marginal" or "valid"?"',
    "  - q: 'What moves a submission from duplicate to \"marginal\" or \"valid\"?'"
  );
  c = c.replace(
    '- q: "What belongs in a recommended fix beyond "rewrite the function"?"',
    "  - q: 'What belongs in a recommended fix beyond \"rewrite the function\"?'"
  );
  if (c !== before) {
    fs.writeFileSync(p, c, "utf8");
    console.log("fixed", p);
  } else {
    console.log("no changes needed", p);
  }
}

fix("app/content/curriculum/bug-bounty-competitive-audits.mdx");
fix("app/content/curriculum/writing-audit-reports.mdx");
