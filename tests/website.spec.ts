import { expect, test } from "@playwright/test";
import { services } from "../lib/services";
import { existsSync, readdirSync } from "node:fs";
import { resolve } from "node:path";

const routes = [
  "/",
  "/layanan/",
  ...services.map((service) => `/layanan/${service.slug}/`),
  "/portofolio/",
  "/tentang/",
  "/kontak/",
  "/artikel/",
];
const sizes = [
  { width: 320, height: 740 },
  { width: 390, height: 844 },
  { width: 768, height: 1024 },
  { width: 1440, height: 900 },
];

test("service catalog matches every product photo folder", () => {
  const photoRoot = resolve(process.cwd(), "public", "foto-produk");
  const folders = readdirSync(photoRoot, { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && entry.name !== "VIDEO")
    .map((entry) => entry.name)
    .sort();
  expect(services.map((service) => service.shortTitle).sort()).toEqual(folders);
  for (const service of services) {
    expect(
      existsSync(resolve(process.cwd(), "public", decodeURIComponent(service.image).slice(1))),
      service.shortTitle,
    ).toBe(true);
  }
});

for (const viewport of sizes) {
  test(`all routes fit and expose usable controls at ${viewport.width}px`, async ({
    page,
  }) => {
    await page.setViewportSize(viewport);
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    for (const route of routes) {
      const response = await page.goto(route);
      expect(response?.status(), route).toBe(200);
      await expect(page.locator("h1")).toHaveCount(1);
      await expect(page.locator("h1")).toBeVisible();
      if (route !== "/portofolio/") {
        await expect(page.locator("video")).toHaveCount(0);
      }
      expect(
        await page.locator('link[rel="canonical"]').getAttribute("href"),
      ).toContain(route);
      await expect
        .poll(
          () =>
            page.evaluate(
              () => document.documentElement.scrollWidth <= innerWidth,
            ),
          { message: route },
        )
        .toBe(true);
      const small = await page.evaluate(() =>
        Array.from(document.querySelectorAll("a, button, input, textarea"))
          .filter((element) => {
            const style = getComputedStyle(element);
            const rect = element.getBoundingClientRect();
            return (
              element.getClientRects().length > 0 &&
              style.visibility !== "hidden" &&
              (rect.width < 43.5 || rect.height < 43.5)
            );
          })
          .map((element) => ({
            text: element.textContent?.trim().slice(0, 40),
            class: element.className,
          })),
      );
      expect(small, route).toEqual([]);
    }
    expect(errors).toEqual([]);
  });
}

test("mobile hero image, title, and CTA are visible before scrolling", async ({
  page,
}) => {
  await page.setViewportSize({ width: 375, height: 667 });
  await page.goto("/");
  await expect(page.locator(".home-hero-image")).toBeVisible();
  await expect
    .poll(() =>
      page
        .locator(".home-hero-image")
        .evaluate((image: HTMLImageElement) => image.naturalWidth),
    )
    .toBeGreaterThan(0);
  await expect(page.locator(".home-hero h1")).toBeInViewport();
  await expect(page.locator(".home-hero-primary")).toBeInViewport({ ratio: 1 });
  expect(await page.evaluate(() => scrollY)).toBe(0);
  expect(
    await page
      .locator(".home-hero-image")
      .evaluate((image) => getComputedStyle(image).filter),
  ).toBe("none");
});

test("mobile menu closes on Escape and restores focus", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  const menu = page.getByRole("button", { name: "Buka menu" });
  await menu.click();
  await expect(
    page.getByRole("navigation", { name: "Navigasi mobile" }),
  ).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(menu).toBeFocused();
  await expect(
    page.getByRole("navigation", { name: "Navigasi mobile" }),
  ).toHaveCount(0);
  await menu.click();
  await page
    .getByRole("navigation", { name: "Navigasi mobile" })
    .getByRole("link", { name: "Kontak" })
    .click();
  await expect(page).toHaveURL(/\/kontak\/$/);
  await expect(
    page.getByRole("navigation", { name: "Navigasi mobile" }),
  ).toHaveCount(0);
});

test("mobile carousel arrows and native scrolling stay synchronized", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  const carousel = page.locator(".service-mobile-carousel");
  await carousel.getByRole("button", { name: "Layanan berikutnya" }).click();
  await expect(carousel.locator(".carousel-count")).toHaveText("02 / 05");
  await carousel.getByRole("button", { name: "Layanan berikutnya" }).click();
  await expect(carousel.locator(".carousel-count")).toHaveText("03 / 05");
  await carousel.getByRole("button", { name: "Layanan berikutnya" }).click();
  await expect(carousel.locator(".carousel-count")).toHaveText("04 / 05");
  await carousel
    .locator(".native-horizontal-carousel")
    .evaluate((element) =>
      element.scrollTo({ left: element.scrollWidth, behavior: "instant" }),
    );
  await expect(carousel.locator(".carousel-count")).toHaveText("05 / 05");
});

test("portfolio lists every product reference and opens its detail page", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/portofolio/");
  const cards = page.locator(".portfolio-gallery-card");
  await expect(cards).toHaveCount(services.length);
  await expect(page.locator(".portfolio-video-card video")).toHaveCount(4);
  await page.getByRole("link", { name: "Lihat 4 video" }).click();
  await expect(page).toHaveURL(/#galeri-video$/);
  await expect(page.locator("#portfolio-video-title")).toBeInViewport();
  for (const service of services) {
    await expect(
      page.getByRole("link", { name: `Lihat detail ${service.shortTitle}`, exact: true }),
    ).toHaveAttribute("href", `/layanan/${service.slug}/`);
  }
  await cards.first().click();
  await expect(page).toHaveURL(/\/layanan\/pintu-acp\/$/);
});

