# Cluade · DeepSeek Harness 暖色主题

把参考设计稿 [Ember Desktop](/Users/temporary/source/workflow-skill/deepseek-harness-desktop) 的暖纸 + 陶土橙语言，落到真实的 DeepSeek Harness Web GUI 上：**浅色和深色两套内置色板都被重绘**，同时保留设置里的「浅色 / 深色 / 跟随系统」切换。

它不是一个静态设计稿，而是一个已安装、可运行的 DSH 插件（bundle）：浏览器侧通过 `ctx.theme.overrideTokens()` 叠一层 **168 个 token** 的覆盖层 + 组件级 CSS 补丁（含一套 Markdown 阅读皮肤）。用户的主题偏好不会被改写；停用或卸载插件，配色立即还原。

## 现在就能看到

本主题已经安装进当前 `desktop` profile（`plugin_manager install_bundle` → `application: applied`）。打开或刷新 DeepSeek Harness 窗口即可看到新配色；若左侧栏仍是灰色，说明页面还在用旧 bundle，按 `Cmd+R` 刷新一次页面（或重开窗口）。在「设置 → 通用 → 外观」里切到深色可以看到对应的暖色深色板。

停用/卸载：

```sh
dsh plugin --profile desktop remove dsh-theme-cluade
```

或在「设置 → 插件 → 已安装」里停用 `dsh-theme-cluade`。

## 设计要点

| 维度 | 浅色 | 深色 |
| --- | --- | --- |
| 画布底色 | `#F8F4EA` 暖纸 | `#1B1815` 暖炭 |
| 抬升表面 | `#FFFEFB` / `#F4EDE2` | `#221E1A` / `#2A241E` |
| 侧栏 | `#F0ECE4`，选中行 `#E6D8C6` | `#161311`，选中行 `#332C24` |
| 主文字 | `#2B2620` | `#F1EAE0` |
| 次要文字 | `#575044` | `#BDB2A2` |
| 强调 / 主按钮 | `#B05C3A` 陶土橙 | `#D97757` 亮陶土 |
| 用户气泡 | `#F0E7DA` 暖砂 | `#2E2721` |
| 成功 / 警告 / 错误 | 橄榄绿 `#6F7F54` / 琥珀 `#A8761F` / 砖红 `#B24A3A` | `#A6B487` / `#D8B26A` / `#E0826D` |
| 焦点环、链接 | 陶土橙（原为蓝色 `#4176E6`） | 亮陶土 |
| 选中项底色 | `#E7D7C7` 深陶土米 | `#413529` |
| 思维链输出区 | 底 `#F3E7D5` + 1px 描边 `#D3BC9C` | 底 `#241E18` + 描边 `#514537` |

> macOS 桌面版的侧栏列被官方样式用「原生 vibrancy + 冷色渐变」绘制（`[data-platform=darwin] …_sidebarCol`，暖色只占 39%–90%），纯 token 覆盖不到。主题因此内联了一条 darwin 限定的 CSS 补丁（[theme.css](theme.css)），把该列**不透明**重绘为暖色（浅色 `#F0ECE4` / 深色 `#161311`）；Web/Windows 不受影响。

设计取舍：

- **纸感优先**：三层表面都带暖度（`#F8F4EA → #FFFEFB → #F4EDE2`），而不是在纯白上刷橙色，避免廉价感。
- **强调色克制**：橙色只出现在品牌、主按钮、链接、焦点环与运行状态；大面积仍由暖中性色承担，长会话不刺眼。
- **边框用暖色半透明**（`rgba(57,48,39,0.10–0.29)`），叠在任何表面上都保持纸感，深色下改为暖白半透明。
- **对比度写入构建流程**：35 组 WCAG 检查（条目定义在 `design/palette.json` 的 `checks`，由 `node tools/gen-tokens.mjs` 执行）不达标直接构建失败。

## Markdown 阅读样式

聊天输出与侧栏 Markdown 文档预览共用同一套渲染器，所以 `markdown.css` 一次覆盖两边（`--cluade-md-*` 变量驱动明暗两套）：

