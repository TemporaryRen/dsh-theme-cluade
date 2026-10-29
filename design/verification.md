# Cluade 主题 · 独立验证报告

- 验证人：`theme-verifier`（独立于实现者 / Lead）
- 验证对象：`/Users/temporary/github/dsh-theme-cluade`（Cluade，`dsh-theme-cluade@0.1.0`），已安装进 `desktop` profile
- 验证时间：2026-10-28（Asia/Shanghai）
- 结论：**有条件通过**（详见 §10、§9）。实现可运行、仓库自检全绿、文档引用的对比度数字全部可复算；问题集中在：**1 个官方菜单材质 token 未覆盖（真实视觉风险）** + **15 处文档数字/表述与实测不符（6 中 / 9 低）**。
- 本次未修改任何实现/文档文件；唯一写入的文件是本报告。生成器、插件安装态、profile 均未触碰。

## 0. 被验证的文档版本（重要：验证期间文档被并发修改）

验证过程中 `README.md`（12:40:48，8707→10423 B，133→142 行）与 `design/design-spec.md`（12:40:35，8891→9114 B，141 行）被另一名成员修改**一次**。本报告的行号与结论均以修改后的当前版本为基准，并已对新增内容重新核对（新增部分见 §6 的第 23-25 行）。

| 文件 | 行数 | 字节 | SHA-1（前 40 位） |
|---|---|---|---|
| `README.md` | 142 | 10423 | `ea172aa8b3dac46f353083047dee86bb7f92239b` |
| `design/design-spec.md` | 141 | 9114 | `82bc7fc1191755acd63b33c3e86983cb6e5ab3f4` |
| `design/reference-analysis.md` | 683 | 59800 | `26e3eccb96a8adee443753af5274a78b5c899cb3` |
| `design/tokens.json` | 516 | 13491 | `5f48b2a12a7b1ee4e15c4faa027c2e5e8dd94a40` |
| `design/palette.json` | 383 | 11357 | `05a983c5455c6208fd1e1a89ba272ce618d095e5` |
| `client.js` | — | 11861 | `488d1e2a38880db66004de47eb56e63267f40143` |

> 若文档在交付前还会改动，请以本表 SHA-1 为准重新核对行号；实现文件（`client.js`/`tokens.json`/`palette.json`）自安装后未变。

> **复核（修复后）2026-10-28 12:51**：Lead 按本报告 H1 + M1–M6 + L1–L9 完成整改（修复批次 mtime 12:48–12:49）。下表是本复核的基线；§0 上表保留为 task-3 的修复前记录，§1–§12 是修复前结论，修复后的逐项复核见 §13。
>
> | 文件 | 行数 | 字节 | SHA-1 |
> |---|---|---|---|
> | `README.md` | 142 | 10753 | `3c9f820c0f06855b5389d4f39bdf5d0ec9aadf54` |
> | `design/design-spec.md` | 148 | 10630 | `d72a312f72c41e455febdc3c0dca4bd4ecba5f02` |
> | `design/reference-analysis.md` | 691 | 60846 | `c5ac2ec60dbc173f48daf7743ce69aab9782d8c2` |
> | `design/tokens.json` | 520 | 13608 | `8e5949f64b81b6ad991d0581ec24a52337472ca2` |
> | `design/palette.json` | 377 | 11121 | `99bacdf450fcddc52ea1c31a6900e7bfefc5aa8f` |
> | `client.js` | 162 | 11958 | `a797cf8c9360c8977dda28270c3fbc7d109ebf74` |
> | `tools/gen-tokens.mjs` | 294 | 10774 | `72f03b406dfaef79de9ac6de2e5205ea21cf1e4f` |
> | `tools/audit-theme.mjs` | — | 9948 | `f8b568091d65905601fd8b4ebce4196d690da642` |
> | `LICENSE`（新增） | 21 | 1082 | `3eeb47541c489d4ced1681983da24a2f1c3662c6` |

> **复核（v2 加深迭代）2026-10-28 13:36**：用户反馈「左侧全局面板行（Plugins / Loop Manager…）整体偏淡」后，Lead 做了 v2 加深（修复批次 mtime 13:35）。下表是 v2 复核基线；§0 更早两张表保留为历史，v2 的逐项复核见 §14。
>
> | 文件 | 行数 | 字节 | SHA-1 |
> |---|---|---|---|
> | `README.md` | 142 | 10856 | `31e32c822acaa253c785126fb00a8bc7a744b5a8` |
> | `design/design-spec.md` | 152 | 11191 | `8839f21da86b9fc655d302eab88b8b39aa9754c6` |
> | `design/reference-analysis.md` | 691 | 60895 | `a40297ce50dbd52f3d2c9c5c9c89d049367e09da` |
> | `design/tokens.json` | 520 | 13608 | `9512df4e5ca3b9cb1c8692e741058fbf41aeaa28` |
> | `design/palette.json` | 377 | 11123 | `288355baa73fcb7bcfc172cf0d6a6323039a5f06` |
> | `client.js` | 162 | 11958 | `3a47eefe06b81e7bd1ab8039d81736ee51af6a55` |
> | `tools/gen-tokens.mjs`（未变） | 294 | 10774 | `72f03b406dfaef79de9ac6de2e5205ea21cf1e4f` |
> | `tools/audit-theme.mjs` | 234 | 10036 | `04b9a9c903b7b1d07ca7dfac59a8fe5271aa4729` |
> | `LICENSE`（未变） | 21 | 1082 | `3eeb47541c489d4ced1681983da24a2f1c3662c6` |

> **复核（v3 macOS 侧栏补丁）2026-10-28 13:52**：用户二次反馈「左侧依旧是偏灰色背景」后，Lead 定位到 macOS 原生材质 + ui-layout 冷色渐变，新增 `theme.css` 并在生成时内联为 `PATCH_CSS`（修复批次 mtime 13:49–13:50）。下表为 v3 基线；§0 更早三张表保留为历史，v3 的逐项复核见 §15。
>
> | 文件 | 行数 | 字节 | SHA-1 |
> |---|---|---|---|
> | `README.md` | 146 | 11832 | `114fcfc1d9c646bc6d2a1d72e0233aeac9b943fb` |
> | `design/design-spec.md` | 153 | 12270 | `25f6186601b93cfdcc7b269efc7ea6c788ea8dbe` |
> | `design/reference-analysis.md`（未变） | 691 | 60895 | `a40297ce50dbd52f3d2c9c5c9c89d049367e09da` |
> | `design/tokens.json`（未变） | 520 | 13608 | `9512df4e5ca3b9cb1c8692e741058fbf41aeaa28` |
> | `design/palette.json`（未变） | 377 | 11123 | `288355baa73fcb7bcfc172cf0d6a6323039a5f06` |
> | `client.js` | 198 | 13719 | `32b93de2af654f2b0a6f876f13066e10265edff1` |
> | `theme.css`（新增） | 28 | 1362 | `f747f64526dbc606f49d04ee6ac8f6ad6fc1482b` |
> | `package.json` | 45 | 980 | `5c9416674e4e7b6c6f738fc9df795e7d7f706d0e` |
> | `tools/gen-tokens.mjs` | 305 | 11396 | `c8081771e52c3c0026b9618ddeb5cb277e2071db` |
> | `tools/audit-theme.mjs` | 260 | 10897 | `2bb2a90c8d1401609543cff698431202b0d362cd` |
> | `LICENSE`（未变） | 21 | 1082 | `3eeb47541c489d4ced1681983da24a2f1c3662c6` |

> **复核（v4 选中项 / 思维链补丁）2026-10-28 14:02**：用户第 4 轮反馈（① 选中项要更深橘色 ② 思维链输出区要"明显边框 + 略深底色"）后，Lead 新增 3 个自用变量与 theme.css 状态补丁（mtime 13:56–14:00）。**复核期间 14:00:54 Lead 又补了 `:focus-visible` 规则并重新生成**——下表是补规则后的最终基线（§16 按此版本核）；§0 更早四张表保留为历史。
>
> | 文件 | 行数 | 字节 | SHA-1 |
> |---|---|---|---|
> | `README.md` | 155 | 13469 | `de16bcd414dd888aafd3e8df6ebb3730dbd70397` |
> | `design/design-spec.md` | 168 | 14643 | `92a6ff8abcefc79689da83e0132870bc395cadc0` |
> | `design/reference-analysis.md` | 691 | 61046 | `9ebf6a0a26185c9dfec968fa1899d756c2164703` |
> | `design/tokens.json` | 532 | 13879 | `2f4d00dafa34a4c48ae15f62f39eb32d87ce4748` |
> | `design/palette.json` | 395 | 11579 | `6e1cc2a8db090052b82a505bd6084cdad9164d7b` |
> | `client.js` | 259 | 16891 | `5801c934b2ed0d73938d44317f0cd03095a4a2f7` |
> | `theme.css` | 86 | 4283 | `d0fcef893ee380ba5df29a1e315a851eb4ee9cbd` |
> | `package.json` | 45 | 980 | `0e5fe0ade02815142266787e0813f6f6c948bb45` |
> | `tools/gen-tokens.mjs` | 315 | 12002 | `7b8b89274aba51f6ab8863d6ae9f4f069eb03753` |
> | `tools/audit-theme.mjs` | 267 | 11477 | `ec360adead798b3552f84760a929b844e284c635` |
> | `LICENSE`（未变） | 21 | 1082 | `3eeb47541c489d4ced1681983da24a2f1c3662c6` |

> **复核（v5 Markdown 皮肤）2026-10-28 14:19**：用户第 5 轮要求「聊天输出 + 文档预览」按参考 `markdown-theme` 显示；Lead 新增 `markdown.css`（作用域 `body [class*='_markdown']:not([class*='_compact'])`）与 37 个 `--cluade-md-*` 变量（168 token / 35 门槛 / audit 61 / v0.4.0），并顺带把 v4 的 reasoningFill/Border 调深（#F3E7D5/#D3BC9C，§5 数字同步）。§0 更早五张表保留历史，v5 逐项见 §17。
>
> | 文件 | 行数 | 字节 | SHA-1 |
> |---|---|---|---|
> | `README.md` | 172 | 15595 | `9e6877bfdf5efa96883ced9a29df5fa3d6868759` |
> | `design/design-spec.md` | 198 | 18110 | `5a8713a370474713d587a492bffa1156260b9696` |
> | `design/reference-analysis.md` | 691 | 61105 | `671b3e9789feb0949686454dcfa1dfcb7f7ac89b` |
> | `design/tokens.json` | 680 | 17193 | `805c27356713b297875e25bbcf34df20fccaf2c9` |
> | `design/palette.json` | 523 | 15072 | `56def9c03b1fb43c57ca21883914ee7757acca41` |
> | `client.js` | 537 | 29384 | `3909e67661f1d5e89dffcac17958e365dc599467` |
> | `theme.css` | 96 | 4827 | `3e949a2a3abe815ddc932d5357bd6b16279241b3` |
> | `markdown.css`（新增） | 230 | 9360 | `a18938779f27726bc3f591e1895753bc24754ee4` |
> | `package.json` | 46 | 1000 | `d6addaaea6ebb599d9c196d7958956ea5657eed4` |
> | `tools/gen-tokens.mjs` | 355 | 13883 | `c1448ad6a46e9a47412f9ae12b03297b1d0ba5c9` |
> | `tools/audit-theme.mjs` | 280 | 12720 | `f7213495135ab31b0d200da87df44ed61d13ee94` |
> | `LICENSE`（未变） | 21 | 1082 | `3eeb47541c489d4ced1681983da24a2f1c3662c6` |

---

## 1. 方法与边界

### 1.1 实际执行的验证

| # | 项目 | 方法 | 结果 |
|---|---|---|---|
| 1 | 仓库自检 | `node tools/audit-theme.mjs`（Node v24.21.0） | 36/36，exit 0（§2） |
| 2 | token 集合比对 | 现场 `Theme.listTokens` 连续 5 次超时 → 改为**静态等效验证**：从已安装 `app.asar` 的官方 `@deepseek-ai/dsh-client-ui-theme@0.2.1-rc.3` 抽出 `BUILTIN_INSPECT_TOKENS` 与 `exportInspectTokens()`，按同一合并规则在沙箱执行 `client.js` 复算 | 0 缺失 / 0 多余（§3） |
| 3 | 对比度复算 | 自写 `/tmp` 脚本，用 `tools/wcag.mjs` 直接读 `design/tokens.json` 复算 | 23/23 门槛通过；46/46 文档引用值吻合（±0.006）（§4） |
| 4 | 显示资源 | locale JSON 解析 + 字段检查；`icon.svg` XML 解析、外链扫描、体积 | 通过（§5） |
| 5 | 文档一致性 | README / design-spec / reference-analysis 逐条对照实测值（含行号） | 15 处不符（§6、§9） |
| 6 | 盘外安装检查 | `$DSH_HOME/profiles/desktop/{package.json,cordis.patch.yml}`、`node_modules/dsh-theme-cluade` 链接、`.plugin-manager/logs`、`.dsh-market/state.json`、Host `Config.listConfigs`（全量 203 条） | 安装成立；另发现 3 个第三方插件未进活动组合（§7） |
| 7 | 风险分析 | 覆盖缺口 + 覆盖层写入方式（读安装版 `ui-layout` 实现） | 见 §8 |

### 1.2 明确未做 / 不可做（不是"跑通即通过"）

- **未做视觉/截图核对**：本会话无浏览器截图能力；暖纸观感、菜单底色、语法高亮、深浅切换均未肉眼验证。
- **`cordis_inspect_query`（platform client / provider Theme / method listTokens）连续 5 次 10 000 ms 超时**；client 侧 `Service.listService`、`Builtin.listBuiltins` 同样超时；`http://127.0.0.1:58042` 返回 HTTP 401（需认证会话）。**任务第 2 条的"现场 token 列表"没有直接证据**，只有 §3 的静态等效验证与安装版源码证据。
- 未安装 / 卸载 / 重启插件；未运行 `node tools/gen-tokens.mjs`（会回写 `client.js`、`design/tokens.json`）；未修改除本文件外的任何文件。
- 未验证 HMR（README:112 的刷新/重启说法）。
- 安装结果字符串 `application: applied` / `warnings: []` 无法事后复现（工具回执未落盘），只能验证其**结果**（§7）。

### 1.3 只读读取安装态产物

用 Node 自写只读解析器读取 `/Applications/DeepSeek Harness.app/Contents/Resources/app.asar`（182 MB，未改动应用本体），抽取以下文件到 `/tmp` 阅读：

- `/dsh/node_modules/@deepseek-ai/dsh-client-ui-theme/lib/client.js` → `/tmp/dsh-ui-theme-client.js`（120 815 B）
- `/dsh/node_modules/@deepseek-ai/dsh-client-ui-theme/README.zh.md` → `/tmp/ui-theme-README.zh.md`
- `/dsh/node_modules/@deepseek-ai/dsh-client-ui-layout/lib/client.js` → `/tmp/dsh-ui-layout-client.js`
- `/dsh/package.json`、`/dsh/desktop-runtime.json`（release 版本 **0.2.1-rc.3**）

---

## 2. 证据 1：仓库自检 `tools/audit-theme.mjs`

```sh
/Users/temporary/.dsh/dsh-runtimes/dsh-primary-runtime/dependencies/node/bin/node tools/audit-theme.mjs
```

输出摘要（完整 36 行逐条 `ok`）：

```
ok    package name is dsh-theme-cluade
ok    bundle patch declared and present
ok    client declaration targets the web platform
ok    exports expose client, locale, and icon
ok    files list ships every runtime artifact
ok    host half is a valid Cordis plugin
ok    locale/en.json has meta title and description
ok    locale/zh.json has meta title and description
ok    icon.svg is a small, self-contained SVG
ok    client entry registers itself with the module loader
ok    client plugin injects theme and exposes apply
ok    apply registers exactly one theme effect
ok    override layer is owned by the package id
ok    effect exposes a disposer that removes the layer
ok    token map covers the documented built-in surface
ok    every token is a light/dark string pair
ok    token count matches design/tokens.json
ok    shipped token values match design/tokens.json
ok    contrast ...（18 条 light/dark 配对）
36/36 checks passed
token count: 127
[exit: 0]
```

