# BIOS Hackathon Recreation with Mayank Portfolio

The root `/` restores the source-matched BIOS Hackathon experience, including its BIO/OS scroll and pointer transition, original art, typography, local assets, observed access gates and interactions. Mayank Kamdi’s portfolio remains separate at `/portfolio`. Its hero uses the supplied celestial garden and transparent human/android artwork with the requested parchment `#FAF5E9`, cobalt `#1A3E72`, antique gold `#D4AF37`, and black `#111111` palette; exact personal copy; pointer-driven layer motion; and reversible scroll cross-emphasis. The page keeps its existing lower sections, local anchor navigation, mobile menu and reduced-motion support. All site artwork and fonts are served from local project assets. The route manifest in `public/manus-routes.json` contains 29 BIOS route/query entries plus `/portfolio`.

Portfolio navigation and calls to action use in-page anchors for Home, About, Projects, Experience, Journey, Blog and Contact; the BIOS routes remain available separately. No private account content, unsupported work history or personal email address is fabricated.

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
