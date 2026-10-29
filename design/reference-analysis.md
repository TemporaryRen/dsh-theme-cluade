# Cluade 主题 · Ember Desktop 参考稿拆解

> 分析对象：`/Users/temporary/source/workflow-skill/deepseek-harness-desktop`（纯静态 HTML 设计稿，非 DSH 实现）
> 分析目标：把「Ember Desktop」的暖橙视觉翻译成真实 DSH Web GUI 的主题 token 层（Cluade：暖纸 + 陶土）
> 写作原则：参考稿结论一律给出选择器/数值证据；DSH 侧结论只引用本机已安装的 `@deepseek-ai/dsh-client-ui-theme@0.2.1-rc.3` 的 token 目录与校验代码，不推测 UI 组件实现。
> 产出约束：仅本文一个文件；参考目录全程只读。

---

## 0. 一页结论

1. **参考稿是「像素稿」不是「token 稿」**：`ui/style.css` 共使用 **160 个唯一十六进制色值**，其中 **158 个只出现一次**（唯一被复用的只有 `#eae1d4` 与 `#a3927d`）；`:root` 只声明了 8 个语义变量（`--bg/--sidebar/--surface/--ink/--muted/--line/--accent/--accent-dark`）。其余 152 个颜色是逐元素硬编码（94 个 `color`、34 个 `background`、19 个 `border`、5 个阴影 alpha）。→ 主题层必须**归并**，不能逐色复刻。

2. **DSH 官方 token 目录只暴露 14 个颜色 token**（13 个 `--dsw-alias-*` + 1 个 `--dsw-specific-sidebar-fill`），全部 `valueType: "CSS color"` 且 `requiresLightAndDark: true`。参考稿最核心的 6 类视觉（暖纸画布、抬升表面、侧栏填充、主/次文字、陶土品牌、语义状态）可以 1:1 落到这批 token；其余约 20 类细节只能落到 alias / specific / shiki / 菜单材质等 override-only 名称上（本主题实装 154 个，含 40 个自用 `--cluade-*` 变量：选中项/思维链/Markdown 皮肤），属于「近似」而非「还原」。

3. **参考稿的大量「质感」在 token 之外**（本文归为 8 类，见 §7.2）：布局尺寸（252/224/62/44/870/990/950/1070/350）、微排版（**106 条字号声明中有 54 条 ≤9px**）、圆角（3–10px，DSH 是 4/8/12/16/20/28px）、极淡暖色阴影（alpha 仅 1.2%–10%）、以及若干 DOM 结构（mac 窗口控制、tab 下划线伪元素、`9px 9px 2px 9px` 不对称气泡、84% 进度条、无遮罩抽屉）。这些 token 覆写**做不到**，只能放弃或接受近似。

4. **参考稿是浅色独占**：全文件 0 个深色定义（无 `prefers-color-scheme` 色板、无 dark 变量）。而 DSH 覆写 API 强制每个 token 提供 `{ light, dark }` 两个字符串（裸字符串会抛 `TypeError`）。→ **深色板必须新造**，本文给了一套可直接起步的暖炭深色值。

5. **参考稿的低对比辅助文字不能照搬**：`--muted #9B9185` 在 `#FCFAF6` 上只有 **2.97:1**（WCAG AA 正文需 4.5:1）；`placeholder #BAAA95` 2.23、`footer-meta #B7A58D` 2.29、`breadcrumb #AA9D8C` 2.55、`summary #AA967B` 2.79、`diff-add/#939C70` 2.79、`diff-delete #BB8C72` 2.83。做 Cluade 时应保留「暖而低饱和」的观感，但把 label-tertiary/caption 压到 ≥4.5:1（建议 `#776B5D` / `#7A6D57`），否则在 DSH 的 12px 说明文字上会不可读。

---

## 1. 素材与分析方法

| 素材 | 实际情况 |
| --- | --- |
| `README.md` | 说明这是「根据用户提供的 DeepSeek Harness 桌面截图重新设计」的完整会话工作台；无构建、无依赖、无远程字体 |
| `ui/index.html` | 8.2KB，压缩单行；完整桌面框架 + 一段示例会话（插件开发任务） |
| `ui/style.css` | 16.1KB，压缩单行；160 色 + 全部布局/组件/响应式 |
| `ui/app.js` | 9.2KB，压缩单行；侧栏/标签页/抽屉/模拟运行/搜索过滤 |
| `ui/assets/mark.svg` | 302B，80×64 viewBox 像素鲸鱼，3 色 `#C56B46` / `#FAF6EE` / `#93472F` |
| `design/design-spec.md` | 50 行设计规范，含色彩、字号、尺寸、交互、断点 |
| `design/tokens.json` | 仅 12 色 + 7 个 layoutPx + 3 个 radiusPx；与 CSS 实际值存在缺口（见 §3.6） |
| `design/preview.png` | **实际字节是 JPEG**（`file` 输出：JPEG, JFIF 1.01, baseline, 940×860）。复制为 `.jpg` 后可读 |

**截图对应断点**：预览图宽 940px，落在 `@media(max-width:1200px)` 区间 → 侧栏 224px、`.breadcrumb` 隐藏、`.prototype` 隐藏，与图中一致。所以参考稿的「屏幕观感」本身已是一种压缩态，不是 1440px 桌面全量布局。

**方法**：用 `sed`/正则把单行 CSS 展开 → 按 CSS 属性（`background` / `border*` / `color` / `box-shadow`）给 160 色分组 → 计算 WCAG 对比度 → 对照 DSH token 目录做映射可行性判定。

---

## 2. 布局结构

### 2.1 框架尺寸表

| 区域 | 选择器 | 关键尺寸/规则 |
| --- | --- | --- |
| 侧栏 | `aside` | `width:252px`（≤1200px 为 `224px`；≤680px `display:none`），`position:fixed; inset:0 auto 0 0`，`padding:0 14px`，`border-right:1px solid #E1D9CC` |
| 主列 | `main` | `margin-left:252px`（≤1200px 224px，≤680px 0），`height:100vh`，`display:flex; flex-direction:column`，`min-width:0` |
| 窗口控制 | `.window-controls` | `height:48px`，`gap:8px`，3 个 `10×10` 圆点（`#D0C6B9`，首个 `#C89379`），右侧收栏按钮 17px |
| 品牌区 | `.brand` | `padding:10px 7px 27px`，logo `29×25`（`image-rendering:pixelated`），字标 `600 22px` mono `letter-spacing:-1.3px`，`HARNESS` 徽标 7px mono |
| 新建按钮 | `.new-session` | `padding:10px 12px`，12px 字，右侧 `⌘N` 9px mono |
| 导航 | `nav` | `padding:17px 0 22px`，按钮 `width:100%; padding:10px; gap:11px`，图标 16px/宽 17px，计数 9px mono |
| 工作区段 | `.workspace-label` | `padding:0 7px 9px`，9px mono `letter-spacing:1px`，右侧搜索/添加按钮 16px |
| 会话树 | `#sessions` | `overflow:auto`；分组 `.folder` `padding:15px 9px 9px`，11px；会话行 `.session` `padding:10px 9px 10px 27px`，11px，选中时 `padding-left:10px` 且底色 `#E6D7C7` |
| 侧栏底 | `.sidebar-footer` | `padding:17px 5px`；`.local` 上边框 1px `#E0D6C7`，9px mono；头像 `29×29` 圆 |
| 顶栏 | `header` | `height:62px`（≤680px 55px），`padding:0 30px`（1200→22，680→16），`gap:14px`，`border-bottom:1px solid #E9E2D8` |
| 标签栏 | `.tabbar` | `height:44px`，`padding:0 30px`，`justify-content:space-between`，tab 间距 23px |
| 会话滚动区 | `#scroll-area` | `flex:1; overflow:auto; min-height:0; scroll-behavior:smooth` |
| 会话正文 | `.conversation` | `max-width:870px`（≥1600px 为 990px），`margin:0 auto`，`padding:27px 40px 14px`（1600:34 上；1200:30 左右；680:20/18/10） |
| 输入区 | `.composer-area` | `flex-shrink:0`，`max-width:950px`（≥1600px 1070px），`padding:10px 40px 12px`，`background:var(--bg)` |
| 输入框 | `.composer` | `padding:14px 15px 11px`，`border-radius:10px`，`border:1px solid #D9C6B0`，`box-shadow:0 4px 22px #88603E07` |
| 抽屉 | `#drawer` | `position:fixed; right:0; top:0; bottom:0; width:350px; max-width:90vw`，`padding:28px`，`z-index:5` |
| Toast | `#toast` | `position:fixed; bottom:25px` 水平居中，`z-index:10`，`border-radius:6px`，`padding:12px 20px` |

### 2.2 分区与层级关系

- **三层结构**：固定侧栏（`aside`，独立滚动）→ 主列（顶栏 62 + 标签栏 44 + 滚动会话区 + 常驻输入区）→ 覆盖层（抽屉 z=5、Toast z=10）。
- **滚动职责唯一**：只有 `#scroll-area` 滚动；`header` / `.tabbar` / `.composer-area` 都是 `flex-shrink:0`，输入区永远贴底。
- **宽度节奏**：正文 870 < 输入区 950（宽屏 990 < 1070）。输入区比正文宽 80px，形成「底部操作锚点」，这是设计稿刻意的垂直视觉收束。
- **抽屉无遮罩**：`#drawer` 打开时页面没有 mask/scrim（HTML 里没有遮罩元素，JS 只切 `hidden`）。DSH 有 `--dsw-alias-bg-mask-1..3`、`bg-mask-drop`、`bg-mask-photo` 一整族遮罩 token，参考稿完全没用到。
- **侧栏折叠**：`body.collapse-sidebar` 使 `aside{display:none}` + `main{margin-left:0}`，同时顶栏出现 `◨` 展开按钮（`#expand` 初始 `hidden`）。是位移而非抽屉式覆盖。

