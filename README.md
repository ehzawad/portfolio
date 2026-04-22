# portfolio

React portfolio for `ehzawad`, generated from public authored GitHub repository metadata.

## Local Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## GitHub Pages

The repo includes `.github/workflows/pages.yml`. Pushes to `main` build the Vite app and deploy `dist/` to GitHub Pages.

Production base path is `/portfolio/`, so the site is ready for:

```text
https://ehzawad.github.io/portfolio/
```

## Live GitHub Metadata

Curated project copy lives in `src/data/portfolio.ts`. Stars, forks, pushed dates, profile totals, and repo descriptions are refreshed in the browser from the public GitHub API and cached locally. If GitHub rate-limits or the visitor is offline, the UI falls back to `src/data/githubSnapshot.ts`.

The app makes one aggregated repo-list request per refresh, plus detail requests only for featured repos missing from the first page.
