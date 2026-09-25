'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { LineGlyph } from '@/components/LineGlyph';
import { ArrowUpRightIcon } from "@/components/ArrowUpRightIcon";
import { useHorizontalScrollTracker } from '@/components/useHorizontalScrollTracker';
import { services } from '@/lib/services';
import { whatsappHref } from '@/lib/site';

const kinds = ['door', 'window', 'frame', 'partition', 'shower'] as const;

export function ServicesPageCatalog() {
  const {
    viewportRef,
    activeIndex,
    progress,
    scrollToIndex,
    scrollByItem,
  } = useHorizontalScrollTracker(services.length);

  return (
    <section className="section services-refined-section" aria-labelledby="services-catalog-title">
      <div className="container">
        <div className="services-refined-heading">
          <div>
            <p className="eyebrow">PILIH KEBUTUHAN</p>
            <h2 id="services-catalog-title">Lima kebutuhan utama.<br /><span>Satu pengerjaan yang rapi.</span></h2>
          </div>
          <p>Pilih produk yang Anda butuhkan. Detail ukuran, jenis bukaan, kaca, dan kondisi lokasi bisa dikonsultasikan sebelum pengerjaan.</p>
        </div>

        <div className="services-refined-desktop">
          {services.map((service, index) => (
            <motion.article
              key={service.slug}
              id={service.slug}
              className={`services-refined-card services-refined-card-${index + 1}`}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.16 }}
              transition={{ duration: 0.48, delay: index * 0.035, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="services-refined-media">
                <img
                  src={service.image}
                  alt={service.imageAlt}
                  width="1200"
                  height="900"
                  loading="lazy"
                  style={{ objectPosition: service.imagePosition }}
                />
                <span className="reference-badge">REFERENSI PEKERJAAN</span>
                <span className="services-refined-index">0{index + 1}</span>
              </div>

              <div className="services-refined-copy">
                <div className="services-refined-topline">
                  <p className="service-keyword">{service.keyword}</p>
                  <LineGlyph kind={kinds[index]} />
                </div>
                <h3>{service.shortTitle}</h3>
                <p>{service.description}</p>
                <div className="services-refined-actions">
                  <Link href={`/layanan/${service.slug}/`}>
                    Lihat detail <ArrowUpRightIcon />
                  </Link>
                  <a
                    href={whatsappHref({
                      sourcePath: `/layanan/${service.slug}/`,
                      service: service.shortTitle,
                    })}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Konsultasi WhatsApp <ArrowUpRightIcon />
                  </a>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        <div className="services-refined-mobile">
          <div className="services-refined-mobile-toolbar">
            <p>Geser untuk melihat layanan dan produk lainnya.</p>
            <div className="carousel-controls" aria-label="Kontrol layanan dan produk">
              <button type="button" onClick={() => scrollByItem(-1)} aria-label="Layanan sebelumnya">
                <LineGlyph kind="navLeft" />
              </button>
              <button type="button" onClick={() => scrollByItem(1)} aria-label="Layanan berikutnya">
                <LineGlyph kind="navRight" />
              </button>
            </div>
          </div>

          <div
            className="services-refined-mobile-viewport native-horizontal-carousel"
            ref={viewportRef}
            aria-label="Layanan dan produk — scroll horizontal"
          >
            <div className="services-refined-mobile-track">
              {services.map((service, index) => (
                <article className="services-refined-mobile-card" data-carousel-item key={service.slug}>
                  <div className="services-refined-mobile-media">
                    <img
                      src={service.image}
                      alt={service.imageAlt}
                      width="900"
                      height="700"
                      loading="lazy"
                      style={{ objectPosition: service.imagePosition }}
                    />
                    <span className="reference-badge">REFERENSI PEKERJAAN</span>
                    <span className="services-refined-index">0{index + 1}</span>
                  </div>

                  <div className="services-refined-mobile-copy">
                    <div className="services-refined-topline">
                      <p className="service-keyword">{service.keyword}</p>
                      <LineGlyph kind={kinds[index]} />
                    </div>
                    <h3>{service.shortTitle}</h3>
                    <p>{service.description}</p>
                    <div className="services-refined-mobile-actions">
                      <Link href={`/layanan/${service.slug}/`}>
                        Detail <ArrowUpRightIcon />
                      </Link>
                      <a
                        href={whatsappHref({
                          sourcePath: `/layanan/${service.slug}/`,
                          service: service.shortTitle,
                        })}
                        target="_blank"
                        rel="noreferrer"
                      >
                        WhatsApp <ArrowUpRightIcon />
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className="carousel-pagination services-refined-pagination" aria-label="Posisi layanan">
            <div className="carousel-dots">
              {services.map((_, index) => (
                <button
                  type="button"
                  key={index}
                  className={index === activeIndex ? 'active' : ''}
                  onClick={() => scrollToIndex(index)}
                  aria-label={`Buka layanan ${index + 1}`}
                  aria-current={index === activeIndex ? 'true' : undefined}
                />
              ))}
            </div>

            <div className="carousel-progress" aria-hidden="true">
              <motion.span
                initial={false}
                animate={{ scaleX: progress }}
                transition={{ duration: 0.08, ease: 'linear' }}
              />
            </div>

            <span className="carousel-count">
              {String(activeIndex + 1).padStart(2, '0')} / {String(services.length).padStart(2, '0')}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
