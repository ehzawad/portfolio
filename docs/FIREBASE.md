# Firebase Content Mode

The site deploys statically on GitHub Pages. Firebase is optional and only used when `VITE_CONTENT_SOURCE=firebase`.

Expected Firestore path:

```text
portfolio/live
```

The document should match `PortfolioContent` from `src/types.ts`:

```ts
{
  profile: { ... },
  categories: [ ... ],
  projects: [ ... ],
  focusAreas: [ ... ]
}
```

Recommended rules for a public portfolio:

```txt
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /portfolio/live {
      allow read: if true;
      allow write: if false;
    }
  }
}
```

Keep editing rights behind the Firebase console, a private admin app, or a server-side workflow. Do not expose write access from the public GitHub Pages app.
