import { expect, test } from "@playwright/test";
import { services } from "../lib/services";

const mainRoutes = ["/", "/layanan/", "/portofolio/", "/tentang/", "/kontak/", "/artikel/"];

test("published pages have working internal links, media, and unique metadata", async ({ page, request }) => {
  test.setTimeout(120000);
  const resources = new Set<string>(["/sitemap.xml", "/robots.txt"]);
  const titles = new Set<string>();
  for (const route of [...mainRoutes, ...services.map(({ slug }) => `/layanan/${slug}/`)]) {
    await page.goto(route);
    const title = await page.title();
    expect(titles.has(title), `Duplicate title at ${route}`).toBe(false);
    titles.add(title);
    await expect(page.locator('meta[name="description"]')).toHaveAttribute("content", /\S/);
    const urls = await page.evaluate(() => {
      const links = Array.from(document.querySelectorAll<HTMLAnchorElement>("a[href]")).map((node) => node.href);
      const media = Array.from(document.querySelectorAll<HTMLImageElement | HTMLSourceElement>("img[src], source[src]")).map((node) => node.src);
      const posters = Array.from(document.querySelectorAll<HTMLVideoElement>("video[poster]")).map((node) => node.poster);
      return [...links, ...media, ...posters].filter((url) => new URL(url).origin === location.origin);
    });
    urls.forEach((url) => resources.add(new URL(url).pathname));
  }
  for (const url of resources) {
    const response = await request.head(url);
    expect(response.status(), url).toBe(200);
  }
});

test("page photography loads without broken images", async ({ page }) => {
  test.setTimeout(120000);
  await page.setViewportSize({ width: 390, height: 844 });
  for (const route of mainRoutes) {
    await page.goto(route);
    await page.locator("img").evaluateAll((images) => images.forEach((image) => { image.loading = "eager"; }));
    await expect.poll(() => page.locator("img").evaluateAll((images) =>
      images.filter((image) => !image.complete || image.naturalWidth === 0).map((image) => image.src),
    ), { message: route, timeout: 20000 }).toEqual([]);
  }
});

test("gallery videos load playable media on demand", async ({ page }) => {
  test.setTimeout(90000);
  await page.goto("/portofolio/");
  const videos = page.locator("video");
  await expect(videos).toHaveCount(4);
  for (const video of await videos.all()) {
    await expect(video).toHaveAttribute("preload", "none");
    await video.evaluate((element: HTMLVideoElement) => { element.muted = true; element.load(); });
    await expect.poll(() => video.evaluate((element: HTMLVideoElement) => element.readyState), { timeout: 20000 }).toBeGreaterThanOrEqual(2);
    await video.evaluate((element: HTMLVideoElement) => element.play());
    await expect.poll(() => video.evaluate((element: HTMLVideoElement) => element.currentTime)).toBeGreaterThan(0);
    await video.evaluate((element: HTMLVideoElement) => element.pause());
  }
});

test("old ACP URL displays the merged product with its canonical URL", async ({ page }) => {
  await page.goto("/layanan/pintu-acp/");
  await expect(page.locator("h1")).toContainText("Pintu Panel ACP");
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", /\/layanan\/pintu-panel-acp\/$/);
});

test("every service detail shows its complete branded image on mobile and desktop", async ({ page }) => {
  test.setTimeout(120000);
  for (const width of [390, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const service of services) {
      await page.goto(`/layanan/${service.slug}/`);
      const image = page.locator(".service-hero-image img");
      await expect(image).toBeVisible();
      const display = await image.evaluate((element: HTMLImageElement) => ({
        loaded: element.naturalWidth > 0 && element.naturalHeight > 0,
        fit: getComputedStyle(element).objectFit,
        transform: getComputedStyle(element).transform,
      }));
      expect(display, `${service.shortTitle} at ${width}px`).toEqual({
        loaded: true,
        fit: "contain",
        transform: "none",
      });
    }
  }
});
