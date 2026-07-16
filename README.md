# The Illuminated Self · האני המואר

An interactive personal-growth charter — nine values, the 05:30 morning ritual, daily nutrition, the training week, supplements, the circle of Jewish faith, nine insights, and the Vision-38 ledger.

**Live site:** https://nethanelmedina88-cmyk.github.io/illuminated-self/

## Structure

- `index.html` — the deployed site: a self-contained single-file bundle (all CSS, JS and fonts inlined). GitHub Pages serves this from the repo root.
- `app/` — the React + TypeScript + Vite source.

## Rebuilding after editing the source

```bash
cd app
pnpm install
pnpm exec vite build
# inline dist/assets/*.css + *.js into dist/index.html, then:
cp bundle.html ../index.html
```

Content lives in `app/src/content.ts`; all UI in `app/src/App.tsx`; design tokens in `app/src/index.css`.
