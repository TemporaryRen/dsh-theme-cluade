# Cluade · 设计规范

## 1. 设计目标

把参考设计稿 **Ember Desktop**（暖纸底 + 陶土橙，见
[/Users/temporary/source/workflow-skill/deepseek-harness-desktop](/Users/temporary/source/workflow-skill/deepseek-harness-desktop)）
的视觉语言，映射为 DeepSeek Harness Web GUI 的 **语义 token 覆盖层**。

三条原则：

1. **纸感而不是橙色滤镜**：底色、表面、边框都带暖度，橙色只做强调。否则长会话会显得刺眼、廉价。
2. **两套色板同等对待**：参考稿只有浅色，但 DSH 用户可能在深色或跟随系统下使用；深色必须是暖炭而不是把浅色调暗。
3. **token 层只改颜色，组件补丁只加"区块感"**：168 个 token 不触碰 DOM、组件结构、字体族与交互；几何改动只出现在组件补丁里——思维链展开块的 padding/margin/1px 边框/圆角，以及 Markdown 的标题间距、引用块、表格外框与代码块描边。Markdown 正文字号仍以用户设置为基准（+1px），不锁死。回滚时 token 层与 `theme.css` / `markdown.css` 补丁同时移除，官方样式立即恢复。

## 2. 色板

唯一颜色真源是 [`design/palette.json`](palette.json)；下表是核心角色。

### 2.1 表面与背景

| 角色 | 浅色 | 深色 | 用途 |
| --- | --- | --- | --- |
| canvas | `#F8F4EA` | `#1B1815` | 应用底、会话主区 |
| surface | `#FFFEFB` | `#221E1A` | 抬升卡片、弹层表面 |
| surfaceNested | `#F4EDE2` | `#2A241E` | 嵌套卡片、代码分隔 |
| surfaceDeep | `#EDE4D6` | `#322B24` | 更深一级嵌套、预览底 |
| overlay | `#FCF8F0` | `#2A241E` | 弹出层/浮层底 |
| modulePlatform | `#EFE2CF` | `#332C24` | 被选中的模块/主题方块 |
| sidebar | `#F0ECE4` | `#161311` | 侧栏列与标题行 |
| sidebarActive | `#E6D8C6` | `#332C24` | 当前会话行 |
| bubble | `#F0E7DA` | `#2E2721` | 用户消息气泡 |
| menuSurface（MenuSurface 共享材质） | `rgba(252,247,237,0.62)` | `rgba(44,38,32,0.58)` | 下拉/上下文菜单底（配合 `backdrop-filter`） |
| menuFill（其它浮层） | `rgba(253,250,244,0.90)` | `rgba(40,34,28,0.86)` | `--dsw-specific-menu`：对话框/面板/toolbar 等 |

### 2.2 文字

| 角色 | 浅色 | 深色 | 用途 |
| --- | --- | --- | --- |
| label-primary (ink) | `#2B2620` | `#F1EAE0` | 正文、标题、侧栏面板行 |
| label-secondary | `#575044` | `#BDB2A2` | 次要说明 |
| label-tertiary | `#6E6558` | `#A39889` | 元信息 |
| label-caption | `#857B6C` | `#8B8173` | 极小号说明 |
| label-dimmed | `#B7AC9C` | `#554C42` | 禁用/占位 |
| label-primary-dimmed | `#3B352D` | `#CCC2B4` | 半强调正文 |
| label-primary-foreground | `#FFFDF9` | `#1B1815` | 主按钮上的文字 |

### 2.3 强调与状态

| 角色 | 浅色 | 深色 |
| --- | --- | --- |
| accent（brand / 主按钮） | `#B05C3A` | `#D97757` |
| accentDeep（hover） | `#9C4E2F` | `#E68C6C` |
| accentDimmed | `#F0E1D4` | `#3A2F26` |
| link | `#A55332` | `#E08A6A` |
| business（焦点环/进行中） | `#B05C3A` | `#D97757` |
| success / soft | `#6F7F54` / `#8D9673` | `#A6B487` / `#8F9E70` |
| warn / soft | `#A8761F` / `#C99A3F` | `#D8B26A` / `#E1C48A` |
| error / soft | `#B24A3A` / `#C9735F` | `#E0826D` / `#C9735F` |
| idle | `#C0B5A5` | `#4B443B` |

### 2.4 边线与阴影