- **正文**：比界面正文大 1px、行高 1.95，正文色 `#51473D`（暖棕），标题色 `#48382B`；
- **标题层级**：H1 32px/650、H2 25px/600 且带 1px 分隔线、H3 21、H4 18、H5 16、H6 14；间距按参考稿（H2 上 52px）；
- **链接**：陶土色 `#AA5533` + 下划线（浅陶土 `#DCB89B`，4px offset）；
- **代码块**：深色暖炭底 `#332C26` + 1px 描边 + 顶部信息条 `#3C3128`（语言/复制按钮），**未高亮的纯文本代码块也使用浅色文字**（流式中/未知语言不再出现深底深字）；语法色整套换成暖色（亮陶土关键字、橄榄字符串、琥珀参数）；行内代码是米色 chip `#F1E6D6` / 文字 `#93542C`；
- **引用块**：暖米底 `#F4EEE4` + 3px 陶土左边框 + 圆角；
- **表格**：外框圆角 + 表头暖底 `#F1E7D8`、斑马纹 `#FAF5EB`、悬停 `#F5EBDC`；
- **其它**：列表 marker 用暖棕、任务复选框陶土色、图片 8px 圆角、选中文本暖橘。

宽表格（`md-table-wide`）保留 DSH 的出血布局、不套外框（单元格/表头样式仍生效）；紧凑上下文（`_compact`，如工具卡片内预览）保持 DSH 默认排版，避免挤坏小空间。所有**非紧凑**的 Markdown 渲染实例都会套用这套皮肤（聊天正文、侧栏文档预览，以及压缩摘要、搜索结果等同样走该渲染器的位置）。

## 它改了什么

完整的 168 个 token 见 [`design/tokens.json`](design/tokens.json)，按用途分：

| 类别 | 覆盖的 token（节选） |
| --- | --- |
| 背景与表面 | `--dsw-alias-bg-base`、`bg-layer-1/2/3`、`bg-overlay`、`bg-module-platform`、`bg-multi-select`、各类 `bg-mask-*` |
| 边框 | `--dsw-alias-border-l1/l2/l3/l4`、`border-inverted*`、`border-l2-darkmode-thin` |
| 文字 | `--dsw-alias-label-primary/secondary/tertiary/caption/dimmed`、`label-primary-foreground/inverted/dimmed`、`label-shimmer`、`label-deep-diving*` |
| 品牌与按钮 | `--dsw-alias-brand-primary*`、`brand-text`、`button-primary-fill/hover/dimmed`、`button-ghost-*`、`button-floating-*`、`button-tool-bar-*` |
| 交互 | `--dsw-alias-interactive-bg-hover`、`hover-accent`、`hover-danger`、`hover-solid`、`active` |
| 状态 | `--dsw-alias-state-success/warn/error/idle/business-*` |
| 侧栏 | `--dsw-specific-sidebar-fill`、`sidebar-nav-item-active`、`-active-accent`、`sidebar-nav-item-hover` |
| 会话与输入 | `--dsw-specific-bubble`、`bubble-highlight`、`input-major`、`login-input`、`selector`、`tip` |
| 菜单与浮层 | `--dsw-menu-surface-fill`（MenuSurface 共享材质）、`--dsw-specific-menu`、`--dsw-alias-menu-icon`、`--dsw-alias-menu-group-header-fill`、`--dsw-alias-tooltip-bg`、`tooltip-key-bg`、`toast-bg`、`toast-label` |
| Markdown / 代码 | `--dsw-alias-markdown-code-block*`、`inline-code`、`citation`、`tag`、`placeholder`、9 个 `--shiki-token-*` 语法色 + `--shiki-foreground/background` 两个映射变量 |
| 差异视图 | `--dsw-alias-code-diff-*`、`file-diff-{added,deleted}-{bg,gutter,marker}` |
| 其它 | `--dsw-alias-scrollbar-*`、`bg-skeleton`、`switch-thumb`、`bg-document-selection`、`onboarding-*` |
| Markdown 皮肤（本主题自用变量） | `--cluade-md-text/heading/strong/link/...`、`--cluade-md-code-*`、`--cluade-md-table-*`、`--cluade-md-syn-*`，由 `markdown.css` 消费 |
| 选中 / 思考区（本主题自用变量） | `--cluade-selected-fill`（选中项底）、`--cluade-reasoning-fill` / `--cluade-reasoning-border`（思维链输出区底与描边），由 `theme.css` 的组件补丁消费 |

**关于这 168 个名字的可信度**：DSH 的 `Theme` 检查器只把 **14 个内置颜色 token** 作为官方文档化目录（`bg-base`、`bg-layer-1/2`、`bg-overlay`、`border-l1/l2`、`brand-primary`、`label-primary/secondary`、`state-error/idle/success/warn-primary`、`specific-sidebar-fill`），本主题 100% 覆盖它们；其余 154 个是 `overrideTokens` 接受的 override-only 名称（`--dsw-alias-*` / `--dsw-specific-*` / `--dsw-menu-surface-fill` / `--shiki-*`，以及 40 个本主题自用的 `--cluade-*` 变量：选中项、思维链区块、Markdown 皮肤），安装后会以 "dynamic token" 出现在 `Theme.listTokens` 里，属于**近似还原**而非官方承诺的稳定接口。DSH 升级若重命名某个 token，该 token 回落到官方配色，不会破坏渲染。完整证据见 [`design/reference-analysis.md`](design/reference-analysis.md) §7。

