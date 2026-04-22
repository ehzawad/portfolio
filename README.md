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

## Dynamic Content

Static TypeScript data is the default source. To switch to Firestore later:

1. Copy `.env.example` to `.env.local`.
2. Set `VITE_CONTENT_SOURCE=firebase`.
3. Fill the Firebase web app values.
4. Create Firestore collection `portfolio`, document `live`, with the same shape as `src/types.ts`.

See [docs/FIREBASE.md](docs/FIREBASE.md).