### 2.3 响应式断点（4 档 + 1 个动效偏好）

| 断点 | 具体变化（全部来自 CSS） |
| --- | --- |
| `min-width:1600px` | 会话区 `max-width:990px; padding-top:34px`；输入区 `max-width:1070px`；气泡 13px、说明 13px、卡片标题 12px、事项 11px；卡片内边距加 3px |
| `max-width:1200px` | 侧栏/主列 252→224；顶栏 padding 30→22；`.breadcrumb`、`#team .muted`、`.mode-dot`、`.prototype` 隐藏；会话区左右 30px；`.footer-meta` 第三组隐藏；品牌字标 22→20px |
| `max-width:900px` | `#team`、`#jobs`、`.runtime>.separator`、`.model-label`、`.plan-label`、`.badge`、`.desktop-break`、`.live-sub` 隐藏；气泡左缩进 100→35px；验证行 8→7px；底栏工具字号降到 8px |
| `max-width:680px` | 侧栏整体 `display:none`；顶栏 55px/16px；会话区 20/18/10px；气泡左缩进 18px；`#effort`、`.footer-meta` 第二组隐藏；`.plan` 改为 `space-between`、8px；`.conversation` 无最大宽约束（受 padding 控制） |
| `prefers-reduced-motion:reduce` | `* { scroll-behavior:auto!important }` |

---

## 3. 颜色清单（160 个唯一色值）

### 3.1 设计稿自己只声明了 8 个语义变量

| 色值 | 变量 | 用途 |
|---|---|---|
| `#fcfaf6` | `--bg` | 见下方各表（被大量元素以 var() 引用） |
| `#f0ece4` | `--sidebar` | 见下方各表（被大量元素以 var() 引用） |
| `#fffdf9` | `--surface` | 见下方各表（被大量元素以 var() 引用） |
| `#39332d` | `--ink` | 见下方各表（被大量元素以 var() 引用） |
| `#9b9185` | `--muted` | 见下方各表（被大量元素以 var() 引用） |
| `#e9e2d8` | `--line` | 见下方各表（被大量元素以 var() 引用） |
| `#be6844` | `--accent` | 见下方各表（被大量元素以 var() 引用） |
| `#a55332` | `--accent-dark` | 见下方各表（被大量元素以 var() 引用） |

> 其余 152 个色值全部内联写在具体选择器里。`design/tokens.json` 只收录了 12 个（8 个变量 + success `#8D9673` + deletion `#BB8C72` + userMessage `#F0E7DA` + sessionSelected `#E6D7C7`）；160 个里另外 **148 个**（含 34 个背景/填充、19 个边框、94 个文字）只存在于 CSS 内联值，不能当唯一色板使用。

### 3.2 背景色（34 个，按亮度从亮到暗）

| 色值 | 用途 | 使用处（证据） |
|---|---|---|
| `#fffdf8` | 输入框容器 | `.composer` |
| `#fffcf6` | 执行卡片容器 | `.run-card` |
| `#fffaf2` | 右侧抽屉容器 | `#drawer` |
| `#fbf7ef` | Review 按钮 | `.artifact-strip button` |
| `#faf6ef` | 新建会话按钮 | `.new-session` |
| `#faf5ec` | 搜索框 | `#session-search` |
| `#f5ecdf` | 当前命令条容器 | `.active-command` |
| `#e9ebde` | 完成勾图标 | `.check-icon` |
| `#f1e8db` | ＋ 附件按钮 | `#attach` |
| `#f4e7d6` | RUNNING · DEMO 徽标 | `.badge` |
| `#eee8de` | 标签计数徽标 | `.tab span` |
| `#f0e7da` | 用户消息气泡 | `.user-message` |
| `#eee7dc` | 日期分隔线 | `.date-divider span` |
| `#f1e6d7` | 新发送的用户消息 | `.new-user` |
| `#efe5d8` | Changes 计数徽标 | `.count` |
| `#efe5d7` | 进度槽 | `.progress-track` |
| `#eae1d4` | 按钮悬停底 | `button:hover` |
| `#e8dfd1` | 上下文进度条 | `.context-meter>i` |
| `#e5dbce` | 顶栏竖向分隔 | `.separator` |
| `#e6d7c7` | 选中会话行 | `.session.selected` |
| `#e7d6c1` | 气泡内行内代码 | `.user-message code` |
| `#e1d7c7` | 阶段连接线 | `.plan i` |
| `#dfceb7` | 账户头像 | `.avatar` |
| `#d0c6b9` | 窗口控制点 | `.window-controls i` |
| `#bca78b` | 模式圆点 | `.mode-dot` |
| `#c89379` | 首个窗口控制点 | `.window-controls i:first-child` |
| `#97a17b` | 本地状态绿点 | `.local>span:first-child` |
| `#b9926a` | 上下文进度条 | `.context-meter>i` |
| `#c68b61` | 进度条填充 | `.progress-track>span` |
| `#be8c60` | 轨迹节点圆点 | `.trace:before` |
| `#c78760` | 运行中会话圆点 | `.session-dot` |
| `#be885e` | 底栏状态圆点 | `.status-dot` |
| `#be754c` | .run-indicator | `.run-indicator` |
| `#6f4d34` | Toast 提示 | `#toast` |

读法：亮部（`#FCFAF6`–`#FBF7EF`）是画布与卡片；中段（`#F1E8DB`–`#EAE1D4` 与 `#E6D7C7`）是侧栏的 hover/选中与条带；暗部（`#C68760` 以下）是进度条、圆点、绿点等「有色的实心小件」。注意 34 个背景色里没有一个是纯灰——全部带 30–40° 暖色相。

### 3.3 边框色（19 个）

| 色值 | 用途 | 使用处（证据） |
|---|---|---|
| `#f0e8dd` | 工具行分隔线 | `.tool-list>div` |
| `#ece2d3` | 折叠区分隔线 | `details` |
| `#eae1d4` | 变更条容器 | `.artifact-strip` |
| `#eadcc8` | 当前命令条容器 | `.active-command` |
| `#e9dcc9` | 抽屉数据行 | `#drawer .drawer-row` |
| `#e8d9c6` | 用户消息气泡 | `.user-message` |
| `#e1d9cc` | 侧栏右边框 | `aside` |
| `#e6d7c3` | 抽屉选项按钮 | `#drawer button.option` |
| `#e0d6c7` | 本地工作区状态行 | `.local` |
| `#e3d5c3` | Review 按钮 | `.artifact-strip button` |
| `#dfd0bc` | 执行卡片容器 | `.run-card` |
| `#ddcdbb` | 新建会话按钮 | `.new-session` |
| `#ddc9b0` | 右侧抽屉容器 | `#drawer` |
| `#d6c8b7` | 搜索框 | `#session-search` |
| `#d9c6b0` | 输入框容器 | `.composer` |
| `#d8c3a9` | 轨迹竖线 | `.trace` |
| `#bda590` | HARNESS 徽标框/字 | `.brand>span` |
| `#c38b62` | 输入框聚焦描边 | `.composer:focus-within` |
| `#b46c45` | 运行中会话圆点 | `.session-dot` |

读法：参考稿所有边框都是**不透明暖色**（`#E9E2D8`→`#D8C3A9`），而不是 DSH 默认的 `rgb(0 0 0 / 10%)` 半透明黑。这是「纸感」的关键差异之一：纸面上的分隔线应该随纸色变暖，而不是把黑压上去。但把 `--dsw-alias-border-l1/l2` 整体改成不透明暖色有副作用（叠在彩色填充/深色态上会显脏），见 §7.2。

### 3.4 文字色（94 个，按与 `#FCFAF6` 的对比度降序）