## 原理

```js
// client.js（生成文件；节选）
window.__ModuleLoader__.load({
  id: 'dsh-theme-cluade',
  factory() {
    const PATCH_CSS = `/* theme.css：darwin 侧栏材质补丁 */`
    return {
      inject: ['theme'],
      apply(ctx) {
        ctx.effect(() => {
          const disposeTokens = ctx.theme.overrideTokens('dsh-theme-cluade', TOKENS)
          const style = document.createElement('style')
          style.dataset.dshTheme = 'dsh-theme-cluade'
          style.textContent = PATCH_CSS
          document.head.append(style)
          return () => { disposeTokens(); style.remove() }
        }, 'dsh-theme-cluade: warm palette layer')
      },
    }
  },
})
```

- `TOKENS` 是 `{ token: { light, dark } }`，由 `design/palette.json` 生成。`overrideTokens` 在激活主题之上叠一层，**内置 light/dark/system 偏好仍然决定哪一套生效**，所以明暗切换、跟随系统、持久化行为全部保持原样。
- 选择 token 覆盖层而不是 `ctx.theme.register()`：第三方主题 id 不会出现在「设置 → 外观」的选择器里（该行固定为 浅色/深色/跟随系统），注册主题还需要替用户调用 `setTheme` 并覆盖其持久化偏好。覆盖层是 DSH 官方文档描述的三方主题扩展方式，卸载即还原。
- 除 token 外，`theme.css` 会内联进 client bundle：macOS 桌面壳把侧栏列画成「原生 vibrancy + 冷蓝紫渐变」，token 无法覆盖，因此补一条 `[data-platform=darwin] [class*='_sidebarCol']` 的暖色重绘规则（沿用 `--dsw-specific-sidebar-fill` 与深色变量）。
- `theme.css` 里还有两类**全平台生效**、只针对状态的补丁：选中项（菜单 `_selectedFill`、会话行 `_sessionRow._selected`、侧栏 `_panelRow._panelActive`、外观方块 `_themeCube._selected`）改用更深的橘色底；展开的思维链（`[data-variant='think'][data-expanded]`）加上明显描边 + 略深底色，并同步其 sticky 标题底色。
- 所有资源（token 层与样式补丁）都在同一个 `ctx.effect` 里注册并返回清理函数；页面 HMR 或插件卸载时一起移除。

## 文件

```
LICENSE                 MIT
package.json            bundle 清单（dsh.bundle / dsh.client 声明）
cordis.patch.yml        挂载点：插入 theme-cluade 行
index.js                Host 半边（无逻辑，只为成为合法 Cordis 插件）
client.js               生成文件：token 覆盖层 + 内联的侧栏补丁
theme.css               组件补丁源码（macOS 侧栏材质 / 选中项 / 思维链，生成时内联进 client.js）
markdown.css            Markdown 阅读皮肤（聊天输出与文档预览共用，生成时内联进 client.js）
locale/{en,zh}.json     插件管理器里的标题与描述
icon.svg                原始像素「C」图标
design/palette.json     调色板源文件（唯一的颜色真源）
design/tokens.json      生成结果：每个 token 的 light/dark 值
design/design-spec.md   设计规范（色板、映射、对比度、边界）
design/reference-analysis.md  参考稿拆解与 token 还原边界（另附）
design/verification.md  独立验证报告（另附）
tools/gen-tokens.mjs    生成 client.js + tokens.json，并跑 WCAG 闸门
tools/audit-theme.mjs   只读验收：清单/显示资源/运行时契约/token/组件补丁/Markdown 皮肤/对比度 61 项
tools/wcag.mjs          对比度计算
```

## 调色工作流

```sh
# 1. 改 design/palette.json 里的颜色
# 2. 重新生成，并检查对比度
node tools/gen-tokens.mjs
```

生成器会校验：light/dark 两个模式的颜色名必须对称、映射不得指向不存在的颜色、35 组对比度检查全部达标。改完后刷新页面（HMR 会加载新的 client bundle；若替换的是已安装包的代码，按 DSH 提示重启生效）。

## 与参考稿的关系