判定：**36/36 成立**，与 README:135（"36/36 通过"）一致。该脚本会在沙箱里真跑 `client.js`，因此它对"产物与 `design/tokens.json` 一致"有证明力。

---

## 3. 证据 2：token 集合比对（静态等效，含 14 个官方 token）

### 3.1 官方目录 = 14 项（已从安装版源码核实）

安装版 `@deepseek-ai/dsh-client-ui-theme@0.2.1-rc.3` 的 `lib/client.js`（asar 内，抽取副本 `/tmp/dsh-ui-theme-client.js:1531-1625`）的 `BUILTIN_INSPECT_TOKENS` **恰好 14 项，全部 `valueType: "CSS color"` / `requiresLightAndDark: true`**：

`bg-base`、`bg-layer-1`、`bg-layer-2`、`bg-overlay`、`border-l1`、`border-l2`、`brand-primary`、`label-primary`、`label-secondary`、`state-error-primary`、`state-idle-primary`、`state-success-primary`、`state-warn-primary`、`specific-sidebar-fill`（均带 `--dsw-` 前缀：13 个 `--dsw-alias-*` + 1 个 `--dsw-specific-sidebar-fill`）。

→ 与 `design/reference-analysis.md:14,455-457`、`README.md:59`、`design/design-spec.md:68` 的"14 项"清单**逐项一致**。

### 3.2 合并规则与"现场列表"的等价复算

安装版 `ThemeRuntime.exportInspectTokens()`（同一文件 `:1700-1706`）的规则：

```
BUILTIN_INSPECT_TOKENS ∪ 已注册主题 tokens ∪ 各 override 层 tokens（后两者用 dynamicToken(name) 生成描述）
```

按此规则在沙箱真实执行本仓库 `client.js`（不读 `design/tokens.json`），结果：

| 指标 | 值 |
|---|---|
| 官方目录 token | 14 |
| 本插件 override 层 token | **127** |
| 合并后（= 页面 `Theme.listTokens` 应有条目数） | **127**（14 个目录名全部被覆盖层命中，无新增名） |
| 其中真正 override-only（目录外） | **113** |
| 与 `design/tokens.json` 的 127 个名字比对 | 缺失 **0**，多余 **0** |
| 14 个官方 token 是否全在覆盖层 | **是（14/14）** |

脚本 `/tmp/verify-tokenset.mjs` 输出："simulated listTokens union size: 127 (builtin 14 + override-only 113)"。

另核对：安装版 ui-theme 的 8 张样式表共定义 **131** 个颜色类自定义属性（`--dsw-alias-*` 107、`--dsw-specific-*` 11、`--dsw-menu-*` 2、`--shiki-*` 11）。主题覆盖 **127/131**，且 **127 个名字全部真实存在于官方样式表**（没有臆造 token 名）。未覆盖的 4 个：

| 未覆盖 token | 说明 | 是否真实缺口 |
|---|---|---|
| `--dsw-alias-settings-card-fill` / `-stroke` | 派生别名：`= var(--dsw-alias-bg-layer-2)` / `var(--dsw-alias-border-l4)`（base.css） | 否，随已覆盖 token 自动变暖 |
| `--dsw-menu-backdrop-filter` | 模糊滤镜，非颜色 | 否 |
| `--dsw-menu-surface-fill` | **共享菜单材质颜色** | **是，真实缺口（§8.1）** |

### 3.3 结论

- 数量口径（127）**成立**；
- `README.md:59`（"14 个官方目录 + 其余 113 个 override-only"）与 `design-spec.md:68`（同一口径）**准确**；
- 但 `README.md:134` 仍写"127 个 override-only token"，与同文件第 59 行自相矛盾（§9-L1）；
- 现场 `listTokens` 未能直连（超时），上述 127 是按安装版源码规则推演的结果。

---

## 4. 证据 3：对比度独立复算（不信生成器结论）

脚本 `/tmp/verify-contrast.mjs`：调用 `tools/wcag.mjs` 的 `contrastRatio()`，**直接读 `design/tokens.json`**（以及 `palette.json` 的颜色对）复算，不调用生成器。

### 4.1 23 组门槛（全部重算，46 个模式值全过）

| 检查 | 浅色 | 深色 | 门槛 |
|---|---|---|---|
| label-primary on base | 11.95 | 14.41 | 7 |
| label-primary on raised surface | 12.35 | 13.50 | 7 |
| label-primary on nested surface | 11.17 | 12.50 | 7 |
| label-primary on sidebar | 10.58 | 15.08 | 7 |
| label-primary on selected session row | 9.06 | 11.22 | 7 |
| label-secondary on base | 5.74 | 7.73 | 4.5 |
| label-tertiary on base | 4.42 | 5.57 | 3 |
| label-caption on base | 3.00 | 3.75 | 2.6 |
| link on base | 5.19 | 6.74 | 4.5 |
| brand mark on base | 4.54 | 5.66 | 3 |
| composer send label on brand fill | 4.66 | 5.66 | 4.5 |
| brand wordmark on sidebar | 10.58 | 15.08 | 7 |
| menu icon on sidebar | 6.47 | 10.19 | 4.5 |
| user bubble text | 10.17 | 11.99 | 7 |
| success state on base | 4.16 | 8.00 | 3 |
| warning state on base | 3.82 | 8.83 | 3 |
| error state on base | 5.12 | 6.38 | 4 |
| code keyword | 5.00 | 7.13 | 4.5 |
| code string | 4.68 | 7.75 | 4.5 |
| code function | 5.11 | 8.59 | 4.5 |
| code parameter | 5.01 | 8.11 | 4.5 |
| code constant | 4.73 | 6.78 | 4.5 |
| code comment | 3.37 | 4.22 | 3 |

### 4.2 design-spec §5 引用的 23 组数字（46 个值）逐条比对

**全部吻合**（最大偏差 0.005，四舍五入）。示例：正文 on 画布 11.95/14.41 → 11.95/14.41；链接 5.19/6.74 → 5.19/6.74；按钮文字 on 主按钮 4.66/5.66 → 4.66/5.66；语法注释 3.37/4.22 → 3.37/4.22；success/warn/error 4.16/3.82/5.12、8.00/8.83/6.38 → 全中（脚本判定 `cited-pair mismatches: 0`）。

### 4.3 但"最低值 / 唯一低于 4.5"两处表述有误

全 46 个模式检查中**最低值是 `label-caption on base [light] = 3.00:1`**，不是代码注释 3.37:1。浅色下还有两个 <4.5 的文字色：

| 项 | 浅色 | 深色 |
|---|---|---|
| label-tertiary on base | **4.42** | 5.57 |
| `--shiki-token-string-expression` on code block | **3.88** | 9.07 |
| label-caption on base | **3.00** | 3.75 |
| label-dimmed（禁用态，WCAG 豁免） | 1.80 | 2.10 |

→ 与 README:136、design-spec:119 的"最低 / 唯一"说法不符（§9-M2、M3）。

---

## 5. 证据 4：显示资源

| 资源 | 检查 | 结果 |
|---|---|---|
| `locale/en.json` | JSON 解析 + `meta.title`/`meta.description` 非空 | `title: "Cluade"`，description 非空（242 B） |
| `locale/zh.json` | 同上 | `title: "Cluade"`，中文 description 非空（218 B） |
| `icon.svg` | XML 解析 | 合法 SVG，root `svg`，`viewBox="0 0 64 64"` |
| 外链/脚本扫描 | `href="http(s)://`、`src="http(s)://`、`<script`、`<image`、`url(` | **0 处**（`xmlns="http://www.w3.org/2000/svg"` 是命名空间 URI，不发起请求） |
| 体积 | `wc -c` | **504 B**（≪ 256 KiB 阈值） |
| 几何 | 5 个 `rect` 构成像素 "C"（上 20,12/24×8；左 12,20/8×24；下 20,44/24×8；右 44,20 与 44,36 两个 8×8；点 49,28） | 与 README:93"原始像素「C」图标"一致 |

判定：通过。

---

## 6. 证据 5：文档一致性逐条核对

以下"实际值"均由本次独立脚本测得。

| # | 位置（当前版本） | 文档说法 | 实际 | 判定 |
|---|---|---|---|---|
| 1 | README:5,42,59,134,142；design-spec:68,133；tokens.json:5 | token 数 **127** | `tokenCount=127`；`client.js` 运行期 127；127 个名字全部存在于官方样式表 | ✅ |
| 2 | README:38,136；design-spec:97 | WCAG 检查 **23 组** | `palette.json` 的 `checks` = **23** 条；46 个模式值全过 | ✅ |
| 3 | README:133 | 已安装，`application: applied` | 结果侧证据成立（§7）；原始字符串不可复现 | ⚠️ 结果可证、字面不可复现 |
| 4 | README:21-31 色板表 | 浅/深 12 个核心色 | 与 `tokens.json` 逐值一致（#FCFAF6/#1B1815/#FFFEFB/#F7F2E9/#F0ECE4/#E7DAC9/#161311/#332C24/#39332D/#EFE7DB/#6B6257/#B5AA9B/#B05C3A/#D97757/#F0E7DA/#2E2721/#6F7F54/#A8761F/#B24A3A/#A6B487/#D8B26A/#E0826D 全中） | ✅ |
| 5 | README:31 | 焦点环/链接"原为蓝色 `#4176E6`" | 官方 `--dsw-alias-state-business-primary: var(--dsw-static-deepseek-500)` = **#4176e6**；另有 `--dsw-alias-brand-primary-new-colorprimary-new-color:#4176e6` | ✅ |
| 6 | README:119 | 参考稿"侧栏 252px、输入框圆角 10px" | 参考稿 `ui/style.css`：`aside{width:252px}`、`.composer{border-radius:10px}` | ✅ |
| 7 | README:126；design-spec:64,140 | 不覆盖 `--dsw-static-*`、shadow/elevation | 127 个名字中 `--dsw-static-*` = 0；`shadow|elevation` = 0 | ✅ |
| 8 | README:82,127；design-spec:139 | 外观选择器固定 3 项，第三方主题 id 不出现 | 安装版 `AppearanceRow` 的 `CUBES` 硬编码 light/dark/system | ✅ |
| 9 | README:59；design-spec:68 | **14 个官方目录 + 其余 113 个 override-only** | 实测 14 个目录全中；override-only 恰为 **113**（127−14） | ✅（但 README:134 另有相反说法，见 #23） |
| 10 | design-spec:54 | business 浅色 `#B05C3A` | `--dsw-alias-state-business-primary` 浅色实际 **`#B45F3C`**（深色 `#D97757` 一致） | ❌ |
| 11 | design-spec:70-82 | 分组数量：bg **16**、border 7、label 13、brand **5**、button **16**、interactive 5、state **16**、markdown+shiki **24**、diff 8、specific 11、其它 **6** | 实测：bg **15**、border 7 ✅、label 13 ✅、brand **4**、button **15**、interactive 5 ✅、state **12**、markdown 8 + shiki 11 = **19**、diff 8 ✅、specific 11 ✅、其它（link1+menu2+scrollbar4+switch1+toast2+tooltip2+turn2+onboarding4）= **18**；合计 127 与表相同，但**5 行数字错 + "其它"少算 12** | ❌ |
| 12 | design-spec:90 | "菜单/浮层：`--dsw-specific-menu` 用暖色 86% 材料" | 官方 `README.zh.md:53`：**公共菜单**经 `MenuSurface` 共享 **`--dsw-menu-surface-fill`**，"其他浮层"才用 `--dsw-specific-menu`；安装版 MenuSurface CSS `._material_*{background:var(--dsw-menu-surface-fill)}`；本主题未覆盖该 token | ❌ 归因不完整（§8.1） |
| 13 | design-spec:80（§3 表）+ :92 | 差异视图"底色改为暖绿/暖红纸" | 浅色 6 值与官方不同（暖化成立）；**深色 6 个 file-diff token 与官方深色值逐字节相同**：#1F3124/#132016/#41C977/#3C1F1B/#28130E/#FA423E | ⚠️ 仅浅色暖化 |
| 14 | design-spec:119 | "caption 与注释是唯一低于 4.5:1 的文字" | 另有 `label-tertiary` 浅 **4.42:1**、`--shiki-token-string-expression` 浅 **3.88:1**（后者还不在 23 组检查内） | ❌ |
| 15 | README:136 | "最低为代码注释 3.37:1" | 全表最低是 caption 浅色 **3.00:1** | ❌ |
| 16 | README:55 | "`--shiki-*` 11 个语法色" | 11 个 shiki 变量 = 9 个 `--shiki-token-*` 语法色 + `--shiki-foreground/background` 两个映射变量 | ⚠️ 不精确 |
| 17 | README:54 | 列 `menu-group-header-fill` | 实际全名 `--dsw-alias-menu-group-header-fill`（同表其它项均带前缀） | ⚠️ 轻微 |
| 18 | reference-analysis:14 | "107 个 alias + 11 个 specific 里的 override-only 名称" | 实际 **105 alias + 11 specific + 11 shiki = 127**；107+11=118≠127，且**完整漏掉 11 个 shiki token**；design-spec:68 又把边界证据指向该节 | ❌ |
| 19 | reference-analysis:5,683 | 引用"本机已安装 `@deepseek-ai/dsh-client-ui-theme@0.2.1-rc.2`" | 本机安装为 **0.2.1-rc.3**（asar 内 `package.json`、`desktop-runtime.json` 均 rc.3）；14 项清单在 rc.3 下仍逐项一致 | ⚠️ 版本引用过期 |
| 20 | reference-analysis:20,337,526-527 vs design-spec:99-119 | 分析结论要求 label-tertiary/caption **≥4.5:1**（建议 #776B5D/#7A6D57） | 实装：tertiary 浅 4.42（门槛 3）、caption 浅 3.00（门槛 2.6）；两文档无取舍说明 | ❌ 互相矛盾 |
| 21 | README:35 | 三层表面 `#FCFAF6 → #FFFEFB → #F7F2E9` | canvas→layer-1→layer-2 逐值一致 | ✅ |
| 22 | design-spec:88 | 主按钮文字 `#FFFDF9`、4.66:1 | `label-primary-foreground` 浅 `#FFFDF9` on `#B05C3A` = **4.66:1** | ✅ |
| 23 | README:134 | "运行期证据：`Theme.listTokens` 已列出本插件注册的 **127 个 override-only token**" | 现场无法验证（超时）；且与 README:59 的"14 + 113 override-only"矛盾；127 是总覆盖数，其中 14 个属官方目录 | ❌ 表述与证据均未成立 |
| 24 | README:128 | "当前 profile 还装了壁纸插件（`dsh-plugin-wallpaper-engine`）。如果壁纸层不透明，画布底色会被它盖住…" | 包确实在 profile `dependencies`（1.4.0）；但 **203 条活动 loader 组合中没有它的条目**，也不在 `dsh.profile.bundles` → 当前并未启用，"盖住画布"不成立 | ⚠️ 误导性（§7.2） |
| 25 | README:129 | "与 `dsh-better-sidebar`、`dsh-whale-widget` 等纯 UI 插件共存" | 两者同样只在 `dependencies`，203 条组合无条目；`.dsh-market/state.json` 还把 `dsh-whale-widget` 标为 `disabled` | ⚠️ 当前不成立 |
| 26 | README:100 | `tools/audit-theme.mjs`"36 项" | 实际 36 项（36/36） | ✅ |
| 27 | README:97-101 | 文件清单（含 reference-analysis/verification/audit-theme） | 4 个文件均存在 | ✅ |

---

## 7. 证据 6：盘外安装检查（profile）

### 7.1 Cluade 安装成立

