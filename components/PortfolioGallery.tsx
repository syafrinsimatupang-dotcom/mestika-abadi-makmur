import Link from "next/link";
import { services } from "@/lib/services";

export function PortfolioGallery() {
  return (
    <div className="portfolio-gallery">
      {services.flatMap((service) => service.images.map((image, index) => (
        <Link
          className="portfolio-gallery-card"
          href={`/layanan/${service.slug}/`}
          aria-label={`Lihat detail ${service.shortTitle}, foto ${index + 1}`}
          key={image}
        >
          <div className="portfolio-gallery-media">
            <img
              src={image}
              alt={`${service.shortTitle} — foto ${index + 1}`}
              width="960"
              height="960"
              loading="lazy"
              style={{ objectPosition: service.imagePosition }}
            />
          </div>
          <div className="portfolio-gallery-copy">
            <div>
              <h3>{service.shortTitle}</h3>
            </div>
          </div>
        </Link>
      )))}
    </div>
  );
}