参考稿 `deepseek-harness-desktop` 是一份**静态设计稿**：它自带侧栏、标签栏、运行卡片、抽屉等完整 DOM 与交互演示。本主题不复制这套 DOM，而是在真实 GUI 上重绘配色，因此差异是预期内的：

- **能还原**：暖纸底色、纸白表面、暖边框层级、陶土橙强调与主按钮、低对比辅助文字、暖色用户气泡、暖色侧栏与选中行、暖中性色语法高亮。
- **只能近似**：参考稿的侧栏 252px、输入框圆角 10px、运行卡片布局等属于组件几何，token 层不改变 DSH 的布局与组件结构，这些保持 DSH 原样。唯一的几何改动是思维链展开块的 padding/margin/1px 边框/圆角（为了让"思维链输出"像参考稿那样成为一个区块）。
- **不改变**：字体（仍走系统字体与用户的字号/字体设置）、图标资源、组件交互。

## 兼容与限制

- 需要 DSH 0.2.x 的 Web 客户端；token 层只依赖 `@deepseek-ai/dsh-client-ui-theme` 提供的 `ctx.theme`。
- `theme.css` 的补丁耦合组件内部约定：macOS 侧栏用 `_sidebarCol` + `<html data-platform="darwin">`；选中项用 `_selectedFill` / `_sessionRow._selected` / `_searchResultRow._selected` / `_panelRow._panelActive` / `_themeCube._selected`；思维链用 `[data-variant='think'][data-expanded]` 与 `[data-disclosure-header]`。DSH 升级改名时对应补丁静默失效、退回官方样式，不破坏渲染；侧栏补丁只影响 macOS，选中/思维链补丁全平台生效。
- 不写配置、不发网络请求、不注册工具；卸载后配色立即恢复。
- 覆盖范围是语义 token（`--dsw-alias-*`、`--dsw-specific-*`、`--dsw-menu-surface-fill`、`--shiki-*`）。静态调色板（`--dsw-static-*`）与终端 ANSI 16 色不在覆盖范围；DSH 升级后新增的 token 会保持官方配色（属于降级容忍，不会破坏渲染）。
- 第三方 token 层不会出现在「设置 → 外观」的主题选择器里，这是 DSH 当前的扩展边界，不是本主题的缺陷。
- profile 的 `dependencies` 里还列有壁纸/侧栏/鲸鱼等纯 UI 插件，但它们当前不在活动 bundle 组合中，不影响本主题。若之后启用壁纸类插件：不透明壁纸会盖住画布底色，纸感只会在卡片、侧栏、菜单等表面体现；这类插件只改 DOM，本主题只覆盖 CSS 变量，二者不冲突（未在本机活动组合中实测）。

## 验证状态

- 安装结果：`application: applied`，`warnings: []`。
- 运行期证据：Client `Theme.listTokens` 已列出本插件注册的 168 个覆盖 token（14 个官方目录 + 154 个 override-only，如 `--dsw-specific-bubble`、`--dsw-menu-surface-fill`、`--cluade-md-text`、`--shiki-token-keyword`）；v1–v5 均通过页面热更新或刷新生效（新补丁若未出现，`Cmd+R` 一次即可）。
- 只读验收：`node tools/audit-theme.mjs` 61/61 通过（清单、显示资源、`ctx.effect` 运行时契约、token 形状、与 `design/tokens.json` 一致性、侧栏/选中/思考区/Markdown 补丁的插入清理与源码一致性、对比度复算）。
- 对比度：35 组检查全部通过（见 `node tools/gen-tokens.mjs` 输出；全表最低是 warning 状态色 3.62:1，门槛 3；**文字类**最低为 caption 3.79:1（门槛 3.5）与代码注释 3.87:1（门槛 3）；正文 13.65:1、侧栏面板行在补丁后的侧栏底上为 12.72:1（浅）/ 15.49:1（深））。
- 独立验证：由另一名 agent 按 task-3 复核，报告见 [`design/verification.md`](design/verification.md)。
- 未做逐像素截图核对（本会话没有浏览器截图权限），实际观感以当前窗口为准；如有偏差，改 `design/palette.json` 后重新生成即可。

## English

Cluade is a warm paper-and-terracotta theme layer for the DeepSeek Harness Web GUI. It registers 168 token overrides through `ctx.theme.overrideTokens()`, painting both the built-in light and dark palettes while leaving the user's light/dark/system preference untouched. Uninstalling the plugin restores the stock theme immediately. The palette lives in `design/palette.json`; `node tools/gen-tokens.mjs` regenerates `client.js` and `design/tokens.json` and runs 35 WCAG contrast checks.
