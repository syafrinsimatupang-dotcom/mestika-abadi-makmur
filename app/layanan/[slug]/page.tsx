import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/Reveal";
import { WhatsAppPlanner } from "@/components/WhatsAppPlanner";
import { ProcessCarousel } from "@/components/ProcessCarousel";
import { ServiceDetailPanels } from "@/components/ServiceDetailPanels";
import { RelatedServicesCollection } from "@/components/RelatedServicesCollection";
import { MobileMicroAccordion } from "@/components/MobileMicroAccordion";
import { ArrowLeftIcon, ArrowUpRightIcon } from "@/components/ArrowUpRightIcon";
import { serviceBySlug, services } from "@/lib/services";
import { siteConfig, whatsappHref } from "@/lib/site";

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  return params.then(({ slug }) => {
    const service = serviceBySlug[slug];
    if (!service) return {};
    return {
      title: service.title,
      description: service.metaDescription,
      keywords: [
        service.keyword,
        `${service.keyword} Jabodetabek`,
        "aluminium Jabodetabek",
        "kaca Jabodetabek",
      ],
      alternates: {
        canonical: `${siteConfig.url}/layanan/${service.slug}/`,
      },
      openGraph: {
        title: `${service.title} | Mestika Abadi Makmur`,
        description: service.metaDescription,
        type: "website",
        url: `${siteConfig.url}/layanan/${service.slug}/`,
        images: [{ url: service.image, alt: service.imageAlt }],
      },
    };
  });
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = serviceBySlug[slug];
  if (!service) notFound();

  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    serviceType: service.keyword,
    provider: {
      "@type": "HomeAndConstructionBusiness",
      name: siteConfig.name,
      telephone: `+${siteConfig.whatsapp}`,
      address: {
        "@type": "PostalAddress",
        streetAddress: siteConfig.address,
        addressLocality: "Kota Tangerang",
        addressRegion: "Banten",
        addressCountry: "ID",
      },
    },
    areaServed: ["Jakarta", "Bogor", "Depok", "Tangerang", "Bekasi"].map(
      (name) => ({ "@type": "City", name }),
    ),
    description: service.metaDescription,
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: service.faq.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <section className="inner-hero service-hero section-pad">
        <div className="container inner-hero-grid">
          <Reveal className="inner-hero-copy">
            <Link className="back-link" href="/layanan/">
              <ArrowLeftIcon /> Semua layanan dan produk
            </Link>
            <p className="eyebrow">
              {service.keyword.toUpperCase()} · JABODETABEK
            </p>
            <h1 className="service-hero-title">
              <strong className="service-hero-title-main">
                {service.shortTitle}
              </strong>
              <span className="service-hero-title-support">
                untuk ruang yang tepat.
              </span>
            </h1>
            <p className="inner-lead service-hero-lead">
              {service.description}
            </p>
            <div className="service-hero-actions">
              <span className="service-highlight">{service.highlight}</span>
              <a
                className="button button-primary"
                href={whatsappHref({
                  sourcePath: `/layanan/${service.slug}/`,
                  service: service.shortTitle,
                })}
                target="_blank"
                rel="noreferrer"
              >
                Konsultasi {service.shortTitle} <ArrowUpRightIcon />
              </a>
            </div>
          </Reveal>
          <Reveal
            className={`inner-hero-image service-hero-image service-hero-image-${service.slug}`}
            delay={0.08}
          >
            <img
              src={service.image}
              alt={service.imageAlt}
              width="1100"
              height="1300"
              fetchPriority="high"
              style={{ objectPosition: service.imagePosition }}
            />
            <span className="reference-badge">REFERENSI PEKERJAAN</span>
          </Reveal>
        </div>
      </section>

      <section className="section detail-section">
        <div className="container">
          <ServiceDetailPanels service={service} />
        </div>
      </section>

      <section className="section service-process">
        <div className="container">
          <Reveal className="section-heading split-heading">
            <div>
              <p className="eyebrow">PROSES PENGERJAAN</p>
              <h2>
                Dari kebutuhan
                <br />
                <span>sampai pemasangan.</span>
              </h2>
            </div>
            <p>
              Cukup kirim jenis pekerjaan, lokasi, serta ukuran atau foto
              kondisi bila ada. Detail lainnya dapat dikonfirmasi saat
              konsultasi.
            </p>
          </Reveal>
          <ProcessCarousel />
        </div>
      </section>

      <section className="section related-services">
        <div className="container">
          <Reveal className="section-heading split-heading">
            <div>
              <p className="eyebrow">LAYANAN DAN PRODUK LAINNYA</p>
              <h2>
                Butuh pekerjaan
                <br />
                <span>aluminium atau kaca lainnya?</span>
              </h2>
            </div>
          </Reveal>
          <RelatedServicesCollection currentSlug={service.slug} />
        </div>
      </section>

      <section className="section faq-section compact-faq">
        <div className="container faq-grid">
          <Reveal>
            <p className="eyebrow">FAQ · {service.shortTitle.toUpperCase()}</p>
            <h2>
              Sebelum
              <br />
              <span>konsultasi.</span>
            </h2>
          </Reveal>
          <div className="faq-list">
            {service.faq.map((item, index) => (
              <Reveal key={item.q} className="faq-item" delay={index * 0.04}>
                <MobileMicroAccordion summary={item.q} index={`0${index + 1}`}>
                  <p>{item.a}</p>
                </MobileMicroAccordion>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section inquiry-section">
        <div className="container inquiry-grid">
          <Reveal className="inquiry-copy">
            <p className="eyebrow">KONSULTASI</p>
            <h2>
              Ceritakan kebutuhan
              <br />
              <span>yang ingin dikerjakan.</span>
            </h2>
            <p>
              Pilih layanan, tulis lokasi, lalu tambahkan ukuran atau foto
              kondisi bila ada. Kami lanjutkan melalui WhatsApp.
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <WhatsAppPlanner defaultService={service.shortTitle} />
          </Reveal>
        </div>
      </section>
    </>
  );
}
