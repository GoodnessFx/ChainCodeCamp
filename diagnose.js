const fs = require("fs");
const matter = require("gray-matter");
const { compile } = require("@mdx-js/mdx");

const files = process.argv.slice(2);
for (const f of files) {
  const raw = fs.readFileSync(f, "utf-8");
  const vfile = matter(raw, { strip: true });
  try {
    const r = compile(vfile, {
      format: "mdx",
      remarkPlugins: [],
      outputFormat: "function-body",
      development: true,
    });
    console.log(f.split("\\").pop(), "-> OK, length:", (r.value || "").length);
  } catch (e) {
    console.log(f.split("\\").pop(), "ERR", e.message);
    console.log("LOC:", JSON.stringify(e.location));
  }
}