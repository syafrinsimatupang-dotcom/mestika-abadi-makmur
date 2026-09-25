"use client";

import { motion } from "framer-motion";
import { LineGlyph } from "@/components/LineGlyph";
import { useHorizontalScrollTracker } from "@/components/useHorizontalScrollTracker";

const steps = [
  {
    index: "01",
    title: "Kirim kebutuhan",
    body: "Jenis pekerjaan, lokasi, foto kondisi bila ada, serta ukuran perkiraan.",
    image:
      "https://images.pexels.com/photos/5768188/pexels-photo-5768188.jpeg?auto=compress&cs=tinysrgb&w=1400",
    alt: "Referensi proses pengerjaan kusen aluminium dengan alat kerja sebagai konteks awal kebutuhan proyek",
    imagePosition: "50% 52%",
  },
  {
    index: "02",
    title: "Pilih sistem & material",
    body: "Bahas jenis bukaan, frame, kaca, serta penyesuaian yang dibutuhkan di lokasi.",
    image:
      "https://images.pexels.com/photos/17168858/pexels-photo-17168858/free-photo-of-modern-design-of-room.jpeg?auto=compress&cs=tinysrgb&w=1400",
    alt: "Referensi ruang modern untuk pembahasan konfigurasi bukaan dan material",
    imagePosition: "61% 50%",
  },
  {
    index: "03",
    title: "Fabrikasi & pasang",
    body: "Pekerjaan dilanjutkan mengikuti detail yang telah disepakati.",
    image:
      "https://images.pexels.com/photos/34048291/pexels-photo-34048291.jpeg?auto=compress&cs=tinysrgb&w=1400",
    alt: "Referensi pekerjaan pemasangan panel kaca pada bangunan modern dengan pekerja terlihat dari jarak jauh",
    imagePosition: "62% 48%",
  },
];

function StepCard({
  step,
  carouselItem = false,
}: {
  step: (typeof steps)[number];
  carouselItem?: boolean;
}) {
  return (
    <article
      className="process-slide"
      data-carousel-item={carouselItem ? "" : undefined}
    >
      <div className="process-slide-image">
        <img
          src={step.image}
          alt={step.alt}
          width="1000"
          height="700"
          loading="lazy"
          style={{ objectPosition: step.imagePosition }}
        />
        <span className="reference-badge">REFERENSI PEKERJAAN</span>
      </div>
      <div className="process-slide-copy">
        <span>{step.index}</span>
        <h3>{step.title}</h3>
        <p>{step.body}</p>
      </div>
    </article>
  );
}

export function ProcessCarousel() {
  const { viewportRef, activeIndex, progress, scrollToIndex, scrollByItem } =
    useHorizontalScrollTracker(steps.length);

  return (
    <div className="process-carousel">
      <div className="process-carousel-desktop">
        <div className="process-carousel-toolbar">
          <div className="carousel-controls">
            <button
              onClick={() => scrollByItem(-1)}
              aria-label="Langkah sebelumnya"
            >
              <LineGlyph kind="navLeft" />
            </button>
            <button
              onClick={() => scrollByItem(1)}
              aria-label="Langkah berikutnya"
            >
              <LineGlyph kind="navRight" />
            </button>
          </div>
        </div>

        <div
          className="process-carousel-viewport native-horizontal-carousel"
          ref={viewportRef}
          tabIndex={0}
          aria-label="Proses layanan — scroll horizontal"
        >
          <div className="process-carousel-track">
            {steps.map((step) => (
              <StepCard step={step} carouselItem key={step.index} />
            ))}
          </div>
        </div>

        <div className="carousel-pagination process-pagination">
          <div className="carousel-dots">
            {steps.map((_, index) => (
              <button
                key={index}
                className={index === activeIndex ? "active" : ""}
                onClick={() => scrollToIndex(index)}
                aria-label={`Buka langkah ${index + 1}`}
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
            {String(activeIndex + 1).padStart(2, "0")} / 03
          </span>
        </div>
      </div>

      <div
        className="process-mobile-short-grid"
        aria-label="Tiga langkah proses layanan"
      >
        {steps.map((step) => (
          <StepCard step={step} key={step.index} />
        ))}
      </div>
    </div>
  );
}
