"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { LineGlyph } from "@/components/LineGlyph";
import { ArrowUpRightIcon } from "@/components/ArrowUpRightIcon";
import { useHorizontalScrollTracker } from "@/components/useHorizontalScrollTracker";
import { services } from "@/lib/services";

export function RelatedServicesCollection({
  currentSlug,
}: {
  currentSlug: string;
}) {
  const items = services
    .filter((item) => item.slug !== currentSlug)
    .slice(0, 4);
  const { viewportRef, activeIndex, progress, scrollToIndex, scrollByItem } =
    useHorizontalScrollTracker(items.length);

  const card = (item: (typeof items)[number], index: number) => (
    <Link href={`/layanan/${item.slug}/`}>
      <div className="related-card-media">
        <img
          src={item.image}
          alt={item.imageAlt}
          width="900"
          height="620"
          loading="lazy"
          style={{ objectPosition: item.imagePosition }}
        />
        <span className="reference-badge">REFERENSI PEKERJAAN</span>
      </div>
      <div className="related-card-body">
        <span className="related-card-index">0{index + 1}</span>
        <p>{item.keyword} Jabodetabek</p>
        <h3>{item.shortTitle}</h3>
        <b aria-hidden="true"><ArrowUpRightIcon /></b>
      </div>
    </Link>
  );

  return (
    <>
      <div className="related-grid related-grid-desktop">
        {items.map((item, index) => (
          <motion.article
            key={item.slug}
            className={`related-card related-card-${index + 1}`}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.4, delay: index * 0.04 }}
          >
            {card(item, index)}
          </motion.article>
        ))}
      </div>

      <div className="related-mobile-carousel">
        <div className="mobile-carousel-toolbar">
          <p>Geser untuk melihat layanan lainnya.</p>
          <div
            className="carousel-controls"
            aria-label="Kontrol layanan terkait"
          >
            <button
              type="button"
              onClick={() => scrollByItem(-1)}
              aria-label="Layanan sebelumnya"
            >
              <LineGlyph kind="navLeft" />
            </button>
            <button
              type="button"
              onClick={() => scrollByItem(1)}
              aria-label="Layanan berikutnya"
            >
              <LineGlyph kind="navRight" />
            </button>
          </div>
        </div>
        <div
          className="related-mobile-viewport native-horizontal-carousel"
          ref={viewportRef}
        >
          <div className="related-mobile-track">
            {items.map((item, index) => (
              <article
                className="related-card related-mobile-item"
                data-carousel-item
                key={item.slug}
              >
                {card(item, index)}
              </article>
            ))}
          </div>
        </div>
        <div className="carousel-pagination related-mobile-pagination">
          <div className="carousel-dots">
            {items.map((_, index) => (
              <button
                type="button"
                key={index}
                aria-current={index === activeIndex ? "true" : undefined}
                className={index === activeIndex ? "active" : ""}
                onClick={() => scrollToIndex(index)}
                aria-label={`Buka layanan ${index + 1}`}
              />
            ))}
          </div>
          <div className="carousel-progress" aria-hidden="true">
            <motion.span
              initial={false}
              animate={{ scaleX: progress }}
              transition={{ duration: 0.08, ease: "linear" }}
            />
          </div>
          <span className="carousel-count">
            {String(activeIndex + 1).padStart(2, "0")} /{" "}
            {String(items.length).padStart(2, "0")}
          </span>
        </div>
      </div>
    </>
  );
}
