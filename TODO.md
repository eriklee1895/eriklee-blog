# TODO

## Completed (2026-07-07)

- [x] Tags pages migrated to PostExplorer layout (sidebar + card list)
- [x] Tags index page uses TaxonomySidebar + consistent grid layout
- [x] Removed `type` taxonomy default; "形态" sidebar only appears when posts have distinct types
- [x] Deleted `src/content/astropaper-examples/` demo content
- [x] Disabled public editPost config
- [x] Reading time on article pages and list cards
- [x] Sticky right-side TOC with scroll-spy (client-side, h2/h3, appears on lg+ screens)
- [x] Series navigation box on article pages (lists all posts in series, with prev/next within series)
- [x] Labeled tag section at article bottom
- [x] Homepage redesign: hero intro section, featured post, recent posts with sidebar
- [x] Fixed duplicate `<main id="main-content">` issue (PostExplorer now uses `<div>`, pages wrap in `<main>`)

## Next Up

### Astro 7 Upgrade

Status: planned, do after UI/layout stabilizes.

Context:
- Current project dependency: Astro `^6.4.2`.
- Latest version: Astro `7.0.6` (as of 2026-07-07).
- Official migration guide: https://docs.astro.build/en/guides/upgrade-to/v7/

Plan:
1. Create a dedicated branch `codex/astro-7-upgrade` from latest main.
2. Read the official Astro v7 migration guide before editing dependencies.
3. Upgrade Astro and official integrations together: `astro`, `@astrojs/mdx`, `@astrojs/sitemap`, `@astrojs/check`.
4. Review `astro.config.ts`, especially `experimental.svgOptimizer` usage and any config that changed between v6 and v7.
5. Run `pnpm install`, `pnpm run build`, `pnpm run dev`.
6. Verify key routes locally:
   - `/`
   - `/posts/`
   - `/posts/<slug>/`
   - `/categories/ai-engineering/`
   - `/series/hermes-notes/`
   - `/tags/`
   - `/search/`
   - `/rss.xml`
7. Push upgrade branch and use Cloudflare Pages preview before merging to main.

### Polish & Improvements

- [ ] Article headings: consider auto-adding anchor links to h2/h3.
- [ ] Code blocks: ensure filename transformer aligns with theme on both light/dark.
- [ ] Mobile TOC: consider a collapsible TOC at the top for long articles on small screens.
- [ ] BackToTop button: verify it doesn't overlap with TOC sidebar on lg screens.
- [ ] Extract inline lightbox script (~300 lines) to a standalone TS module.
- [ ] Custom domain setup (eriklee.blog? erik.engineering?).
- [ ] OG image quality: current dynamic OG is basic; consider branded card template.
- [ ] sync_origin_to_blog.py: add dry-run, frontmatter validation, asset integrity checks.
- [ ] Decide on comments (Giscus? or keep static-only?).