| 检查项 | 结果 |
|---|---|
| `~/.dsh/profiles/desktop/package.json` | `dsh.profile.bundles` 含 `"dsh-theme-cluade"`；`dependencies` 含 `"dsh-theme-cluade": "link:/Users/temporary/github/dsh-theme-cluade"` |
| `node_modules/dsh-theme-cluade` | 符号链接 → `../../../../github/dsh-theme-cluade`（**即本仓库**，因此仓库 `client.js` 就是安装产物） |
| `.plugin-manager/logs/operation-YhBFG7/pnpm.log` | `+ dsh-theme-cluade 0.1.0 <- ../../../github/dsh-theme-cluade` |
| Host `Config.listConfigs`（全量 203 条, offset 200） | 第 201 条：`{"id":"include:theme-cluade","patchId":"theme-cluade","name":"dsh-theme-cluade","status":"absent"}` → **已进入活动组合** |
| `"status": "absent"` 含义 | 是 **Config schema 状态**（无设置 schema），不是"插件缺失"：对照组 `dsh-loop-manager` 同样返回 `absent` 且在运行 |
| profile `cordis.patch.yml` | **不含** `theme-cluade` 行；该行由本包 `dsh.bundle.patch`（`cordis.patch.yml`）在 bundle 层插入，属正常组合方式 |

判定：**安装成立**。README:133 的 `application: applied` 与结果一致（字面不可复现）。

### 7.2 但 README:128-129 提到的另外 3 个插件未进入活动组合

用 `Config.listConfigs` 拉全 203 条活动 loader 组合（offset 0/100/200），逐条确认：

- 第三方插件条目只有 `include:theme-cluade`（另有官方 `dsh-market`、`dsh-loop-manager` 是 bundle 级）；
- **没有** `dsh-plugin-wallpaper-engine`、`dsh-better-sidebar`、`dsh-whale-widget` 的任何条目；
- 三者也不在 `dsh.profile.bundles` 里（只在 `dependencies`）；
- `.dsh-market/state.json` = `{"disabled":["dsh-whale-widget"],...}`，进一步印证 `dsh-whale-widget` 处于禁用态。

→ README:128 "壁纸层会盖住画布"的因果在当前组合下不成立；README:129 "共存"未获证据支持（包已下载 ≠ 已启用）。这条**只有当这三个插件被真正启用后才成立**。

---

## 8. 证据 7：运行期风险分析（读安装版实现）

### 8.1 【重要】共享菜单材质 token `--dsw-menu-surface-fill` 未被覆盖

证据链（全部来自安装版）：

1. 官方 `@deepseek-ai/dsh-client-ui-theme@0.2.1-rc.3` 的 `README.zh.md:53`：
   > 公共菜单通过 `MenuSurface` 共享 `--dsw-menu-surface-fill` 和模糊，平台代码须保留这些 token 值。……其他浮层使用 `--dsw-specific-menu`。
2. 安装版菜单组件 CSS（asar 内）直接消费它：`._material_ri079_21{...background:var(--dsw-menu-surface-fill);backdrop-filter:var(--dsw-menu-backdrop-filter);...}`。
3. 官方 design-platform 样式表：浅色 `--dsw-menu-surface-fill:#f8f9fa94`、深色 `#43454a73`（冷灰）。
4. 本主题 127 个 token **不含** `--dsw-menu-surface-fill`（§3.2），只覆盖 `--dsw-specific-menu`（暖色 `rgba(253,250,244,0.86)` / `rgba(40,34,28,0.86)`）。
5. 覆盖层写入方式（安装版 `@deepseek-ai/dsh-client-ui-layout/lib/client.js` 的 `ThemePresenter`，抽取副本 `/tmp/dsh-ui-layout-client.js:529-569`）：对每个 token 执行 `body.style.setProperty(name, value)`，卸载时按 `appliedTokens` 逐个 `removeProperty`。内联 body 样式可压过 `body[data-ds-dark-theme]` / `html[data-platform=darwin] body`，所以**已覆盖**的 token 在深浅两模式下确实生效；**没被覆盖的 `--dsw-menu-surface-fill` 不会生效**。

推论：**下拉/上下文菜单（MenuSurface）的材质很可能仍是官方冷灰**；主题只暖化了"其它浮层"（stat-dialog、panel、toolbar 等 16 处 `var(--dsw-specific-menu)`）。与 design-spec:90"菜单/浮层用暖色 86% 材料"、README:54"菜单与浮层"清单存在落差。（静态证据充分、视觉未核验；现场看一眼下拉菜单底色即可确认。）

### 8.2 其余运行期结论（无异常）

- `client.js` 用 `ctx.effect(() => ctx.theme.overrideTokens('dsh-theme-cluade', TOKENS), ...)` 注册单层并返回 disposer；安装版 `overrideTokens` 只写 `overrides` Map 并 `publish()`，**不写用户偏好**，与 README:81-83 一致。
- 深浅模式：`composeActive()` 按 `active.colorScheme` 取 `{light,dark}`，再由 `ThemePresenter` 写成 body 内联样式 → 用户"浅色/深色/跟随系统"偏好仍决定哪套色板生效，README:81-82 成立。
- shiki 变量官方在 `:root` / `body[data-ds-dark-theme]` 定义；主题以 body 内联样式覆盖，优先级足够。
- 未覆盖的 `--dsw-alias-settings-card-fill/-stroke` 是 `bg-layer-2` / `border-l4` 派生值，随覆盖自动变暖，无风险。

---

## 9. 发现的问题（按严重度）

### 9.1 高（影响真实观感）

**H1. 共享菜单材质 token 缺失：`--dsw-menu-surface-fill` 不在 127 个覆盖里**
- 位置：`design/design-spec.md:90`；`README.md:54`（菜单清单）；映射表 `tools/gen-tokens.mjs:45-180` 无该名字
- 实际：该 token 由 `MenuSurface` 直接消费，官方值浅 `#f8f9fa94`、深 `#43454a73`（冷灰）；主题覆盖的是"其他浮层"用的 `--dsw-specific-menu`
- 影响：下拉菜单很可能未被暖化；是本主题 127 个名字里**唯一**实质遗漏的颜色 token
- 建议：`palette.json` 增 `menuSurface` + 在 `gen-tokens.mjs` 映射 `--dsw-menu-surface-fill`；或至少修正 design-spec:90 措辞

### 9.2 中（文档数字 / 结论错误，会误导维护与排查）

**M1. design-spec:70-82 分组表 5 行数量错** —— bg 称 16 实 15；brand 称 5 实 4；button 称 16 实 15；state 称 16 实 12；markdown+shiki 称 24 实 19；"其它"称 6 实 18。合计仍为 127，掩盖偏差。

**M2. README:136 "最低为代码注释 3.37:1" 错** —— 全表最低是 `label-caption on base [light] = 3.00:1`（门槛 2.6）。

**M3. design-spec:119 "caption 与注释是唯一低于 4.5:1 的文字" 错** —— 反例：`label-tertiary` 浅 **4.42:1**、`--shiki-token-string-expression` 浅 **3.88:1**（后者还不在 23 组检查内）。

**M4. reference-analysis:14 token 口径错** —— 称"107 alias + 11 specific"，实际 **105 alias + 11 specific + 11 shiki = 127**；107+11=118≠127 且漏掉全部 shiki。design-spec:68 又把边界证据指到该节（同文 :459 关于 `listTokens` 会列出 override-only 名的说法已核实为**正确**）。

**M5. reference-analysis:20,337,526-527 与 design-spec:99-119 结论互相矛盾** —— 分析稿要求 tertiary/caption ≥4.5:1（建议 `#776B5D` 4.98 / `#7A6D57` 4.85）；实装接受 4.42（门槛 3）与 3.00（门槛 2.6），且两文档无取舍说明。

**M6. README:128-129 的兼容性说明与当前活动组合不符** —— `dsh-plugin-wallpaper-engine`、`dsh-better-sidebar`、`dsh-whale-widget` 只在 `dependencies`，203 条 loader 组合无条目、不在 bundles，`dsh-whale-widget` 还被 market 标记 disabled；"壁纸盖住画布"/"共存"当前不成立（或需注明"已安装未启用"）。

### 9.3 低（表述/引用精度）

**L1. README:134 仍称"127 个 override-only token"** —— 与同文件第 59 行"14 个官方目录 + 其余 113 个 override-only"矛盾；应改为 127 个覆盖（14 官方 + 113 override-only）。另该行的"运行期证据"本次无法复现（client inspect 超时）。

**L2. design-spec:91 "深色下对照度均 ≥4.5:1"** —— 对被检查的 6 个语法色成立（comment 4.22 已注明）；但官方 9 个语法色里 `--shiki-token-string-expression` 浅色仅 **3.88:1**、未进 23 组检查，§5 也未提，覆盖说明不完整。

**L3. design-spec:54 business 浅色写 `#B05C3A`** —— 实际 token 浅色 **`#B45F3C`**（深色 `#D97757` 一致）。

**L4. design-spec:80 + :92 "差异底色改为暖绿/暖红纸"** —— 深色 6 个 file-diff token 与官方深色值逐字节相同（`#1F3124`/`#132016`/`#41C977`/`#3C1F1B`/`#28130E`/`#FA423E`），暖化只发生在浅色。

**L5. reference-analysis:5,683 引用 `0.2.1-rc.2`** —— 本机安装 **0.2.1-rc.3**；14 项清单核对一致，结论不受影响，但证据版本过期。

**L6. README:55 "`--shiki-*` 11 个语法色"** —— 11 个 shiki 变量中只有 9 个是 `--shiki-token-*` 语法色（另 2 个是 foreground/background 映射）。

**L7. README:54 `menu-group-header-fill` 未写全名** —— 实际 `--dsw-alias-menu-group-header-fill`。

**L8. palette.json 有 7 个颜色无任何 token 使用** —— `inkStrong`、`accentSoft`、`accentWash`、`accentHighlight`、`accentTint`、`errorWash`、`selection`（127/127 生成值均可回溯，但存在闲置死色）。

**L9. README:38 "23 组 WCAG 检查在 `node tools/gen-tokens.mjs` 里运行"** —— 检查条目定义在 `design/palette.json` 的 `checks` 数组，`gen-tokens.mjs` 只是执行器；措辞可更精确。

### 9.4 未发现问题的项（明确说明）

以下均**未发现**问题：仓库自检 36/36；127 数量；14 个官方 token 100% 覆盖；23 组对比度全过且 46 个文档引用值全部可复算；显示资源；安装态；`overrideTokens` 用法与卸载清理；浅/深偏好不被改写；外观选择器 3 项固定；不覆盖 static/shadow/elevation；`palette.json` 单一色源可回溯；无臆造 token 名；README:59 / design-spec:68 的"14 + override-only"边界口径准确。

---

## 10. 结论

**有条件通过。**

- 实现侧：bundle 结构、`ctx.theme.overrideTokens()` 用法、127 token 数据与 `design/tokens.json` 一致、23 组对比度、显示资源、安装态全部成立；仓库自检 36/36。
- 不存在功能性失败，但存在 **1 个真实覆盖缺口（H1，静态证据充分、视觉未核验）** 与 **15 处文档数字/表述错误（M1-M6、L1-L9）**。按"文档即契约"的标准，当前 README/design-spec 不能原样作为验收依据。
- 放行条件建议：
  1. 现场看一眼下拉菜单底色确认 H1；确认冷灰则补 `--dsw-menu-surface-fill` 映射后重生成（或至少修正 design-spec:90）；
  2. 修正 M1-M6 的数字与"最低/唯一/107 alias/rc.2/壁纸共存"表述（纯文档改动）；
  3. L1-L9 可随同轮修文档一并处理；
  4. 文档冻结后按 §0 的 SHA-1 重跑一次行号核对（本次验证期间文档被并发修改过）。

---

## 11. 局限与不可验证项（如实记录）

1. **`Theme.listTokens` 现场查询未成功**：client inspect 连续 5 次 10 000 ms 超时（`Theme.listTokens` ×5；`Service.listService`、`Builtin.listBuiltins` 各 1 次）；页面 URL 401。已用"安装版源码合并规则 + 沙箱执行 `client.js`"等效复算（§3.2），但**没有**"从活动页面读回 127 条"的直接证据。
2. **无视觉核对**：未截图、未逐像素比对；H1（菜单冷灰）、深色差异色、语法高亮观感均未肉眼确认。
3. **安装字符串不可复现**：`application: applied` / `warnings: []` 未在日志/回执中留存，只能验证安装结果（§7）。
4. **未验证 HMR**：README:112 的"改完刷新即生效 / 替换已安装包需重启"未实测；本次也按要求未运行生成器。
5. **验证期间文档被并发修改**：README 133→142 行、design-spec 第 68 行新增段落；本报告已按当前版本重新核对（§0/§6）。若后续再改，行号需重新核对。
6. **壁纸/侧栏/鲸鱼插件未在活动组合**（§7.2）：无法验证它们与本主题的实际视觉交互；README:128-129 的相关说法也正因此无法成立。
7. app.asar 解析为只读（自写解析器把 4 个文件抽到 `/tmp`），未改动应用本体；所有临时脚本只在 `/tmp`。
8. 结论基于 `@deepseek-ai/dsh-client-ui-theme@0.2.1-rc.3`；DSH 升级后 §3.2 的 131 个官方 token 面貌可能变化。

---

## 12. 复现命令

```sh
NODE=/Users/temporary/.dsh/dsh-runtimes/dsh-primary-runtime/dependencies/node/bin/node

# 1) 仓库自检（36/36）
$NODE tools/audit-theme.mjs

# 2) token 集合等效复算（从安装版 asar 抽官方目录 + 沙箱执行 client.js）
$NODE /tmp/asar-extract.mjs        # 抽 ui-theme lib/client.js -> /tmp/dsh-ui-theme-client.js（只读）
$NODE /tmp/verify-tokenset.mjs     # 14 catalog ∪ 127 override = 127；与 tokens.json 0 缺失/0 多余

# 3) 对比度独立复算（23 组门槛 + 文档 46 个引用值）
$NODE /tmp/verify-contrast.mjs

# 4) 辅助核对
$NODE /tmp/count-tokens.mjs          # 127；分组计数（对照 design-spec:70-82）
$NODE /tmp/verify-palette-source.mjs # palette.json 单一色源、ld 对称、7 个闲置颜色
$NODE /tmp/verify-doc-hex.mjs        # 文档 hex 是否都在 shipped token 里
$NODE /tmp/verify-coverage2.mjs      # 官方 131 个颜色 token vs 覆盖 127，唯一颜色缺口 --dsw-menu-surface-fill
$NODE /tmp/shiki-contrast.mjs /tmp/extra-contrast.mjs
```

（`asar-*.mjs` 系列只读 app.asar，产物写 `/tmp`；本报告之外的仓库文件零改动。）

---

## 13. 复核（修复后）

### 13.1 复核基线与方法

- 复核时间：2026-10-28 12:51（Asia/Shanghai），对象为 §0 末尾"复核基线"表中的版本（修复批次 mtime 12:48–12:49；实现文件 `client.js` 12:49:08、`tokens.json` 12:49:08、`palette.json` 12:48:35）。
- 本次**只读**：未改实现/文档、未装卸插件、未运行 `node tools/gen-tokens.mjs`；唯一写入仍是本文件。
- 复核用的命令/脚本（全部只读，产物在 `/tmp`）：
  - `$NODE tools/audit-theme.mjs`；
  - `/tmp/recheck-contrast.mjs`：用 `tools/wcag.mjs` 独立复算 **24 组门槛** + design-spec §5 引用的 **24 组（48 个值）**；
  - `/tmp/recheck-tokenset.mjs`：从安装版 asar 抽官方 14 项目录 + 沙箱执行 `client.js`，按 `exportInspectTokens()` 规则复算 `listTokens` 应有集合；
  - `/tmp/verify-coverage2.mjs`：官方 8 张样式表的颜色 token 全集 vs 实装覆盖；
  - `/tmp/recheck-groups.mjs`：分组计数、palette 使用率、token ↔ palette 可回溯性、24 组 checks 列表；
  - `/tmp/verify-doc-hex.mjs`：文档 hex 与实装 token 值比对；
  - Host `Config.listConfigs`（全量 203 条 + 按名查询）、profile `package.json`、`.dsh-market/state.json`。