- 浅色：`border-l1..l4` = `rgba(57,48,39,0.10 / 0.16 / 0.22 / 0.29)`，暖棕半透明，叠在任何表面上都不发灰。
- 深色：`rgba(239,231,219,0.10 / 0.16 / 0.22 / 0.30)`，暖白半透明。
- 阴影 token（`--dsw-shadow-*`、`--dsw-elevation-*`）**不覆盖**：官方阴影是中性半透明黑，在暖表面上观感正常，改动它们收益低、风险高。

### 2.5 选中项与思维链区块

| 角色 | 浅色 | 深色 | 用途 |
| --- | --- | --- | --- |
| selectedFill | `#E7D7C7` | `#413529` | 被选中的菜单项 / 会话行 / 侧栏面板行 / 外观方块 |
| reasoningFill | `#F3E7D5` | `#241E18` | 展开的思维链（reasoning）输出区底色 |
| reasoningBorder | `#D3BC9C` | `#514537` | 思维链输出区 1px 描边（刻意高于参考稿的对比，保证"明显"） |

这三个颜色通过 `--cluade-*` 变量（override-only）注入，再由 `theme.css` 的状态补丁消费；改色仍然只改 `design/palette.json`。

### 2.6 Markdown 阅读色（聊天输出 + 文档预览）

| 角色 | 浅色 | 深色 | 说明 |
| --- | --- | --- | --- |
| mdText / mdHeading | `#51473D` / `#48382B` | `#DDD2C4` / `#F1E7DA` | 正文 / 标题（比界面正文略浅的暖棕） |
| mdStrong | `#61432C` | `#F0DFCB` | 加粗 |
| mdLink / mdLinkBorder | `#AA5533` / `#DCB89B` | `#E08A6A` / `#7A5544` | 链接文字 / 下划线 |
| mdInlineBg / mdInlineText | `#F1E6D6` / `#93542C` | `#322A22` / `#DDA277` | 行内代码 chip |
| mdCodeBg / mdCodeText | `#332C26` / `#E0CDB4` | `#1E1915` / `#E7DCCB` | 代码块底 / 文字（浅色模式也是深色块） |
| mdCodeBannerBg / mdCodeBannerText | `#3C3128` / `#C3A07A` | `#262019` / `#C9B49B` | 代码块顶部信息条 |
| mdQuoteBg / mdQuoteBorder / mdQuoteText | `#F4EEE4` / `#CB9A70` / `#7C6549` | `#2A241E` / `#C9835C` / `#B7A28C` | 引用块 |
| mdTableHeadBg / mdTableHeadText | `#F1E7D8` / `#845C38` | `#332B23` / `#D3B08A` | 表头 |
| mdTableZebra / mdTableHover | `#FAF5EB` / `#F5EBDC` | `#241F1A` / `#2C251F` | 斑马纹 / 行悬停 |
| md-syn-*（9 个） | 亮陶土/橄榄/琥珀 | 同色系提亮 | 代码块语法色（仅作用在 `.md-code-block` 内） |

这些颜色只通过 `--cluade-md-*` 变量注入，由 `markdown.css` 消费；参考稿的正文 15px/1.95 在这里实现为「用户正文字号 + 1px / 1.95 行高」，以保留用户的字号设置。

## 3. token 映射

`tools/gen-tokens.mjs` 负责 `palette 名字 → DSH token`。映射按 DSH 官方 token 语义分组（共 168 个）。其中 14 个内置颜色 token 是 `Theme` 检查器文档化的官方目录，其余为 `overrideTokens` 接受的 override-only 名称；两者的边界与证据见 [`reference-analysis.md`](reference-analysis.md) §7。

