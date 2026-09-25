import Link from 'next/link';
import { services } from '@/lib/services';
import { siteConfig, whatsappHref } from '@/lib/site';

export function Footer() {
  return (
    <footer className="footer dark-surface" data-nav-theme="dark">
      <div className="container footer-grid">
        <div className="footer-brand">
          <div className="footer-logo-shell">
            <img className="footer-logo" src="/brand/Logo Mestika Abadi Makmur - Pakai - Panjang.png" alt="Mestika Abadi Makmur" width="2172" height="724" />
          </div>
          <p className="eyebrow">{siteConfig.name}</p>
          <p>Fabrikasi dan pemasangan aluminium & kaca untuk kebutuhan hunian dan komersial di Jabodetabek dan sekitarnya.</p>
          <div className="footer-contact">
            <a href={siteConfig.mapsUrl} target="_blank" rel="noreferrer">{siteConfig.address}</a>
            <a href={whatsappHref({ sourcePath: '/' })} target="_blank" rel="noreferrer">{siteConfig.whatsappDisplay}</a>
          </div>
        </div>
        <div>
          <p className="footer-label">Layanan dan Produk</p>
          <div className="footer-links">
            <Link href="/layanan/">Semua layanan dan produk</Link>
            {services.map((service) => (
              <Link key={service.slug} href={`/layanan/${service.slug}/`}>{service.shortTitle}</Link>
            ))}
          </div>
        </div>
        <div>
          <p className="footer-label">Navigasi</p>
          <div className="footer-links">
            <Link href="/portofolio/">Portofolio</Link>
            <Link href="/artikel/">Artikel</Link>
            <Link href="/tentang/">Tentang</Link>
            <Link href="/kontak/">Kontak</Link>
            <a href={whatsappHref({ sourcePath: '/' })} target="_blank" rel="noreferrer">WhatsApp <ArrowUpRightIcon /></a>
          </div>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} {siteConfig.name}</span>
        <span>{siteConfig.addressShort}</span>
      </div>
    </footer>
  );
}
