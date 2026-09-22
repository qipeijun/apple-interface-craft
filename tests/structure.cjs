const fs = require("node:fs");
const path = require("node:path");
const assert = require("node:assert/strict");
const { JSDOM } = require("jsdom");
const root = path.resolve(__dirname, "..");
const skillRoot = path.join(root, "skills/apple-interface-craft");
const html = fs.readFileSync(path.join(root, "docs/index.html"), "utf8");
const dom = new JSDOM(html);
const document = dom.window.document;
const ids = [...document.querySelectorAll("[id]")].map((element) => element.id);
assert.equal(ids.length, new Set(ids).size, "页面存在重复 ID");
for (const element of document.querySelectorAll(
  "[href], [aria-controls], [aria-labelledby], [aria-describedby], label[for]",
)) {
  for (const attribute of [
    "href",
    "aria-controls",
    "aria-labelledby",
    "aria-describedby",
    "for",
  ]) {
    const value = element.getAttribute(attribute);
    if (!value || (attribute === "href" && !value.startsWith("#"))) continue;
    const references =
      attribute === "href" ? [value.slice(1)] : value.split(/\s+/);
    for (const reference of references)
      assert.ok(document.getElementById(reference), `无效引用：${reference}`);
  }
}
for (const script of document.querySelectorAll("script")) {
  assert.equal(script.hasAttribute("src"), false, "页面不应依赖外部脚本");
  new Function(script.textContent);
}
assert.equal(
  document.querySelectorAll('img[src],link[rel="stylesheet"][href]').length,
  0,
  "页面资源应保持内嵌",
);
function markdownFiles(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const file = path.join(directory, entry.name);
    return entry.isDirectory()
      ? markdownFiles(file)
      : entry.name.endsWith(".md")
        ? [file]
        : [];
  });
}
const files = [
  path.join(root, "README.md"),
  path.join(root, "CONTRIBUTING.md"),
  ...markdownFiles(skillRoot),
];
for (const file of files) {
  const text = fs.readFileSync(file, "utf8");
  for (const match of text.matchAll(/\]\(([^)]+)\)/g)) {
    const target = match[1];
    if (/^[a-z]+:/i.test(target) || target.startsWith("#")) continue;
    assert.ok(
      fs.existsSync(path.resolve(path.dirname(file), target.split("#")[0])),
      `文档链接失效：${path.relative(root, file)} → ${target}`,
    );
  }
}
assert.ok(
  fs
    .readFileSync(path.join(skillRoot, "SKILL.md"), "utf8")
    .startsWith("---\nname: apple-interface-craft\n"),
  "Skill 名称与目录不一致",
);
dom.window.close();
console.log("PASS：页面引用、内嵌脚本语法、文档链接和 Skill 目录一致性。");