| token 组 | 数量 | 映射规则 |
| --- | --- | --- |
| `--dsw-alias-bg-*` | 15 | 按层级映射到 canvas/surface/surfaceNested/surfaceDeep/overlay；遮罩保留"遮"的语义（浅色暖棕透明、深色黑透明） |
| `--dsw-alias-border-*` | 7 | 全部走暖中性半透明阶梯；浅色 inverted 保留透明 |
| `--dsw-alias-label-*` | 13 | 五级文字亮度阶梯 + 反色/前景文字；`label-shimmer` 用暖黑/暖白 30–45% |
| `--dsw-alias-brand-*` | 4 | 品牌主色 = 陶土橙；`brand-text` 保持暖墨色（不是橙色），`brand-primary-invert` 保持明暗反转 |
| `--dsw-alias-button-*` | 15 | 主按钮 = 陶土橙实心；ghost/floating/contrast/toolbar 各走对应暖中性层 |
| `--dsw-alias-interactive-bg-*` | 5 | hover/active 用暖色极低透明度叠加，保证叠加在任意背景上都自然 |
| `--dsw-alias-state-*` | 12 | 语义色保留色相区分，只把饱和度/明度收敛到暖调（红→砖红，绿→橄榄，琥珀→暖琥珀） |
| `--dsw-alias-markdown-*` + `--shiki-*` | 19 | 代码块暖纸底 + 暖调语法色（砖红关键字、橄榄字符串、琥珀参数、灰棕注释、低饱和青链接） |
| `--dsw-alias-code-diff-*` / `file-diff-*` | 8 | 增删色保留红绿语义，底色改为暖绿/暖红纸 |
| `--dsw-specific-*` | 11 | 侧栏、气泡、输入、菜单、选择器、提示条 |
| 其它 | 19 | `--dsw-menu-surface-fill`、链接、菜单图标/分组标题、滚动条 ×4、开关滑块、toast ×2、tooltip ×2、turn-trigger ×2、onboarding ×4 |
| 本主题自用 `--cluade-*` | 40 | 选中项（1）、思维链（2）、Markdown 皮肤（37：正文/标题/链接/引用/行内代码/代码块/表格/语法色等），由 `theme.css` / `markdown.css` 消费 |

## 4. 组件表现

- **应用框架**：画布加深到暖纸 `#F8F4EA`；抬升卡片纸白 `#FFFEFB`；侧栏 `#F0ECE4` 比画布更深，形成"纸张叠层"而不是灰白对比。macOS 桌面壳把侧栏列画成原生 vibrancy + 冷蓝紫渐变，暖色只占 39%（浅色）/50%（深色）/90%（降低透明度时），token 覆盖不到，因此主题用 darwin 限定的 `theme.css` 把该列**不透明**重绘为 `--dsw-specific-sidebar-fill`（浅 `#F0ECE4` / 深 `#161311`），与其它平台一致；移除插件即恢复官方半透明材质。
- **会话**：用户气泡暖砂 `#F0E7DA`，主文字保持 `#2B2620`（未用橙色文字，避免渲染成"客服对话"）；助手正文直接在画布上，靠 `#F2EBDD` 代码块和 `#EFE2CF` 选中态区分。
- **主操作**：发送按钮、主按钮 = `#B05C3A` 实心，文字 `#FFFDF9`（4.66:1）；hover 加深到 `#9C4E2F`。侧栏面板行使用 `label-primary`，在暖色侧栏底上为 12.72:1（浅）/ 15.49:1（深）；hover/选中用 9% 暖色，可辨。
- **选中项（全平台生效）**：DSH 的列表/菜单把 hover 与选中用同一个 `--dsw-alias-interactive-bg-hover`，所以选中行看起来是浅灰。主题用状态补丁把菜单 `_selectedFill`、会话行 `_sessionRow._selected`、侧栏 `_panelRow._panelActive`、外观方块 `_themeCube._selected` 换成更深的橘色 `#E7D7C7`（深色 `#413529`），普通 hover 保持轻量。
- **思维链输出区（全平台生效）**：展开的 reasoning 块原本直接落在会话画布上；主题给它加 1px 暖色描边（`#D3BC9C` / `#514537`）+ 略深暖底（`#F3E7D5` / `#241E18`）+ 圆角，并同步其 sticky 标题底色，形成参考稿里的“区块”观感。
- **Markdown（聊天 + 文档预览）**：`markdown.css` 一次覆盖两处——正文 +1px/1.95 行高、H1–H6 阶梯与 H2 分隔线、陶土下划线链接、米色行内代码、深色代码块 + 顶部信息条（语法色整套换暖色）、暖米引用块、带表头底色/斑马纹的圆角表格。宽表格保持 DSH 出血布局，紧凑上下文（`_compact`）不套用。
- **焦点**：`--dsw-alias-state-business-primary` 被改为陶土橙，因此焦点环、进行中状态、链接从官方蓝改为暖橙，是整套主题统一感的关键一步。
- **菜单/浮层**：两个材料 token 都覆盖——`--dsw-menu-surface-fill`（MenuSurface 共享材质，浅色 62% / 深色 58% 暖纸透明衬底 + 官方 blur）与 `--dsw-specific-menu`（其它浮层，浅色 90% / 深色 86% 不透明暖色）；分组标题用浅色 95% / 深色 94% 不透明暖纸。
- **代码**：代码块 `#F2EBDD`，行内代码 `#F0E8DA`，标题条 `#ECE3D5`；语法高亮是独立设计的一套暖色（不是简单调暗官方色），深色下除注释（4.27:1）外全部 ≥4.5:1。
- **差异**：浅色 `+` 行暖绿 `#EAF2E4` / marker `#4E8A57`，`-` 行暖红 `#F9E8E2` / marker `#B4483A`；深色沿用官方深色 diff 值（红绿语义优先，避免在暖炭底上降低可辨性）。
- **深色**：背景不是纯黑，而是 `#1B1815` 暖炭；表面按 `#221E1A → #2A241E → #322B24` 抬升；强调色提亮到 `#D97757` 以维持对比度。

