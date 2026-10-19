const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");
const { compile } = require("@mdx-js/mdx");
const { removeImportsExportsPlugin } = require("@mdx-js/remark-remove-imports-exports");

const cwd = path.resolve(__dirname, "..");
const files = (process.argv[2] || "").split(";").filter(Boolean);
for (const f of files) {
  const raw = fs.readFileSync(path.resolve(cwd, f), "utf-8");
  const vfile = raw;
  matter(vfile, { strip: true });
  try {
    const r = compile(vfile, {
      format: "mdx",
      remarkPlugins: [removeImportsExportsPlugin],
      outputFormat: "function-body",
      development: true,
    });
    console.log(f.split("\\").pop(), "-> OK");
  } catch (e) {
    console.log(f.split("\\").pop(), "ERR", e.message);
    console.log("LOC:", JSON.stringify(e.location));
    console.log("SRC-BEGIN:");
    console.log(raw.slice(0, 600));
  }
}