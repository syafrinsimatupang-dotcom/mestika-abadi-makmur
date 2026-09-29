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

The 18 product folders in `public/foto-produk/` correspond to the catalog in `lib/services.ts`. Product names, images, detail routes, filters, and the consultation selector use that catalog. When adding a folder, update the catalog and its filter expectations together.

Product and portfolio photos use the supplied assets. Existing PNG artwork includes a branding footer; the image containers crop that footer from the visible product photo. Some established architectural hero images still use Pexels. The four videos and their poster images are in `public/foto-produk/VIDEO/` and appear only in the portfolio gallery. Videos load on demand.

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
