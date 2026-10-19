const fs = require("fs");

function fix(p, pairs) {
  let c = fs.readFileSync(p, "utf8");
  const before = c;
  for (const [from, to] of pairs) {
    c = c.replace(from, to);
  }
  if (c !== before) {
    fs.writeFileSync(p, c, "utf8");
    console.log("fixed", p);
  } else {
    console.log("no changes needed", p);
  }
}

fix("app/content/curriculum/bug-bounty-competitive-audits.mdx", [
  [
    /- q: .*works on mainnet.*/,
    "  - q: 'Why is \"works on mainnet\" not enough to claim a bounty?'",
  ],
  [
    /- q: .*marginal.*valid.*/,
    "  - q: 'What moves a submission from duplicate to \"marginal\" or \"valid\"?'",
  ],
]);

fix("app/content/curriculum/writing-audit-reports.mdx", [
  [
    /- q: .*recommended fix beyond.*/,
    "  - q: 'What belongs in a recommended fix beyond \"rewrite the function\"?'",
  ],
]);