| 色值 | 对比度(vs 画布) | 级别 | 用途 | 使用处（证据） |
|---|---|---|---|---|
| `#41352c` | 11.38:1 | 主 | 品牌字标 | `.brand` |
| `#66503f` | 7.24:1 | 主 | 搜索框 | `#session-search` |
| `#7f482d` | 7.03:1 | 主 | 选中会话行 | `.session.selected` |
| `#74513a` | 6.76:1 | 次 | 助手名 | `.assistant-heading` |
| `#755133` | 6.76:1 | 次 | 抽屉标题 | `#drawer h2` |
| `#765139` | 6.70:1 | 次 | 新建会话按钮 | `.new-session` |
| `#6d5540` | 6.66:1 | 次 | 用户消息气泡 | `.user-message` |
| `#77583e` | 6.20:1 | 次 | 输入文字 | `.composer textarea` |
| `#76624e` | 5.55:1 | 次 | 行动说明段 | `.response-intro` |
| `#856044` | 5.37:1 | 次 | Trajectory 标题 | `.trajectory-title h2` |
| `#866044` | 5.34:1 | 次 | 执行卡片标题 | `.run-card-heading strong` |
| `#a45131` | 5.30:1 | 次 | 选中标签 | `.tab.active` |
| `#7a6958` | 5.05:1 | 次 | 工作区分组行 | `.folder` |
| `#8c6441` | 5.02:1 | 次 | 轨迹步骤名 | `.trace strong` |
| `#936342` | 4.91:1 | 次 | 命令条标题 | `.active-command strong` |
| `#a45b37` | 4.88:1 | 次 | 气泡内行内代码 | `.user-message code` |
| `#8e6744` | 4.83:1 | 次 | 账户头像 | `.avatar` |
| `#7e6e5e` | 4.71:1 | 次 | 侧栏导航项 | `nav button` |
| `#8d6b50` | 4.63:1 | 次 | HARNESS 徽标框/字 | `.brand>span` |
| `#887058` | 4.47:1 | 辅 | 气泡第二段文字 | `.user-message p+p` |
| `#8f6e4e` | 4.47:1 | 辅 | 抽屉数据行 | `#drawer .drawer-row` |
| `#8c7154` | 4.37:1 | 辅 | 变更标题 | `.artifact-strip strong` |
| `#b2633c` | 4.25:1 | 辅 | 当前阶段 | `.current` |
| `#877560` | 4.25:1 | 辅 | 会话行文字 | `.session` |
| `#9a704d` | 4.20:1 | 辅 | 抽屉选项按钮 | `#drawer button.option` |
| `#8b775e` | 4.11:1 | 辅 | 完成事项行 | `.task-summary>div` |
| `#8b7a68` | 3.96:1 | 辅 | 顶栏操作按钮 | `.top-actions button` |
| `#b16e45` | 3.88:1 | 辅 | Deep diving 状态 | `.live-status` |
| `#9c7b56` | 3.74:1 | 辅 | Review 按钮 | `.artifact-strip button` |
| `#9c7b57` | 3.74:1 | 辅 | 演示回复 | `.new-answer` |
| `#9b7d60` | 3.67:1 | 辅 | YOU 标签 | `.user-label>span:first-child` |
| `#ad7b50` | 3.52:1 | 辅 | RUNNING · DEMO 徽标 | `.badge` |
| `#b17a51` | 3.49:1 | 辅 | 小标（EXECUTION TRACE） | `.overline` |
| `#b97749` | 3.47:1 | 辅 | ❯ 提示符 | `.command-symbol` |
| `#99836a` | 3.47:1 | 辅 | 导航图标 | `nav button>span` |
| `#aa805a` | 3.39:1 | 辅 | Changes 计数徽标 | `.count` |
| `#b18256` | 3.25:1 | 辅 | 附件文件名 | `#attachment` |
| `#a08a6f` | 3.17:1 | 辅 | 工具描述 | `.tool-list p` |
| `#9c8b76` | 3.16:1 | 辅 | 本地工作区状态行 | `.local` |
| `#9e8b72` | 3.15:1 | 辅 | 账户折叠箭头 | `.sidebar-footer>button>span:last-child` |
| `#879366` | 3.15:1 | 辅 | 测试通过数 | `.tool-list em` |
| `#9c8d7c` | 3.09:1 | 辅 | 收起侧栏按钮 | `.window-controls button` |
| `#a38c71` | 3.08:1 | 辅 | 四阶段计划行 | `.plan` |
| `#9a9071` | 3.05:1 | 辅 | 已完成阶段 | `.done` |
| `#8d9673` | 2.99:1 | 弱 | 验证摘要 | `.verification` |
| `#8c9770` | 2.97:1 | 弱 | 完成勾图标 | `.check-icon` |
| `#bb885d` | 2.97:1 | 弱 | 进行中省略点 | `.loading-dots` |
| `#aa8e6c` | 2.96:1 | 弱 | 底栏工具按钮 | `.composer-tools button` |
| `#b78b67` | 2.92:1 | 弱 | 子 Agent 点阵 | `.agent-dots` |
| `#b28d68` | 2.92:1 | 弱 | 分组图标 | `.folder>span:first-child` |
| `#b48d67` | 2.90:1 | 弱 | 工具名（READ/BASH） | `.tool-list>div>span` |
| `#a3927d` | 2.89:1 | 弱 | 运行态信息 / 子 Agent / 后台任务入口 | `.runtime`, `.runtime button` |
| `#a29380` | 2.87:1 | 弱 | 未选中标签 | `.tab` |
| `#ab9276` | 2.84:1 | 弱 | 抽屉正文 | `#drawer p` |
| `#bb8c72` | 2.83:1 | 弱 | − 行数 | `.diff-delete` |
| `#939c70` | 2.79:1 | 弱 | + 行数 | `.diff-add` |
| `#a49682` | 2.77:1 | 弱 | 工作区段标题 | `.workspace-label` |
| `#ad9576` | 2.75:1 | 弱 | 轨迹描述 | `.trace p` |
| `#aa967b` | 2.74:1 | 弱 | 折叠标题 | `summary` |
| `#aa9780` | 2.70:1 | 弱 | 导航计数 | `nav small` |
| `#b39573` | 2.70:1 | 弱 | 命令文本 | `.active-command code` |
| `#b39776` | 2.65:1 | 弱 | 执行计时 | `.run-duration` |
| `#9e9e7b` | 2.64:1 | 弱 | 缓存命中率 | `.footer-meta b` |
| `#ac9b84` | 2.59:1 | 弱 | 标签计数徽标 | `.tab span` |
| `#b09b7f` | 2.57:1 | 弱 | Trajectory 说明 | `.trajectory-title p` |
| `#aa9d8c` | 2.55:1 | 弱 | 工作区路径 | `.breadcrumb` |
| `#b49b7c` | 2.54:1 | 弱 | 查看过程按钮 | `.live-status button` |
| `#b99a76` | 2.53:1 | 弱 | 变更图标 | `.artifact-icon` |
| `#b39c82` | 2.52:1 | 弱 | 模型标识 | `.model-label` |
| `#b09d85` | 2.52:1 | 弱 | 账户副标题 | `.sidebar-footer small` |
| `#b39e81` | 2.48:1 | 弱 | 变更摘要 | `.artifact-strip small` |
| `#b89e7d` | 2.45:1 | 弱 | 轨迹时间 | `.trace small` |
| `#afa08d` | 2.45:1 | 弱 | 次要词（Standard） | `.muted` |
| `#b4a08b` | 2.41:1 | 弱 | 快捷键提示 | `.new-session kbd` |
| `#b2a28d` | 2.39:1 | 弱 | 会话时间 | `.session small` |
| `#b7a185` | 2.38:1 | 弱 | 状态副文 | `.live-sub` |
| `#b5a28c` | 2.37:1 | 弱 | YOU 与时间标签 | `.user-label` |
| `#baa184` | 2.36:1 | 弱 | 抽屉行副文 | `#drawer .drawer-row small` |
| `#b7a48c` | 2.31:1 | 弱 | 示例结果标 | `.example-label` |
| `#b7a58d` | 2.29:1 | 弱 | 底栏统计文字 | `.footer-meta` |
| `#b8a68f` | 2.27:1 | 弱 | 折叠箭头 | `.chevron` |
| `#b7a793` | 2.25:1 | 弱 | DESIGN PREVIEW 标 | `.prototype` |
| `#bba88e` | 2.21:1 | 弱 | 执行计划标题 | `.plan-label` |
| `#bda98c` | 2.19:1 | 弱 | 步数数字 | `summary>span:last-child` |
| `#b9aa98` | 2.17:1 | 弱 | 助手时间 | `.assistant-time` |
| `#baaa95` | 2.17:1 | 弱 | 占位符 | `.composer textarea::placeholder` |
| `#c0aa8f` | 2.15:1 | 弱 | UI/API/E2E 标签 | `.task-tag` |
| `#bead94` | 2.10:1 | 弱 | 工具耗时 | `.tool-list small` |
| `#c3ac8e` | 2.10:1 | 弱 | 底栏工具下拉箭头 | `.composer-tools button>span` |
| `#c0b19d` | 2.01:1 | 弱 | 日期分隔文字 | `.date-divider` |
| `#c6b8a3` | 1.87:1 | 弱 | 统计分隔点 | `.footer-meta i` |
| `#cfc4b6` | 1.65:1 | 弱 | 路径分隔符 | `.breadcrumb span` |
| `#fff4e5` | 1.04:1 | 弱 | Toast 提示 | `#toast` |
| `#fff6ea` | 1.03:1 | 弱 | 发送/停止按钮 | `.composer-tools .send` |

读法：
- **级别**按「与画布 `#FCFAF6` 的对比度」分档：≥7:1 主文字、4.5–7 次文字、3–4.5 辅助、<3 弱/装饰。注意侧栏文字真实底色是 `#F0ECE4`（对比再降约 10%），卡片文字底色 `#FFFCF6`（几乎不变）。
- **只有 19 个（20%）达到 4.5:1 可作正文**，25 个落在 3–4.5:1，**50 个低于 3:1**。参考稿把绝大多数文字压到 2.1–3.5:1，靠「字号极小 + 位置固定 + 永不换行」维持可读；这在真实产品里不成立，所以 §3.7 会给出必须上调的清单。
- 表中 `#FFF4E5`、`#FFF6EA` 两行是**深底上的浅字**（Toast 底 `#6F4D34` 上 6.93:1；发送按钮底 `#BE6844` 上 3.74:1），它们对画布的 1.0:1 不代表真实场景。
- 主文字 `--ink #39332D` 只以变量形式存在，没有作为 `color:` 内联值出现，因此不在本表内（其对画布 11.95:1，是全稿对比最高的正文色）。
- 视觉上有两条明确的「色相轨道」：一条暖灰（`#39332D`→`#BAAA95`，负责层级），一条陶土（`#7F482D`/`#A45131`/`#B2633C`/`#B97749`，负责强调与选中）。两条轨道互不混用，这是参考稿读起来「稳」的原因。

### 3.5 阴影与发光（5 个 alpha + 1 个环）

| 色值 | 完整值 | 使用处（证据） |
|---|---|---|
| `#66402005` | `0 1px 2px #66402005` | `.new-session` |
| `#7c532303` | `0 3px 10px #7c532303` | `.run-card` |
| `#7c53231a` | `-15px 0 60px #7c53231a` | `#drawer` |
| `#88603e07` | `0 4px 22px #88603e07` | `.composer` |
| `#bc79530a` | `0 0 0 2px #bc79530a` | `.composer:focus-within` |
| `#f2e4d3` | `0 0 0 3px #f2e4d3` | `.run-indicator` |

读法：阴影全部是**暖色低透明**（`#7C532303` alpha≈1.2%，`#88603E07` alpha≈2.7%，`#7C53231A` alpha≈10%）。它们几乎看不见，只负责「抬起」；DSH 默认 elevation 是黑色 3%–8% 的冷阴影，两者观感差异明显（见 §7.2 / §8.3）。`.run-indicator` 的 `box-shadow:0 0 0 3px #F2E4D3` 是用阴影做的「状态光环」，DSH 没有对应 token。

