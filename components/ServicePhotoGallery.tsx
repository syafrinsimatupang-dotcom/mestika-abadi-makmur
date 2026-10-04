"use client";

import { useRef, useState } from "react";
import type { Service } from "@/lib/services";
import { useHorizontalScrollTracker } from "@/components/useHorizontalScrollTracker";
import { LineGlyph } from "@/components/LineGlyph";

export function ServicePhotoGallery({ service }: { service: Service }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [selected, setSelected] = useState(0);
  const { viewportRef, activeIndex, scrollByItem } = useHorizontalScrollTracker(service.images.length);
  const move = (direction: number) => setSelected((current) =>
    (current + direction + service.images.length) % service.images.length,
  );

  return (
    <section id="galeri-produk" className="section product-photo-section" aria-labelledby="product-photo-title">
      <div className="container">
        <div className="product-photo-heading">
          <div>
            <p className="eyebrow">GALERI PRODUK</p>
            <h2 id="product-photo-title">Detail {service.shortTitle}.</h2>
            <p>Geser untuk melihat foto lainnya. Ketuk foto untuk memperbesar.</p>
          </div>
          <span>{service.images.length} foto</span>
        </div>
        <div className="product-photo-carousel">
        <div className="product-photo-navigation">
          <span aria-live="polite">Foto {activeIndex + 1} / {service.images.length}</span>
          <div className="carousel-controls" aria-label="Navigasi foto produk">
            <button type="button" onClick={() => scrollByItem(-1)} disabled={activeIndex === 0} aria-label="Geser ke foto sebelumnya"><LineGlyph kind="navLeft" /></button>
            <button type="button" onClick={() => scrollByItem(1)} disabled={activeIndex === service.images.length - 1} aria-label="Geser ke foto berikutnya"><LineGlyph kind="navRight" /></button>
          </div>
        </div>
        <div className="product-photo-grid" ref={viewportRef} role="region" aria-label={`Carousel foto ${service.shortTitle}`}>
          {service.images.map((src, index) => (
            <button
              key={src}
              type="button"
              className="product-photo-button"
              data-carousel-item
              aria-label={`Perbesar foto ${index + 1} ${service.shortTitle}`}
              onClick={() => { setSelected(index); dialog.current?.showModal(); }}
            >
              <img src={src} alt={`${service.shortTitle} — foto ${index + 1}`} width="1024" height="1280" loading="lazy" />
              <span>Foto {String(index + 1).padStart(2, "0")} <span aria-hidden="true">↗</span></span>
            </button>
          ))}
        </div>
        </div>
      </div>
      <dialog
        ref={dialog}
        className="product-photo-dialog"
        aria-label={`Galeri ${service.shortTitle}`}
        onClick={(event) => { if (event.target === event.currentTarget) dialog.current?.close(); }}
        onKeyDown={(event) => {
          if (event.key === "ArrowLeft") { event.preventDefault(); move(-1); }
          if (event.key === "ArrowRight") { event.preventDefault(); move(1); }
        }}
      >
        <div className="product-photo-viewer">
          <div className="product-photo-toolbar">
            <span>{service.shortTitle}</span>
            <button type="button" autoFocus onClick={() => dialog.current?.close()} aria-label="Tutup galeri">✕</button>
          </div>
          <img src={service.images[selected]} alt={`${service.shortTitle} — foto ${selected + 1}`} />
          <div className="product-photo-controls">
            <button type="button" onClick={() => move(-1)} aria-label="Foto sebelumnya">←</button>
            <span aria-live="polite">{selected + 1} / {service.images.length}</span>
            <button type="button" onClick={() => move(1)} aria-label="Foto berikutnya">→</button>
          </div>
        </div>
      </dialog>
    </section>
  );
}
