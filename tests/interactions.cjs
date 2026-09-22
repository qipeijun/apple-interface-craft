const fs = require("node:fs");
const assert = require("node:assert/strict");
const { JSDOM, VirtualConsole } = require("jsdom");
const errors = [];
const virtualConsole = new VirtualConsole();
virtualConsole.on("jsdomError", (error) => errors.push(error.message));
const dom = new JSDOM(
  fs.readFileSync(
    require("node:path").join(__dirname, "../docs/index.html"),
    "utf8",
  ),
  {
    runScripts: "dangerously",
    url: "file:///apple-interface-craft.html",
    virtualConsole,
    beforeParse(window) {
      window.matchMedia = () => ({ matches: false, addEventListener() {} });
      window.IntersectionObserver = class {
        observe() {}
        unobserve() {}
      };
      // 只模拟动画生命周期，用于检查中断与偏好切换；不模拟视觉插值。
      const animations = new WeakMap();
      window.HTMLElement.prototype.animate = function () {
        const element = this;
        const animation = {
          cancel() {
            animations.set(element, (animations.get(element) || []).filter((item) => item !== animation));
          },
        };
        animations.set(element, [...(animations.get(element) || []), animation]);
        return animation;
      };
      window.HTMLElement.prototype.getAnimations = function () {
        return animations.get(this) || [];
      };
      // jsdom 不实现原生模态窗口与焦点限制；这里只替代开关以检查业务状态。
      window.HTMLDialogElement.prototype.showModal = function () {
        this.open = true;
      };
      window.HTMLDialogElement.prototype.close = function () {
        this.open = false;
      };
    },
  },
);
const w = dom.window,
  d = w.document,
  $ = (id) => d.getElementById(id);
function choose(value) {
  $("filter-select").value = value;
  $("filter-select").dispatchEvent(new w.Event("change", { bubbles: true }));
}
function count() {
  return $("project-list").querySelectorAll(".status-tag").length;
}
assert.equal(count(), 3);
choose("done");
assert.equal(count(), 3);
assert.equal($("apply-filter").disabled, false);
assert.match($("filter-state").textContent, /待应用/);
$("apply-filter").click();
assert.equal(count(), 1);
assert.match($("project-list").textContent, /阅读记录/);
assert.equal($("undo-filter").disabled, false);
choose("active");
$("cancel-filter").click();
assert.equal($("filter-select").value, "done");
assert.equal(count(), 1);
$("undo-filter").click();
assert.equal(count(), 3);
assert.equal($("filter-select").value, "all");
assert.equal($("undo-filter").disabled, true);
choose("archived");
$("apply-filter").click();
assert.equal(count(), 0);
assert.match($("project-list").textContent, /还没有/);
$("undo-filter").click();
assert.equal(count(), 3);
d.querySelectorAll("[data-platform]").forEach((button) => {
  button.click();
  assert.equal(
    d.querySelectorAll('[data-platform][aria-pressed="true"]').length,
    1,
  );
  assert.equal(button.getAttribute("aria-pressed"), "true");
  assert.ok($("platform-title").textContent);
});
const desktopChoice = d.querySelector('[data-platform="desktop"]');
const miniChoice = d.querySelector('[data-platform="mini"]');
const platformAnimation = $("platform-copy").getAnimations()[0];
desktopChoice.click();
assert.equal($("platform-copy").getAnimations()[0], platformAnimation);
miniChoice.click();
assert.equal($("platform-device").dataset.shape, "mobile");
assert.equal($("platform-copy").getAnimations().length, 1);
assert.notEqual($("platform-copy").getAnimations()[0], platformAnimation);
desktopChoice.click();
assert.equal($("platform-device").dataset.shape, "desktop");
assert.equal($("platform-copy").getAnimations().length, 1);
assert.equal($("motion-detail").hidden, true);
$("motion-toggle").click();
assert.equal($("motion-detail").hidden, false);
$("motion-toggle").click();
assert.equal($("motion-detail").hidden, true);
$("reduce-motion").click();
assert.equal(d.documentElement.dataset.motion, "reduce");
assert.equal($("platform-copy").getAnimations().length, 0);
miniChoice.click();
assert.equal($("platform-device").dataset.shape, "mobile");
assert.match($("platform-title").textContent, /宿主/);
assert.equal($("platform-copy").getAnimations().length, 0);
$("motion-toggle").click();
assert.equal($("motion-detail").hidden, false);
$("reduce-motion").click();
assert.equal(d.documentElement.dataset.motion, "full");
d.querySelectorAll("[data-step]").forEach((button, index) => {
  button.click();
  assert.equal($("step-no").textContent, String(index + 1).padStart(2, "0"));
  assert.equal($("step-items").children.length, 3);
});
d.querySelectorAll("[data-prompt]").forEach((button) => {
  button.click();
  assert.match($("prompt-text").value, /\$apple-interface-craft/);
});
$("copy-prompt").click();
assert.match($("copy-status").textContent, /已选中/);
assert.equal($("prompt-text").selectionEnd, $("prompt-text").value.length);
assert.deepEqual(errors, []);
console.log(
  "PASS: draft/apply/cancel/undo/empty state; 5 platform choices; motion expand/reverse/reduced mode; 6 workflow steps; 3 prompts; local-file manual copy; no jsdom script errors.",
);

