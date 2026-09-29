"use client";

import { motion } from "framer-motion";
import { LineGlyph } from "@/components/LineGlyph";
import { MobileMicroAccordion } from "@/components/MobileMicroAccordion";
import { useHorizontalScrollTracker } from "@/components/useHorizontalScrollTracker";
import type { Service } from "@/lib/services";

export function ServiceDetailPanels({ service }: { service: Service }) {
  const { viewportRef, activeIndex, progress, scrollToIndex, scrollByItem } =
    useHorizontalScrollTracker(4);

  const panels = [
    {
      key: "measure",
      content: (
        <div className="detail-card detail-main">
          <p className="eyebrow">SEBELUM DIPASANG</p>
          <h2>
            Ukur dengan tepat.
            <br />
            <span>Pasang sesuai kebutuhan.</span>
          </h2>
          <MobileMicroAccordion summary="Kenapa perlu disesuaikan?">
            <p>
              Setiap pekerjaan aluminium dan kaca perlu menyesuaikan ukuran
              bukaan, arah buka, kondisi dinding, pemakaian ruang, serta pilihan
              material agar hasil akhirnya rapi dan berfungsi dengan baik.
            </p>
          </MobileMicroAccordion>
        </div>
      ),
    },
    {
      key: "benefits",
      content: (
        <div className="detail-card detail-benefits">
          <LineGlyph kind="frame" />
          <p className="detail-label">FOKUS MANFAAT</p>
          <ul>
            {service.benefits.map((benefit) => (
              <li key={benefit}>{benefit}</li>
            ))}
          </ul>
        </div>
      ),
    },
    {
      key: "use",
      content: (
        <div className="detail-card detail-use">
          <p className="detail-label">COCOK UNTUK</p>
          <div className="tag-cloud">
            {service.suitableFor.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
          <p className="detail-use-note">
            Ukuran dan konfigurasi disesuaikan dengan fungsi ruang serta kondisi lokasi.
          </p>
          <strong>
            {service.shortTitle}
            <br />
            Jabodetabek
          </strong>
        </div>
      ),
    },
    {
      key: "area",
      content: (
        <div className="detail-card detail-area">
          <p className="detail-label">AREA UTAMA</p>
          <span className="area-big area-big-wide">JABODETABEK</span>
          <p>
            Jakarta, Bogor, Depok, Tangerang, Bekasi, dan area sekitar.
            Konfirmasi lokasi proyek melalui WhatsApp.
          </p>
        </div>
      ),
    },
  ];

  return (
    <>
      <div className="detail-bento detail-bento-desktop">
        {panels.map((panel, index) => (
          <motion.div
            key={panel.key}
            className={`detail-panel-shell detail-panel-shell-${index + 1}`}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.4, delay: index * 0.04 }}
          >
            {panel.content}
          </motion.div>
        ))}
      </div>

      <div className="detail-mobile-carousel">
        <div className="mobile-carousel-toolbar">
          <p>Geser untuk melihat detail lainnya.</p>
          <div
            className="carousel-controls"
            aria-label="Kontrol detail layanan"
          >
            <button
              type="button"
              onClick={() => scrollByItem(-1)}
              aria-label="Detail sebelumnya"
            >
              <LineGlyph kind="navLeft" />
            </button>
            <button
              type="button"
              onClick={() => scrollByItem(1)}
              aria-label="Detail berikutnya"
            >
              <LineGlyph kind="navRight" />
            </button>
          </div>
        </div>

        <div
          className="detail-mobile-viewport native-horizontal-carousel"
          ref={viewportRef}
          tabIndex={0}
        >
          <div className="detail-mobile-track">
            {panels.map((panel) => (
              <div
                className="detail-mobile-item"
                data-carousel-item
                key={panel.key}
              >
                {panel.content}
              </div>
            ))}
          </div>
        </div>

        <div
          className="carousel-pagination detail-mobile-pagination"
          aria-label="Posisi detail layanan"
        >
          <div className="carousel-dots">
            {panels.map((_, index) => (
              <button
                type="button"
                key={index}
                className={index === activeIndex ? "active" : ""}
                onClick={() => scrollToIndex(index)}
                aria-label={`Buka detail ${index + 1}`}
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
            {String(activeIndex + 1).padStart(2, "0")} / 04
          </span>
        </div>
      </div>
    </>
  );
}
