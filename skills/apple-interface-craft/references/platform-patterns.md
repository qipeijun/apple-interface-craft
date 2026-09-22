# Apple 平台与模式路由

仅在任务涉及具体平台、导航或组件选型时读取。先确认 OS、设备、输入和最低版本，再查当前 HIG；本文件不替代版本化规格。

## 平台路由

| 平台 | 先检查的使用情境 | 重点模式 |
| --- | --- | --- |
| iOS | 单手触摸、紧凑宽度、安全区域、系统返回 | Navigation stack、Tab bar、Sheet、Swipe actions、Dynamic Type |
| iPadOS | 多任务、可变窗口、键盘和指针、拖放 | Sidebar、多列导航、Toolbar、Popover、Drag and drop |
| macOS | 多窗口、菜单栏、精确指针、键盘快捷键 | Window、Menu、Toolbar、Sidebar、Inspector、Table |
| watchOS | 短时查看、表冠、通知和后台完成 | 简短层级、List、Button、Progress、Complication |
| tvOS | 远距离观看、焦点移动、遥控输入 | Focus、Top-level navigation、Large targets、Playback controls |
| visionOS | 视线与间接手势、空间、沉浸程度 | Window、Volume、Ornament、Hover、Spatial layout |
| 非 Apple / 混合运行时 | 宿主、渲染层、输入、生命周期、品牌边界 | 先读 [cross-platform.md](cross-platform.md)，再选实际平台模式 |

## 结构与导航

- **Tab bar**：少量稳定的顶级区域，不承载操作或临时状态。
- **Sidebar**：宽画布中的顶级区域、集合或来源切换；窗口变窄时按平台适配。
- **Navigation stack / Split view**：表达层级和选择到详情的关系，返回时保留来源上下文。
- **Toolbar**：当前视图的操作、导航，以及适用的标题或搜索；保持归属和优先级。macOS 工具栏命令还应能从菜单栏访问。
- **Menu**：区分桌面菜单栏、上下文菜单与溢出菜单；macOS 菜单栏是完整命令入口，不能一概视为低频操作收纳。
- **Search**：先区分内容探索、快速定位和局部筛选，确定范围、更新方式、焦点、取消、空结果与返回上下文，再选入口；不把某平台位置当跨端固定规则。

## 呈现容器

- **Sheet**：集中完成、确认或编辑任务。iOS/iPadOS 可有模态与非模态形式；先确定父界面是否可操作，以及提交、取消和关闭语义，避免无尽嵌套。不要以名称推断其他框架的遮罩、焦点或保存行为。
- **Popover**：与来源控件保持空间关系的选择或信息；非模态形式通常可在外部交互时关闭，应保留工作。保留本地编辑与后端保存不是同一件事，服从实际提交契约。
- **Alert**：立即需要注意且最好可行动的关键问题；普通信息放在相关上下文。
- **Inspector**：检查或编辑当前选中对象的属性，不改变对象身份和选择上下文。
- **Full-screen presentation**：仅在沉浸、复杂编辑或任务需要完整空间时使用。

## 内容与操作模式

- **List / Table / Grid**：由扫描、比较、密度、选择和输入方式决定，不由视觉偏好决定。
- **Form / Settings**：按目标分组，标签描述对象，控件匹配值；明确保存和错误恢复。
- **Selection**：区分浏览焦点、单选、多选和激活；外观与后续动作保持一致。
- **Context menu / Swipe actions**：补充快捷入口，不作为关键功能唯一入口。
- **Drag and drop**：仅在对象、来源、目标和移动/复制语义清楚时使用，并提供替代方式。
- **Onboarding / Permission**：先交付价值，在使用相关功能时解释并请求；可跳过时不锁住主体验。
- **Destructive action**：可逆时优先撤销；意外且不可逆时确认具体对象和后果。

## 选择检查

选择模式前回答：

1. 这是顶级区域、层级导航、临时任务，还是当前对象的上下文操作？
2. 用户在目标平台首先会预期哪个系统模式？
3. 窗口、方向或输入方式变化后，选择和上下文如何保留？
4. 系统组件是否已经提供语义、动效和无障碍能力？
5. 当前最低系统版本和项目框架是否真实支持？

涉及 API、尺寸、数量限制或新系统行为时，读取 [sources.md](sources.md) 并查当前 HIG，不凭本文件猜测。
