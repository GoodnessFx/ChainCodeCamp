const fs = require("fs");
const matter = require("gray-matter");
const mdx = require("@mdx-js/mdx");
const raw = fs.readFileSync(process.argv[2] || "app/content/security/sec-02-audit.mdx", "utf8");
const { data, content } = matter(raw);
console.log("frontmatter ok, body chars:", content.length);
async function main() {
  try {
    const out = await mdx.compile(content, { format: "mdx", string: "empty", remarkPlugins: [], rehypePlugins: [] });
    console.log("compiled chars:", out.length);
  } catch (e) {
    console.log("ERR", e.message);
    console.log("LOC", JSON.stringify(e.location));
    console.log("ORIG", e.original && e.original.message);
  }
}
main();