- **现场 `Theme.listTokens` 仍不可用**：本轮共 4 次尝试（client `Theme.listTokens` ×3、`Slots.listSubTree` ×1）全部 10 000 ms 超时。Lead 反馈其现场查询已看到 128 个覆盖 token（含 `--dsw-menu-surface-fill`）；**该运行期证据我无法独立复现**，H1 的结论由静态等效证据 + 产物一致性支撑（见 §13.2-H1）。

### 13.2 逐项复核（H1 + M1–M6 + L1–L9）

| 项 | 期望的修复 | 实际证据（文件:行号 / 实测值） | 判定 |
|---|---|---|---|
| **H1** | 覆盖 `--dsw-menu-surface-fill` | `tools/gen-tokens.mjs:169` `'--dsw-menu-surface-fill': 'menuSurface'`；`design/palette.json` 新增 `menuSurface` = 浅 `rgba(252,248,240,0.58)` / 深 `rgba(42,36,30,0.52)`；`design/tokens.json:471` 与 `client.js:138` 同值；`design/design-spec.md:32,91,147`、`README.md:54,127` 已同步。静态等效：官方目录 14 ∪ 覆盖层 128 = **128**（override-only **114**），**`--dsw-menu-surface-fill` 在列**；官方 131 个颜色 token 现覆盖 **128**，仅剩 2 个派生别名（`--dsw-alias-settings-card-fill/-stroke`，由已覆盖的 `bg-layer-2`/`border-l4` 派生、自动变暖）+ 1 个非颜色滤镜 `--dsw-menu-backdrop-filter`。 | ✅ 已修（运行期由 Lead 声称、我未能直连复现） |
| **M1** | §3 分组计数改实际值 | `design/design-spec.md:73-83`：bg **15** / border **7** / label **13** / brand **4** / button **15** / interactive **5** / state **12** / markdown+shiki **19** / diff **8** / specific **11** / 其它 **19**；独立计数脚本结果逐项一致，合计 **128**。 | ✅ 已修（枚举小瑕疵见 §13.3-R1） |
| **M2** | README 最低值表述 | `README.md:136`："全表最低是浅色 caption 3.00:1，门槛 2.6；代码注释 3.37:1，门槛 3"。独立复算最小值正是 `label-caption on base [light] = 3.00:1`，其次 3.37:1。 | ✅ 已修 |
| **M3/L2** | §5 补 string-expression 行与"低于 4.5 的三类"；24 组 checks | `palette.json` checks = **24**（新增 `code string expression on code block`，`min: 4.5`，浅色 `#5A6D3E`）；独立复算浅 **5.01:1** / 深 **9.07:1**；`design-spec.md:118` 有该行，`:98` "24 组门槛"，`:121-126` "低于 4.5:1 的只有三类" + 取舍说明；深色 9 个语法色除 comment **4.22** 外全部 ≥4.5。 | ✅ 已修 |
| **M4/M5/L5** | reference-analysis 计数、rc.3、§8 采纳补注 | `design/reference-analysis.md:14` 已改为"alias/specific/shiki/菜单材质等 override-only，实装 **114 个**"；`:5`、`:690` 已写 **0.2.1-rc.3**（全仓无 `rc.2`、无"107 个 alias"残留）；`:512-517` 新增"实现采纳情况（Lead 补注）"，逐条说明 tertiary/caption 未压到 4.5 的取舍、brand 填充 `#B05C3A`、补充 menu-surface 与 shiki、深色方向、**128 = 14 + 114**。与 design-spec §5 的取舍说明一致，原 M5 矛盾已消除。 | ✅ 已修 |
| **M6** | README 兼容性段如实描述 | `README.md:129` 改为"dependencies 里列有壁纸/侧栏/鲸鱼等纯 UI 插件，但当前不在活动 bundle 组合中……（未在本机活动组合中实测）"。profile 实测：`dependencies` 有 `dsh-plugin-wallpaper-engine` 1.4.0、`dsh-better-sidebar` 0.28.1、`dsh-whale-widget` 0.4.2；`dsh.profile.bundles` 仅 `dshmarket`/`dsh-loop-manager`/`dsh-theme-cluade`；Host `Config.listConfigs` 按名查询三者均 `total: 0`；`.dsh-market/state.json` 仍 `{"disabled":["dsh-whale-widget"]}`。 | ✅ 已修 |
| **L1** | README 不再称 128 个全是 override-only | `README.md:134`："128 个覆盖 token（**14 个官方目录 + 114 个 override-only**）"；`:59` 同口径；数学 128−14=114 与实测一致。 | ✅ 已修 |
| **L3** | business 浅色统一 | `design/palette.json` `business` 浅 `#B05C3A`；`design/tokens.json` `--dsw-alias-state-business-primary` 浅 **#B05C3A** / 深 `#D97757`；`design-spec.md:55` 为 `#B05C3A`。三处一致（旧值 `#B45F3C` 已不存在）。 | ✅ 已修 |
| **L4** | 深色 file-diff 沿用官方需明说 | `design/design-spec.md:93`："深色沿用官方深色 diff 值（红绿语义优先…）"；实测深色 6 值 = `#1F3124`/`#132016`/`#41C977`/`#3C1F1B`/`#28130E`/`#FA423E`，与官方深色样式一致。 | ✅ 已修 |
| **L6** | shiki 9 + 2 表述 | `README.md:55`："9 个 `--shiki-token-*` 语法色 + `--shiki-foreground/background` 两个映射变量"；实测 shiki 变量 11 个 = 9 个 token-* + 2 个映射变量。 | ✅ 已修 |
| **L7** | 菜单分组标题全名 | `README.md:54` 已写 `--dsw-alias-menu-group-header-fill`（同表其它项也都带 `--dsw-` 前缀）。 | ✅ 已修 |
| **L8** | 删 7 个闲置色、110 色全映射 | `design/palette.json` 现有 **110** 个颜色（light/dark 对称），7 个旧闲置色（`inkStrong`/`accentSoft`/`accentWash`/`accentHighlight`/`accentTint`/`errorWash`/`selection`）在全仓无任何引用；**110/110 全部被至少一个 token 使用（unused = 0）**；128 个 token 的 light/dark 对全部可回溯到 palette 的同一颜色对（或 `--shiki-foreground/-background` 两个 `var()` 别名，0 例外）。 | ✅ 已修 |
| **L9** | 23 组检查归属表述 | `README.md:38`："24 组 WCAG 检查（条目定义在 `design/palette.json` 的 `checks`，由 `node tools/gen-tokens.mjs` 执行）"；`:113` 也写 24 组；`palette.json` checks 实测 24 条。 | ✅ 已修 |
| 附加 | LICENSE 与文件清单 | `LICENSE` 已新增（MIT，21 行 / 1082 B），`package.json.files` 含 `"LICENSE"`，`README.md:88` 文件清单列出 `LICENSE`。 | ✅ 一致 |

**重跑结果（独立复算）**

- `node tools/audit-theme.mjs` → **36/36 checks passed，token count: 128，exit 0**。
- 24 组门槛（独立脚本，48 个模式值）→ **24/24 全过**；最低仍是 `label-caption [light] 3.00:1`（门槛 2.6）。
- design-spec §5 引用的 24 组数字（48 个值）→ **48/48 吻合**（最大偏差 0.005）：含新增 string-expression 5.01/9.07、改为 `#B05C3A` 后的主按钮 4.66/5.66、business 未参与检查等。
- 文档 hex 交叉核对：实装 token 值中能找到文档引用的全部 hex；仅 3 处"查无"是**预期**——`README.md:31` 的 `#4176E6`（官方原蓝色）、`design-spec.md:126` 的 `#776B5D`/`#7A6D57`（引用分析稿的建议值、且明示"未采纳"）。
- 覆盖范围：官方 131 个颜色 token → 覆盖 128；剩余 3 个见 H1 行说明（2 派生 + 1 非颜色）。
- 深色语法色：9 个 `--shiki-token-*` 中除 comment **4.22:1** 外全部 ≥4.5，与 `design-spec.md:92` 一致。

### 13.3 复核后仍存在的问题（按严重度）

**R1（低）· design-spec:83 的"其它"枚举多列了"骨架"**
`design-spec.md:83` 数字是"其它 **19**"，但枚举文字为"`--dsw-menu-surface-fill`、链接、菜单图标/分组标题、滚动条 ×4、**骨架**、开关滑块、toast ×2、tooltip ×2、turn-trigger ×2、onboarding ×4"= **20 项**。`--dsw-alias-bg-skeleton` 实际归入 `--dsw-alias-bg-*` 组（bg 组 15 个里已含它），因此枚举里的"骨架"是重复列举；数字 19 与总数 128 本身正确。建议删掉"骨架"一词（或把它从 bg 组移出并同步 bg=14）。**不影响计数正确性，仅文字枚举与数字不一致。**

**R2（低）· `tools/audit-theme.mjs:12` 注释仍写 "127 tokens"**
文件头注释："4. token data: **127 tokens**, every one a { light, dark } string pair…"。实际 token 现为 **128**；脚本本身是动态检查（`token count matches design/tokens.json` 通过），只是注释过期。建议改为 128（或改为不定数量的描述）。

**R3（极低）· `design-spec.md:147` 笔误"deep 色"**
原文"…MenuSurface 材质（`--dsw-menu-surface-fill`）已覆盖，**deep 色**的共享菜单也走暖色衬底。"应为"**深色**"。

**R4（极低）· `design-spec.md:121` "低于 4.5:1 的只有三类"应加"文字类"限定**
该句在 24 组检查语境下成立（text 检查里 <4.5 的只有 tertiary 4.42、caption 3.00/3.75、comment 3.37/4.22）；但同表的 `success 4.16`、`warn 3.82` 也 <4.5（各自门槛是 3，属状态色而非文字）。严格读会歧义，建议写成"文字类中低于 4.5:1 的只有三类"。

**R5（未验证项，非缺陷）· 运行期/视觉证据仍缺**
`README.md:134` 的"`Theme.listTokens` 已列出 128 个覆盖 token"由 Lead 现场声称；本复核 **4 次 client inspect 全部超时**，无法独立复现。H1 的运行期结论、HMR 是否已加载新 bundle、以及菜单/语法高亮的实际观感均**未由本复核直接核验**；现有证据是：产物 `client.js`（= 安装符号链接指向的仓库文件）含 128 token、官方合并规则推演为 128、审计与对比度全过。若要以"页面实测"作为验收条件，需在能连上页面的会话里再确认一次（尤其下拉菜单底色是否已变暖）。

### 13.4 复核结论

**通过。**

- H1 与 M1–M6、L1–L9 全部落实：128 token（14 官方 + 114 override-only）结构自洽、`--dsw-menu-surface-fill` 已映射并进入产物、24/24 对比度门槛与 48 个文档引用值独立复算吻合、分组计数与 palette 使用率（110/110）正确、M4/M5 的文档矛盾已通过"采纳情况"注与 rc.3 修正消除、M6 与 profile 实际一致。
- 无功能性遗留；仅 **R1、R2 两处低级别文档枚举/注释瑕疵**（design-spec:83、audit-theme.mjs:12）与 **R3、R4 两处笔误/措辞**，可随手修正，不阻塞验收。
- 仍需声明的局限：**R5**（运行期 `Theme.listTokens`、HMR、视觉观感未由本复核直接验证）——这部分只能以 Lead 的现场观察 + 本报告的静态等效证据为准。

---

## 14. v2 加深迭代复核

### 14.1 基线与方法

- 复核时间：2026-10-28 13:36（Asia/Shanghai）；对象为 §0 末尾"复核（v2 加深迭代）"表中的版本（mtime 13:35）。
- 本次**只读**：未改实现/文档、未装卸插件、未运行 `node tools/gen-tokens.mjs`；唯一写入仍是本文件。
- 执行的独立检查：`node tools/audit-theme.mjs`；`/tmp/v2-contrast.mjs`（从 `design/palette.json` checks 复算 **24 组门槛** + design-spec §5 的 **24 组引用值**）；`/tmp/v2-structure.mjs`（token/palette 结构、漂移）；`/tmp/v2-panel-mechanism.mjs`（面板行 v1→v2 定量）；`/tmp/verify-doc-hex.mjs`（文档 hex vs 产物）；只读解析 `app.asar` 的安装版 `ui-sidebar` / `ui-plugin-manager` / `ui-theme` CSS，以及本地 `dsh-loop-plugins` 的 `LoopGlyph`。
- **现场 `Theme.listTokens` 仍不可用**：本轮 5 次尝试全部 10 000 ms 超时（`Theme.listTokens` ×5），因此"页面已热更新到 v2"**无法由本复核独立复现**；改用"沙箱执行 `client.js` + 官方 14 项目录合并规则"的静态等效（结果 **128 = 14 + 114**，含 `--dsw-menu-surface-fill`）。

### 14.2 24 组对比度门槛（独立复算，全部通过）

| 检查 | 浅色 | 深色 | 门槛 |
|---|---|---|---|
| label-primary on base | 13.65:1 | 14.80:1 | ≥7 |
| label-primary on raised surface | 14.86:1 | 13.86:1 | ≥7 |
| label-primary on nested surface | 12.89:1 | 12.84:1 | ≥7 |
| label-primary on sidebar | 12.72:1 | 15.49:1 | ≥7 |
| label-primary on selected session row | 10.71:1 | 11.52:1 | ≥7 |
| label-secondary on base | 7.25:1 | 8.46:1 | ≥4.5 |
| label-tertiary on base | **5.22:1** | 6.24:1 | **≥4.5**（本轮提高） |
| label-caption on base | **3.79:1** | 4.62:1 | **≥3.5**（本轮提高） |
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
| code comment on code block | 3.87:1 | **4.27:1** | ≥3 |
| code string expression on code block | 4.80:1 | 9.07:1 | ≥4.5 |

- **24/24 通过**（48 个模式值）；design-spec §5 的 24 行 × 2 个值 **48/48 与实算吻合**（含 13.65 / 5.22 / 3.79 / 3.87 / 12.72 / 4.27 等）。
- 全表最低为 `warning state on base [light] = 3.62:1`；"文字类"最低为 caption 3.79:1 → 见 §14.3-R4。
- `tools/audit-theme.mjs` 复跑：**38/38，token count 128，exit 0**；新增门槛已在审计中体现（tertiary ≥4.5、caption ≥3.5；审计条目数 = 18 项基础 + 10 对 ×2 = 38，脚本注释也已同步为 128）。

### 14.3 结构与文档一致性

- **128 token 不变**：`tokens.json`/`client.js` 均 128；`design/palette.json` 110 色、light/dark 对称、**110/110 全部被 token 使用**、128 个 token 的 light/dark 对 **100% 可回溯**到 palette（或 2 个 `var()` 别名）；官方 131 个颜色 token 覆盖 128（未覆盖仍是 2 个派生别名 + 1 个非颜色滤镜）。
- **design-spec §2.1/§2.2/§2.4 vs 产物：0 处漂移**（脚本逐项比对 canvas/表面/侧栏/气泡/menuSurface/menuFill/文字 7 级/边框 4 级/hover/active 共 24 组，全部与 `tokens.json` 一致）。
- **§8 的 macOS 边界表述属实**（见 §14.4）；**reference-analysis §8 采纳注记已更新**（`:513` 说明 tertiary 已按建议压到 5.22、caption 3.79、并注明本轮按反馈整体加深），与 design-spec 不再矛盾；`iterations` 记录 `design-spec:129` 引用旧值是**故意**的，不算漂移。补充观察：v2.1 里 design-spec §5 的"取舍说明"（五级文字层级理由）在 v2 中被删去，相关理由现仅部分保留在 `reference-analysis:513` 与 design-spec:127 的一句话里——不影响数字正确，但设计规范少了一段取舍记录（建议随 R1–R4 一并补回或明确指向 reference-analysis）。