test("mobile service photos stay above their card text", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  const overlap = await page.locator(".service-mobile-card").evaluateAll((cards) =>
    cards.some((card) => {
      const image = card.querySelector(".service-mobile-image")!.getBoundingClientRect();
      const body = card.querySelector(".service-mobile-body")!.getBoundingClientRect();
      return image.bottom > body.top + 1;
    }),
  );
  expect(overlap).toBe(false);
});

test("related services end with a link to the full catalog", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/layanan/pintu-acp/");
  const carousel = page.locator(".related-mobile-carousel");
  await expect(carousel.locator("[data-carousel-item]")).toHaveCount(5);
  await carousel.locator(".related-mobile-viewport").evaluate((element) =>
    element.scrollTo({ left: element.scrollWidth, behavior: "instant" }),
  );
  await expect(carousel.locator(".carousel-count")).toHaveText("05 / 05");
  await carousel.getByRole("link", { name: "Lihat semua layanan dan produk" }).click();
  await expect(page).toHaveURL(/\/layanan\/$/);
});

test("why choose us is concise and contact planner preserves input", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await expect(page.locator(".why-us-mobile-viewport .why-us-card-v2")).toHaveCount(6);
  await expect(page.locator(".why-us-mobile-viewport .why-us-card-v2").first()).toBeVisible();

  await page.goto("/kontak/");
  const product = page.getByRole("combobox", { name: "Layanan dan Produk" });
  await expect(product).toHaveValue("Pintu ACP");
  await product.selectOption("Pintu Kaca Aluminium");
  await expect(product).toHaveValue("Pintu Kaca Aluminium");
  await page.getByRole("textbox", { name: "Lokasi proyek" }).fill("Tangerang");
  await page
    .getByRole("textbox", { name: "Catatan singkat" })
    .fill("2 bukaan, ukuran 120 x 180 cm");
  const href = await page
    .getByRole("link", { name: "Kirim ke WhatsApp" })
    .getAttribute("href");
  const message = new URL(href!).searchParams.get("text");
  expect(message).toContain("Pintu Kaca Aluminium");
  expect(message).toContain("Tangerang");
  expect(message).toContain("120 x 180");
});

test("hero remains available without JavaScript and with reduced motion", async ({
  browser,
}) => {
  const context = await browser.newContext({
    javaScriptEnabled: false,
    reducedMotion: "reduce",
    viewport: { width: 390, height: 844 },
  });
  const page = await context.newPage();
  await page.goto(process.env.TEST_BASE_URL || "http://127.0.0.1:3000");
  await expect(page.locator(".home-hero h1")).toBeVisible();
  await expect(page.locator(".home-hero-primary")).toBeInViewport();
  await context.close();
});
import AxeBuilder from "@axe-core/playwright";

for (const width of [390, 1440]) {
  test(`page categories pass automated WCAG checks at ${width}px`, async ({
    page,
  }) => {
    test.setTimeout(120000);
    await page.setViewportSize({ width, height: 900 });
    for (const route of [
      "/",
      "/layanan/",
      "/layanan/pintu-acp/",
      "/portofolio/",
      "/tentang/",
      "/kontak/",
      "/artikel/",
    ]) {
      await page.goto(route);
      const results = await new AxeBuilder({ page })
        .exclude("nextjs-portal")
        .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
        .analyze();
      expect(
        results.violations.map((violation) => ({
          id: violation.id,
          targets: violation.nodes.map((node) => node.target),
        })),
        route,
      ).toEqual([]);
    }
  });
}


test("every displayed business address uses the complete address", async ({ page }) => {
  const fullAddress =
    "Jl. H. Buang, RT/RW 03/03, Kelurahan Cipete, Kecamatan Pinang, Kota Tangerang";

  for (const route of ["/", "/kontak/"]) {
    await page.goto(route);
    const addresses = page.locator("[data-business-address]");
    await expect(addresses.first()).toBeVisible();
    const values = await addresses.allTextContents();
    expect(values.every((value) => value.trim() === fullAddress), route).toBe(true);
  }

  for (const route of ["/", "/layanan/pintu-acp/"]) {
    await page.goto(route);
    const schema = await page
      .locator('script[type="application/ld+json"]')
      .allTextContents();
    expect(schema.some((value) => value.includes(fullAddress)), route).toBe(true);
  }
});

test("mobile product catalog shows all products and filters by type", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/layanan/");

  const catalog = page.locator(".services-refined-mobile");
  const tiles = catalog.locator(".services-mobile-tile");
  await expect(tiles).toHaveCount(18);
  await expect(catalog.getByText("18 produk")).toBeVisible();

  for (const [label, count] of [["Pintu", 10], ["Jendela", 3], ["Partisi", 4], ["Shower", 1]] as const) {
    await catalog.getByRole("button", { name: new RegExp(`^${label}\\s*${count}$`) }).click();
    await expect(tiles).toHaveCount(count);
    await expect(catalog.getByText(`${count} produk`)).toBeVisible();
  }

  await catalog.getByRole("button", { name: /^Semua\s*18$/ }).click();
  await expect(tiles).toHaveCount(18);
  await tiles.last().click();
  await expect(page).toHaveURL(/\/layanan\/[^/]+\/$/);
});
