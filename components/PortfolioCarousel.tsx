"use client";

import { motion } from "framer-motion";
import { portfolioReferences } from "@/lib/services";
import { LineGlyph } from "@/components/LineGlyph";
import { ArrowUpRightIcon } from "@/components/ArrowUpRightIcon";
import { useHorizontalScrollTracker } from "@/components/useHorizontalScrollTracker";

export function PortfolioCarousel({ compact = false }: { compact?: boolean }) {
  const { viewportRef, activeIndex, progress, scrollToIndex, scrollByItem } =
    useHorizontalScrollTracker(portfolioReferences.length);

  return (
    <div className="carousel-wrap">
      <div className="carousel-toolbar">
        <p className="carousel-note">
          Foto berikut merupakan referensi jenis pekerjaan yang kami layani,
          bukan dokumentasi proyek Mestika Abadi Makmur.
        </p>
        <div className="carousel-controls" aria-label="Kontrol carousel">
          <button onClick={() => scrollByItem(-1)} aria-label="Geser ke kiri">
            <LineGlyph kind="navLeft" />
          </button>
          <button onClick={() => scrollByItem(1)} aria-label="Geser ke kanan">
            <LineGlyph kind="navRight" />
          </button>
        </div>
      </div>

      <div
        className="project-carousel-viewport native-horizontal-carousel"
        ref={viewportRef}
        tabIndex={0}
        aria-label="Portofolio — scroll horizontal"
      >
        <div className={`project-carousel ${compact ? "compact" : ""}`}>
          {portfolioReferences.map((item, index) => (
            <motion.article
              className="project-card"
              data-carousel-item
              key={`${item.title}-${index}`}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.22 }}
              transition={{
                duration: 0.55,
                delay: index * 0.04,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <div className="project-image">
                <img
                  src={item.image}
                  alt={item.alt}
                  width="960"
                  height="720"
                  loading="lazy"
                  style={{ objectPosition: item.imagePosition }}
                />
                <span className="reference-badge">REFERENSI PEKERJAAN</span>
              </div>
              <div className="project-meta">
                <div>
                  <p>{item.category}</p>
                  <h3>{item.title}</h3>
                </div>
                <ArrowUpRightIcon />
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      <div className="carousel-pagination" aria-label="Posisi carousel">
        <div className="carousel-dots">
          {portfolioReferences.map((_, index) => (
            <button
              key={index}
              className={index === activeIndex ? "active" : ""}
              onClick={() => scrollToIndex(index)}
              aria-label={`Buka item ${index + 1}`}
              aria-current={index === activeIndex ? "true" : undefined}
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
          {String(portfolioReferences.length).padStart(2, "0")}
        </span>
      </div>
    </div>
  );
}
