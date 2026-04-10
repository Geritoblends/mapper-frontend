### Architecture migration

Now, instead of a split backend-frontend architecture, we'll copy the `myitems` repository structure:

```
├── src
│   ├── actions
│   ├── components
│   │   ├── Footer.tsx
│   │   ├── Header.tsx
│   │   └── ThemeToggle.tsx
│   ├── endpoints
│   ├── hooks
│   ├── main.tsx
│   ├── middleware
│   ├── router.tsx
│   ├── routes
│   │   ├── about.tsx
│   │   ├── index.tsx
│   │   └── __root.tsx
│   ├── schemas
│   ├── services
│   ├── styles.css
│   └── utils
```