$("glass-toggle").click();
assert.equal($("glass-stage").dataset.solid, "true");
$("glass-toggle").click();
assert.equal($("glass-stage").dataset.solid, "false");
d.querySelector('[data-scene-choice="dusk"]').click();
assert.equal($("glass-stage").dataset.scene, "dusk");
$("scene-zoom").value = "145";
$("scene-zoom").dispatchEvent(new w.Event("input"));
assert.equal($("zoom-value").value, "145%");
assert.equal($("glass-stage").style.getPropertyValue("--scene-scale"), "1.45");
$("open-editor").click();
assert.equal($("edit-dialog").open, true);
assert.equal($("project-name").value, "周末灵感集");
$("project-name").value = "新的灵感";
$("cancel-editor").click();
assert.equal($("discard-prompt").hidden, false);
assert.equal($("saved-project-name").textContent, "周末灵感集");
$("keep-editing").click();
assert.equal($("discard-prompt").hidden, true);
assert.equal($("project-name").value, "新的灵感");
$("edit-form").dispatchEvent(new w.Event("submit", { cancelable: true }));
assert.equal($("saved-project-name").textContent, "新的灵感");
assert.equal($("edit-dialog").open, false);
assert.equal(d.activeElement, $("open-editor"));
$("open-editor").click();
$("project-name").value = "不要保存";
$("edit-dialog").dispatchEvent(new w.Event("cancel", { cancelable: true }));
assert.equal($("discard-prompt").hidden, false);
$("discard-edit").click();
assert.equal($("saved-project-name").textContent, "新的灵感");
$("open-editor").click();
$("project-name").value = "   ";
$("edit-form").dispatchEvent(new w.Event("submit", { cancelable: true }));
assert.equal($("edit-dialog").open, true);
assert.equal($("project-name").checkValidity(), false);
$("discard-edit").click();
for (let i = 0; i < 2; i++) {
  $("remove-item").click();
  assert.equal($("undo-item-bar").hidden, false);
  assert.ok($("collection-empty"));
  $("restore-item").click();
  assert.equal($("undo-item-bar").hidden, true);
  assert.equal($("collection-empty"), null);
  assert.equal(d.activeElement, $("remove-item"));
}
$("request-start").click();
assert.equal($("request-start").disabled, true);
assert.equal($("request-outcomes").hidden, false);
$("request-error").click();
assert.match($("request-title").textContent, /未能/);
assert.equal($("request-start").textContent, "重试加载");
$("request-start").click();
$("request-cancel").click();
assert.match($("request-title").textContent, /取消/);
assert.equal($("request-loading").hidden, true);
$("request-start").click();
$("request-success").click();
assert.match($("request-title").textContent, /完成/);
assert.equal($("request-start").disabled, false);
assert.deepEqual(errors, []);
console.log(
  "PASS: glass/solid toggle; scene choice; continuous zoom; editor save/cancel/Escape intent/blank validation/focus return; repeat delete/undo; manual request error/retry/cancel/success. Native dialog focus trap and visual rendering not tested.",
);
// 用户输入在重复选择、切换离开和返回时都应保留，包括主动清空的草稿。
const componentPrompt = d.querySelector('[data-prompt="component"]');
const designPrompt = d.querySelector('[data-prompt="design"]');
componentPrompt.click();
$("prompt-text").value = "为我的阅读应用优化筛选";
$("prompt-text").dispatchEvent(new w.Event("input"));
componentPrompt.click();
assert.equal($("prompt-text").value, "为我的阅读应用优化筛选");
designPrompt.click();
$("prompt-text").value = "";
$("prompt-text").dispatchEvent(new w.Event("input"));
componentPrompt.click();
assert.equal($("prompt-text").value, "为我的阅读应用优化筛选");
designPrompt.click();
assert.equal($("prompt-text").value, "");

async function checkClipboard() {
  const pending = [];
  Object.defineProperty(w, "isSecureContext", { value: true });
  Object.defineProperty(w.navigator, "clipboard", {
    value: {
      writeText(text) {
        return new Promise((resolve, reject) => pending.push({ text, resolve, reject }));
      },
    },
  });
  // 等待事件处理函数中的异步复制完成，不使用固定延时模拟结果。
  const flush = () => new Promise((resolve) => setImmediate(resolve));
  $("prompt-text").value = "A";
  $("copy-prompt").click();
  assert.equal(pending[0].text, "A");
  $("prompt-text").value = "B";
  $("prompt-text").dispatchEvent(new w.Event("input"));
  pending.shift().resolve();
  await flush();
  assert.equal($("copy-status").textContent, "");

  $("copy-prompt").click();
  componentPrompt.click();
  componentPrompt.focus();
  pending.shift().reject(new Error("权限拒绝"));
  await flush();
  assert.equal($("copy-status").textContent, "");
  assert.equal(d.activeElement, componentPrompt);

  $("copy-prompt").click();
  $("copy-prompt").click();
  pending[1].resolve();
  await flush();
  assert.match($("copy-status").textContent, /已复制/);
  pending[0].reject(new Error("旧操作失败"));
  await flush();
  assert.match($("copy-status").textContent, /已复制/);
  pending.length = 0;

  $("copy-prompt").click();
  pending.shift().reject(new Error("权限拒绝"));
  await flush();
  assert.match($("copy-status").textContent, /系统复制命令/);
  assert.equal(d.activeElement, $("prompt-text"));
  assert.deepEqual(errors, []);
  console.log("PASS：场景草稿保留、异步复制过期结果隔离、重复复制与权限失败恢复。");
}
checkClipboard().then(
  () => dom.window.close(),
  (error) => {
    dom.window.close();
    console.error(error);
    process.exitCode = 1;
  },
);
