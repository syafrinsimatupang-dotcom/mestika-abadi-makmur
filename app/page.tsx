import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { PortfolioCarousel } from "@/components/PortfolioCarousel";
import { ProcessCarousel } from "@/components/ProcessCarousel";
import { WhatsAppPlanner } from "@/components/WhatsAppPlanner";
import { SystemShowcase } from "@/components/SystemShowcase";
import { TrustMarquee } from "@/components/TrustMarquee";
import { HomeHero } from "@/components/HomeHero";
import { MobileMicroAccordion } from "@/components/MobileMicroAccordion";
import { MarketingMoment } from "@/components/MarketingMoment";
import { ServiceCollection } from "@/components/ServiceCollection";
import { ArrowUpRightIcon } from "@/components/ArrowUpRightIcon";
import { services } from "@/lib/services";
import { siteConfig, whatsappHref } from "@/lib/site";

export const metadata: Metadata = { alternates: { canonical: "/" } };

const homeFaq = [
  {
    q: "Apakah Mestika Abadi Makmur melayani area Jabodetabek?",
    a: "Ya. Area layanan mencakup Jakarta, Bogor, Depok, Tangerang, Bekasi, dan sekitarnya. Kirim lokasi proyek melalui WhatsApp untuk konfirmasi jangkauan.",
  },
  {
    q: "Bisa konsultasi untuk pintu, jendela, kusen, partisi kaca, dan shower box?",
    a: "Bisa. Kami melayani pintu aluminium, jendela aluminium, kusen aluminium, partisi kaca, shower box, sliding system, kaca frameless, dan kebutuhan aluminium/kaca terkait.",
  },
  {
    q: "Apakah ukuran dan model bisa disesuaikan?",
    a: "Kebutuhan fabrikasi pada umumnya mengikuti kondisi aktual, fungsi ruang, ukuran bukaan, serta pilihan material dan hardware yang disepakati.",
  },
];

export default function HomePage() {
  const localBusiness = {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    name: siteConfig.name,
    description: siteConfig.description,
    address: {
      "@type": "PostalAddress",
      streetAddress:
        "Jl. H. Buang, RT/RW 03/03, Kelurahan Cipete, Kecamatan Pinang",
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

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: homeFaq.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <HomeHero />

      <TrustMarquee />

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

      <SystemShowcase />

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

      <section className="section local-seo-section">
        <div className="container local-seo-grid">
          <Reveal className="local-seo-copy">
            <p className="eyebrow">AREA LAYANAN · JABODETABEK</p>
            <h2 className="local-seo-title">
              Butuh pintu aluminium
              <br />
              dan pintu kaca
              <br />
              <span>di Jabodetabek?</span>
            </h2>
            <p>
              Kirim jenis pekerjaan dan lokasi Anda melalui WhatsApp. Kami bantu
              arahkan kebutuhan pintu aluminium, pintu kaca, jendela, kusen,
              partisi kaca, atau shower box yang sesuai.
            </p>
          </Reveal>
          <Reveal className="keyword-panel premium-surface" delay={0.08}>
            {services.map((service, index) => (
              <Link key={service.slug} href={`/layanan/${service.slug}/`}>
                <span>0{index + 1}</span>
                <strong>{service.keyword}</strong>
                <small>Jabodetabek</small>
                <b aria-hidden="true"><ArrowUpRightIcon /></b>
              </Link>
            ))}
          </Reveal>
        </div>
      </section>

      <MarketingMoment />

      <section className="section inquiry-section">
        <div className="container inquiry-grid">
          <Reveal className="inquiry-copy">
            <p className="eyebrow">MULAI DARI KEBUTUHAN</p>
            <h2>
              Ceritakan kebutuhan Anda
              <br />
              <span>secukupnya.</span>
            </h2>
            <p>
              Pilih layanan atau produk, tulis lokasi, lalu tambahkan ukuran
              atau foto kondisi bila ada. Kami lanjutkan konsultasi melalui
              WhatsApp.
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <WhatsAppPlanner />
          </Reveal>
        </div>
      </section>

      <section className="section faq-section">
        <div className="container faq-grid">
          <Reveal>
            <p className="eyebrow">FAQ</p>
            <h2>
              Pertanyaan
              <br />
              <span>sebelum mulai.</span>
            </h2>
          </Reveal>
          <div className="faq-list">
            {homeFaq.map((item, index) => (
              <Reveal key={item.q} className="faq-item" delay={index * 0.04}>
                <MobileMicroAccordion summary={item.q} index={`0${index + 1}`}>
                  <p>{item.a}</p>
                </MobileMicroAccordion>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="final-cta">
        <div
          className="container final-cta-inner dark-surface"
          data-nav-theme="dark"
        >
          <Reveal>
            <p className="eyebrow light">MESTIKA ABADI MAKMUR · JABODETABEK</p>
            <h2>
              Ruang yang lebih rapi
              <br />
              dimulai dari <em>detail.</em>
            </h2>
            <a
              className="button button-light"
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
