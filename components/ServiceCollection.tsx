'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { LineGlyph } from '@/components/LineGlyph';
import { ArrowUpRightIcon } from "@/components/ArrowUpRightIcon";
import { useHorizontalScrollTracker } from '@/components/useHorizontalScrollTracker';
import { services } from '@/lib/services';

const kinds = ['door', 'window', 'frame', 'partition', 'shower'] as const;

export function ServiceCollection() {
  const {
    viewportRef,
    activeIndex,
    progress,
    scrollToIndex,
    scrollByItem,
  } = useHorizontalScrollTracker(services.length);

  return (
    <>
      <div className="service-bento service-bento-desktop">
        {services.map((service, index) => (
          <motion.article
            key={service.slug}
            className={`service-card service-card-${index + 1}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.18 }}
            transition={{ duration: 0.46, delay: index * 0.035, ease: [0.22, 1, 0.36, 1] }}
          >
            <Link href={`/layanan/${service.slug}/`}>
              <div className="service-card-top">
                <LineGlyph kind={kinds[index]} />
                <span className="service-index">0{index + 1}</span>
              </div>
              <div>
                <p className="service-keyword">{service.keyword}</p>
                <h3>{service.shortTitle}</h3>
                <p>{service.description}</p>
              </div>
              <div className="service-link">Detail layanan <ArrowUpRightIcon /></div>
            </Link>
          </motion.article>
        ))}
      </div>

      <div className="service-mobile-carousel">
        <div className="service-mobile-toolbar">
          <p>Pilih layanan atau produk, lalu geser untuk melihat pilihan lainnya.</p>
          <div className="carousel-controls" aria-label="Kontrol layanan">
            <button type="button" onClick={() => scrollByItem(-1)} aria-label="Layanan sebelumnya">
              <LineGlyph kind="navLeft" />
            </button>
            <button type="button" onClick={() => scrollByItem(1)} aria-label="Layanan berikutnya">
              <LineGlyph kind="navRight" />
            </button>
          </div>
        </div>

        <div
          className="service-mobile-viewport native-horizontal-carousel"
          ref={viewportRef}
          aria-label="Layanan dan produk — scroll horizontal"
        >
          <div className="service-mobile-track">
            {services.map((service, index) => (
              <article className="service-mobile-card" data-carousel-item key={service.slug}>
                <Link href={`/layanan/${service.slug}/`}>
                  <div className="service-mobile-image">
                    <img
                      src={service.image}
                      alt={service.imageAlt}
                      width="900"
                      height="680"
                      loading="lazy"
                      style={{ objectPosition: service.imagePosition }}
                    />
                    <span className="service-mobile-number">0{index + 1}</span>
                  </div>

                  <div className="service-mobile-body">
                    <div className="service-mobile-heading">
                      <p className="service-keyword">{service.keyword}</p>
                      <LineGlyph kind={kinds[index]} />
                    </div>
                    <h3>{service.shortTitle}</h3>
                    <p>{service.description}</p>
                    <div className="service-link">Detail layanan <ArrowUpRightIcon /></div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </div>

        <div className="carousel-pagination service-mobile-pagination" aria-label="Posisi layanan">
          <div className="carousel-dots">
            {services.map((_, index) => (
              <button
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
    </>
  );
}
