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
