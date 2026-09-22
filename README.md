# Apple Interface Craft

**把 Apple 的设计与交互理念，转化为跨平台组件、界面和可靠的实现。**

一个面向 AI 编程助手的设计 Skill，配有可离线打开的交互式能力介绍页。覆盖 Web、小程序、原生与混合 App、桌面等界面程序。

[在线交互演示](https://qipeijun.github.io/apple-interface-craft/) · [GitHub 仓库](https://github.com/qipeijun/apple-interface-craft) · [查看 Skill](skills/apple-interface-craft/SKILL.md) · [交互落地页源码](docs/index.html) · [设计依据](skills/apple-interface-craft/references/sources.md) · [MIT 许可证](LICENSE)

## 能做什么

| 工作 | 关注点 | 输出 |
| --- | --- | --- |
| 组件优化 | 状态归属、选择与草稿、提交时机、关闭与返回 | 符合现有契约的交互与实现 |
| 页面设计 | 用户任务、内容层级、导航与平台模式 | 可评审的结构、布局与状态方案 |
| 界面开发 | 真实反馈、异常恢复、适配、无障碍与必要动效 | 范围清楚的代码改动与相关验证 |
| 体验审查 | 任务受阻、误操作、状态一致性、交互路径 | 有位置、有依据的最小修复建议 |

八项设计原则：Purpose、Agency、Responsibility、Familiarity、Flexibility、Simplicity、Craft、Delight。

这些原则用于判断具体取舍。保留产品品牌、业务能力和平台惯例；专业工具可以保持高密度，不要求所有界面都采用玻璃、大圆角或统一动效。

## 哪些场景值得使用

| 你的问题 | Skill 会重点处理 | 你能拿到的产出 |
| --- | --- | --- |
| 组件看起来完整，但操作容易误解 | 区分焦点、选中、草稿与已提交结果，明确提交和关闭语义 | 状态与事件契约；授权实现时给出对应组件改动 |
| 筛选、编辑、弹层操作后容易丢上下文 | 检查取消、返回、失败、重复操作和恢复路径 | 退出与恢复规则、父子状态同步方案、相关验证 |
| 新页面不知道如何组织信息 | 从主要任务建立内容层级、导航和主操作 | 布局方案、组件选型、关键状态与交互说明 |
| 管理后台信息多、扫描效率低 | 优化分组、对齐、操作归属与渐进披露，保留比较密度 | 有依据的局部调整方案；避免无目的地全部改成大卡片 |
| 同一产品要覆盖 Web、小程序与 App | 区分可迁移的原则和各平台的导航、输入、宿主能力 | 平台差异清单、组件与实现建议、待核实的能力边界 |
| 想增加动效或 Liquid Glass 元素 | 判断效果的反馈或空间意义、内容可读性、性能和减少动态路径 | 有目的的动效与材质方案；授权实现时落地适合该运行时的代码 |
| 大字体、键盘操作或辅助技术下难以使用 | 检查语义、焦点、文字重排、非手势入口和系统偏好 | 可访问性改进项、实现建议与需要的真实环境验证 |
| 上线前想审查体验是否可靠 | 按任务受阻、误操作、状态问题、无障碍到视觉细节排序 | 问题位置、证据、用户影响、最小修复方向与验证缺口 |

这些是工作范围与交付方向，不是已经证明的转化率、效率或满意度提升。效果需结合实际项目、用户任务和运行环境验证。

## 怎样提供一个好任务

最有用的输入是：**目标平台 + 页面或组件材料 + 用户任务 + 当前问题 + 改动边界**。已有信息可从项目中读取时，无需重复填写完整问卷。

```text
使用 $apple-interface-craft 【设计 / 实现 / 优化 / 审查】这个【页面或组件】。
目标平台：【Web / 小程序 / iOS / Android / 桌面 / 混合 App】
用户任务：【谁要完成什么】
当前问题：【卡在哪里，期望发生什么】
相关材料：【组件路径、截图、现有流程或已确认的业务规则】
约束：【保留的品牌、组件库、接口契约、不可改动的行为】
本次范围：【只出方案 / 直接实现 / 只审查】
```

不需要先选定“Apple 风格”。明确调用后，它可以为任何目标平台提供设计与交互决策；实现仍依据实际宿主、框架和业务约定。

## 不同请求，会得到什么

- **只设计**：目的与主操作、信息结构、组件选择、关键状态、异常恢复，以及平台和无障碍取舍；不自动修改代码。
- **直接实现或优化**：先核实相关代码、调用方和契约，再完成范围内的界面与行为改动，报告实际验证结果及未覆盖部分。
- **只审查**：给出有位置和证据的问题、影响、最小修复建议与验证方向；没有依据时明确缺口，不把主观偏好写成缺陷。

例如，一个“点击应用才生效”的筛选组件，合理的交付不止是新的间距与圆角，还应说明并按授权实现：临时选择如何保存、何时更新列表、取消保留什么、重复提交如何处理，以及失败后用户怎样继续。接口不支持的撤销或取消能力不会被凭空添加。

## 使用示例

在 Codex 中可显式使用 `$apple-interface-craft`；在其他助手中，也可以明确要求使用 `apple-interface-craft` Skill，并按客户端的调用方式加载。

**优化组件**

```text
使用 $apple-interface-craft 优化这个筛选组件的设计、交互与实现。
目标平台是 Web，筛选点击“应用”才生效。保持现有品牌与 API 契约，
先核实状态、提交和关闭行为，再完成必要改动与验证。
```

**设计页面**

```text
使用 $apple-interface-craft 设计小程序的阅读记录页面。
主要任务是快速记录、编辑和查找。请说明内容层级、组件选择、
关键交互、异常状态和无障碍考虑。本次先输出方案。
```

**审查交互**

```text
使用 $apple-interface-craft 审查这个编辑弹层。
重点检查误操作、状态一致性、未保存退出与焦点返回。
结合证据说明影响、最小修复方向和验证方式。本次只审查，不修改。
```

明确调用时支持非 Apple 平台。自动选择范围仍限于 Apple 设计理念、HIG、Apple 平台等相关意图；普通 UI 请求不会全部由它接管。业务契约、用户授权和项目规则优先。

## 安装 Skill

先克隆或下载本仓库：

```sh
git clone https://github.com/qipeijun/apple-interface-craft.git
cd apple-interface-craft
```

将 **整个** `skills/apple-interface-craft/` 文件夹复制到助手的个人 skills 目录，保留 `references/` 和 `agents/`。不需要复制落地页、测试或 `node_modules`。

以下命令从仓库根目录执行，适用于 macOS/Linux 的 shell；如果目标已存在，会停止并提示，避免覆盖已有修改。

### Codex

```sh
skill_root="${CODEX_HOME:-$HOME/.codex}/skills"
if [ -e "$skill_root/apple-interface-craft" ] || [ -L "$skill_root/apple-interface-craft" ]; then
  echo "目标 Skill 已存在，请先比较并备份，再决定是否更新。"
else
  mkdir -p "$skill_root"
  cp -R skills/apple-interface-craft "$skill_root/"
fi
```

### Claude Code

```sh
skill_root="$HOME/.claude/skills"
if [ -e "$skill_root/apple-interface-craft" ] || [ -L "$skill_root/apple-interface-craft" ]; then
  echo "目标 Skill 已存在，请先比较并备份，再决定是否更新。"
else
  mkdir -p "$skill_root"
  cp -R skills/apple-interface-craft "$skill_root/"
fi
```

`agents/openai.yaml` 是 Codex 的界面元数据；Skill 主体及参考文档不依赖它。安装后新建会话，并确认助手能发现该 Skill。其他支持 `SKILL.md` 的助手需按各自的加载规则安装；本项目没有逐一验证所有助手。

## 交互演示

直接访问 **[在线演示](https://qipeijun.github.io/apple-interface-craft/)**，体验玻璃材质、编辑与撤销、加载恢复等交互。

直接用浏览器打开 `docs/index.html`，无需安装依赖、启动后端或连接外网。所有插图、样式与交互脚本均内嵌。

如需自动刷新预览，在仓库根目录执行：

```sh
npm ci
npm run dev
```

然后打开 `http://127.0.0.1:5500`。开发与测试依赖要求 Node.js `22.22.2+`（22.x）、`24.15.0+`（24.x）或 `26+`；直接打开 HTML 无需 Node.js。已有服务占用 5500 时，请复用它，或运行 `npm run dev -- --port=5501`。

页面包含：

- 跨平台布局切换与六步工作流程。
- Liquid Glass 风格的浮动工具栏、风景色调和连续缩放。
- 筛选的草稿、应用、取消、撤销与空结果状态。
- 可反向的组件展开，以及减少动态效果设置。
- 编辑保存、未保存退出确认和返回焦点。
- 收藏移除与撤销恢复。
- 手动驱动的加载、失败、重试、取消和成功演示。
- 三种可编辑、可复制的 Skill 调用提示。

演示只操作当前页面的内存状态，刷新后重置；不发出业务请求、不上传输入。页面没有外部字体、图片、统计脚本或运行时 CDN。Web 玻璃效果是设计演绎，不等同于 Apple 原生 Liquid Glass。

## 目录

```text
skills/apple-interface-craft/
  SKILL.md                  调用边界、工作方式和参考路由
  agents/openai.yaml        Codex 展示与调用元数据
  references/               原则、跨平台、组件、动效和验收依据
docs/
  index.html                独立交互落地页，可用于静态托管
  .nojekyll                 保持静态文件交付
tests/
  structure.cjs             文档链接、页面引用与脚本语法检查
  interactions.cjs          页面状态转换回归检查
```

## 检查与贡献

```sh
npm ci
npm test
```

测试使用 jsdom 检查业务状态与 DOM 结果。原生 `dialog`、动画、媒体偏好和观察器在测试中有替代实现，因此测试通过不证明浏览器排版、真实模态焦点限制、辅助技术支持或真机手感。

修改 Skill 时，说明对应用户任务和依据，保持参考按需读取；修改落地页时，覆盖受影响的默认态、取消、失败、恢复与键盘路径。具体见 [贡献说明](CONTRIBUTING.md)。

静态网站入口为 `docs/index.html`，无构建步骤。在线演示部署于 [GitHub Pages](https://qipeijun.github.io/apple-interface-craft/)；自行部署时可将 `docs/` 作为站点目录。

## 来源与许可证

本项目独立维护，与 Apple Inc. 无隶属、赞助或官方认证关系。Apple、Liquid Glass 等名称及商标属于各自权利人。

项目自己的 Skill 文本、示例代码与页面采用 [MIT](LICENSE)。Apple HIG、视频、第三方文档和品牌资源仍适用各自条款；本仓库引用其链接，不包含这些资料的完整镜像。来源与阅读边界见 [来源索引](skills/apple-interface-craft/references/sources.md)。
