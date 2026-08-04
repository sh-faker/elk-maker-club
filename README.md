<img width="2180" height="967" alt="image" src="https://github.com/user-attachments/assets/c64a9b0f-0140-4401-b8da-381c8ff599f7" /># 智能创客社团官网

山东农业工程学院 · 工程训练中心 · 智能创客社团的官方网站。
基于全国大学生智能汽车竞赛（第二十一届）建设，面向新生招新与社团展示。

**在线预览：https://elk-maker-club.vercel.app

![Uploading image.png…]()



## 技术栈

| 层面 | 选型 | 说明 |
| --- | --- | --- |
| 框架 | Vue 3（Options API） | vue-cli 5 脚手架 |
| 路由 | Vue Router 4 | hash 模式，路由级懒加载 |
| UI | Element Plus | 仅用于抽屉菜单与图标 |
| 样式 | 原生 CSS + 设计令牌 | 无预处理器，变量集中在 `theme.css` |
| 其他 | PWA 插件、sharp | 可安装到桌面；图片统一压缩为 WebP |

纯静态站，无后端，全部文案以 JSON 维护。共 6 个页面、11 个复用组件。

## 本地运行

```bash
npm install
npm run serve            # 开发预览，默认 http://localhost:8081
npm run build            # 打包到 dist/，可直接部署
npm run optimize:images  # 新增图片后压缩转 WebP
```

## 目录结构

```
src/
├─ assets/
│  ├─ theme.css          # ★ 全站配色与设计令牌，改颜色只改这里
│  └─ img/               # 所有图片（WebP），img1.webp 是社团社标
├─ data/                 # ★ 所有文字内容，换届更新只改这里
├─ layout/
│  ├─ layout.vue         # 页面骨架：Header + 内容 + Footer
│  └─ navMenu.vue        # 导航栏目（增删栏目改这里）
├─ components/           # 可复用区块
├─ views/                # 6 个页面
└─ router/index.js       # 路由与页面标题
scripts/
└─ optimize-images.js    # 图片批量压缩脚本
```

## 实现要点

**内容与视图分离。** 页面上所有文字都在 `src/data/` 的 JSON 里，
接手的人不需要看懂 Vue 也能改站点内容。派生数据从数据本身汇总，
例如作品页的组别筛选：

```js
groups() {
  return [ALL, ...new Set(works.map((w) => w.group))]
}
```

加一条作品，筛选项自动多一个，不用两处同步。

**设计令牌统一。** 颜色、圆角、阴影、最大宽度都定义在 `theme.css` 的 `:root` 上，
组件里只写 `var(--accent)`。换主题色是改 1 行，而不是全局搜索替换。

**路由层。** 页面用 `() => import()` 懒加载，首屏只下载首页代码；
`meta.title` 同时供导航栏和 `document.title` 使用；带兜底路由避免手输错地址白屏；
切页自动回到顶部。

**响应式。** 900px 以下桌面导航收进抽屉菜单，作品栅格从多列降为单列。

**图片优化。** 原始素材是 1~3 MB 的相机直出 PNG。清理未引用素材后，
`npm run optimize:images` 把余下图片限制到最长边 1400px 再转 WebP：

```
合计 992 KB -> 373 KB，减少 62%
```

图片总量从 9.2 MB 降到 373 KB。

## 上线前必须替换的内容

站内所有占位内容都用 `【待替换】` 标记，全局搜索这四个字即可定位。
逐个文件核对：

| 文件 | 需要做的事 |
|---|---|
| `src/data/club.json` | 补齐 `stats` 四个数字、QQ 群号、报名截止日期 |
| `src/data/awards.json` | 换成真实获奖记录，注意组别名要用**当届赛规**的名称 |
| `src/data/works.json` | 换成真实车模，填 B 站 `bvid` 就会自动变成视频播放器 |
| `src/data/advisors.json` | 指导老师名单 |
| `src/data/partners.json` | 指导单位与赞助方 |
| `src/data/resources.json` | 资料链接，`url` 留空的条目会自动变成不可点击状态 |
| `src/data/faq.json` | 第 4 条「器件是否自费」需按社团真实情况改写 |
| `src/assets/img/` | 把 `1/2/3.webp`、`img2/img3.webp` 换成实拍照片 |

**报名入口**：在 `club.json` 的 `recruit.formUrl` 填问卷星/腾讯文档链接。
留空时「加入我们」页会自动改为引导加 QQ 群，不会出现点不动的死按钮。

## 常见维护操作

**改配色** —— 只改 `src/assets/theme.css` 顶部的 `:root` 变量。
当前是冷白 + 电光蓝（`--accent: #0066ff`）。改 `--accent` 一行就能换主色调。

**换社标** —— 替换 `src/assets/img/img1.webp`。
它同时用在顶栏、页脚，以及每个页面 hero 区的背景水印，换一个文件即可全站生效。
水印的大小与深浅在 `theme.css` 的 `.brand-watermark` 里调（`opacity` 控制深浅）。

**加一辆车** —— 在 `works.json` 里加一条记录，图片放进 `assets/img/` 并填文件名。
作品页的筛选按钮会根据 `group` 字段自动生成，不用手动加。

**加图片** —— 放进 `src/assets/img/` 后跑一次 `npm run optimize:images`，
脚本会把 PNG/JPG 转成 WebP 并删掉原图，之后在代码里引用 `.webp` 文件名。

**加/改导航栏目** —— 改 `src/layout/navMenu.vue` 的 `menus` 数组，
同时在 `src/router/index.js` 加对应路由。

## 部署

产物是纯静态文件，任何静态托管都能跑。使用 hash 路由（`#/about`），
刷新不会 404，**不需要**配置 URL 重写规则。

| 平台 | 构建命令 | 输出目录 |
| --- | --- | --- |
| Vercel / Netlify | `npm run build` | `dist` |
| GitHub Pages | `npm run build` | 把 `dist/` 推到 `gh-pages` 分支 |
| 校内服务器 | `npm run build` | 把 `dist/` 整个目录拷过去 |