### 3.6 归并与 tokens.json 缺口

把 160 色按用途归并后，一个可用主题实际只需要 **约 30 个值**：

| 语义族 | 成员（本文列出的全部值） | 代表值 | 归并后取值建议 |
| --- | --- | --- | --- |
| 画布 | 1 个：`#FCFAF6` | `#FCFAF6` | 保留 |
| 卡片/表面 | 4 个：`#FFFDF9` `#FFFDF8` `#FFFCF6` `#FFFAF2` | `#FFFDF9` | 统一 `#FFFDF9`，仅浮层用 `#FFFAF2` |
| 侧栏填充/悬停/选中 | 3 个：`#F0ECE4` `#EAE1D4` `#E6D7C7` | `#F0ECE4` | 三态全保留 |
| 嵌套条带底 | 7 个：`#F5ECDF` `#F4E7D6` `#F1E8DB` `#F1E6D7` `#EFE5D8` `#EEE8DE` `#EFE5D7` | `#F5ECDF` | 压到 1 个 |
| 细分隔线 | 9 个：`#E9E2D8` `#ECE2D3` `#F0E8DD` `#EAE1D4` `#E9DCC9` `#E8D9C6` `#E3D5C3` `#E6D7C3` `#E1D7C7` | `#E9E2D8` | 压到 2 个（`#EDE5DA` / `#F2EAE0`） |
| 结构边（侧栏/抽屉/卡片） | 6 个：`#E1D9CC` `#DDC9B0` `#DFD0BC` `#DDCDBB` `#D6C8B7` `#D8C3A9` | `#E1D9CC` | 压到 1 个 |
| 控件边/聚焦边 | 4 个：`#D9C6B0` `#C38B62` `#BDA590` `#B46C45` | `#D9C6B0` | 压到 2 个 |
| 正文级文字（≥4.5:1） | 20 个（19 个内联 + 变量 `#39332D`）：`#41352C` `#66503F` `#7E6E5E` `#7F482D` `#8D6B50` `#8E6744` `#A45131` `#A45B37` … | `#39332D` | 压到 2 个：`#39332D`、`#6E5D4B` |
| 小字/标签文字（3–4.5:1） | 25 个：`#877560` `#887058` `#8B7A68` `#9A704D` `#9B7D60` `#AD7B50` `#B16E45` … | `#8B7A68` | 压到 2 个：`#776B5D`、`#7A6D57` |
| 弱字/装饰（<3:1） | 50 个：`#A29380` `#AA967B` `#B7A58D` `#BAAA95` `#BB8C72` `#939C70` … `#CFC4B6` | `#B7A58D` | 压到 1 个：`#A69A8C`（仅装饰用） |
| 陶土强调/运行色 | 11 个：`#BE6844` `#A55332` `#B2633C` `#BE754C` `#C78760` `#C68B61` `#B97749` `#B46C45` `#B9926A` `#B17A51` `#AD7B50` | `#BE6844` | 保留 4 个：`#BE6844` / `#A55332` / `#A45131` / `#C78760` |
| 橄榄绿成功 | 7 个：`#8D9673` `#8C9770` `#879366` `#939C70` `#97A17B` `#9E9E7B` `#E9EBDE` | `#8D9673` | 保留 2 个：`#8D9673`（填充）+ `#6F7853`（文字） |
| 砖红删除 | 2 个：`#BB8C72` `#C89379` | `#BB8C72` | 保留 `#BB8C72`（填充）+ `#99674B`（文字） |
| 暖色阴影 | 5 个 alpha + 1 个环：`#66402005` `#7C532303` `#88603E07` `#BC79530A` `#7C53231A` `#F2E4D3` | `#7C532303` | 压到 3 档 |

`design/tokens.json` 与 CSS 的实际缺口：
1. **布局**缺少 `.conversation` 990、`.composer-area` 950/1070、抽屉 `max-width:90vw`、`#scroll-area`、Toast 位置。
2. **颜色**只有 12 个，缺 34 个背景/填充、19 个边框、94 个文字；`design-spec.md` 的「色彩」段也只写了 9 个颜色。
3. **字体**：`tokens.json` 写 `system-ui`，CSS 实际是 `-apple-system,BlinkMacSystemFont,'Segoe UI','PingFang SC'`；品牌用 mono，标题用 Georgia，都与 tokens.json 不一致。
4. 圆角：`tokens.json` 只给 3 个（5/7/10），CSS 实际有 2/3/4/5/6/7/8/9/10 共 9 档 + 50%。

### 3.7 对比度体检（必须以真实底色计算）

| 角色 | 前景/背景 | 对比度 | 判定 |
| --- | --- | --- | --- |
| 正文 | `#39332D` / `#FCFAF6` | 11.95 | 通过 |
| 次要正文（行动说明） | `#76624E` / `#FCFAF6` | 5.66 | 通过 |
| 用户气泡文字 | `#6D5540` / `#F0E7DA` | 5.67 | 通过 |
| 气泡第二段 | `#887058` / `#F0E7DA` | 3.81 | 仅大字 |
| `--muted` | `#9B9185` / `#FCFAF6` | **2.97** | 不达标 |
| 未选中 tab | `#A29380` / `#FCFAF6` | **2.87** | 不达标 |
| 面包屑 | `#AA9D8C` / `#FCFAF6` | **2.55** | 不达标 |
| 底栏统计（7px） | `#B7A58D` / `#FCFAF6` | **2.29** | 不达标 |
| 输入框占位符 | `#BAAA95` / `#FFFDF8` | **2.23** | 不达标 |
| 折叠标题 summary | `#AA967B` / `#FFFCF6` | **2.79** | 不达标 |
| 验证摘要（橄榄） | `#8D9673` / `#FFFCF6` | **3.04** | 仅大字 |
| diff 增/删 | `#939C70` / `#BB8C72` / `#FCFAF6` | 2.79 / 2.83 | 不达标 |
| 主强调（当文字） | `#BE6844` / `#FCFAF6` | 3.83 | 仅大字 |
| 陶土按钮内文字 | `#FFF6EA` / `#BE6844` | **3.74** | 不达标（按钮文字） |
| 选中会话 | `#7F482D` / `#E6D7C7` | 5.20 | 通过 |

→ **Cluade 的取舍**：保留暖纸底、陶土强调、低饱和橄榄；把「承载信息的小字」提升到 4.5:1。建议替换：`#9B9185`→`#776B5D`(4.98)、`#B7A58D`→`#7A6D57`(4.85)、`#AA9D8C`→`#7A6D57`、`#BAAA95`→`#8F8272`、`#BB8C72`→`#99674B`(4.58)、`#8D9673`→`#6F7853`(4.61，仅文字用)、按钮文字用 `#A55332` 底(5.05) 而不是 `#BE6844`。

---

## 4. 排版

### 4.1 字体栈

- 正文：`-apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', sans-serif`，基准 `13px`（`body{font:13px …}`）。
- 等宽：`'SFMono-Regular', Consolas, 'Liberation Mono', monospace`（变量 `--mono`，**31 个选择器**使用）。
- 品牌字标特殊：`.brand b { font:600 22px var(--mono); letter-spacing:-1.3px }`；`.brand>span` 7px mono + `letter-spacing:.8px`。
- 头像特殊：`.avatar` 用 `Georgia`（12px）。
- Trajectory 标题特殊：`Georgia,'PingFang SC',serif`（25px）。
- 无远程字体请求（README 明确「无远程字体」）。

### 4.2 字号阶梯（实测使用频次）

| 字号 | 声明数 | 典型使用处 |
| --- | --- | --- |
| 25px | 1 | Trajectory 标题 h2（serif） |
| 22px | 1 | 品牌字标（mono 600） |
| 20px | 1 | 品牌字标（≤1200px） |
| 19px | 1 | 变更图标 ▤ |
| 18px | 1 | 抽屉标题 |
| 17px | 4 | 收栏按钮、新建 ＋、附件 ＋、命令提示符 ❯ |
| 16px | 2 | 导航图标、工作区 + 按钮 |
| 15px | 1 | 分组图标 ▱ |
| 13px | 4 | 会话标题 h1、气泡正文、说明段、宽屏气泡 |
| 12px | 12 | 导航、气泡次段、助手名、卡片标题、轨迹步骤名 |
| 11px | 15 | 分组、会话行、tab、事项行、输入文字 |
| 10px | 9 | 顶栏操作、命令条标题、变更标题、状态行 |
| 9px | 20 | 计划行、折叠标题、工具描述、kbd、底栏工具 |
| 8px | 21 | 时间、徽标、轨迹时间、耗时、副文 |
| 7px | 9 | HARNESS 徽标、验证行、示例标、footer-meta |
| 6px | 4 | RUNNING 徽标、子 Agent 点阵、底栏状态（≤680 更小） |

**关键事实：106 条字号声明中 54 条 ≤9px（51%）**。参考稿的「终端工具感」有一半来自这套 6–9px 微字 + 大写 mono 标签，而不是颜色。

### 4.3 等宽字体的使用场景（31 处）

- 身份/编号类：品牌字标、HARNESS 徽标、kbd、导航计数、会话时间、路径面包屑、标签计数、模型标识、助手时间。
- 状态/指标类：执行计时 `09:56`、验证摘要 `57/57`、工具耗时、`+102/−69`、底栏 `9 turns · 347 steps · 229 tok/s`、上下文 `44%`。
- 元信息类：`DESIGN PREVIEW`、`EXECUTION TRACE`、`RUNNING · DEMO`、`HARNESS / PREVIEW`、`WORKSPACES`、`LOCAL`。
- 符号类：`❯` 提示符、`⌘` 工具调用前缀、各 step 标签（`READ`/`EDIT`/`BASH`/`CHECK`）。

→ 结论：**mono 只用于「机器事实」，从不用于正文**；正文一律 sans。这条规则在 Cluade 里应保留。

### 4.4 字重、行高、字距

