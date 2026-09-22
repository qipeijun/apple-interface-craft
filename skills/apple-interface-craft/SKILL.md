---
name: apple-interface-craft
description: Apply Apple design and interaction principles when requested, including HIG, Apple platforms, or explicit skill invocation for Web, mini programs, apps, and other UIs; not every generic UI task.
---

# Apple Interface Craft

把 Apple HIG 的设计与交互理念转化为组件优化、界面设计和开发决策。适用于 Web、小程序、原生或混合 App、桌面及其他界面程序；原则可迁移，平台行为与 API 必须分别核实。

## 调用边界

仅在以下任一条件成立时使用：用户明确要求 Apple 设计或交互理念、Apple 风格、Apple HIG、Liquid Glass 或 Apple 设计审查；项目目标是 iOS、iPadOS、macOS、watchOS、tvOS 或 visionOS；用户直接指定 `$apple-interface-craft`。明确调用时不要求 Apple 外观或 Apple 平台；没有上述线索的普通 UI、UX、无障碍、动效和前端任务不自动触发。项目规范、业务契约、品牌和用户明确选择始终优先。若用户选择与平台建议冲突，指出差异并推荐；明确采用的产品例外不声称平台合规，技术不支持的能力仍需如实说明。

## 识别任务

- **设计或规划**：定义页面目的、结构、导航、内容、状态、视觉和动效，输出可评审或可实现的方案。
- **实现或调整**：先核实项目事实，再使用现有框架、组件库和设计系统完成最小改动与必要验证。
- **审查或诊断**：只检查和报告问题，除非用户同时要求修改；结论绑定代码、页面或运行态证据。

## 建立事实基线

开始前核实：用户和主要任务；真实业务状态、权限与接口契约；目标设备、操作系统、宿主与渲染运行时（如浏览器、WebView、小程序原生组件或原生 UI）；现有设计系统；视口、输入、无障碍、隐私和允许的验证层级。

没有用户研究、埋点或反馈时，不虚构 persona、偏好、转化提升或量化 UX 分数。事实不足但不影响低风险实现时，做最小、可撤销的假设并明确说明；若不同解释会明显改变流程或交互结果，说明取舍并给出建议。

## 按需读取参考

只加载当前任务需要的模块：

- 非 Apple 平台、混合容器或跨端组件：先读取 [references/cross-platform.md](references/cross-platform.md)，区分可迁移原则与平台实现。
- Apple 八项原则与取舍：读取 [references/principles.md](references/principles.md)。
- Structure、Navigation、Content、Visual Design、材质和平台适配：读取 [references/interface.md](references/interface.md)。
- 具体平台、导航架构、容器或组件模式选型：读取 [references/platform-patterns.md](references/platform-patterns.md)，并按其中路由核对当前 Apple HIG。
- 组件交互契约、控件、手势、直接操纵、反馈、进度和错误恢复：读取 [references/interaction.md](references/interaction.md)。
- 连续转场、弹簧、手势跟随、可打断动效和减少动态效果：读取 [references/motion.md](references/motion.md)。
- 浏览器或已确认使用 Web 渲染的界面中的自定义手势、速度衔接、吸附、动画技术选型和运行态验收：读取 [references/web-motion.md](references/web-motion.md)；不要把 DOM、Pointer Events 或 CSS 规则套到原生 UI 或小程序非 Web 渲染层。
- 无障碍、包容性、隐私、安全和权限：读取 [references/accessibility-responsibility.md](references/accessibility-responsibility.md)。
- 各类界面落地、状态覆盖、性能和验收：读取 [references/implementation-review.md](references/implementation-review.md)。
- 需要核对原始依据或版本变化时：读取 [references/sources.md](references/sources.md)。

## 工作顺序

1. 明确 Purpose 和主要任务。
2. 建立 Structure、Navigation 与内容层级。
3. 明确关键交互契约：操作对象、状态来源、提交时机、关闭与返回语义、反馈和恢复。
4. 据此选择目标平台的熟悉模式和组件，定义空间关系；能力限制影响契约时回到上一步调整。
5. 实现适配、无障碍、隐私、性能与必要动效。
6. 按风险验证并区分静态、运行态、设备和人工证据。

## 产出要求

### 设计方案

组件优化围绕相关调用方和交互契约；页面设计围绕完整任务；实现沿用同一组决策，不另起一套仅有外观的方案。输出与任务规模相称的方案，说明目的与主操作、结构和模式选型、相关状态与恢复、动效因果，以及平台适配和无障碍影响。

不要为了展示方法论而输出冗长说明。存在两种同样合理且会形成明显不同体验的方案时，列出关键差异并明确推荐。

只有文字或静态稿不足以判断重要交互取舍时，才建议隔离原型。每个方向必须在布局、密度、交互模型或动效因果上真正不同；未经用户选择，不把探索代码并入生产入口。

### 代码实现

遵循项目现有模式，用真实业务状态驱动界面与动效。严格使用已确认的 API 字段和类型，不增加猜测性兼容、默认值、轮询、吞错或用固定延时模拟完成。不要只实现好看的静态默认态，要覆盖任务涉及的交互、加载、错误、空态、禁用、权限和完成状态。

### 设计或代码审查

优先报告会阻止任务、导致误操作或数据丢失、破坏无障碍、造成状态不一致或明显卡顿的问题；再报告层级、文案、一致性和工艺问题。区分原则推断、静态证据、运行态证据和真实用户证据。

## 核心边界

- Apple 设计不等于大圆角、毛玻璃、灰白配色、SF Symbols 和统一弹簧动画。
- Simplicity 不等于少。优先重组、分组和渐进披露，不删除必要上下文与能力。
- 根据风险与可逆性选择撤销、确认或恢复；简单按钮更清楚时不引入复杂手势。
- Liquid Glass 是有语义的系统材质，不是任意 `backdrop-filter` 装饰。
- 新模式必须有线索、反馈和退出路径；Delight 不能妨碍核心任务。
- 无障碍不能只靠自动扫描证明。
- 静态检查、构建、截图和真实交互验收必须分别陈述。是否启动开发服务或浏览器，遵循用户授权与项目规则。