### 14.4 机制核对：面板行为什么会变深（给出安装版源码证据）

1. **侧栏根节点**（安装版 `@deepseek-ai/dsh-client-ui-sidebar/lib/client.js` 内 CSS）：`.kB3qhq_root{...background:var(--dsw-specific-sidebar-fill);color:var(--dsw-alias-label-primary);...}`，并且 **`[data-platform=darwin] .kB3qhq_root{background:0 0}`** —— 与 design-spec:150 完全一致；macOS 上侧栏透明，透出的是 `body{background-color:var(--dsw-alias-bg-base)}`（安装版 ui-theme 的 design-platform 样式表，确认存在 1 处该声明）→ 即**画布色 #F8F4EA**。
2. **面板行**：`.kB3qhq_panelRow{...color:var(--dsw-alias-label-primary);...}`、`.kB3qhq_panelRow:hover{background:var(--dsw-alias-interactive-bg-hover)}`、`.kB3qhq_panelRow.kB3qhq_panelActive{background:var(--dsw-alias-interactive-bg-hover);color:var(--dsw-alias-label-primary)}` —— 与 Lead 提供的机制事实一致；`.kB3qhq_panelGlyph` 自身**没有 color**，因此继承行的 `label-primary`。
3. **图标**：Loop Manager 的 `LoopGlyph` 显式 `fill:'none'`、`stroke:'currentColor'`（`/Users/temporary/github/dsh-loop-plugins/lib/client.js:1110-1133`，`sidebar.panellist` 注册在 `:1169-1175`）→ glyph 颜色 = 行文字颜色。Plugins 行的 `PluginsPanelIcon`（asar 内 `ui-plugin-manager/lib/client.js:4289-4291`）转给 ui-primitives 的 `IconPluginPinwheelOutlineRegular`；该 primitives 包在 app.asar 内**没有以可读文件形式存在**（全量搜索只命中引用点），其图标是否 `currentColor` 属**高置信推断**（DSH 常见图标容器都走 currentColor；且容器本身不设 color）。
4. **图标按钮**：`.kB3qhq_iconButton{color:var(--dsw-alias-label-secondary)}`（顶栏/折叠态按钮；折叠时面板行仍用 `label-primary`）——secondary 本轮也加深，故"图标组"同向受益。

**v1 → v2 定量（macOS 生效路径：侧栏透明、底为画布）**

| 项 | v1 | v2 | 变化 |
|---|---|---|---|
| 面板行文字（ink on canvas） | #39332D / #FCFAF6 = **11.95:1** | #2B2620 / #F8F4EA = **13.65:1** | +14.2% |
| 面板行文字（非 macOS，侧栏底 #F0ECE4） | 10.58:1 | 12.72:1 | +20.2% |
| 侧栏 iconButton（label-secondary on canvas） | 5.74:1 | 7.25:1 | +26.3% |
| label-tertiary / label-caption on canvas | 4.42 / 3.00 | 5.22 / 3.79 | +18.1% / +26.3% |
| hover 底色相对画布 | 6% → 对比 1.11:1 | 9% → 1.18:1 | 更可辨 |
| active 底色相对画布 | 10% → 1.19:1 | 14% → 1.28:1 | 更可辨 |

**机制结论（推断，非视觉核验）**：面板行的文字与 currentColor 图标同源，v2 同时加深 ink、画布（macOS 透出画布）与 hover/active，叠加 secondary 加深覆盖 top-strip 图标按钮 → **"加深文字/画布"在机制上足以让面板行/图标组明显变深**。但主题层不改变字重、字号、图标描边宽度；若用户反馈的本质是"太细/发虚"而非"色浅"，则本轮只能部分改善——**这一点必须由页面肉眼确认**。

### 14.5 复核后仍未解决的问题

- **R1（中）README:24/25 两格仍是 v1 值**：`抬升表面` 写 `#F7F2E9`，实际 `--dsw-alias-bg-layer-2` = **#F4EDE2**（README:35 与 design-spec:25 已写 #F4EDE2）；`选中行` 写 `#E7DAC9`，实际 `--dsw-specific-sidebar-nav-item-active` = **#E6D8C6**（design-spec:30 已写 #E6D8C6）。v2 只更新了表内部分单元格。
- **R2（中）design-spec:92 代码色仍是 v1 值**：写 `代码块 #F5F0E7 / 行内代码 #F3EEE5 / 标题条 #EFE9DE`，实际为 **#F2EBDD / #F0E8DA / #ECE3D5**（design-spec:88 自己已写 #F2EBDD；tokens 同名 token 亦为 v2 值）；同句"注释 4.22:1"实际为 **4.27:1**（§5:124 已写 4.27）。
- **R3（中）design-spec:91 的材质百分比过期**：写 `--dsw-menu-surface-fill` "浅色 58% / 深色 52%"，实际 tokens 与 §2.1:32 均为 **62% / 58%**；同句 `--dsw-specific-menu` "86% 不透明暖色"在浅色实际是 **90%**（§2.1:33 已写 rgba(253,250,244,0.90)，深色 86% 正确）；"分组标题用 94% 不透明暖纸"实际为 **浅色 95% / 深色 94%**（`menuGroupFill` = rgba(251,247,239,0.95) / rgba(46,39,33,0.94)）。建议按 §2.1 重写这一句。
- **R4（中）README:136 "全表最低是 caption 3.79:1" 不准确**：24 组全表最低是 **warning state 3.62:1**（其次 caption 3.79、comment 3.87、success 3.95）。caption 只是**文字类**最低；建议改为"文字类最低"。
- **R5（低）README:101 仍写 audit "36 项"**：实际 **38 项**（同文件 :135 已写 38/38）。
- **R6（低）design-spec:127 归因不准确**：文中把"侧栏面板行、元信息与时间戳因此不再发灰"归到 tertiary 加深，但 `panelRow` 用的是 **label-primary**（§4:89 自己也这么写）；面板行变深来自 ink 加深 + macOS 画布加深，与 tertiary 无关。建议把"侧栏面板行"从该句移出。
- **R7（低，继承 §13-R1）design-spec:83 "其它 19" 的枚举仍含"骨架"**：`--dsw-alias-bg-skeleton` 属 bg 组（15），枚举文字实为 20 项 ≠ 数字 19（19 与总数 128 正确）。
- **R8（低/清晰度）README:24-25 未注明 macOS 侧栏透明**：在 macOS 上侧栏实际透出 canvas `#F8F4EA`（`--dsw-specific-sidebar-fill` 不生效）；design-spec:23/150 已写明，README 面向同一平台用户可补一句，避免"以为侧栏是 #F0ECE4"。

### 14.6 结论

**通过**（v2 的功能与数值目标达成；遗留 4 处中级别 + 4 处低级别**纯文档**问题，无实现/数值错误）。

- 24/24 门槛全过、design-spec §5 的 48 个引用值全部吻合；128 token 结构、palette 单一色源与官方覆盖均保持不变；audit 38/38。
- 用户反馈对应的机制核对成立：面板行/图标同用 `label-primary`（macOS 透画布），v2 加深 ink + 画布 + hover/active（+ secondary 覆盖图标按钮）→ 机制上足以变深；但**视觉观感与 HMR 是否已应用到用户窗口仍未验证**。
- 建议收尾：修 R1–R4（文档逐值同步）、顺手处理 R5–R8；然后在能连上页面的会话里看一眼左侧面板行/图标，确认肉眼不再偏淡。

### 14.7 局限

1. 现场 `Theme.listTokens` 本轮 **5 次全部超时**：无法独立复现"页面已热更新 128 token"；仅有静态等效（14 ∪ 128 = 128）与产物一致性。
2. 无截图/视觉核验：**"面板行是否真的不再偏淡"未肉眼确认**，机制推断可测但观感受字重/字号/抗锯齿影响。
3. `currentColor` 证据：Loop Manager glyph 已证；Plugins 行的 ui-primitives 图标组件源码在 app.asar 内不可读，属高置信推断（容器无 color + 库惯例）。
4. 未验证 HMR 具体状态（README:134 的"首版与加深版均已在页面热更新生效"为 Lead 陈述）。
5. 未运行生成器（按约束）；"生成器 24/24"以 palette checks 独立复算等价证明。

---

## 15. v3 macOS 侧栏材质补丁复核

### 15.1 基线与方法

- 复核时间：2026-10-28 13:52（Asia/Shanghai）；对象为 §0 末尾"复核（v3 macOS 侧栏补丁）"表中的版本（mtime 13:49–13:50）。
- 本次**只读**：未改实现/文档、未装卸插件、未运行 `node tools/gen-tokens.mjs`；唯一写入仍是本文件。
- 执行的独立检查：
  - `node tools/audit-theme.mjs` → **39/39，token count 128，exit 0**；
  - `/tmp/v3-sandbox2.mjs`：sandbox 执行生成的 `client.js`（loader stub + fake `document.head` / `createElement('style')`），观测 apply/effect/插入顺序/style 内容/清理；
  - `/tmp/v3-specificity.mjs`：手写特异性计算器，对补丁与官方规则逐条比较；
  - 只读解析 `app.asar`：`/lib/main.js`、`/lib/preload-app.cjs`、`ui-layout`/`ui-theme` 的 client.js、`dsh-web-frontend/dist/{index.html,assets/index-BNyAYEM7.css}`、`/renderer/assets/window-material.css`；以及本地 `dsh-loop-plugins`（与本补丁无关，仅旁证图标用法）；
  - `/tmp/v2-contrast.mjs`：24 组门槛 + design-spec §5 引用值（palette 未变，SHA 与 v2 相同）；
  - 文档 hex/数字扫描（`/tmp/verify-doc-hex.mjs` 等）。
- **现场 `Theme.listTokens` 仍不可用**：本轮 2 次尝试均 10 000 ms 超时；"页面已热更新 / 肉眼不再偏灰"无法由本复核独立复现。

### 15.2 事实链 1：Electron 窗口 + 页面透明（asar 原文核对）

- 主窗口：`/lib/main.js` 的 `createWindow(preload, show, primary)` 中 darwin 分支（抽取副本 `/tmp/asar-main.js:11950-11959`）原文：
  ```js
  ...process.platform === "darwin" ? {
    titleBarStyle: "hiddenInset",
    trafficLightPosition: { x: 16, y: 18 },
    vibrancy: "sidebar",
    visualEffectState: "active",
    backgroundColor: "#00000000"
  } : {},
  ```
  另有 `applyBackdrop()`（`:11983-11996`）：最小化/隐藏时 `window.setVibrancy(null); window.setBackgroundColor(chromeFallbackFill())`，恢复时 `window.setVibrancy("sidebar"); window.setBackgroundColor("#00000000")`。
- **对 Lead 摘要的一处纠偏**：主窗口**没有** `transparent: true`；asar 里 `transparent: true` 只出现在一个子 overlay 窗口的 `create(...)`（`/tmp/asar-main.js:11546`，`parent/modal/frame:false`）。主窗口的透明来自 `vibrancy:'sidebar'` + `backgroundColor:'#00000000'`（以及恢复时的 `setBackgroundColor('#00000000')`）。**根因结论不受影响**，但"窗口 transparent: true"不是主窗口的原文字面。
- 页面透明：`/dsh/node_modules/@deepseek-ai/dsh-web-frontend/dist/assets/index-BNyAYEM7.css`（被 `dist/index.html` 引用）原文含
  `html[data-platform=darwin],html[data-platform=darwin] body{background:transparent}`
  （紧跟 `html[data-platform=darwin] body{isolation:isolate}`）。
- `data-platform` 来源：`/lib/preload-app.cjs` 的 `markDocumentPlatform()`：
  `document.documentElement.dataset.platform = process.platform`（DOMContentLoaded 兜底）；主窗口 preload 正是该文件（`main.js`：`const appPreload = fileURLToPath(new URL("./preload-app.cjs", ...)); ... createWindow(appPreload, false, true)`）。→ `html[data-platform='darwin']` 在 macOS 桌面窗口成立，浏览器（Web）无该属性、Windows 为 `win32`。
- 结论：事实链 1 成立（**页面透明 + 原生 vibrancy 材质**），唯"transparent: true"需按上述纠偏。

### 15.3 事实链 2：ui-layout 的 darwin 冷色渐变（asar 原文）

安装版 `@deepseek-ai/dsh-client-ui-layout/lib/client.js` 内 CSS 原文（抽取副本 `/tmp/v3-ui-layout-client.js`）：

1. 跨平台基础规则：`.PIRFFq_sidebarCol{background:var(--dsw-specific-sidebar-fill);border-right:.5px solid var(--dsw-alias-border-l3);min-width:0;overflow:hidden}`
2. darwin 浅色：`[data-platform=darwin] .PIRFFq_sidebarCol{background:linear-gradient(to bottom, #7a9bf01a, #7a9bf000 35%, #8f89b800 68%, #8f89b817), color-mix(in srgb, color-mix(in srgb, var(--dsw-specific-sidebar-fill) 97%, #7a9bf0) 40%, transparent);border-right:none}`
3. darwin 深色：`[data-platform=darwin] [data-ds-dark-theme] .PIRFFq_sidebarCol{background:linear-gradient(to bottom, #7a9bf014, #7a9bf000 35%, #8f89b800 68%, #8f89b812), color-mix(in srgb, var(--dsw-specific-sidebar-fill) 50%, transparent)}`
4. 降低透明度模式：`@media (prefers-reduced-transparency:reduce){[data-platform=darwin] .PIRFFq_sidebarCol,[data-platform=darwin] [data-ds-dark-theme] .PIRFFq_sidebarCol{background:color-mix(in srgb, var(--dsw-specific-sidebar-fill) 90%, transparent)}}`

- **token 实际占比（精算）**：浅色为 `40% × 97% ≈ 38.8%` 的 sidebar-fill，叠加 `#7a9bf0`/`#8f89b8` 蓝紫渐变（alpha 约 10.2%→9%）；深色为 **50%** fill + 渐变（alpha 约 7.8%→7.1%）；reduced-transparency 为 **90%** fill。Lead 摘要"token 只能影响 40% 的一层"只在浅色近似成立（38.8%），深色 50%、reduce 90%。
- 其余事实：class map 为 `sidebarCol → PIRFFq_sidebarCol`（`rightbarCol → PIRFFq_rightbarCol` 是另一列）；sidebarCol 的 JSX 只有 `className: AppFrame_module_css_default.sidebarCol`（`:336`），**没有** inline background（文件里仅两处 inline `style:`，分别在 `:197` 的滑块定位与 `:319` 的 frame grid 模板）→ 补丁不会被 inline style 压住。
- 结论：事实链 2 成立；纯 token 无法去掉渐变与原生 vibrancy，"token 被稀释 + 蓝紫渐变 + 灰色原生材质"共同造成左侧偏灰。

### 15.4 选择器特异性与级联（light / dark / reduced-transparency 三态）

| 规则 | 选择器 | 特异性 |
|---|---|---|
| Cluade light patch（theme.css:22） | `html[data-platform='darwin'] [class*='_sidebarCol']` | **(0,2,1)** |
| Cluade dark patch（theme.css:26） | `html[data-platform='darwin'] body[data-ds-dark-theme] [class*='_sidebarCol']` | **(0,3,2)** |
| 官方基础（非 darwin 也生效） | `.PIRFFq_sidebarCol` | (0,1,0) |
| 官方 darwin 浅色渐变 | `[data-platform=darwin] .PIRFFq_sidebarCol` | (0,2,0) |
| 官方 darwin 深色渐变 | `[data-platform=darwin] [data-ds-dark-theme] .PIRFFq_sidebarCol` | (0,3,0) |
| 官方 reduced-transparency（同选择器、在 `@media` 内） | 同上两条 | (0,2,0) / (0,3,0)；**媒体查询不增加特异性** |