- 字重只有 4 档：`400`（默认，绝大多数）、`500`（卡片标题/命令条标题/轨迹步骤/选项）、`550`（会话标题 h1）、`600`（品牌字标、助手名、h2）。
- 行高：正文 `1.8–1.9`（气泡 1.9、输入 1.8、抽屉 1.8–1.9）；紧凑行用无单位 `1`（新建按钮 ＋、图标）。
- 字距：`letter-spacing:-1.3px`（22px 品牌）、`+0.5–1px`（7–9px 大写 mono 小标）。大字负字距 + 小字正字距，是这套排版「密度感」的来源。

---

## 5. 组件样式（关键值）

| 组件 | 选择器 | 关键样式值 |
| --- | --- | --- |
| 基础按钮 | `button` | `padding:7px 9px; border-radius:5px; border:0; background:none`；hover `background:#EAE1D4`；`focus-visible` `outline:2px solid var(--accent); outline-offset:3px` |
| 新建会话 | `.new-session` | `padding:10px 12px`，底 `#FAF6EF`，边 `1px #DDCDBB`，`box-shadow:0 1px 2px #66402005`，字 `#765139` 12px，`gap:9px`，kbd 靠右 9px `#B4A08B` |
| 导航项 | `nav button` | `width:100%; padding:10px; gap:11px`，12px `#7E6E5E`，图标 16px `#99836A`，计数 9px mono `#AA9780` |
| 搜索框 | `#session-search` | `padding:8px`，`border:1px solid #D6C8B7`，`background:#FAF5EC`，`border-radius:4px`，字 `#66503F` |
| 会话行 | `.session` | `padding:10px 9px 10px 27px`，11px `#877560`，时间 8px mono `#B2A28D`；选中 `background:#E6D7C7; color:#7F482D; padding-left:10px`；运行点 6px（`border:1px #B46C45; background:#C78760`） |
| 用户气泡 | `.user-message` | `margin-left:100px`（900→35，680→18），`background:#F0E7DA`，`border:1px solid #E8D9C6`，`border-radius:9px 9px 2px 9px`，`padding:15px 20px`，`color:#6D5540` 12px `line-height:1.9`；内行内代码 `#A45B37` on `#E7D6C1`，10px，`padding:2px 5px; border-radius:3px` |
| 助手头 | `.assistant-heading` | `margin:26px 0 13px; gap:9px`，12px `600` `#74513A`，logo `24×20`，模型标 7px mono `#B39C82`，时间 8px mono 靠右 `#B9AA98` |
| 执行计划 | `.plan` | 9px `#A38C71`，`gap:11px`；阶段连接线 `1px×17px` `#E1D7C7`；完成 `#9A9071`；当前 `#B2633C` |
| 执行卡片 | `.run-card` | `border:1px solid #DFD0BC; border-radius:7px; background:#FFFCF6; box-shadow:0 3px 10px #7C532303; overflow:hidden` |
| 卡片头 | `.run-card-heading` | `padding:16px 18px 13px`；运行点 7px `#BE754C` + `box-shadow:0 0 0 3px #F2E4D3`；标题 11px 500 `#866044`；徽标 6px mono `#AD7B50` on `#F4E7D6`，`padding:4px 6px; border-radius:3px`；计时 9px mono `#B39776` |
| 进度条 | `.progress-track` | 槽 `height:2px; background:#EFE5D7; margin:0 18px`；填充 `width:84%; background:#C68B61` |
| 完成事项 | `.task-summary>div` | `gap:9px`，10px `#8B775E`，`margin:10px 0`；勾 `13px` 圆 `#E9EBDE`/`#8C9770`；标签 7px mono `#C0AA8F` |
| 验证摘要 | `.verification` | 8px mono `#8D9673`，`gap:17px`，`padding:10px 18px 15px`；`示例结果` 7px `#B7A48C` |
| 折叠区 | `details` / `summary` | `border-top:1px solid #ECE2D3`；`summary{padding:12px 18px; color:#AA967B; font-size:9px}`，右侧步数 8px mono `#BDA98C`；原生 `<details>`，默认关闭 |
| 工具列表 | `.tool-list>div` | `border-top:1px solid #F0E8DD; padding:9px 0; gap:12px`；标签宽 36px 7px mono `#B48D67`；描述 9px `#A08A6F`；通过数 8px `#879366`；耗时 8px mono `#BEAD94` |
| 当前命令条 | `.active-command` | `background:#F5ECDF; border-top:1px solid #EADCC8; padding:14px 18px; gap:11px`；`❯` 17px mono `#B97749`；标题 10px 500 `#936342`；命令 8px `#B39573`；省略点 `letter-spacing:3px` `#BB885D` |
| 变更条 | `.artifact-strip` | `padding:13px 0; border-bottom:1px solid #EAE1D4; gap:10px`；图标 19px `#B99A76`；标题 10px `#8C7154`；摘要 8px `#B39E81`；Review 按钮 `border:1px #E3D5C3; background:#FBF7EF; color:#9C7B56; 9px mono; padding:7px 9px` |
| 状态行 | `.live-status` | 10px `#B16E45`，logo `15×14`；副文 8px `#B7A185`；按钮 8px `#B49B7C` |
| 输入框 | `.composer` | 见 §2.1；聚焦时 `border-color:#C38B62; box-shadow:0 0 0 2px #BC79530A`；`textarea{font-size:11px; line-height:1.8; min-height:42px; color:#77583E}`，placeholder `#BAAA95` |
| 底栏工具 | `.composer-tools button` | 9px `#AA8E6C`，`padding:5px`；箭头 8px `#C3AC8E`；附件 `25×25` 圆 `#F1E8DB`；发送按钮 `29×29; border-radius:7px; background:var(--accent); color:#FFF6EA`，hover `#A55332` |
| 底栏统计 | `.footer-meta` | `margin:10px 8px 0`，7px mono `#B7A58D`，`gap:12px`；状态点 4px `#BE885E`；上下文条 `20×4; border-radius:2px; linear-gradient(to right,#B9926A 44%,#E8DFD1 44%)` |
| 抽屉 | `#drawer` | 见 §2.1；`h2{font-size:18px; font-weight:500; color:#755133; margin:20px 0 8px}`；`p{11px; line-height:1.9; color:#AB9276}`；行 `padding:15px 0; border-bottom:1px solid #E9DCC9; color:#8F6E4E`；行副文 9px mono `#BAA184`；选项 `border:1px solid #E6D7C3; padding:12px; margin:10px 0; color:#9A704D` |
| Toast | `#toast` | `bottom:25px` 居中；`background:#6F4D34; color:#FFF4E5; border-radius:6px; padding:12px 20px; font-size:11px`；`opacity:0` ↔ `.visible{opacity:1}`，JS 2400ms 后移除 |
| 轨迹 | `.trace` | `border-left:1px solid #D8C3A9; margin-left:6px; padding:0 0 25px 22px`；伪元素节点 `7×7` `#BE8C60`（`left:-4px; top:4px`）；步骤名 12px 500 `#8C6441`；时间 9px mono `#B89E7D`；描述 11px `#AD9576` |
| 新消息 | `.new-user` / `.new-answer` | `.new-user{background:#F1E6D7; border-radius:8px; padding:14px 18px; margin:20px 0 12px 70px; 12px/1.9; white-space:pre-wrap}`；`.new-answer{color:#9C7B57; 11px; line-height:1.9; padding:12px 0}` |

**统一观察**：所有卡片/容器都是 `1px 实线边 + 圆角 + 极淡暖阴影`，没有一处渐变（全文件唯一的 `linear-gradient` 是上下文进度条），没有高饱和色块。这套「细边 + 淡影」在 DSH 里对应的正是 `--dsw-elevation-*` / `--dsw-alias-border-*` 两个族。

---

## 6. 交互与状态

| 交互 | 实现方式（证据） | 关键值 |
| --- | --- | --- |
| Chat / Trajectory 切换 | `[data-view]` 点击 → 切换 `.active`/`aria-selected`，切换 `#chat-view` / `#trajectory-view` 的 `hidden` | 不改变会话内容；轨迹由 5 条 `steps` 数据渲染成 `.trace` |
| 工具调用折叠 | 原生 `<details id="tool-details">` + `<summary>`，默认关闭；`#show-log` 点击 `details.open = !open` 并 `scrollIntoView` | 无需 JS 状态；键盘可展开 |
| 运行 / 停止 | `isRunning` 驱动：运行中按钮显示 `■`（`aria-label="停止模拟运行"`），点击 `stop()` → 文案 `已停止模拟运行`、徽标 `STOPPED · DEMO`、状态行 `已停止`、底栏 `Ready for your next task`；否则显示 `↑` 并走 1100ms 模拟回复 | 按钮尺寸不变（29×29），只换字形与底色语义 |
| 停止后的输入 | 运行中按 Enter 会 toast「请先停止当前模拟运行，再发送消息」；非运行态 Enter 发送、Shift+Enter 换行 | 键位规则写死在 `#prompt.onkeydown` |
| 抽屉 | `drawer(title, body)` 直接 `innerHTML` 注入；`×` 关闭；`Escape` 全局关闭 | `z-index:5`，无遮罩、无焦点锁定（design-spec 自述「抽屉焦点锁定仍需后续实现」） |
| 抽屉内容 | 变更 10 个文件（含 `+8 −18` 等）、Agent team 3 条、Background jobs 5 条、会话信息、账户、访问模式/模型/推理强度三组 picker | 每个 picker 选中后只改按钮文字 + `⌄` |
| 搜索过滤 | `#search-toggle` 展开 `#session-search`；`oninput` 用 `textContent.includes()` 过滤 `.session` | 大小写不敏感，命中即显示；不索引分组/folder |
| 会话切换 | `selectSession`：更新标题、`.selected`、把 `#chat-view` 除 `#new-messages` 外全部 `hidden`，再插新的 New context 标题 | 切走再切回会重新渲染 |
| 新建会话 | 动态 append `.session` 按钮 + `selectSession`；快捷键 `⌘/Ctrl + N`（`keydown` 里 `preventDefault`） | 会话时间写死 `now` |
| 添加工作区 | 抽屉内输入名 → append `.folder` | 仅页面状态 |
| 收起侧栏 | `body.classList.add('collapse-sidebar')` → `aside{display:none}; main{margin-left:0}`，顶栏 `◨` 出现 | 无动画 |
| 附件 | `#attach` 触发隐藏 `file-input`；只把文件名写进 `#attachment` 并 toast「不会上传」 | 纯演示 |
| 页面恢复 | 全部状态在内存，刷新复原 | README 明示不持久化 |

