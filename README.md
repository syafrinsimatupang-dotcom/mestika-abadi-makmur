# Mestika Abadi Makmur

Marketing website for aluminium and glass fabrication and installation in Jabodetabek.

## Stack and setup

Next.js 15, React 19, TypeScript, and Framer Motion. Public pages use static generation, with client components for filters, carousels, menus, and the WhatsApp planner.

```bash
npm install
cp .env.example .env.local
npm run dev
```

## Configuration

- `NEXT_PUBLIC_SITE_URL`: canonical origin; defaults to `https://mestikaabadimakmur.com`.
- `WORDPRESS_API_URL`: WordPress origin or full `/wp-json/wp/v2` REST base. Without a configured CMS, the article page displays its empty state.
- Business contact details live in `lib/site.ts`. WhatsApp: `0823-1894-8989` (`6282318948989`).
- Address: Jl. H. Buang, RT/RW 03/03, Kelurahan Cipete, Kecamatan Pinang, Kota Tangerang.

## Catalog and media

The 16 final `- ALL` folders in `public/Footage Produk/` define the active product categories. Folders marked `OLD` are excluded from the catalog. Run `npm run sync:media` after changing assets; production builds also run it automatically. Product copy is maintained in `lib/services.ts`. Generated photo/video manifests are committed and checked against the source folders by UI tests. The old ACP and plain 10mm partition URLs resolve to their replacement category with canonical metadata.

All 78 final photos appear in the portfolio with titles and descriptions (three columns at every viewport), and in their corresponding service page carousels with a keyboard-accessible enlarged view. Portfolio videos use two columns on desktop and one on mobile. Service catalog cards, detail heroes, and galleries show the complete supplied artwork, including its text. Home and portfolio previews crop the branding footer. Existing architectural hero styling is retained. The VIDEO folder contains 8 files representing 6 unique videos (deduplicated by SHA-256). Videos appear only on the portfolio page and load on demand. Their extracted poster frames are stored in `public/video-posters/`.

The interface uses blue and yellow brand accents, Geist and Plus Jakarta Sans fonts, native scrolling carousels, and a compact filtered mobile catalog.

## Articles

WordPress serves as the article CMS. The website reads published posts during the build and exports `/artikel/` and `/artikel/[slug]/`. Rebuild and deploy after publishing or editing articles. Article slugs are included in the sitemap.

## Verification and deployment

```bash
npm run audit:prod
npm run typecheck
npm run build
npm run check:brand
```

Deploy the generated `out/` directory to a static host with directory index support. Build output and local environment files are excluded from Git.

For browser verification, serve `out/`, set `TEST_BASE_URL` to that server, then run `npm run test:ui`. Tests use Microsoft Edge by default; set `PLAYWRIGHT_CHANNEL=chromium` to use an installed Playwright Chromium browser. Coverage includes all catalog routes at mobile, tablet, and desktop widths, accessibility checks, navigation, carousels, filtering, and WhatsApp message composition.

Production dependency checks fail for high severity vulnerabilities. PostCSS is pinned through an override in `package.json`.