- **浅色态**：patch light (0,2,1) > 官方浅色 (0,2,0) > 官方基础 (0,1,0) → 补丁胜 ✓（含 reduced-transparency 浅色）。
- **深色态**：patch dark (0,3,2) > 官方深色 (0,3,0) → 补丁胜 ✓；patch light (0,2,1) 会输给官方深色，但两条 Cluade 规则声明**完全相同**（`background: var(--dsw-specific-sidebar-fill)`），最终值一致；且 dark 属性由 ui-layout `ThemePresenter` 保证写在 `body` 上（`DARK_ATTRIBUTE = "data-ds-dark-theme"`，`if (scheme === "dark") body.setAttribute(DARK_ATTRIBUTE, "")`）→ dark patch 一定匹配。
- **reduced-transparency 三态**：补丁规则**没有** media 包裹、特异性更高 → 在 `prefers-reduced-transparency:reduce` 下同样压过官方 `color-mix(... 90%, transparent)`；补丁把该列改成完全不透明暖色。
- **无级联阻断因素**：官方 layout CSS 中 `!important` = 0（sidebar 规则窗口内也是 0）、`@layer` = 0；sidebarCol 无 inline background（见 15.3）；补丁用 `background` **简写**，会重置 `background-image`，因此官方 `linear-gradient(...)` 被整个替换（不是叠加）。
- **顺序无关**：补丁 style 的插入顺序不影响结果（特异性已高；即使先于官方 style 也胜）。三条态的组合（light+reduce、dark+reduce）均已覆盖。

### 15.5 补丁实现与沙箱验证

- `theme.css`（28 行）：注释说明为什么需要 CSS + 两条规则（:22、:26），均声明 `background: var(--dsw-specific-sidebar-fill)`。
- `tools/gen-tokens.mjs`：`:22` `readFileSync('theme.css').trim()`；`:252` 对反斜杠/反引号/`${` 转义；`:260-261` 生成 `const PATCH_CSS = \`...\``；`:295` 打印 `embedded theme.css: N chars`。
- `client.js`（生成文件，198 行）：`PATCH_CSS` 在 `:152` 内联；`apply()`（`:183` 起）在**同一个** `ctx.effect` 内：先 `ctx.theme.overrideTokens(SOURCE, TOKENS)`，再 `document.createElement('style')`、`style.dataset.dshTheme = SOURCE`、`style.textContent = PATCH_CSS`、`document.head.append(style)`；返回的 disposer 先 `disposeTokens()` 再 `style.remove()`。
- **沙箱实测**（fake loader + fake `document.head`）：
  - `apply()` → **恰好 1 个 effect**（label `dsh-theme-cluade: warm palette layer`）；调用顺序为先 `overrideTokens('dsh-theme-cluade', 128 tokens)` 再创建 style（记录到 order）。
  - 只创建/追加 **1 个** `<style>`；`dataset` = `{"dshTheme":"dsh-theme-cluade"}`；`textContent` 含 `html[data-platform='darwin']`、`_sidebarCol`、`var(--dsw-specific-sidebar-fill)`，且**与 `theme.css.trim()` 逐字节相等**（PATCH_CSS 反解转义后 1353==1353 字符）。
  - 调用 disposer：token 层被 dispose（`tokenDisposed=true`）**且** style `removed=true`；再次 apply 只新增 1 个 style（框架先 dispose 旧 effect 的情况下不会累积）。
- **audit 复跑**：`39/39`，其中新增两项断言（`:170` 补丁插入：`styles.length===1` + 三个子串；`:177` disposer 同时移除 token 层与 patch）；脚本注释 "token data: 128 tokens" 已同步，但头部 Checks 清单尚未写 patch（见 §15.7-R7）。审计条目数 39 = 19 个 `expect` + 10 对对比度 ×2。
- **不变项复核**：`palette.json`/`tokens.json` 的 SHA 与 v2 相同（未变色）；128 token 结构与 palette 可回溯性不变；24/24 对比度门槛与 §5 的 48 个引用值仍全部吻合。`package.json` version **0.2.0**、`files` 含 `theme.css`；`gen-tokens` 重跑后 `tokens.json` SHA 未变（生成确定性也得到旁证：mtime 更新而内容 SHA 不变）。

### 15.6 平台隔离与失败降级

| 场景 | 行为 | 证据/判断 |
|---|---|---|
| Web（浏览器） | 补丁 style 虽被注入，但选择器要求 `html[data-platform='darwin']`；浏览器无该属性 → 不匹配、无视觉影响 | `data-platform` 仅由桌面 preload 写（15.2）；选择器见 theme.css:22/26 |
| Windows 桌面 | `data-platform=win32` → 不匹配；官方 Windows 标题栏/侧栏样式照旧 | 同上 |
| macOS 桌面 | 两种规则匹配 → 侧栏列改为不透明 `--dsw-specific-sidebar-fill`（浅 #F0ECE4 / 深 #161311） | 15.4 特异性表 |
| DSH 升级改名 `_sidebarCol` 或 `data-platform` | 选择器不匹配 → **静默退回官方渐变**，无 JS 报错、不破坏渲染 | theme.css:18-20、design-spec:151 的说法与机制一致 |
| 插件禁用/卸载 | disposer 移除 token 层 + style → 官方 vibrancy/渐变立即回来 | 沙箱实测（15.5） |
| 无网络/无配置/无工具注册 | 补丁纯 DOM/CSS：client.js 无 fetch/XHR/localStorage/cookie；不写配置、不发请求 | `grep` client.js 结果为 none |
| 风险：`[class*='_sidebarCol']` 子串匹配 | 当前 build 只匹配 `PIRFFq_sidebarCol`（`rightbarCol` 不匹配）；未来若出现 `_sidebarCollapsed`/`_sidebarColRight` 等类名也会误匹配 | 本次仅存在 1 个含该子串的类（class map 两条：sidebarCol/rightbarCol）；文档只写了"改名失效"风险，未写"误匹配"风险（§15.7-R9） |
| 风险：HMR 重复注入 | 正常框架会先 dispose 旧 effect；若异常路径不 dispose，会多一个同内容 style（样式结果相同） | 沙箱二次 apply 每次 1 个 style；HMR 真实路径未验证 |

### 15.7 文档一致性核对（README / design-spec / theme.css / 工具注释）

| # | 位置 | 说法 | 实际 | 判定 |
|---|---|---|---|---|
| 1 | README:33 | macOS 侧栏由原生 vibrancy + 冷色渐变绘制、纯 token 覆盖不到、补丁重绘、Web/Windows 不受影响 | asar 全部核实（15.2/15.3）；补丁只匹配 darwin | ✅ |
| 2 | README:85 / 96 / 105 / 139 | theme.css 内联进 bundle；文件清单含 theme.css；audit 39 项；39/39 | 实测：PATCH_CSS 内联、package files 含 theme.css、audit 输出 39/39 | ✅ |
| 3 | package.json | version 0.2.0、files 含 theme.css | 实测一致 | ✅ |
| 4 | design-spec:87 | §4 描述补丁及与其它平台一致 | 与 ui-layout 基础规则用同一 token | ✅ |
| 5 | design-spec:105 | label-primary on sidebar 12.72 / 15.49 | 补丁后 macOS 侧栏底就是 #F0ECE4/#161311，这两个数现在对 macOS 也成立 | ✅（并成为修正 #6 的依据） |
| 6 | **README:140 / design-spec:89** | "**侧栏面板行 13.65:1**" | 补丁后 macOS 侧栏底 = `--dsw-specific-sidebar-fill`：#F0ECE4（浅）/#161311（深）；面板行 ink 对比度实际为 **12.72:1 / 15.49:1**。13.65:1 是 v2 "侧栏透出画布 #F8F4EA" 的旧假设 | ❌ **数字过期（R1）** |
| 7 | design-spec:127 | 面板行用 label-primary、深色由 theme.css 重绘 | 与机制一致（v2 的归因已修） | ✅ |
| 8 | design-spec:144 / :151 | 改 theme.css 后重生成内联；§8 说明机制、代价、风险 | 与 gen-tokens/theme.css 一致 | ✅（§8 未提"启用即不透明"，见 R5） |
| 9 | theme.css:4-20 | 原生 vibrancy + 冷渐变、~40% fill、suffix 匹配、禁用即恢复、改名静默降级 | 与 asar/实测一致；"~40%"只对应浅色（深色 50%、reduce 90%）；"shell paints the left column"严格说是 web CSS（ui-layout）在画 | ⚠️ 近似（R5） |
| 10 | README:129 | 兼容性首条"只依赖 ui-theme 提供的 ctx.theme" | 包依赖层面成立；但新补丁还依赖 ui-layout 的 **CSS Module 类名后缀** 与 **data-platform 属性**（design-spec:151 已写风险，README 兼容段未提） | ⚠️ 不完整（R2） |
| 11 | README:66-77 | "原理"代码块标为 `client.js（生成文件）` | 真实生成文件多了 style 插入、effect 回调形态，且 label 由 `warm token layer` 变为 `warm palette layer`；代码块是旧版简化示意 | ❌ 滞后（R3） |
| 12 | README:138 | 运行期证据"首版与加深版均已在页面热更新生效" | 未提 v3 补丁；README:9 又提示"若仍灰按 Cmd+R"，两处状态口径不一致（且 HMR 状态本复核无法验证） | ⚠️ 滞后（R4） |
| 13 | README:33 / design-spec:151 | 重绘为暖色 `#F0ECE4` | 只给浅色值；深色为 `#161311`（design-spec §8 说"深色单独一条"） | ⚠️ 轻微（R8） |
| 14 | v2 遗留 R1–R8（§14.5） | 上一轮文档问题 | 本轮文档更新已修：README:24/25 已是 #F4EDE2/#E6D8C6；README:101 已写 39 项；README:140 最低值改为 warning 3.62 + 文字类最低；design-spec:91/92/124/127 已改；§3 "其它"枚举已删"骨架"；macOS 说明已补；§5 取舍指向 reference-analysis §8 | ✅ 已修 |
| 15 | 文档 hex 扫描 | — | 未在产物中找到的仅 3 类、均为预期：README:31 `#4176E6`（官方原蓝）、design-spec:151 `#7a9bf0`（官方渐变蓝）、design-spec:129 迭代记录旧值（故意） | ✅ 无意外漂移 |

### 15.8 复核结论

**通过**（补丁的机制、特异性、级联、平台隔离、清理与降级全部成立；无功能性缺陷；遗留为文档/审计同步项）。

- 任务 6 项要求逐条结论：
  1. asar 原文：事实链 1、2 **成立**；唯 Lead 摘要里"窗口 `transparent: true`"应纠正为"主窗口无该属性（仅 overlay 子窗口有），主窗口靠 vibrancy + 透明 backgroundColor"；"token 只影响 40%"浅色精算为 **38.8%**、深色 50%、reduce 90%。
  2. 特异性：light/dark/reduced-transparency **三态都被补丁压过**；无 `!important`/`@layer`/inline background 阻断；`background` 简写可整体替换官方 gradient。
  3. 沙箱：apply 仅 1 个 effect；先 overrideTokens 再插 style；style 内容含 darwin 限定/`_sidebarCol`/`var(--dsw-specific-sidebar-fill)` 且与 theme.css.trim() 逐字节相等；disposer 同时移除 token 层与 style；`audit-theme.mjs` **39/39、128 token**。
  4. 降级：只匹配 darwin（Web/Windows 不受影响）；类名/属性改名只会静默退回官方渐变，不报错不破坏渲染；禁用即恢复官方材质。
  5. 文档：README/design-spec/theme.css 对补丁的描述**总体一致**，但正文有 **1 处中级别数字过期（R1）** 与若干低级别滞后（R2–R9）。
  6. 未验证：真实页面是否已热更新、肉眼是否不再偏灰、HMR 状态、真实浏览器 CSS 引擎执行（无截图能力）、类名后缀跨版本稳定性。

**遗留问题（按严重度）**

- **R1（中）README:140 & design-spec:89 的"侧栏面板行 13.65:1"已过期**：v3 补丁把 macOS 侧栏底从"透出画布"改为不透明 `--dsw-specific-sidebar-fill`，面板行实际对比度 = **12.72:1（浅）/ 15.49:1（深）**；13.65 是 v2 的旧假设。建议改成 12.72（或并列 12.72/15.49），并与 design-spec:105 的用词统一（"on sidebar"）。
- **R2（低）README:129 兼容性首条不完整**：补丁新增对 ui-layout CSS 内部（类名后缀 `_sidebarCol` + `data-platform`）的依赖；design-spec:151 已写风险，README 兼容段应补一句指向该节或 README:33。
- **R3（低）README:66-77 原理代码块滞后**：标注 `client.js（生成文件）` 但内容缺 style 插入、effect 形态不同、effect label 是旧值；建议更新片段或标"简化示意"。
- **R4（低）README:138 运行期证据未覆盖 v3**：只说"首版与加深版热更新生效"；与 README:9 "仍灰则 Cmd+R" 的状态口径需统一（并注明补丁也需随 bundle 重新加载）。
- **R5（低）theme.css 注释/§8 未写清两点**：(a) "~40%"只对浅色，深色 50%、reduced-transparency 90%；(b) **启用补丁后侧栏变成不透明暖色**（原生 vibrancy 在侧栏区域被替代，含 reduced-transparency），只在"移除后恢复 translucency"处隐含。建议显式写为设计取舍。
- **R6（低）audit 的内容断言不足**：39 项只断言补丁含三个子串 + 清理，**未断言内联 PATCH_CSS 与 theme.css.trim() 相等**，也未单独断言 dark 规则；若改了 theme.css 忘记重生成，审计仍会通过（内容仍是旧字符串）。建议加 equality 断言（我本轮用 /tmp 脚本补了这个检查）。
- **R7（低）工具注释滞后**：`tools/audit-theme.mjs` 头部 Checks 清单未提 patch 检查（代码已有）；`tools/gen-tokens.mjs` 头部仍写 "from design/palette.json / reads one palette file"，实际还读 theme.css；`client.js` 生成头 "edit design/palette.json or the mapping…" 未提 theme.css（PATCH_CSS 注释有提）。
- **R8（极低）README:33 只给浅色值**：macOS 重绘为暖色 `#F0ECE4` 未提深色 `#161311`。
- **R9（风险，不阻塞）**：`[class*='_sidebarCol']` 是子串匹配；当前 build 只有 `PIRFFq_sidebarCol`，但未来新增 `_sidebarCollapsed`/`_sidebarColRight` 之类会误匹配。建议注释/§8 标注该风险，或评估改用更精确的匹配（如 `[class$='_sidebarCol']`——注意它不匹配"类名后还有其它类"的情形，需权衡）。

**局限**

1. 现场 `Theme.listTokens` 本轮 2 次超时：无法独立确认页面已加载 v3 bundle；HMR/刷新状态未验证。
2. 无截图/视觉核验：**"左侧是否不再偏灰"未肉眼确认**；结论止于 CSS 特异性与产物级正确性。
3. 未在真实浏览器里执行 CSS 级联（无 headless 浏览器权限/未安装）；特异性由计算器 + 静态分析得出，误差风险低（且无 `!important`/`@layer`/inline style）。
4. 类名后缀、`data-platform` 属性属于安装版实现细节，跨 DSH 版本可能变（文档已承认静默降级）。
5. 未运行生成器（按约束）；`PATCH_CSS == theme.css.trim()` 与 tokens 一致性用只读比对/沙箱执行等价证明，生成确定性另由 `tokens.json` SHA 未变旁证。

---

## 16. v4 选中项与思维链补丁复核

### 16.1 基线与方法