**状态矩阵**：`running`（■、动态点、RUNNING·DEMO、Agent is working）/ `stopped`（↑、STOPPED·DEMO、Ready for your next task）/ `selected session`（`#E6D7C7` 底 + `#7F482D` 字 + 6px 点）/ `active tab`（`#A45131` 字 + 2px `#BE6844` 下划线）/ `focus`（2px `#BE6844` outline，offset 3px）。这 5 组状态全部只靠「颜色 + 字形 + 1–2px 几何」表达，没有图标资源。

---

## 7. 与真实 DSH Web GUI 的还原边界（本文最重要的一节）

### 7.1 DSH 主题层的实际机制（本机证据）

| 事实 | 证据来源 |
| --- | --- |
| 主题 = 一组 CSS 自定义属性覆写，按 `{light, dark}` 成对提供 | `dsh-client-ui-theme/lib/client.js` 的 `validateOverrides()`：裸字符串抛 `TypeError("… is a bare string — pass { light, … dark: … }…")`；缺一档抛 `TypeError("… must map to a { light, dark } pair of strings")` |
| 官方 token 目录只有 **14 项**，且全部是颜色 | `BUILTIN_INSPECT_TOKENS`（`lib/client.js`）：14 项，`valueType` 全为 `"CSS color"`，`requiresLightAndDark` 全为 `true` |
| 14 项清单 | `--dsw-alias-bg-base`、`bg-layer-1`、`bg-layer-2`、`bg-overlay`、`border-l1`、`border-l2`、`brand-primary`、`label-primary`、`label-secondary`、`state-error-primary`、`state-idle-primary`、`state-success-primary`、`state-warn-primary`、`--dsw-specific-sidebar-fill` |
| 侧栏只有 1 个被官方承认的 token | `--dsw-specific-sidebar-fill`，描述 "Sidebar column and title-row background." |
| 覆写层是 alias 层 | `ThemeDefinition.tokens` 注释："Alias-layer overrides applied as inline CSS variables over the base palette"；README："third-party themes register alias-token overrides through `ctx.theme`" |
| 任意 `--dsw-*` 名字都可以作为 override-only token 传入，并会出现在 `listTokens` 里 | `exportInspectTokens()` 会为注册层/覆写层里的新名字生成 `dynamicToken(name)`（`valueType: "CSS value"`、`requiresLightAndDark: true`） |
| token 总量与分层 | 全量 `--dsw-*` 名称 403 个：`font-*` 182、`alias-*` 107、`static-*` 77、`specific-*` 11、`radius-*` 6、`elevation-*` 5、`shadow-*` 4、`gradient-*` 3、`focus-*` 2、`linear-*`（思考态渐变）2、`corner-shape` 1、`mask-*` 1 |
| 官方语义分层：静态色板 → alias 语义 → specific 具体场景 | `lib/client.js` 的 `body{--dsw-alias-bg-base:var(--dsw-static-neutral-bluish-00); …}`：alias 全部由 static 派生，specific 再覆写具体组件 |
| DSH 默认是冷白基调 | `--dsw-static-neutral-bluish-00` ≈ 冷白；`--dsw-specific-sidebar-fill:var(--dsw-static-neutral-bluish-50)`；focus ring 默认蓝 `#4176E6`/`#7AAAFF`（README「Focus」段） |
| UI 类名是哈希生成的（`.bVCLcG_row`、`.bVCLcG_stepper`、`.bVCLcG_arrow` 等） | `lib/client.js` 内联样式表 |

### 7.2 参考稿中「token 层做不到」的 8 类特征

> 以下每条都是「参考稿里真实存在」+「DSH token 机制限制」的组合，不含对 UI 实现的推测。近似方案给到可直接落地的 token 名。

| # | 参考稿特征（证据） | 为什么 token 做不到 | 可行的近似 |
| --- | --- | --- | --- |
| 1 | **布局几何**：侧栏 252/224、顶栏 62/55、标签栏 44、正文 870/990、输入 950/1070、抽屉 350、`padding:27px 40px`、`margin-left:100px` 等 | 官方目录 14 项全是颜色；`radius/shadow/font` 虽存在但不在目录；**没有任何尺寸 token**。主题覆写只能改 CSS 变量，不能改布局规则 | 放弃逐像素复原，只保留「侧栏窄 + 正文窄栏 + 输入更宽」的比例观感；由 DSH 自身布局决定 |
| 2 | **微排版**：6px(4)/7px(9)/8px(21)/9px(20)，共 54 条 ≤9px 声明；`letter-spacing:.5–1px` 的大写 mono 小标 | DSH 字号是**用户设置**（正文 10–22px、代码 10–16px、终端 10–20px），且 README 明确「small text keeps a fixed size」；字号 token（`--dsw-font-*-11/12/13/14…`）属全局排版，改它会连带所有组件，且用户步进器一调就冲突 | 保留 mono 字体角色与「大写 + 字距」的写法，但字号不得低于 11px；`label-caption` 承担 8–9px 的职责 |
| 3 | **圆角**：3/4/5/6/7/8/9/10 共 9 档 + `50%`，气泡还是 `9px 9px 2px 9px` 四角不等 | `--dsw-radius-xs/sm/md/lg/xl/panel` 是 4/8/12/16/20/28 的 6 档全局阶梯；且 `--dsw-corner-shape: superellipse(1.5)` 让圆角呈超椭圆而非圆形圆角。单值 token 无法表达「按组件不同 + 单角不同」 | 用 override-only 方式压整条半径阶梯（如 3/5/7/10/12/16），并评估 `--dsw-corner-shape` 是否可改；单角气泡圆角只能由组件自身决定（主题层放弃） |
| 4 | **暖色低透明阴影**：`0 3px 10px #7C532303`（1.2%）、`0 4px 22px #88603E07`（2.7%）、`-15px 0 60px #7C53231A`（10%）；每处偏移/模糊都不同 | `--dsw-shadow-lv1..3` / `--dsw-elevation-*` 是**固定的组合**（stroke + 黑色 alpha 3–8%），且不在官方目录；每个组件引用哪一档由组件决定 | 覆写 3 档 shadow/elevation 为暖色版本，接受「所有浮层同一档」；`#F2E4D3` 状态光环无对应 token，放弃 |
| 5 | **DOM 结构件**：mac 三色窗口控制（`#C89379/#D0C6B9` 10px 圆）、tab 的 2px 下划线伪元素、`◧/◨` 折叠按钮、`.progress-track>span{width:84%}`、`.context-meter` 44% 渐变、无遮罩抽屉 | 这些是元素与伪元素，不是颜色；主题覆写只改变量值，不产生/隐藏 DOM | 只做颜色对齐（下划线→`brand-primary`；进度/上下文条本身已存在则自然继承）；结构差异接受 |
| 6 | **图标即文字**：`＋ ⌘ ⑂ ◷ ⌕ ◧ ◨ ▱ ▤ ♧ ◌ ● ❯ ■ ↑ × ⌄ ✓ − ↗ …`（HTML 内 20+ 处） | 不是颜色，也不是 DSH 的图标体系；DSH 用组件图标 + `--dsw-alias-menu-icon` 等 | 主题层完全不介入；若要「终端感」应改插件自带图标资源（`icon.svg`），而非 token |
| 7 | **数据驱动的尺寸**：`+102 / −69`、`84%`、`44% context`、`347 steps`、`9 turns`、`229 tok/s`、`87.9M tokens`、`99% cache`、`57/57`、`42 skills`、`12 steps`、`09:56`、`3 subagents`、`5 background jobs` | 这些是真实运行时数据的渲染结果；token 只有颜色，不控制数字长度、条宽、间距 | 颜色上让数字用 `label-secondary`/`label-caption`、正负用 success/error 族；宽度/文案交给真实数据 |
| 8 | **参考稿只覆盖了一小部分 DSH 表面**：完全没有菜单、设置卡、代码块/语法高亮、终端、登录/引导、工具提示、滚动条、文件 diff gutter、模态框等；而这些在 DSH 里有专门 token（`--dsw-alias-menu-*`、`settings-card-fill/stroke`、`markdown-code-block`、`shiki` 语法色、`tooltip-*`、`scrollbar-*`、`file-diff-*`、`bg-mask-*`、`onboarding-*`） | 参考稿没有任何证据可以推导这些值 | 必须**自行推导**一套与暖纸基调协调的值（见 §8.1 的补充行），并明确标注「无参考稿依据」 |

### 7.3 「参考稿特征 → DSH token 类别」速查

