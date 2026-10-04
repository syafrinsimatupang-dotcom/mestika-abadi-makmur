import Link from "next/link";
import { ArrowUpRightIcon } from "@/components/ArrowUpRightIcon";
import { services } from "@/lib/services";

export function PortfolioGallery() {
  return (
    <div className="portfolio-gallery">
      {services.map((service, index) => (
        <Link
          className="portfolio-gallery-card"
          href={`/layanan/${service.slug}/`}
          aria-label={`Lihat detail ${service.shortTitle}`}
          key={service.slug}
        >
          <div className="portfolio-gallery-media">
            <img
              src={service.image}
              alt={service.imageAlt}
              width="960"
              height="960"
              loading={index < 3 ? "eager" : "lazy"}
              style={{ objectPosition: service.imagePosition }}
            />
            <span className="portfolio-gallery-number">
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>
          <div className="portfolio-gallery-copy">
            <div>
              <p>{service.images.length} FOTO PRODUK</p>
              <h3>{service.shortTitle}</h3>
              <span>{service.description}</span>
            </div>
            <span className="portfolio-gallery-arrow" aria-hidden="true">
              <ArrowUpRightIcon />
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}