## 5. 对比度（WCAG 2.1，自动校验）

`node tools/gen-tokens.mjs` 每次生成都会跑以下 35 组门槛，不达标即失败（`tools/audit-theme.mjs` 还会从最终产物独立复算关键配对，防止生成器自证）：

| 检查 | 浅色 | 深色 | 门槛 |
| --- | --- | --- | --- |
| label-primary on base | 13.65:1 | 14.80:1 | ≥7 |
| label-primary on raised surface | 14.86:1 | 13.86:1 | ≥7 |
| label-primary on nested surface | 12.89:1 | 12.84:1 | ≥7 |
| label-primary on sidebar | 12.72:1 | 15.49:1 | ≥7 |
| label-primary on selected session row | 10.71:1 | 11.52:1 | ≥7 |
| label-secondary on base | 7.25:1 | 8.46:1 | ≥4.5 |
| label-tertiary on base | 5.22:1 | 6.24:1 | ≥4.5 |
| label-caption on base | 3.79:1 | 4.62:1 | ≥3.5 |
| link on base | 4.92:1 | 6.74:1 | ≥4.5 |
| brand mark on base | 4.31:1 | 5.66:1 | ≥3 |
| composer send label on brand fill | 4.66:1 | 5.66:1 | ≥4.5 |
| brand wordmark on sidebar | 12.72:1 | 15.08:1 | ≥7 |
| menu icon on sidebar | 7.87:1 | 10.19:1 | ≥4.5 |
| user bubble text | 12.24:1 | 12.31:1 | ≥7 |
| success state on base | 3.95:1 | 8.00:1 | ≥3 |
| warning state on base | 3.62:1 | 8.83:1 | ≥3 |
| error state on base | 4.86:1 | 6.38:1 | ≥4 |
| code keyword on code block | 4.78:1 | 7.13:1 | ≥4.5 |
| code string on code block | 4.90:1 | 7.75:1 | ≥4.5 |
| code function on code block | 4.89:1 | 8.59:1 | ≥4.5 |
| code parameter on code block | 4.80:1 | 8.11:1 | ≥4.5 |
| code constant on code block | 4.53:1 | 6.78:1 | ≥4.5 |
| code comment on code block | 3.87:1 | 4.27:1 | ≥3 |
| code string expression on code block | 4.80:1 | 9.07:1 | ≥4.5 |
| label-primary on selected option | 10.67:1 | 9.96:1 | ≥7 |
| label-primary on reasoning body | 12.28:1 | 13.80:1 | ≥7 |
| markdown body on canvas | 8.25:1 | 11.86:1 | ≥7 |
| markdown heading on canvas | 10.19:1 | 14.46:1 | ≥7 |
| markdown link on canvas | 4.71:1 | 6.74:1 | ≥4.5 |
| markdown inline code | 4.80:1 | 6.38:1 | ≥4.5 |
| markdown quote text | 4.77:1 | 6.25:1 | ≥4.5 |
| markdown code block text | 8.87:1 | 12.86:1 | ≥7 |
| markdown table header | 4.81:1 | 6.85:1 | ≥4.5 |
| markdown syntax keyword | 6.28:1 | 7.61:1 | ≥4.5 |
| markdown syntax comment | 4.32:1 | 4.50:1 | ≥3 |

低于 4.5:1 的**文字类**只剩两级：caption `#857B6C` 3.79:1（门槛 3.5）与代码注释 3.87:1（门槛 3），二者只用于极小号说明与注释。三级文字在本次迭代中从 4.42:1 加深到 **5.22:1**（门槛提到 4.5），元信息与时间戳因此不再发灰。侧栏面板行用的是 `label-primary`，它的加深来自正文墨色；macOS 侧栏底由 `theme.css` 不透明重绘为 `--dsw-specific-sidebar-fill`，面板行对比度为 12.72:1（浅）/ 15.49:1（深）（见 §4 与 §8）。