| 参考稿特征 | 应映射的 token 类别 | 具体 token（官方目录内标 ★） |
| --- | --- | --- |
| 暖纸画布 `#FCFAF6` | 背景基础层 | ★`--dsw-alias-bg-base` |
| 纸白卡片 `#FFFDF9`/`#FFFCF6` | 抬升表面（层 1） | ★`--dsw-alias-bg-layer-1` |
| 条带/嵌套底 `#F5ECDF` | 次级表面（层 2） | ★`--dsw-alias-bg-layer-2` |
| 抽屉 `#FFFAF2` | 浮层/覆盖 | ★`--dsw-alias-bg-overlay` |
| 侧栏 `#F0ECE4` | 侧栏专属 | ★`--dsw-specific-sidebar-fill` |
| 侧栏悬停/选中 `#EAE1D4`/`#E6D7C7` | 侧栏导航状态 | `--dsw-specific-sidebar-nav-item-hover` / `-active` / `-active-accent` |
| 细暖分隔线 | 边框层级 l1/l2 | ★`--dsw-alias-border-l1`、★`l2` |
| 输入/控件边、聚焦边 | 边框层级 l3/l4 | `--dsw-alias-border-l3`、`l4` |
| 5 级文字层级 | label 层级 | ★`label-primary`、★`label-secondary`、`label-tertiary`、`label-caption`、`label-dimmed` |
| 陶土强调 `#BE6844`/`#A55332` | 品牌 + 业务态 + 聚焦环 | ★`--dsw-alias-brand-primary`、`state-business-primary`、`--dsw-focus-ring-color` |
| 用户气泡 `#F0E7DA` | 消息气泡 | `--dsw-specific-bubble`（+`-highlight`） |
| 输入框 `#FFFDF8` | 输入模组 | `--dsw-specific-input-major` |
| 悬停填充 `#EAE1D4` | 交互层 | `--dsw-alias-interactive-bg-hover`（+`-accent`、`-active`、`-hover-solid`） |
| 运行/停止按钮 `#BE6844`/`#A55332` | 主按钮 | `--dsw-alias-button-primary-fill` / `-hover` / `-primary-dimmed` |
| 橄榄成功 `#8D9673` | 状态成功 | ★`state-success-primary`（+`-secondary`/`-tertiary`） |
| 砖红删除 `#BB8C72` | 错误态 / diff | ★`state-error-primary`、`--dsw-alias-code-diff-deleted` |
| 变更条 `+102/−69` | 代码 diff 填充 | `--dsw-alias-code-diff-added`、`file-diff-*-bg/gutter/marker` |
| Toast `#6F4D34`/`#FFF4E5` | Toast 对 | `--dsw-alias-toast-bg` / `toast-label` |
| 行内代码 `#E7D6C1`/`#A45B37` | Markdown | `--dsw-alias-markdown-inline-code`（文字走 label） |
| 计划/状态小标 `#B2633C` | 进行中/警示 | ★`state-warn-primary`、`state-idle-primary` |
| 微字（6–9px） | 排版 | 不给 token：`--dsw-font-xxxs-11` 已是最小档，且属用户设置 |
| 圆角 3–10px | radius 阶梯 | `--dsw-radius-*`（override-only） |
| 暖阴影 | elevation/shadow | `--dsw-shadow-lv1..3`、`--dsw-elevation-*`（override-only） |

---

## 8. Cluade 的 token 映射建议

> **实现采纳情况（Lead 补注，2026-10-28）**：本节是建议稿，实装见 `design/palette.json` 与 `design/design-spec.md`。差异与理由：
> 1. **tertiary 已按建议压到 ≥4.5:1**：实装 `#6E6558`（5.22:1，门槛 4.5）；caption 取 `#857B6C`（3.79:1，门槛 3.5），仍低于 4.5 但只用于极小号元信息。初版曾保留 4.42/3.00 的浅层级，收到「侧栏面板行整体偏淡」的反馈后把主文字、次要文字、画布与边框整体加深，见 `design-spec.md` §5 迭代记录。
> 2. **品牌填充用 `#B05C3A`**（hover `#9C4E2F`）：比本节建议的 `#A55332` 略亮，按钮文字仍有 4.66:1；`#A55332` 用于 link 文本（5.19:1）。
> 3. **补充覆盖**了本节未列出的 `--dsw-menu-surface-fill`（MenuSurface 共享材质）与 11 个 `--shiki-*` 语法/映射变量。
> 4. **深色**采用 §8.2 的方向（暖炭底 + 提亮陶土），并把正文对比度提高到 ≥7:1。
> 5. 实装共 168 个 token：14 个官方文档化颜色 token 全覆盖 + 154 个 override-only（其中 40 个是本主题自用的 `--cluade-*` 变量，供选中项、思维链区块与 Markdown 皮肤的样式补丁消费）。

### 8.1 浅色（可直接作为实现初值）

| DSH token | 建议值 | 参考稿出处 | 说明 / 对比度 |
| --- | --- | --- | --- |
| ★`--dsw-alias-bg-base` | `#FCFAF6` | `--bg` | 画布；label-primary 在其上 11.95:1 |
| ★`--dsw-alias-bg-layer-1` | `#FFFDF9` | `--surface` / `.run-card #FFFCF6` | 卡片、面板 |
| ★`--dsw-alias-bg-layer-2` | `#F5ECDF` | `.active-command` | 嵌套条带/次级表面 |
| ★`--dsw-alias-bg-overlay` | `#FFFAF2` | `#drawer` | 浮层、抽屉 |
| ★`--dsw-alias-border-l1` | `#EDE5DA` | `#E9E2D8`/`#ECE2D3`/`#F0E8DD` | 最细分隔 |
| ★`--dsw-alias-border-l2` | `#E1D9CC` | `aside` | 结构性边框 |
| `--dsw-alias-border-l3` | `#D9C6B0` | `.composer` | 输入/控件边 |
| `--dsw-alias-border-l4` | `#C38B62` | `.composer:focus-within` | 强调/聚焦边 |
| ★`--dsw-alias-label-primary` | `#39332D` | `--ink` | 11.95:1 |
| ★`--dsw-alias-label-secondary` | `#6E5D4B` | `#76624E`/`#6D5540` 折中 | 6.05:1 |
| `--dsw-alias-label-tertiary` | `#776B5D` | `--muted #9B9185` 加深 | 4.98:1（原值仅 2.97） |
| `--dsw-alias-label-caption` | `#7A6D57` | `#B7A58D`/`#AA9D8C` 加深 | 4.85:1（原值 2.29/2.55） |
| `--dsw-alias-label-dimmed` | `#A69A8C` | `.muted`/`.chevron` | 2.64:1，仅禁用/装饰用 |
| ★`--dsw-alias-brand-primary` | `#BE6844` | `--accent` | 非文本 3.83:1（≥3 合规）；**当正文文字不达标** |
| `--dsw-alias-brand-text` / `--dsw-alias-link` | `#A55332` | `--accent-dark`/`.tab.active #A45131` | 5.19:1，文字/链接用这个 |
| ★`--dsw-specific-sidebar-fill` | `#F0ECE4` | `--sidebar` | 侧栏 |
| `--dsw-specific-sidebar-nav-item-hover` | `#EAE1D4` | `button:hover` | 悬停 |
| `--dsw-specific-sidebar-nav-item-active` | `#E6D7C7` | `.session.selected` | 选中底 |
| `--dsw-specific-sidebar-nav-item-active-accent` | `#C78760` | `.session-dot` 填充（边 `#B46C45`） | 选中强调 |
| `--dsw-specific-bubble` | `#F0E7DA` | `.user-message` | 用户气泡底 |
| `--dsw-specific-bubble-highlight` | `#E6D7C7` | `.session.selected` | 气泡内高亮/引用 |
| `--dsw-specific-input-major` | `#FFFDF8` | `.composer` | 输入框底 |
| `--dsw-alias-interactive-bg-hover` | `#EAE1D4` | `button:hover` | 通用悬停 |
| `--dsw-alias-interactive-bg-active` | `#E6D7C7` | `.session.selected` | 通用按下/选中 |
| `--dsw-alias-interactive-bg-hover-accent` | `#F4E7D6` | `.badge` underlay | 强调悬停 |
| `--dsw-alias-button-primary-fill` | `#A55332` | `--accent-dark` | 用深陶土做填充，按钮白字才 5.05:1 |
| `--dsw-alias-button-primary-hover` | `#8F4526` | `--accent-dark` 再深 | 悬停 |
| `--dsw-alias-button-primary-dimmed` | `#C78760` | `.session-dot` | 弱化/禁用 |
| ★`--dsw-alias-state-success-primary` | `#8D9673` | `.verification` | 填充 OK；文字用 `#6F7853`(4.61) |
| `--dsw-alias-state-success-secondary` | `#8C9770` | `.check-icon` 字 | — |
| `--dsw-alias-state-success-tertiary` | `#E9EBDE` | `.check-icon` 底 | — |
| ★`--dsw-alias-state-error-primary` | `#A8553A` | `.diff-delete #BB8C72` 加深 | 5.00:1（原值 2.83 不达标） |
| ★`--dsw-alias-state-warn-primary` | `#B2633C` | `.current` | 4.25:1 |
| ★`--dsw-alias-state-idle-primary` | `#A29380` | `.tab`/未激活 | 2.87:1，仅用于禁用/装饰 |
| `--dsw-alias-state-business-primary` | `#BE6844` | `--accent` | 业务强调/聚焦环基准 |
| `--dsw-focus-ring-color` | `#BE6844` | `outline:2px solid var(--accent)` | 参考稿 offset 3px，DSH 宽度 2px 由 `--dsw-focus-ring-width` 定 |
| `--dsw-alias-code-diff-added` | `#939C70` | `.diff-add` | 2.79:1，作填充不作文字 |
| `--dsw-alias-code-diff-deleted` | `#BB8C72` | `.diff-delete` | 2.83:1，同上 |
| `--dsw-alias-markdown-inline-code` | `#E7D6C1` | `.user-message code` 底 | 文字建议 `#8F4B2B`(4.61) |
| `--dsw-alias-markdown-code-block` | `#F5ECDF` | 无参考稿（代码块未出现） | 由 `.active-command` 底推导 |
| `--dsw-alias-toast-bg` | `#6F4D34` | `#toast` | 唯一有精确证据的一对 |
| `--dsw-alias-toast-label` | `#FFF4E5` | `#toast` | 6.93:1 |
| `--dsw-alias-tooltip-bg` | `#6F4D34` | 无参考稿 | 与 toast 同族，保证一致 |
| `--dsw-alias-label-primary-foreground` | `#FFF4E5` | 无参考稿 | 深底上的主文字（tooltip 等） |
| `--dsw-alias-scrollbar-bg-l1/l2` | `#EDE5DA` / `#E1D9CC` | 无参考稿 | 与边框同族 |
| `--dsw-alias-scrollbar-hover-l1/l2` | `#DDCDBB` / `#D0C6B9` | `.window-controls i` | — |
| `--dsw-alias-settings-card-fill/stroke` | `#FFFDF9` / `#E9E2D8` | 无参考稿 | 设置卡沿用表面/边 |
| `--dsw-menu-surface-fill` / `--dsw-specific-menu` | `rgba(255,253,249,.94)` / `#FFFCF6` | 无参考稿 | 参考稿菜单未出现，保持纸感 |

