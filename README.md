# Mayank Kamdi Portfolio and BIOS Hackathon

The root `/` is an accessible Mayank Kamdi portfolio hero based on the supplied parchment-and-celestial reference. The illustration layers, fonts, logo mark, CSS and JavaScript are served from local project assets. The remaining route set preserves the public BIOS Hackathon pages, observed access gates and interactions; its declarations are in `public/manus-routes.json`.

Until separate portfolio page destinations or contact details are supplied, the visible portfolio navigation and calls to action point to existing local BIOS routes. No private account content or personal email address is fabricated.

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
