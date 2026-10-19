const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");
const { compile } = require("@mdx-js/mdx");
const { remove } = require("unist-util-remove");

const files = process.argv.slice(2);
for (const f of files) {
  const raw = fs.readFileSync(f, "utf-8");
  const vfile = raw;
  matter(vfile, { strip: true });
  try {
    const r = compile(vfile, {
      format: "mdx",
      remarkPlugins: [() => (tree) => remove(tree, "mdxjsEsm")],
      outputFormat: "function-body",
      development: true,
    });
    console.log(f.split("\\").pop(), "-> OK, length:", (r.value || "").length);
  } catch (e) {
    console.log(f.split("\\").pop(), "ERR", e.message);
    console.log("LOC:", JSON.stringify(e.location));
    console.log("SRC-BEGIN:");
    console.log(raw.slice(0, 800));
  }
}