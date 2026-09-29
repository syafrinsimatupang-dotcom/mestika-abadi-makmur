'use client';

import Link from 'next/link';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { LineGlyph } from '@/components/LineGlyph';
import { ArrowUpRightIcon } from "@/components/ArrowUpRightIcon";
import { services } from '@/lib/services';
import { whatsappHref } from '@/lib/site';

function kindForService(slug: string): 'door' | 'window' | 'partition' | 'shower' {
  if (slug.startsWith('pintu-')) return 'door';
  if (slug.startsWith('jendela-')) return 'window';
  if (slug.startsWith('partisi-')) return 'partition';
  return 'shower';
}

export function ServicesPageCatalog() {
  const [category, setCategory] = useState('semua');
  const categories = [
    { id: 'semua', label: 'Semua' },
    { id: 'pintu', label: 'Pintu' },
    { id: 'jendela', label: 'Jendela' },
    { id: 'partisi', label: 'Partisi' },
    { id: 'kaca', label: 'Shower' },
  ];
  const inCategory = (slug: string, id: string) => id === 'semua' || slug.startsWith(`${id}-`);
  const visibleServices = services.filter((service) => inCategory(service.slug, category));
  return (
    <section className="section services-refined-section" aria-labelledby="services-catalog-title">
      <div className="container">
        <div className="services-refined-heading">
          <div>
            <p className="eyebrow">PILIH KEBUTUHAN</p>
            <h2 id="services-catalog-title">{services.length} pilihan produk.<br /><span>Satu pengerjaan yang rapi.</span></h2>
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
                <span className="reference-badge">FOTO PRODUK</span>
                <span className="services-refined-index">{String(index + 1).padStart(2, '0')}</span>
              </div>

              <div className="services-refined-copy">
                <div className="services-refined-topline">
                  <p className="service-keyword">{service.keyword}</p>
                  <LineGlyph kind={kindForService(service.slug)} />
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
          <div className="services-mobile-filter-head">
            <p>Jelajahi berdasarkan jenis</p>
            <span aria-live="polite">{visibleServices.length} produk</span>
          </div>
          <div className="services-mobile-filters" role="group" aria-label="Filter jenis produk">
            {categories.map((item) => (
              <button key={item.id} type="button" aria-pressed={category === item.id} onClick={() => setCategory(item.id)}>
                {item.label}<span>{services.filter((service) => inCategory(service.slug, item.id)).length}</span>
              </button>
            ))}
          </div>
          <div className="services-mobile-grid">
            {visibleServices.map((service) => (
              <Link key={service.slug} className="services-mobile-tile" href={`/layanan/${service.slug}/`} aria-label={`Lihat detail ${service.shortTitle}`}>
                <span className="services-mobile-tile-media">
                  <img src={service.image} alt="" width="600" height="600" loading="lazy" style={{ objectPosition: service.imagePosition }} />
                </span>
                <span className="services-mobile-tile-copy">
                  <strong>{service.shortTitle}</strong>
                  <span>Lihat detail <ArrowUpRightIcon /></span>
                </span>
              </Link>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
