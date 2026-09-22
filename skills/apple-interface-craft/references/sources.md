# 来源与核验规则

本技能只以 Apple 官方设计文档与 Apple Developer 视频作为 Apple 设计依据。非 Apple 平台的实施细节以对应平台或宿主官方文档为准；Web 另查 W3C 标准和所用框架或动画库的当前官方文档；第三方经验只能作为待核启发，不能覆盖平台、项目或 API 事实。

本轮专题核验：2026-09-22，覆盖 HIG 原则、组件、排版、材质、交互与无障碍等相关页面；未据此宣称逐项复核全部旧视频和第三方链接。

## 核心原则与设计基础

- [Human Interface Guidelines: Design principles](https://developer.apple.com/design/human-interface-guidelines/design-principles)  
  Purpose、Agency、Responsibility、Familiarity、Flexibility、Simplicity、Craft、Delight 的正式定义与应用建议。
- [WWDC26: Principles of great design](https://developer.apple.com/videos/play/wwdc2026/250/)  
  Apple Design Evangelists 对八项原则的完整讲解和示例。
- [Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines)  
  Apple 平台 Foundations、Patterns、Components、Inputs 的总入口，以及 Hierarchy、Harmony、Consistency。
- [WWDC25: Design foundations from idea to interface](https://developer.apple.com/videos/play/wwdc2025/359/)  
  从 Structure、Navigation、Content、Visual Design 将产品想法落到界面。

## 界面、内容与材质

- [HIG: Layout](https://developer.apple.com/design/human-interface-guidelines/layout)
- [HIG: Typography](https://developer.apple.com/design/human-interface-guidelines/typography)
- [HIG: Color](https://developer.apple.com/design/human-interface-guidelines/color)
- [HIG: Icons](https://developer.apple.com/design/human-interface-guidelines/icons)
- [HIG: Materials](https://developer.apple.com/design/human-interface-guidelines/materials)
- [HIG: Writing](https://developer.apple.com/design/human-interface-guidelines/writing)
- [WWDC25: Meet Liquid Glass](https://developer.apple.com/videos/play/wwdc2025/219/)
- [WWDC25: Get to know the new design system](https://developer.apple.com/videos/play/wwdc2025/356/)

## 交互、反馈与动效

- [HIG: Gestures](https://developer.apple.com/design/human-interface-guidelines/gestures)
- [HIG: Drag and drop](https://developer.apple.com/design/human-interface-guidelines/drag-and-drop)
- [HIG: Feedback](https://developer.apple.com/design/human-interface-guidelines/feedback)
- [HIG: Progress indicators](https://developer.apple.com/design/human-interface-guidelines/progress-indicators)
- [HIG: Alerts](https://developer.apple.com/design/human-interface-guidelines/alerts)
- [HIG: Motion](https://developer.apple.com/design/human-interface-guidelines/motion)
- [WWDC24: Enhance your UI animations and transitions](https://developer.apple.com/videos/play/wwdc2024/10145/)
- [WWDC18: Designing Fluid Interfaces](https://developer.apple.com/videos/play/wwdc2018/803/)  
  用于响应、连续跟随、重定向与中断、空间一致性、速度衔接和软边界等原始设计依据；转译到 Web 时仍需核对浏览器和动画库语义。

## Web 标准与动画库

- [W3C Pointer Events](https://www.w3.org/TR/pointerevents4/)  
  用于 pointer capture、取消、兼容输入和事件生命周期。
- [W3C Media Queries Level 5](https://www.w3.org/TR/mediaqueries-5/)  
  用于 `prefers-reduced-motion`、`prefers-reduced-transparency`、`prefers-contrast` 和 `forced-colors` 的规范语义；实际使用还要核对目标浏览器支持。
- [Motion: animate](https://motion.dev/docs/animate)  
  仅在项目实际使用 Motion 时核对当前参数语义。物理弹簧与时长型弹簧的速度行为不同，不能把 Apple 的 damping / response 或其他库参数按名称直接换算。

## 第三方审计参考

- [emilkowalski/skills @ d23d7f8](https://github.com/emilkowalski/skills/tree/d23d7f88a2e21c9e4b1418c7abe420f5c1052ba7)  
  用于发现 Web 动效准入、手势生命周期、速度衔接和隔离原型方面的覆盖缺口。其固定次数、时长、曲线、弹簧和库映射不作为规范依据，采用前必须回到 Apple、Web 标准和当前库文档核实。

## 导航、呈现与内容组件

- [HIG: Tab bars](https://developer.apple.com/design/human-interface-guidelines/tab-bars)
- [HIG: Sidebars](https://developer.apple.com/design/human-interface-guidelines/sidebars)
- [HIG: Toolbars](https://developer.apple.com/design/human-interface-guidelines/toolbars)
- [HIG: Sheets](https://developer.apple.com/design/human-interface-guidelines/sheets)
- [HIG: Popovers](https://developer.apple.com/design/human-interface-guidelines/popovers)
- [HIG: Menus](https://developer.apple.com/design/human-interface-guidelines/menus)
- [HIG: Search fields](https://developer.apple.com/design/human-interface-guidelines/search-fields)
- [HIG: Lists and tables](https://developer.apple.com/design/human-interface-guidelines/lists-and-tables)

## 无障碍、包容性与隐私

- [HIG: Accessibility](https://developer.apple.com/design/human-interface-guidelines/accessibility)
- [HIG: Inclusion](https://developer.apple.com/design/human-interface-guidelines/inclusion)
- [HIG: Privacy](https://developer.apple.com/design/human-interface-guidelines/privacy)
- [WWDC25: Principles of inclusive app design](https://developer.apple.com/videos/play/wwdc2025/316/)

## 跨平台补充入口

- [中文 HIG](https://developer.apple.com/cn/design/human-interface-guidelines/)：中文阅读入口；涉及具体行为时核对对应平台章节。
- [Android UI design](https://developer.android.com/design/ui)：Android 平台设计与适配入口。
- [WAI-ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/)：Web 自定义组件的语义、键盘与焦点模式；优先原生 HTML，不把 APG 示例当自动合规证明。
- [WCAG 2.2](https://www.w3.org/TR/WCAG22/)：Web 可访问性成功标准；不据此推断所有原生与小程序运行时实现。

小程序需按实际宿主检索官方设计与组件文档。本轮微信设计入口未能成功读取，不将未读取内容作为已确认规则。

## 使用来源的规则

- 设计 Apple 原生平台时，先确认目标 OS 和设备，再读取对应 HIG 的 Platform considerations 与 Specifications。
- 区分官方明确规则、基于原则的工程推断与项目选择；跨平台建议不得包装成 Apple 原文规定。中文与英文页面可能更新不同步，发生差异时记录相关原文、平台与日期，而非默认任一语言永远更新。
- Apple HIG 会随系统版本更新。涉及控件规格、材质、平台行为和 API 时，重新打开官方页面核对，不把本技能中的概括当作永久版本事实。
- Web 或跨平台任务只能借鉴 Apple 的原则、结构、交互因果和工艺要求；不能声称已经符合某个 Apple 原生平台规范。
- 第三方动画配方中的固定次数、时长、曲线、弹簧、速度和阻力参数必须回到产品频率、目标设备、现有令牌与当前官方 API 验证，不能直接升格为通用规则。
- 不复制 Apple 品牌、受限设计资源或系统界面来冒充自有产品。使用 Apple Design Resources、SF Symbols 和平台资产前核对官方许可与目标用途。
