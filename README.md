# Erik Lee — 个人博客

基于 **Astro 7** 从零搭建的个人技术博客。旧版 AstroPaper 版本保留在 [`legacy/astropaper-v1`](https://github.com/eriklee1895/eriklee-blog/tree/legacy/astropaper-v1) 分支。

## 技术栈

- **Astro 7.0** — 静态站点框架
- **Tailwind CSS v4** — 样式系统
- **MDX** — 文章格式
- **Shiki** — 代码高亮（github-light / github-dark 双主题）
- **Pagefind** — 客户端全文搜索
- **Google Fonts** — Inter + Source Serif 4 + JetBrains Mono
- **Cloudflare Pages** — 托管部署（main 分支自动部署）

## 设计

- 暖纸张编辑风（`#fdfcf8`）/ 深墨色暗色模式（`#151411`）
- 陶土红 accent（`#b5452d`）
- 衬线正文（Source Serif 4）+ 无衬线 UI（Inter）
- 粘性顶部导航栏 + 毛玻璃背景
- 右侧粘性分类/系列侧栏（列表页）和目录（文章页）
- 图片点击放大 lightbox
- 阅读时间估算

## 开发

```bash
pnpm install
pnpm dev       # http://localhost:4321
pnpm build     # 构建到 dist/，包含 pagefind 索引
```

## 内容同步

文章来自 [`writing-agent-harness`](https://github.com/eriklee1895/writing-agent-harness) 的 `content/origin/` 目录，通过 `scripts/sync_origin_to_blog.py` 同步到 `src/content/posts/`。
