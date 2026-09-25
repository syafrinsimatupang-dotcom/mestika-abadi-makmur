import type { Metadata } from "next";
import Link from "next/link";
import { WhatsAppPlanner } from "@/components/WhatsAppPlanner";
import { ArrowUpRightIcon } from "@/components/ArrowUpRightIcon";
import { siteConfig, whatsappHref } from "@/lib/site";

export const metadata: Metadata = {
  alternates: { canonical: "/kontak/" },
  title: "Kontak & Konsultasi Aluminium Kaca Jabodetabek",
  description:
    "Hubungi Mestika Abadi Makmur untuk konsultasi pintu, jendela, kusen aluminium, partisi kaca, shower box, dan kebutuhan aluminium kaca di Jabodetabek dan sekitarnya.",
};

const heroImage =
  "https://images.pexels.com/photos/1098982/pexels-photo-1098982.jpeg?auto=compress&cs=tinysrgb&w=1800";

const locationImage =
  "https://images.pexels.com/photos/7031607/pexels-photo-7031607.jpeg?auto=compress&cs=tinysrgb&w=1800";

export default function ContactPage() {
  return (
    <>
      <section
        className="contact-refined-hero section-pad"
        data-nav-theme="light"
      >
        <div className="container contact-refined-hero-grid">
          <div className="contact-refined-hero-copy">
            <p className="eyebrow">KONTAK · JABODETABEK</p>
            <h1>
              Mulai dari
              <br />
              <span>kebutuhan Anda.</span>
            </h1>
            <p>
              Kirim jenis kebutuhan, lokasi proyek, dan foto kondisi bila ada.
              Informasi awal itu sudah cukup untuk memulai konsultasi aluminium
              dan kaca.
            </p>

            <div className="contact-refined-hero-actions">
              <a
                className="button button-primary"
                href={whatsappHref({ sourcePath: "/kontak/" })}
                target="_blank"
                rel="noreferrer"
              >
                Chat WhatsApp <ArrowUpRightIcon />
              </a>
              <a
                className="contact-refined-number"
                href={whatsappHref({ sourcePath: "/kontak/" })}
                target="_blank"
                rel="noreferrer"
              >
                {siteConfig.whatsappDisplay}
              </a>
            </div>
          </div>

          <div className="contact-refined-hero-visual">
            <img
              src={heroImage}
              alt="Pintu kaca dengan frame aluminium hitam"
              width="1400"
              height="1100"
              fetchPriority="high"
            />
            <div className="contact-refined-hero-shade" />

            <div className="contact-refined-hero-glass contact-refined-hero-glass-top">
              <span className="status-dot" />
              <div>
                <small>AREA LAYANAN</small>
                <strong>Jabodetabek & sekitarnya</strong>
              </div>
            </div>

            <div className="contact-refined-hero-glass contact-refined-hero-glass-bottom">
              <small>KONSULTASI</small>
              <strong>Langsung via WhatsApp</strong>
            </div>
          </div>
        </div>

        <div
          className="container contact-refined-facts"
          aria-label="Informasi kontak utama"
        >
          <article>
            <span>WHATSAPP</span>
            <strong>{siteConfig.whatsappDisplay}</strong>
            <a
              href={whatsappHref({ sourcePath: "/kontak/" })}
              target="_blank"
              rel="noreferrer"
            >
              Mulai chat <ArrowUpRightIcon />
            </a>
          </article>
          <article>
            <span>AREA LAYANAN</span>
            <strong>Jabodetabek</strong>
            <p>Jakarta, Bogor, Depok, Tangerang, Bekasi & sekitar.</p>
          </article>
          <article>
            <span>ALAMAT USAHA</span>
            <strong>Cipete, Pinang</strong>
            <a href={siteConfig.mapsUrl} target="_blank" rel="noreferrer">
              Google Maps <ArrowUpRightIcon />
            </a>
          </article>
        </div>
      </section>

      <section className="section contact-refined-planner-section">
        <div className="container contact-refined-planner-grid">
          <div className="contact-refined-planner-copy">
            <p className="eyebrow">PESAN CEPAT</p>
            <h2>
              Konsultasi tanpa
              <br />
              <span>form yang rumit.</span>
            </h2>
            <p>
              Pilih kebutuhan, tulis lokasi proyek, dan tambahkan catatan
              singkat. Pesan akan disiapkan otomatis untuk WhatsApp.
            </p>

            <div
              className="contact-refined-checks"
              aria-label="Informasi yang membantu konsultasi"
            >
              <span>Jenis produk</span>
              <span>Lokasi proyek</span>
              <span>Ukuran / foto bila ada</span>
            </div>
          </div>

          <WhatsAppPlanner />
        </div>
      </section>

      <section className="contact-refined-location" data-nav-theme="dark">
        <div className="contact-refined-location-media">
          <img
            src={locationImage}
            alt="Bukaan kaca dan aluminium pada hunian modern"
            width="1800"
            height="1200"
            loading="lazy"
          />
          <div className="contact-refined-location-shade" />
        </div>

        <div className="container contact-refined-location-content">
          <div className="contact-refined-location-glass">
            <p className="eyebrow light">ALAMAT USAHA</p>
            <h2>
              Cipete, Pinang.
              <br />
              <span>Kota Tangerang.</span>
            </h2>
            <p>{siteConfig.address}</p>

            <div className="contact-refined-location-actions">
              <a
                className="button button-light"
                href={siteConfig.mapsUrl}
                target="_blank"
                rel="noreferrer"
              >
                Buka Google Maps <ArrowUpRightIcon />
              </a>
              <Link className="button button-dark-ghost" href="/layanan/">
                Layanan dan Produk
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