> 迭代记录：初版文字层级偏浅（正文 11.95:1 但观感偏淡，tertiary 仅 4.42:1）。五级文字层级的取舍理由见 `reference-analysis.md` §8「实现采纳情况」。根据「侧栏面板行整体偏淡」的反馈，把主文字 `#39332D → #2B2620`、次要 `#6B6257 → #575044`、画布 `#FCFAF6 → #F8F4EA`、边框透明度整体 +2~3 个百分点，并把 tertiary/caption 的验收门槛提高。改色只动 `design/palette.json`，数字由生成器重算。

## 6. 与参考稿的对齐与差异

对齐：暖纸底色、纸白卡片、暖边框、陶土强调、低对比辅助文字、暖砂用户气泡、侧栏选中行、暖色语法高亮。

差异（token 层的边界）：

1. 参考稿的侧栏宽度、顶栏高度、输入框圆角、运行卡片结构属于组件布局，token 层不改变。
2. 参考稿使用 13px 基础字号与小圆角；DSH 保留用户自己的字号设置与官方圆角体系（4/8/12/16/20/28px）。
3. 参考稿的暖橙几乎覆盖所有交互细节；本主题把橙色收敛到品牌、主按钮、链接、焦点环、运行状态，避免信息层级被强调色淹没。

## 7. 维护

- 改颜色：只改 `design/palette.json`，跑 `node tools/gen-tokens.mjs`，本文件第 2、5 节的数值随之更新（第 5 节数字来自生成器输出，改色后请同步）。
- 改 Markdown：编辑 [markdown.css](../markdown.css)，只改颜色时改 `design/palette.json` 的 `md*` / `synMd*` 项。
- 改行为/组件补丁：编辑 [theme.css](../theme.css)（macOS 侧栏材质、选中项、思维链区块），重新生成后会被内联进 `client.js`。侧栏补丁只在 `data-platform=darwin` 下生效；选中项与思维链补丁依赖对应组件的 CSS Module 类名后缀与 `data-variant` 属性。
- DSH 升级新增 token：未覆盖的 token 保持官方配色，主题不会崩。
- token 改名：旧名字被覆盖后失效（降级为官方色），不会破坏渲染。

## 8. 已知边界

- 不新增「设置 → 外观」里的主题选项（DSH 的该行固定为 浅色/深色/跟随系统）。
- macOS 桌面版的侧栏列由官方样式用「原生 vibrancy + 冷蓝紫渐变」绘制（`[data-platform=darwin] …_sidebarCol{background:linear-gradient(… #7a9bf0 …), color-mix(… sidebar-fill 40%, transparent)}`）。这是 token 覆盖不到的部分：渐变和原生材质不是变量。主题用 `theme.css` 里一条 `[data-platform=darwin] [class$='_sidebarCol']`（含 `[class*='_sidebarCol ']` 多类名变体与深色变体）规则把该列**不透明**重绘为 `--dsw-specific-sidebar-fill`。代价与风险：依赖 CSS Module 的类名后缀 `_sidebarCol` 与 `data-platform` 属性，DSH 升级若改名，规则会静默失效并退回官方灰色材质（视觉降级，不破坏渲染）；类名匹配按 token 边界限定，避免误伤未来的 `_sidebarCollapsed` 一类类名；补丁不触碰其它平台与原生窗口控件。
- 不覆盖 `--dsw-static-*` 静态调色板，未消费上述语义 token 的组件仍可能保留少量官方冷灰色（例如个别硬编码 `--dsw-static-neutral-bluish-400` 的边框）。MenuSurface 材质（`--dsw-menu-surface-fill`）已覆盖，深色的共享菜单也走暖色衬底。
- 选中项与思维链补丁是**全平台**生效的（不限 darwin）；思维链补丁也是整套主题里唯一的几何改动。它们依赖组件内部约定（`_selectedFill`、`_sessionRow._selected`、`_panelRow._panelActive`、`_themeCube._selected`、`[data-variant='think'][data-expanded]`）。DSH 若重命名这些类名或属性，对应区域退回官方样式（浅灰选中 / 无卡片思维链），不会破坏渲染；其它平台与 token 层不受影响。
- Markdown 皮肤依赖渲染容器类名后缀 `_markdown` 与 `.md-code-block` / `_banner*` / `_tableScroll` / `_image` 等结构类；DSH 升级改名时对应规则失效、退回官方排版。参考稿中 DSH 渲染器不会产出的元素（callout、kbd、mark、details、figcaption、脚注、H7、`.lead`/`.caption`）不做模拟；宽表格只跳过外框与强制 100% 宽（保留出血布局），单元格/表头样式仍套用；`_compact` 紧凑容器保持 DSH 原样。
- 终端 ANSI 16 色由终端插件管理，不在主题 token 内。
