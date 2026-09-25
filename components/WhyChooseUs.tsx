"use client";

import { useRef, useState } from "react";
import { Reveal } from "@/components/Reveal";
import { LineGlyph } from "@/components/LineGlyph";

const reasons = [
  {
    index: "01",
    kind: "consult" as const,
    eyebrow: "KONSULTASI & SURVEI",
    title: "Gratis konsultasi & survei lokasi.",
    body:
      "Diskusikan kebutuhan, ukuran, dan kondisi bukaan sebelum pengerjaan. Survei membantu keputusan material dan sistem lebih presisi.",
  },
  {
    index: "02",
    kind: "price" as const,
    eyebrow: "HARGA",
    title: "Kompetitif & bisa dibicarakan.",
    body:
      "Pilihan material dan konfigurasi dapat disesuaikan dengan kebutuhan proyek. Penawaran dibahas transparan sebelum pekerjaan berjalan.",
  },
  {
    index: "03",
    kind: "material" as const,
    eyebrow: "MATERIAL",
    title: "Material premium pilihan.",
    body:
      "Profil aluminium, kaca, finishing, dan hardware dipilih mengikuti fungsi, tampilan, serta kondisi aktual di lapangan.",
  },
  {
    index: "04",
    kind: "install" as const,
    eyebrow: "PENGERJAAN",
    title: "Cepat, rapi & presisi.",
    body:
      "Pengukuran, fabrikasi, alignment, sambungan, dan finishing diarahkan agar hasil akhir terasa bersih dan menyatu dengan ruang.",
  },
  {
    index: "05",
    kind: "warranty" as const,
    eyebrow: "AFTER-SALES",
    title: "Garansi hingga 5 tahun.",
    body:
      "Dukungan pascapemasangan memberi ketenangan bila muncul kendala teknis sesuai cakupan garansi yang disepakati.",
  },
  {
    index: "06",
    kind: "heart" as const,
    eyebrow: "SERVICE",
    title: "Selalu melayani dengan hati.",
    body:
      "Pintu aluminium, jendela aluminium, partisi, kaca tempered, shower box, railing, dan kebutuhan kaca/aluminium terkait ditangani dengan komunikasi yang jelas.",
  },
] as const;

const proof = [
  {
    value: "750+",
    label: "Klien percaya pada kami",
  },
  {
    value: "100%",
    label: "Garansi pemeliharaan / servis*",
  },
  {
    value: "24 / 7",
    label: "Kanal konsultasi dapat dihubungi",
  },
] as const;

function ReasonCard({
  reason,
  className = "",
}: {
  reason: (typeof reasons)[number];
  className?: string;
}) {
  return (
    <article className={`why-us-card-v2 ${className}`}>
      <div className="why-us-card-v2-top">
        <span className="why-us-card-v2-icon">
          <LineGlyph kind={reason.kind} />
        </span>
        <span className="why-us-card-v2-index">{reason.index}</span>
      </div>
      <div className="why-us-card-v2-copy">
        <p className="why-us-card-v2-eyebrow">{reason.eyebrow}</p>
        <h3>{reason.title}</h3>
        <p>{reason.body}</p>
      </div>
    </article>
  );
}

export function WhyChooseUs() {
  const viewportRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const goTo = (index: number) => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const next = Math.max(0, Math.min(reasons.length - 1, index));
    const card = viewport.children[next] as HTMLElement | undefined;
    if (!card) return;

    viewport.scrollTo({
      left: card.offsetLeft - viewport.offsetLeft,
      behavior: "smooth",
    });
    setActive(next);
  };

  const syncActive = () => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const center = viewport.scrollLeft + viewport.clientWidth / 2;
    let closest = 0;
    let distance = Number.POSITIVE_INFINITY;

    Array.from(viewport.children).forEach((child, index) => {
      const card = child as HTMLElement;
      const cardCenter = card.offsetLeft + card.offsetWidth / 2;
      const delta = Math.abs(cardCenter - center);
      if (delta < distance) {
        distance = delta;
        closest = index;
      }
    });

    setActive(closest);
  };

  return (
    <section className="section why-us-section-v2" aria-labelledby="why-us-title">
      <div className="container">
        <Reveal className="why-us-heading-v2">
          <p className="eyebrow">WHY CHOOSE US</p>
          <div className="why-us-heading-v2-grid">
            <h2 id="why-us-title" className="why-us-title">
              <strong>Detail yang terasa.</strong>
              <span>Sebelum dan sesudah terpasang.</span>
            </h2>
            <p>
              Bukan sekadar aluminium dan kaca. Kami menjaga proses dari
              konsultasi, pemilihan material, pengerjaan, sampai dukungan
              pascapemasangan.
            </p>
          </div>
        </Reveal>

        <Reveal className="why-us-proof" delay={0.04}>
          {proof.map((item) => (
            <div key={item.value} className="why-us-proof-item">
              <strong>{item.value}</strong>
              <span>{item.label}</span>
            </div>
          ))}
        </Reveal>

        <div className="why-us-desktop-bento">
          {reasons.map((reason, index) => (
            <Reveal
              className={`why-us-desktop-cell why-us-desktop-cell-${index + 1}`}
              delay={index * 0.045}
              key={reason.index}
            >
              <ReasonCard
                reason={reason}
                className={index === 0 || index === 5 ? "is-featured" : ""}
              />
            </Reveal>
          ))}
        </div>

        <div className="why-us-mobile-carousel" aria-label="Alasan memilih Mestika Abadi Makmur">
          <div
            className="why-us-mobile-viewport"
            ref={viewportRef}
            onScroll={syncActive}
          >
            {reasons.map((reason, index) => (
              <ReasonCard
                key={reason.index}
                reason={reason}
                className={index === 0 ? "is-featured" : ""}
              />
            ))}
          </div>

          <div className="why-us-mobile-toolbar">
            <div className="why-us-mobile-dots" aria-label="Navigasi alasan">
              {reasons.map((reason, index) => (
                <button
                  key={reason.index}
                  type="button"
                  className={index === active ? "active" : ""}
                  aria-label={`Buka alasan ${index + 1}`}
                  aria-current={index === active ? "true" : undefined}
                  onClick={() => goTo(index)}
                >
                  <span />
                </button>
              ))}
            </div>

            <div className="why-us-mobile-nav">
              <span className="why-us-mobile-count">
                {String(active + 1).padStart(2, "0")} / {String(reasons.length).padStart(2, "0")}
              </span>
              <button
                type="button"
                aria-label="Alasan sebelumnya"
                onClick={() => goTo(active - 1)}
                disabled={active === 0}
              >
                <LineGlyph kind="navLeft" />
              </button>
              <button
                type="button"
                aria-label="Alasan berikutnya"
                onClick={() => goTo(active + 1)}
                disabled={active === reasons.length - 1}
              >
                <LineGlyph kind="navRight" />
              </button>
            </div>
          </div>
        </div>

        <p className="why-us-note">
          *Cakupan dan masa garansi mengikuti jenis pekerjaan serta kesepakatan proyek.
        </p>
      </div>
    </section>
  );
}
