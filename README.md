# BIOS Hackathon — Interactive Website Recreation

A standalone, multi-page Vite recreation of the public BIOS Hackathon website at https://bios.notyouraverage.xyz/. It includes the source-matched scroll-driven hero, responsive pages and interactions, sign-in/access gates, and localized first-party static assets. The route manifest is at `public/manus-routes.json`.

## Development

Requires Node.js and pnpm (the exact pnpm version is pinned in `package.json`).

```bash
pnpm install --frozen-lockfile
pnpm dev
```

## Production build

```bash
pnpm build
```

The existing repository MIT license is retained. Third-party brand marks and sponsor logos remain the property of their respective owners and are not relicensed by this project.
