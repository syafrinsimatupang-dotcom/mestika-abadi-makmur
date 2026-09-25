import type { Metadata } from "next";
import { ServicesPageCatalog } from "@/components/ServicesPageCatalog";
import { ArrowUpRightIcon } from "@/components/ArrowUpRightIcon";
import { whatsappHref } from "@/lib/site";

export const metadata: Metadata = {
  alternates: { canonical: "/layanan/" },
  title: "Layanan dan Produk Aluminium Kaca Jabodetabek",
  description:
    "Layanan dan produk Mestika Abadi Makmur untuk pintu aluminium, jendela aluminium, kusen aluminium, partisi kaca, shower box, sliding, frameless glass dan kebutuhan aluminium kaca di Jabodetabek dan sekitarnya.",
};

const heroImage =
  "https://images.pexels.com/photos/19963718/pexels-photo-19963718/free-photo-of-modern-house-windows.jpeg?auto=compress&cs=tinysrgb&w=1800";

const ctaImage =
  "https://images.pexels.com/photos/7031607/pexels-photo-7031607.jpeg?auto=compress&cs=tinysrgb&w=1800";

export default function ServicesPage() {
  return (
    <>
      <section
        className="services-refined-hero section-pad"
        data-nav-theme="light"
      >
        <div className="container services-refined-hero-grid">
          <div className="services-refined-hero-copy">
            <p className="eyebrow">LAYANAN DAN PRODUK · JABODETABEK</p>
            <h1>
              Aluminium & kaca
              <br />
              <span>untuk kebutuhan ruang Anda.</span>
            </h1>
            <p>
              Pilih pintu, jendela, kusen, partisi kaca, atau shower box. Kami
              bantu dari pengukuran, pemilihan sistem, hingga pemasangan.
            </p>

            <div className="services-refined-hero-actions">
              <a
                className="button button-primary"
                href={whatsappHref({ sourcePath: "/layanan/" })}
                target="_blank"
                rel="noreferrer"
              >
                Konsultasi WhatsApp <ArrowUpRightIcon />
              </a>
              <a className="services-refined-jump" href="#daftar-layanan">
                Lihat pilihan <span>↓</span>
              </a>
            </div>

            <div
              className="services-refined-tags"
              aria-label="Pilihan layanan utama"
            >
              <span>Pintu</span>
              <span>Jendela</span>
              <span>Kusen</span>
              <span>Partisi</span>
              <span>Shower</span>
            </div>
          </div>

          <div className="services-refined-hero-visual">
            <img
              src={heroImage}
              alt="Jendela aluminium modern sebagai fokus layanan"
              width="1200"
              height="1500"
              fetchPriority="high"
            />
            <div className="services-refined-hero-shade" />
            <div className="services-refined-hero-glass">
              <span className="status-dot" />
              <div>
                <small>AREA LAYANAN</small>
                <strong>Jabodetabek & sekitarnya</strong>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div id="daftar-layanan">
        <ServicesPageCatalog />
      </div>

      <section className="services-refined-cta" data-nav-theme="dark">
        <div className="services-refined-cta-media">
          <img
            src={ctaImage}
            alt="Bukaan kaca dan aluminium pada hunian modern"
            width="1800"
            height="1200"
            loading="lazy"
          />
          <div className="services-refined-cta-shade" />
        </div>

        <div className="container services-refined-cta-content">
          <div className="services-refined-cta-glass">
            <p className="eyebrow light">BUTUH KONFIGURASI LAIN?</p>
            <h2>
              Sliding, frameless,
              <br />
              <span>spandrel, atau custom.</span>
            </h2>
            <p>
              Kirim kebutuhan dan foto kondisi lokasi. Kami bantu arahkan
              pilihan yang sesuai.
            </p>
            <a
              className="button button-light"
              href={whatsappHref({ sourcePath: "/layanan/" })}
              target="_blank"
              rel="noreferrer"
            >
              Tanyakan via WhatsApp <ArrowUpRightIcon />
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