- 复核时间：2026-10-28 14:02（Asia/Shanghai）；以 §0 末尾"复核（v4…）"表为准（含复核期间 14:00:54 补入的 `:focus-visible` 规则）。
- 只读复核：未改实现/文档、未装/卸插件、未运行 `node tools/gen-tokens.mjs`；唯一写入仍是本文件。
- 执行的检查：`node tools/audit-theme.mjs` → **43/43、token 131、exit 0**；`/tmp/v4-sandbox.mjs`（loader stub + fake document，验证 131 token/样式插入/CSS 等值与清理）；`/tmp/v4-final-checks.mjs`（26/26 门槛、26 组 §5 引用值、token/palette 结构）；从安装版 asar 抽取 **web-frontend dist**（CSS+JS）、ui-workspace、ui-sidebar、ui-theme、ui-chat 的 CSS/JSX 核对真实类名、属性与官方规则（按 Lead 要求不做全量 asar 扫描）；`/tmp/v3-ui-theme-client.js` 复核 `validateOverrides` 对自用变量名的接受度。
- 现场 `Theme.listTokens` 本轮 1 次尝试仍 10 s 超时；HMR/视觉不可验证。

### 16.2 真实类名 / 属性证据（全部来自安装版 asar）

| 目标 | 真实证据（安装版文件） | 官方样式（原文） |
|---|---|---|
| 菜单选中项 | web-frontend `dist/assets/index-BXV-oxvX.js` 有类表 `selected:"_selected_4ub78_216"`、`selectedFill:"_selectedFill_4ub78_221"`；JSX：`className: he(Ne.item, G&&(S==="fill"?Ne.selectedFill:Ne.selected))`（G=被选中；仅 `selection style === "fill"` 时挂 `_selectedFill`）；CSS 在 `index-BNyAYEM7.css` | `._selectedFill_4ub78_221{background:var(--dsw-alias-interactive-bg-hover)}` (0,1,0)；`._item_4ub78_90:hover:not(:disabled)` 与 `:focus-visible:not(:disabled)` 均为 (0,3,0) hover 底色 |
| 会话行 / 搜索结果行 | ui-workspace `Rows.module.css`：`JoiKIa_sessionRow` + `JoiKIa_selected`、`JoiKIa_searchResultRow` + `JoiKIa_selected`；JSX `clsx(sessionRow, selected && selected, …)`（仅选中挂 selected） | `.JoiKIa_sessionRow:hover,.JoiKIa_sessionRow.JoiKIa_selected{background:interactive-bg-hover}` (0,2,0)；searchResultRow 同 |
| 侧栏面板行 | ui-sidebar：`kB3qhq_panelRow` + `kB3qhq_panelActive` | `.kB3qhq_panelRow:hover` / `.panelRow.kB3qhq_panelActive{background:interactive-bg-hover}` (0,2,0) |
| 外观方块 | ui-theme `AppearanceRow.module.css`：`RrNL-q_themeCube` + `RrNL-q_selected` | `.RrNL-q_selected{background:var(--dsw-alias-bg-module-platform);border-color:var(--dsw-static-neutral-bluish-400)}` (0,1,0)；`.themeCube:hover:not(.selected)` (0,3,0) |
| 思维链输出区 | ui-chat `ReasoningRow`：根 `className: ijfCxa_root`，属性 `data-variant="think"`、`data-expanded: expanded || void 0`（仅展开时）、`data-state`；DisclosureRow 内 sticky 头带 `[data-disclosure-header]` | `.ijfCxa_root{…}` (0,1,0)；`.ijfCxa_root[data-expanded] [data-open] [data-disclosure-header]{position:sticky;background:var(--dsw-alias-bg-base)}` **(0,4,0)** |

- 选中/展开语义核对通过：三处选中类都只在"选中"时挂载（菜单 `G&&…`、会话/搜索结果 `selected && selected`），因此补丁只影响选中态，**普通 hover 不被触碰**（与 README:94 / design-spec:100 / theme.css:39-43 的说法一致）。
- 自用变量名可被运行时接受：安装版 ui-theme 的 `validateOverrides()` 只校验 `{light,dark}` 形状（未限制 `--dsw-` 前缀），ThemePresenter 会把 snapshot 里所有名字写成 body 内联自定义属性；`--cluade-*` 以 `--` 开头、是合法自定义属性 ✓。缺失时 theme.css 均带 fallback（`module-platform` / `layer-2` / `border-l3`），降级安全。

### 16.3 特异性逐条（全部压过官方）

| 目标 | 官方规则（特异性） | Cluade 规则（theme.css 行） | 结果 |
|---|---|---|---|
| 菜单选中底 | `._selectedFill…` (0,1,0) | `body [class*='_selectedFill']` (0,1,1)（:50） | ✅ |
| 菜单选中+hover | `._item:hover:not(:disabled)` (0,3,0) | `body [class*='_selectedFill']:hover:not(:disabled)` (0,3,1)（:51） | ✅ |
| 菜单选中+键盘焦点 | `._item:focus-visible:not(:disabled)` (0,3,0) | `body [class*='_selectedFill']:focus-visible:not(:disabled)` (0,3,1)（:52，复核期间补入） | ✅（此前是缺口，已由 Lead 修复；本轮已核实） |
| 会话行选中 / 搜索结果行选中 | `.JoiKIa_sessionRow.JoiKIa_selected` (0,2,0) 等 | `body [class*='_sessionRow'][class*='_selected']` / `[class*='_searchResultRow'][class*='_selected']` (0,2,1)（:55-56） | ✅ |
| 面板行选中 | `.kB3qhq_panelRow.kB3qhq_panelActive` (0,2,0) | `body [class*='_panelRow'][class*='_panelActive']` (0,2,1)（:57） | ✅ |
| 外观方块选中 / 暖描边 | `.RrNL-q_selected` (0,1,0)；border-color 同规则 | `body [class*='_themeCube'][class*='_selected']` (0,2,1)（:58、:62-64） | ✅（hover-unselected (0,3,0) 不含 selected，不冲突） |
| 思维链根节点底/描边/圆角 | `.ijfCxa_root{…}` (0,1,0) | `body [class*='_root'][data-variant='think'][data-expanded]` (0,3,1)（:74-81） | ✅ |
| 思维链 sticky 头底色 | `.ijfCxa_root[data-expanded] [data-open] [data-disclosure-header]` (0,4,0) | `body … [data-disclosure-header]` (0,4,1)（:83-85） | ✅ |

- 所涉官方规则均**无 `!important`**，`background` 简写可整块替换官方值；补丁选择器以 `body` 开头只增加 type 计数，不引入误伤（每个选择器都用 `[class*=…]` 限定到上述组件的类名 token）。
- `[class*='_root']` 很宽，但同时要求 `data-variant='think'` + `data-expanded` 同一元素，当前仅 ReasoningRow 满足（同文件另一个 `data-variant` 是 `"others"`）→ 未误伤其它卡片。
- 新 focus 规则与官方 focus 规则同为 (0,3,x)，补丁 (0,3,1) 胜出；**键盘聚焦选中菜单项不再闪回官方浅灰**（这一点是本轮复核期间 Lead 修补的，已核实）。

### 16.4 沙箱、审计与计数（独立复算）

- 沙箱跑 `client.js`：apply → **1 个 effect**；`overrideTokens('dsh-theme-cluade', 131)`；3 个自用变量形状正确（`--cluade-selected-fill` #E7D7C7/#413529、`--cluade-reasoning-fill` #F5EBDF/#201B16、`--cluade-reasoning-border` #DFD0BB/#3E352B）；只插入 1 个 `<style data-dsh-theme>`，其 `textContent` 与 **theme.css.trim() 逐字节相等**（含 `_selectedFill`、`[data-variant='think']`、`:focus-visible` 新规则、darwin 侧栏规则）；disposer 同时移除 token 层与 style。
- `node tools/audit-theme.mjs` → **43/43，token 131**。43 = 19 个 `expect` + **12 对**对比度 ×2；其中已包含新加的 2 对（`selected option text`、`reasoning body text`）。审计的补丁断言现已**比对 `styles[0].textContent === read('theme.css').trim()`**（drift 会失败），也断言了 dark 规则 —— v3 的审计缺口已补。
- token/palette 结构：tokens **131**（=128+3）；palette **113** 色全部被使用、131 个 token 的 light/dark 对 **100% 可回溯**到 palette；分组 bg15/border7/label13/brand4/button15/interactive5/state12/markdown8+shiki11/diff8/specific11/其它 **22** = 131（与 design-spec §3 "其它 22" 一致）。
- 对比度：**26/26 门槛通过**；design-spec §5 的 **26 行 × 2 = 52 个引用值全部吻合**（新增两行：selected option **10.67/9.96**、reasoning body **12.73/14.30**，实测一致，Δ≤0.006）。
- 文档计数：README 131/117/26/43/0.3.0 与产物一致；design-spec §2.5 三色、§3、§5 26 行、reference-analysis "117 个（含 3 个 --cluade-*）" 均已同步；未发现 128/114/24 组/39/0.2.0 的残留（旧值只出现在 design-spec 迭代记录里，属有意保留）。

### 16.5 机制有效性与数值观察（非视觉核验）

- **选中项**：`--cluade-selected-fill` 浅 #E7D7C7 / 深 #413529，与用户参考图取样一致；它替换的原值分别是：菜单/会话行/搜索结果行/面板行 = `interactive-bg-hover`（浅灰叠加）、外观方块 = `bg-module-platform`（#EFE2CF）。改后从"灰洗/浅平台色"变为**暖橘实色**，且普通 hover 保持原 token（未覆盖）——方向与用户诉求一致。
- **思维链**：fill #F5EBDF/#201B16、border #DFD0BB/#3E352B（与用户参考取样一致）。量化：fill vs 画布 **1.07（浅）/1.04（深）**、border vs fill **1.28 / 1.42**、border vs 画布 **1.38 / 1.47** —— 属"略深/低对比"档，是否符合"明显边框"需肉眼确认（若仍偏淡，加深 `reasoningBorder` 即可）。
- 几何副作用：该补丁给根节点加了 `box-sizing:border-box / margin:4px 0 / padding:6px 10px / border:1px / border-radius:var(--dsw-radius-md)`，并把 sticky 头底色同步成 fill；这是 v4 新增的**结构/几何改动**（见 §16.6-R1），视觉上是否有挤压/圆角与 sticky 头错位等未验证。

### 16.6 文档一致性核对

| # | 位置 | 说法 | 实际 | 判定 |
|---|---|---|---|---|
| 1 | README:31-33、design-spec:70-73 | 两个新色角色与值 | 与 tokens.json 完全一致 | ✅ |
| 2 | README:94、design-spec:97-101 | 补丁覆盖的组件与"普通 hover 保持轻量" | 与 16.2/16.3 的类名/属性/特异性一致；非选中 hover 确实未被覆盖 | ✅ |
| 3 | README:105 | `theme.css` = "macOS 侧栏材质补丁源码" | 文件现含 **三类**补丁（侧栏 + 选中项 + 思维链），描述不完整（theme.css:2 的文件头标题同样只写 macOS sidebar） | ❌ 低（R2） |
| 4 | README:138 | 兼容性只提"macOS 侧栏补丁耦合 layout 类名/data-platform" | 选中/思维链补丁还耦合 `_selectedFill`/`_sessionRow`/`_searchResultRow`/`_panelRow`/`_themeCube`/`data-variant`/`data-expanded`/`data-disclosure-header`（design-spec:167 已写） | ⚠️ 低（R3） |
| 5 | design-spec:13、README:133 | "只改颜色，不改结构…还原回滚都是卸掉一层 CSS 变量" | v4 的思维链补丁改 margin/padding/border/box-sizing/radius（几何），回滚还要移除 style 标签；token 层本身仍只改颜色 | ❌ 中（R1） |
| 6 | design-spec:158 / 167 | 侧栏补丁 darwin-only；选中/思维链依赖组件内部约定 | 与实测一致；但未明说选中/思维链补丁对**所有平台**生效（Web/Windows 也生效），"其它平台与 token 层不受影响"易被误读 | ⚠️ 低（R4） |
| 7 | README:147-149 | 131 token / 43/43 / 26 组 / 面板行 12.72、15.49 | 全部与实测一致（v3 的数字问题已修） | ✅ |
| 8 | tools/audit-theme.mjs:172-181 | 检查名 "macOS sidebar material patch"，断言内容仅 sidebar 字符串 + 与 theme.css 等值 | 等值断言已覆盖全部三类补丁；但若 theme.css 删掉选中/思维链选择器，审计不会失败（只查等值不查存在性）；检查名也滞后 | ⚠️ 低（R5） |
| 9 | README 原理代码块（:70-88） | 已更新为包含 PATCH_CSS 插入/清理的生成文件节选 | 与 client.js 实际结构一致（v3 的滞后已修） | ✅ |
| 10 | theme.css:39-43 注释 | "These rules touch only the 'selected' state, never plain hover." | 语句本身成立；但复核期间新增的 `:focus-visible` 未在注释里提及（注释可更新） | ⚠️ 极低 |

### 16.7 复核后仍存在的问题（按严重度）

- **R1（中）design-spec:13 的原则与 v4 实现冲突**：原则仍写"只改颜色，不改结构……还原与回滚都是卸掉一层 CSS 变量"，而 v4 的思维链补丁刻意改了 box 几何（margin/padding/1px border/border-radius），且回滚还会移除 `<style>`。建议把原则限定为"token 层只改颜色；组件补丁仅对思维链加边框/圆角/内边距"，并在 README"不改变"段（:133-134）补一句补丁的几何范围。
- **R2（低）README:105 / theme.css:2 的补丁描述滞后**：都只称 macOS 侧栏材质补丁；建议改为"侧栏材质 + 选中项 + 思维链区块补丁"。
- **R3（低）README:138 兼容段不完整**：只列 macOS 侧栏耦合；选中/思维链补丁对组件 CSS Module 后缀与 `data-variant/data-expanded` 的耦合应补一句（可指向 design-spec §8:167）。
- **R4（低）平台范围表述**：选中/思维链补丁是**全平台**生效（theme.css 无 darwin 限定），README/design-spec 未显式说明；"其它平台与 token 层不受影响"（§8:167）只应修饰"改名降级"语境，建议补半句避免误读。
- **R5（低）审计内容断言/命名**：43 项已做 `PATCH_CSS === theme.css.trim()`（很好），但没有断言 theme.css 仍包含 `_selectedFill`/`[data-variant='think']` 等状态选择器——误删这些整节时审计仍过；检查名（"macOS sidebar material patch"）与现在三类补丁不符。建议加两行 includes 断言并改名。
- **R6（需视觉确认，非文档错误）"明显边框/略深底色"的对比度偏低**：border vs fill 1.28–1.42、fill vs 画布 1.04–1.07；颜色与用户参考取样一致，但 1px 低对比是否"明显"须肉眼判断。若反馈仍偏淡，优先调深 `reasoningBorder`（例如向 #C9B79E 靠）。
- **R7（信息）菜单补丁只覆盖 `selection style === "fill"` 的菜单**：`check` 风格菜单用勾选图标、不铺底（代码 `G&&(S==="fill"?selectedFill:selected)`），这与"菜单 `_selectedFill`"的文档表述一致，不覆盖 check 风格不是缺陷；可在文档注明覆盖范围。
- **R8（未验证项）**：现场 `Theme.listTokens`（本轮 1 次超时）、HMR 是否已应用 v4、真实页面观感（选中是否够橘、思维链边框是否明显、几何副作用）均未核验；组件类名/属性改名时静默降级（design-spec:167、README:138 已写明）。

### 16.8 结论

**通过。** v4 的实现与用户两条诉求的机制对应成立，产物/数值/文档计数自洽：

