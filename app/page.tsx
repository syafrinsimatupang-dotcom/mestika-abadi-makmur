import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { PortfolioCarousel } from "@/components/PortfolioCarousel";
import { ProcessCarousel } from "@/components/ProcessCarousel";
import { TrustMarquee } from "@/components/TrustMarquee";
import { HomeHero } from "@/components/HomeHero";
import { ServiceCollection } from "@/components/ServiceCollection";
import { WhyChooseUs } from "@/components/WhyChooseUs";
import { ArrowUpRightIcon } from "@/components/ArrowUpRightIcon";
import { services } from "@/lib/services";
import { siteConfig, whatsappHref } from "@/lib/site";

export const metadata: Metadata = { alternates: { canonical: "/" } };

export default function HomePage() {
  const localBusiness = {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    name: siteConfig.name,
    description: siteConfig.description,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address,
      addressLocality: "Kota Tangerang",
      addressRegion: "Banten",
      addressCountry: "ID",
    },
    areaServed: ["Jakarta", "Bogor", "Depok", "Tangerang", "Bekasi"].map(
      (name) => ({ "@type": "City", name }),
    ),
    serviceType: services.map((service) => service.title),
    ...(siteConfig.whatsapp ? { telephone: `+${siteConfig.whatsapp}` } : {}),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }}
      />

      <HomeHero />

      <TrustMarquee />

      <WhyChooseUs />

      <section className="section section-services" id="layanan">
        <div className="container">
          <Reveal className="section-heading split-heading">
            <div>
              <p className="eyebrow">LAYANAN DAN PRODUK</p>
              <h2>
                Layanan dan produk.
                <br />
                <span>Satu standar pengerjaan rapi.</span>
              </h2>
            </div>
            <p>
              Pilih kebutuhan Anda—pintu, jendela, kusen, partisi kaca, atau
              shower box. Kami bantu dari pengukuran hingga pemasangan.
            </p>
          </Reveal>

          <ServiceCollection />
        </div>
      </section>

      <section className="section process-section">
        <div className="container process-grid">
          <Reveal className="process-intro">
            <p className="eyebrow">ALUR KERJA</p>
            <h2>
              Dari kebutuhan ke <span>instalasi.</span>
            </h2>
            <p>
              Alur dibuat sederhana agar keputusan material, ukuran, dan
              konfigurasi bukaan dapat dibahas sebelum pekerjaan berjalan.
            </p>
          </Reveal>
          <ProcessCarousel />
        </div>
      </section>

      <section
        className="section portfolio-section dark-surface"
        data-nav-theme="dark"
      >
        <div className="container">
          <Reveal className="section-heading split-heading portfolio-heading">
            <div>
              <p className="eyebrow">REFERENSI PEKERJAAN</p>
              <h2>
                Lihat jenis pekerjaan
                <br />
                <span>yang kami layani.</span>
              </h2>
            </div>
            <Link className="text-link" href="/portofolio/">
              Buka galeri <ArrowUpRightIcon />
            </Link>
          </Reveal>
          <PortfolioCarousel compact />
        </div>
      </section>

      <section className="final-cta" data-nav-theme="light">
        <div className="container final-cta-inner">
          <Reveal>
            <p className="eyebrow">MESTIKA ABADI MAKMUR · JABODETABEK</p>
            <h2>
              Ruang yang lebih rapi
              <br />
              dimulai dari <em>detail.</em>
            </h2>
            <a
              className="button button-primary"
              href={whatsappHref({ sourcePath: "/" })}
              target="_blank"
              rel="noreferrer"
            >
              Konsultasi sekarang <ArrowUpRightIcon />
            </a>
          </Reveal>
        </div>
      </section>
    </>
  );
}
