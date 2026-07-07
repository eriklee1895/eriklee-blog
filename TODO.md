# TODO

## Astro 7 Upgrade

Status: planned, do not mix with the native sidebar/layout refactor.

Context:
- Current project dependency: Astro `^6.4.2`.
- Latest checked version on npm: Astro `7.0.6` on 2026-07-07.
- Official migration guide: https://docs.astro.build/en/guides/upgrade-to/v7/

Plan:
1. Create a dedicated branch from the latest stable blog branch, e.g. `codex/astro-7-upgrade`.
2. Read the official Astro v7 migration guide before editing dependencies.
3. Upgrade Astro and official integrations together: `astro`, `@astrojs/mdx`, `@astrojs/sitemap`, `@astrojs/check` if needed.
4. Review `astro.config.ts`, especially the current `experimental.svgOptimizer` usage and any config that changed between v6 and v7.
5. Run `npm install`, `npm run build`, and `npm run dev`.
6. Verify key routes locally:
   - `/`
   - `/posts/`
   - `/categories/ai-engineering/`
   - `/series/hermes-notes/`
   - `/search/`
   - `/rss.xml`
   - `/498a4fb724cd8c54f51efd9a721539e1.txt`
7. Push the upgrade branch and use Cloudflare Pages preview before merging to `main`.

Do after:
- The taxonomy/sidebar refactor is stable enough that dependency-upgrade errors are not mixed with layout changes.