- 真实类名与属性全部核实（menu `_selectedFill_4ub78_221`、workspace session/search row、sidebar panelRow/panelActive、theme `themeCube/_selected`、chat `ijfCxa_root[data-variant=think][data-expanded]` + `[data-disclosure-header]`）；
- 逐条特异性均压过官方（含复核期间新增的 `:focus-visible`，菜单选中在 hover/focus 下都保持暖底）；只影响选中态，普通 hover 不变；
- 沙箱：131 token、3 个自用变量、CSS 与 theme.css.trim() 逐字节一致、清理同时移除 token 层与 style；audit **43/43**；
- 26/26 门槛与 design-spec §5 的 52 个引用值全部吻合；palette 113 色全用、token 131 可回溯；README/design-spec/reference-analysis 计数一致。

遗留为 1 处中级别文档原则冲突（R1）与若干低级别同步项（R2–R5），以及"明显边框"需视觉确认（R6）；无功能性/数值缺陷。

**局限**：现场 `Theme.listTokens` 超时、无截图/无真实浏览器级联执行，视觉与 HMR 状态无法独立核验；类名/属性属安装版实现细节，跨 DSH 版本可能静默降级（文档已声明）；复核期间 Lead 更新过一次 theme.css（focus 规则），本报告以 14:00:54 后版本为准。

---

## 17. v5 Markdown 皮肤复核

### 17.1 基线与方法

- 复核时间：2026-10-28 14:19（Asia/Shanghai）；基线为 §0 末尾"复核（v5 Markdown 皮肤）"表。
- 只读复核：未改实现/文档、未装/卸插件、未运行 `node tools/gen-tokens.mjs`；唯一写入仍是本文件。
- 执行的检查：`node tools/audit-theme.mjs` → **61/61、token 168、exit 0**；`/tmp/v5-sandbox.mjs`（168 token、CSS 拼接逐字节、清理）；`/tmp/v5-final.mjs`（35/35 门槛 + 逐行解析 design-spec §5 的 70 个引用值）；`/tmp/v5-checks.mjs`（palette/token 结构、分组、抽样对比度）；从安装版 asar 抽取 web-frontend dist（JS+CSS）、ui-chat、ui-sidebar-documentpreview 核对容器/结构类名、官方规则与 shiki 渲染机制。
- 现场 `Theme.listTokens` 本轮 1 次仍 10 s 超时；HMR/视觉不可验证。

### 17.2 容器与结构证据（安装版 asar，未照抄）

| 项 | 证据 |
|---|---|
| 共用渲染器 | `MarkdownText` 由 web-frontend 的 primitives 导出（`MarkdownText:_w`）；**ui-chat** 多处渲染 `_deepseek_ai_dsh_client_ui_primitives.MarkdownText`（assistant text、compaction summary）；**ui-sidebar-documentpreview** 的 `MarkdownBody` 也渲染同一个 `MarkdownText`（`MarkdownBody_module_css_default.document` + `data-document-markdown`）→ "聊天 + 文档预览共用一套渲染器"属实 |
| 根类名 / 紧凑变体 | `_w` 组件：`className: he(St.markdown, l==="compact" && St.compact)`，`St.markdown="_markdown_1ypvv_5"`、`St.compact="_compact_1ypvv_331"`；`variant` 默认 `"body"`。→ 作用域 `[class*='_markdown']:not([class*='_compact'])` 能命中正常容器、排除紧凑变体 |
| 结构类 | `_tableScroll_1ypvv_192`、`_tableFill_1ypvv_239`、`_image_1ypvv_287`；代码块为 `className: he(Tn.block, "md-code-block", …)`，内部 `_block_7gxqk_4` / `_bannerWrap_7gxqk_24` / `_infostring_7gxqk_45` / `_shiki_7gxqk_93`；宽表格由 JS 挂 `md-table-wide`（`_tableScroll` 加上该类）→ 与 markdown.css 的 `.md-code-block` / `[class*='_banner']` / `[class*='_tableScroll']` / `md-table-wide` 选择器一致 |
| shiki 机制 | 渲染器用 shiki 的 **css-variables** 主题（`variablePrefix:"--shiki-"`）：外层 `style:{backgroundColor:"var(--shiki-background)", color:"var(--shiki-foreground)"}`，token span 的 inline style 为 `var(--shiki-token-*)`。官方 `pre._shiki_7gxqk_93{background:var(--dsl-code-block-background)!important}` 也走变量。→ 在 `.md-code-block` 作用域重绑 `--shiki-*` / `--dsl-code-block-*`，**无需覆盖 !important 即可换色**：变量重绑成立 |
| Official 基础规则 | `.markdown{font:…;color:label-primary}`、`.markdown h1{font:…;margin:32px 0 16px}`、`.markdown p{margin:16px 0}`、`.markdown :not(pre)>code{…;font-size:.875em!important;…}`、`.tableScroll th/td{…}`、`th:first-child{padding-left:0}`、`.markdown>*:first-child/p:first-child{margin-top:0!important}`（last-child 同理）、`.image{border-radius:radius-md;background:bg-base}` 等（均取自 `index-BNyAYEM7.css`） |

### 17.3 特异性抽样（该赢的赢、该让的让）

| 目标 | 官方（特异性） | Cluade（特异性） | 结果 |
|---|---|---|---|
| Markdown 基准字号/行高/正文色 | `.markdown` (0,1,0) | 作用域根 (0,2,1) | ✅ 胜 |
| H1–H6 / p / strong | `.markdown h1` 等 (0,1,1) | (0,2,2) | ✅ 胜 |
| 链接 / 链接 hover | `.markdown a` (0,1,1)；hover (0,2,1) | (0,2,2)；(0,3,2) | ✅ 胜 |
| 行内代码 | `.markdown :not(pre)>code` (0,1,2)，其中 **font-size:.875em!important** | (0,2,3) | 非 !important 属性胜；**font-size 仍为官方 .875em**（"让"） |
| 表格 th/td、首末列 | `.tableScroll th/td` (0,1,1)、(0,2,1) | (0,3,2)、(0,4,3) | ✅ 胜 |
| 表格外框/宽度 | `.tableScroll` (0,1,0)、`.tableScroll table` (0,1,1) | `…:not(.md-table-wide)` (0,2,1)/(0,2,2) | ✅ 胜（且宽表格被排除，见 §17.6-R1） |
| 引用块 / 图片 | `.markdown blockquote` (0,1,1)；`.image` (0,1,0) | (0,2,2)；(0,2,2) | ✅ 胜 |
| 代码块变量重绑 | `.block` 变量定义 (0,1,0) | `.md-code-block` (0,3,1) | ✅ 胜（变量被覆盖） |
| `pre._shiki` 背景 `!important` | `._block :where(pre._shiki)` (0,1,0)+`!important`，值 `var(--dsl-code-block-background)` | 不直接覆盖；重绑 `--dsl-code-block-background` | ✅ 生效（凭变量而非覆盖） |
| 顶部信息条 / info string | `.bannerWrap{background:bg-base}` (0,1,0) 等 | (0,3,1) | ✅ 胜 |
| 首/末元素 margin | `.markdown>*:first-child/p:first-child`（**!important**） | 普通声明 | ⚠️ 官方 !important 胜（如 H2 作为首元素时上边距为 0）——设计上"让" |
| `_compact` 上下文 | `._compact :not(pre)>code{font-size:1em!important}` 等 | 作用域 `:not([class*='_compact'])` | ✅ 完全排除，不参与 |

### 17.4 沙箱、审计、计数与对比度

- 沙箱：apply → 1 个 effect；`overrideTokens(168)`；`--cluade-md-*` **37** 个（含 9 个 `--cluade-md-syn-*`），`--cluade-*` 合计 **40**；`PATCH_CSS` 与 `theme.css.trim() + "\n\n" + markdown.css.trim()` **逐字节相等**，含 Markdown 作用域/`.md-code-block`/`--shiki-*` 重绑；disposer 同时移除 token 层与 style。
- audit：**61/61、token 168**（61 = 19 expect + 21 对对比度 ×2；新增 9 对 Markdown 门槛）。审计已断言 `styles[0].textContent === theme.css + markdown.css` 且包含 `[class*='_markdown']`，检查名也已改为 "component patches (sidebar / selected / reasoning / markdown)"。
- 结构：168 token；palette **150 色**、全部被使用、168 个 token 的 light/dark 对 100% 可回溯；分组 bg15/border7/label13/brand4/button15/interactive5/state12/md+shiki19/diff8/specific11/其它19/`--cluade-*`40 = **168**（与 design-spec §3 一致）。
- 对比度：**35/35 门槛通过**；逐行解析 design-spec §5（35 行 × 浅/深 = **70 个值**）与 palette 实算 **0 处不一致**（含新 9 行：body 8.25/11.86、heading 10.19/14.46、link 4.71/6.74、inline 4.80/6.38、quote 4.77/6.25、code block 8.87/12.86、table head 4.81/6.85、syn keyword 6.28/7.61、syn comment 4.32/4.50）；浅色模式深代码块文字 8.87:1、深色 12.86:1。
- 计数：README 168/154/35/61、文件清单与 package `files` 含 `markdown.css`、version **0.4.0**；design-spec §2.6/§3/§5/§7/§8 与 reference-analysis（168/154/40）全部同步；未发现旧计数（131/117/26/43/0.3.0）或旧 reasoning 色（#F5EBDF/#DFD0BB）残留（仅 README:164 的 "v1–v4" 见 R6）。

### 17.5 文档一致性（逐条）

| # | 位置 | 说法 | 实际 | 判定 |
|---|---|---|---|---|
| 1 | README:46、design-spec:77/120 | 聊天 + 文档预览共用一套渲染器 | 17.2 两处都渲染同一 `MarkdownText` | ✅ |
| 2 | README:48-51、§2.6 | 正文 +1px/1.95、H1 32/650、H2 25/600+分隔线、H3–H6、链接 #AA5533/#DCB89B、行内 chip、代码块 #332C26/#3C3128 等 | markdown.css 与 palette/tokens 逐值一致（§2.6 表核对全中） | ✅ |
| 3 | README:56 | 宽表格"保留 DSH 出血布局，不套外框"；紧凑上下文不套用 | 骨架/宽度规则确实排除 `.md-table-wide`；`_compact` 被作用域排除 | ✅（但 §8:197 "保持 DSH 原样"过强，见 R1） |
| 4 | design-spec:197 | "宽表格与 `_compact` 紧凑容器保持 DSH 原样" | `_compact` ✅；**宽表格只被两条规则排除**（外框、表格宽度），th/td padding/border/表头底/zebra/hover 仍会套到宽表格 | ❌ 中（R1） |
| 5 | design-spec:197、markdown.css:17-19 | callout/kbd/mark/details/figcaption/footnote/H7 等不做模拟 | markdown.css 无这些选择器（仅在注释提到）；"渲染器不会产出"属推断，未从渲染器源码证明 | ⚠️ 未验证（R7） |
| 6 | design-spec:13 | token 层只改颜色，几何改动只出现在组件补丁（含 Markdown 标题间距/引用块/表格外框/代码块描边），回滚同时移除 | v5 实现与之一致（v4 的原则问题已修） | ✅ |
| 7 | README:164 | 运行期证据列 "v1–v4" 均热更新生效 | 未包含 v5（168 token/新补丁）；且现场 listTokens 本次超时未复现 | ⚠️ 低（R6） |
| 8 | README/design-spec 计数 | 168/154/35/61/0.4.0、"其它 19"、"cluade 40" | 与产物/审计/palette 完全一致 | ✅ |

### 17.6 复核后仍存在的问题（按严重度）

- **R1（中）design-spec:197 "宽表格…保持 DSH 原样" 不准确**：markdown.css 只有两条规则排除了 `.md-table-wide`（:182 外框/圆角、:186 表格宽度），而 th/td 的 padding/border/表头底色/zebra/hover（:190-:219）对宽表格仍然生效。README:56 的"保留出血布局、不套外框"是准确的；建议要么给这些单元格规则也加 `:not(.md-table-wide)`，要么把 §197 改成"宽表格只保留出血布局，单元格暖色样式仍生效"。
- **R2（低）作用域误匹配**：`[class*='_markdown']` 也会命中 shell bundle 里**文件类型图标**的类名 `_markdown_1wejo_28`（与 `_markdown_1ypvv_5` 同批字符串）。该图标包装元素会继承基础规则的 `font-size/material +1px`、`line-height:1.95`、`color:mdText`、`overflow-wrap:anywhere`——视觉上可能只是轻微偏色/行高变化，但属非预期命中；建议收紧作用域（例如再要求 `:not([class*='_1wejo'])`，或改用结构性选择器/子元素锚定）。
- **R3（低/信息）行内代码字号"让"给了官方**：markdown.css 用 `font: 0.8em/1.7 var(--ds-font-family-code)` 想定字号，但官方 `.markdown :not(pre)>code{font-size:.875em!important}` 是 `!important`，实际字号仍为 .875em；chip 的底色/边框/圆角/文字色/字体族/行高生效。文档未宣称 chip 字号，故非文档错误，但"0.8em"意图未达成。
- **R4（低/副作用，未验证）标题内的行内代码**：我们的行内 chip 规则 (0,2,3) 会压过官方 `.markdown :where(h1..h6) code{font:inherit}` (0,1,1)，于是标题里的行内代码变成 chip（且字号被官方 !important 固定为 .875em×标题字号），可能偏大/突兀；无截图无法判断。
- **R5（低/信息）首末元素 margin**：官方 `.markdown>*:first-child/p:first-child{margin-top:0!important}`（last-child 同理）会压过我们的标题/段落 margin —— 例如 H2 作为首个元素时 52px 上边距不生效。这是"该让的让"，但 README"H2 上 52px"存在该例外。
- **R6（低）README:164 运行期证据未更新到 v5**："v1–v4 均通过页面热更新或刷新生效" 应改为 v1–v5；当前现场 `Theme.listTokens` 仍超时，无法独立确认 168 token 已被页面加载。
- **R7（未验证）"渲染器不会产出 callout/kbd/footnote…"**：CSS 确实不模拟这些元素，但该前提未从 DSH 渲染器源码验证；若渲染器实际会产出脚注/`<kbd>` 等，会表现为"未套主题"而非报错。
- **R8（信息）皮肤覆盖所有 MarkdownText 场景**：除聊天正文与文档预览外，紧凑变体被排除，但**非紧凑**的其它 MarkdownText 实例（如压缩摘要、Web 搜索结果等）也会套用皮肤——与"聊天输出 + 文档预览"的目标大体一致，值得在文档写明。

### 17.7 结论

**通过。** v5 的容器/结构证据、特异性、shiki 变量重绑、沙箱与数值全部成立，文档主体一致：

- 共用渲染器与 `_compact` 排除有源码级证据；结构类（`_tableScroll`/`md-code-block`/`_banner*`/`_shiki`/`md-table-wide`）与 CSS 选择器一一对应；
- shiki 换色依赖"在 `.md-code-block` 内重绑 `--shiki-*` 与 `--dsl-code-block-*`"，官方 `pre._shiki` 的 `!important` 因走变量而自动生效——机制正确；
- 沙箱：168 token、37 个 md 变量、CSS 与 `theme.css + markdown.css` 逐字节相等、清理正常；audit **61/61**；
- 35/35 门槛与 §5 的 **70 个引用值全部吻合**；palette 150 色全用、168 token 可回溯；文档计数（168/154/35/61/0.4.0、其它19、cluade40）与 reference-analysis 均一致。

遗留 1 处中级别文档表述不精确（R1 宽表格），以及若干低级别副作用/信息项（R2 作用域误匹配 `_markdown_1wejo_28`、R3 行内代码字号、R4 标题内代码、R5 首末 margin、R6 运行期状态、R7 未验证前提、R8 覆盖场景说明）；无功能性/数值错误。

**局限**：现场 `Theme.listTokens` 超时，无法确认 168 token/新补丁已随页面加载；无截图/无真实浏览器级联执行，深色代码块在浅色页面的观感、mermaid/katex/图片布局、紧凑上下文是否被误伤、HMR 状态均未核验；类名/属性属安装版实现细节，DSH 改名时规则静默失效（docs/§8 已声明）。