> 标注「无参考稿」的行是**推导值**，不是从参考稿抄来的；实现后需要目视校验。

> **边框的两种等价实现**：上表给的是「不透明纸色」（贴参考稿的实线观感）。另一种同样成立的做法是把 l1–l4 写成暖黑半透明，如 `rgba(57,48,39,.08)` / `.13` / `.18` / `.26`——好处是叠在选中、错误、深色等任何填充上都不会显脏，代价是失去参考稿「纸面压线」的实色感。两者都能达成本文的目标，按实现偏好二选。
>
> **强调色的两个档**：`#BE6844` 只适合非文本（描边、圆点、下划线、聚焦环，3.83:1 ≥ 非文本 3:1）；一旦该 token 被用作正文或按钮文字，必然不达标。文字/链接/按钮底统一走深档 `#A55332`（5.19:1，按钮白字 5.05:1）才是安全区间。

### 8.2 深色（参考稿不存在，属设计补全）

参考稿全文件 0 个深色定义，但 DSH 强制每 token 提供 `{light, dark}`。下面是一套与浅色同构的暖炭版本，建议作为起步值：

| token | 建议 dark 值 | 对比度（vs `#1B1714`） |
| --- | --- | --- |
| `bg-base` | `#1B1714`（暖炭，不是纯黑/冷黑） | — |
| `bg-layer-1` | `#241F1B` | label-primary 13.17 |
| `bg-layer-2` | `#2C2621` | — |
| `bg-overlay` | `#2A241F` | — |
| `specific-sidebar-fill` | `#211C18` | — |
| `sidebar-nav-item-hover` | `#2C2621` | — |
| `sidebar-nav-item-active` | `#3A2F26` | — |
| `sidebar-nav-item-active-accent` | `#C78760` | — |
| `border-l1` | `rgba(255,246,234,.10)` | — |
| `border-l2` | `rgba(255,246,234,.16)` | — |
| `label-primary` | `#EDE6DC` | 14.38 |
| `label-secondary` | `#CDBFAF` | 9.89 |
| `label-tertiary` | `#9C8E7E` | 5.58 |
| `label-caption` | `#8E8173` | 4.70 |
| `brand-primary` | `#D98A66` | 6.60 |
| `brand-text` / `link` | `#E2A181` | 8.18 |
| `specific-bubble` | `#332A22` | 气泡文字 `#E8DCCB` 10.39 |
| `specific-input-major` | `#241F1B` | — |
| `interactive-bg-hover` | `rgba(255,246,234,.06)` | — |
| `state-success-primary` | `#A9B389` | 8.05 |
| `state-error-primary` | `#E0A083` | 8.08 |
| `state-warn-primary` | `#DDA57F` | 8.28 |
| `state-idle-primary` | `#8B7E70` | 4.46 |
| `focus-ring-color` | `#D98A66` | — |
| `toast-bg` / `toast-label` | `#332A22` / `#F3EADF` | — |

要点：暖炭底（保留 20–30° 色相）比纯 `#000`/`#111` 更接近参考稿的纸感；陶土在深底上要提亮到 `#D98A66`（6.60:1），直接复用 `#BE6844` 只有 4.45:1（作强调不够亮）；浅色侧的 `#C78760` 在深底上是 5.99:1。

### 8.3 非颜色 token

| 类别 | 现状（DSH） | 建议 | 风险 |
| --- | --- | --- | --- |
| 圆角 | 6 档 4/8/12/16/20/28 + `superellipse(1.5)` | 压成 `3/5/7/10/12/16`；`--dsw-corner-shape` 若可覆写则试 `round` | 全局生效，菜单/对话框/设置卡都会变小圆角；超椭圆与参考稿的圆角形状不同，只能近似 |
| 阴影/高度 | `shadow-lv1..3`、`elevation-soft/panel/prominent` | 换成暖色：`0 1px 2px #66402008`、`0 3px 10px #7C53230A`、`0 8px 28px #7C532314`；dark 用黑 alpha 加深 | 各组件引用哪一档不可控；暖色阴影在深色态需另配 |
| 字号 | 用户设置（正文 10–22/代码 10–16/终端 10–20），排版 token `--dsw-font-*-11…24` | **不要覆写**：与用户步进器直接冲突，且会把 6–9px 的密度硬塞进 11px 体系 | 参考稿的「紧凑感」只能部分保留 |
| 字体族 | `--dsh-font-family-text/code` 为用户设置；品牌 `Montserrat` | 不覆写字体族；参考稿「mono 品牌字标」与 DSH `brand-font`（Montserrat）冲突，接受 DSH 自身品牌字体 | 与参考稿的品牌观感有差异 |

### 8.4 不要照搬的清单

1. **6–9px 微字**（54 处）：在 DSH 的可调字号体系里会变成不可读，且没有对应 token。
2. **低对比辅助色**：`#9B9185`(2.97)、`#B7A58D`(2.29)、`#BAAA95`(2.23)、`#AA967B`(2.79)、`#BB8C72`(2.83)、`#939C70`(2.79) —— 换成 §3.7 的加深版本。
3. **1.2% 透明度的暖阴影**：在 DSH 的 elevation 组合里会等于没有；提到 4–10%。
4. **演示标签**：`DESIGN PREVIEW`、`RUNNING · DEMO`、`示例结果`、`STOPPED · DEMO` —— 这是设计稿的「透明边界」声明，真实主题不应伪造状态。
5. **逐色复刻 160 个值**：归并到 §3.6 的约 30 个。
6. **mac 窗口控制三圆点、`◧/◨`、Unicode 图标**：属于台壳/图标资源，token 层不介入。
7. **无遮罩抽屉**：DSH 有完整的 `bg-mask-*` 族，主题不应把浮层做成没有遮罩。
8. **`9px 9px 2px 9px` 单角气泡圆角**：token 无法表达，除非组件自身已支持。

### 8.5 建议的实现顺序

1. 先落 **14 个官方 token**（覆盖 90% 的可见面积：画布/表面/侧栏/边框/文字/品牌/4 个状态）。
2. 再补 **specific 族**（sidebar 三态、bubble、bubble-highlight、input-major）——这些是「参考稿最像参考稿」的部分。
3. 再补 **label 第三/四级 + border l3/l4 + interactive 三态**，解决小字与控件边。
4. 再补 **button 三态 + markdown 行内代码 + code-diff**。
5. 再补 **toast/tooltip/scrollbar/settings/menu** 这些参考稿没有的族（保持一致即可，不求还原）。
6. 最后评估 **radius/shadow/corner-shape** 覆写（风险最高，单独提交、单独回滚）。
7. 每一轮都用 `Theme.listTokens` 检查 override-only token 是否出现，并目视核对 `label-tertiary` 在 12px 正文里的可读性。
8. 深色板在浅色定稿后再配（同 token 同名、只换值）。

---

## 附录 A：方法可复核命令

```sh
# 1) 展开压缩 CSS
sed 's/}/}\n/g' ui/style.css | sed 's/;/;\n/g'

# 2) 提取全部色值与使用选择器（按属性分组）
python3 - <<'PY'
import re
src=re.sub(r'\s+',' ',open('ui/style.css').read())
tok=re.split(r'([{}])',src); sel=''; stack=[]
for t in tok:
    if t=='{': stack.append(sel.strip()); sel=''
    elif t=='}':
        cur=stack.pop(); body=sel; sel=''
        for d in body.split(';'):
            if ':' in d:
                p,v=d.split(':',1)
                for c in re.findall(r'#[0-9a-fA-F]{6,8}\b',v):
                    print(cur.strip(),'|',p.strip(),'|',c)
        continue
    sel+=t
PY

# 3) 预览图真实格式
cp design/preview.png /tmp/preview.jpg && file /tmp/preview.jpg
# JPEG, JFIF 1.01, 940x860
```

## 附录 B：参考稿文件清单与体量

| 文件 | 字节 | 形态 |
| --- | --- | --- |
| `README.md` | 1554 | 可读多行 |
| `design/design-spec.md` | 3452 | 可读多行（50 行） |
| `design/tokens.json` | 623 | 单行 JSON（12 色 + 7 尺寸） |
| `design/preview.png` | 61618 | **JPEG 940×860**，扩展名错误 |
| `ui/index.html` | 8179 | 压缩单行 |
| `ui/style.css` | 16145 | 压缩单行 |
| `ui/app.js` | 9220 | 压缩单行 |
| `ui/assets/mark.svg` | 302 | 80×64，3 色像素鲸鱼 |

## 附录 C：证据强度说明

- **强证据（可逐条复核）**：全部颜色值、尺寸、选择器、交互分支——均来自 `ui/style.css`、`ui/index.html`、`ui/app.js` 原文。
- **强证据（DSH 侧）**：token 目录、双模强制、alias 层语义、类型哈希类名——来自本机 `@deepseek-ai/dsh-client-ui-theme@0.2.1-rc.3` 的 `lib/client.js` 与 `lib/types/client/index.d.ts`。
- **弱证据（已标注）**：深色板、无参考稿 token 的建议值（§8.1 中标注「无参考稿」的行、§8.2 全部、§8.3 的圆角/阴影）——这些是设计推导，不是参考稿事实，落地时必须目视复核。
