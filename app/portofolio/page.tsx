import videos from "@/lib/portfolio-videos.json";
import type { Metadata } from "next";
import { PortfolioGallery } from "@/components/PortfolioGallery";
import { PortfolioVideos } from "@/components/PortfolioVideos";
import { Reveal } from "@/components/Reveal";
import { ArrowDownIcon, ArrowUpRightIcon } from "@/components/ArrowUpRightIcon";
import { whatsappHref } from "@/lib/site";
import { services } from "@/lib/services";

export const metadata: Metadata = {
  alternates: { canonical: "/portofolio/" },
  title: "Portofolio Aluminium & Kaca",
  description:
    `Galeri foto ${services.length} jenis pekerjaan pintu, jendela, partisi kaca, dan kaca shower untuk kebutuhan Jabodetabek dan sekitarnya.`,
};

export default function PortfolioPage() {
  return (
    <>
      <section
        className="inner-hero portfolio-page-hero section-pad dark-surface"
        data-nav-theme="dark"
      >
        <div className="container portfolio-title-grid">
          <Reveal>
            <p className="eyebrow">GALERI FOTO</p>
            <h1>
              Galeri pekerjaan
              <span> aluminium & kaca.</span>
            </h1>
            <p className="portfolio-hero-lead">
              Jelajahi {services.length} jenis pintu, jendela, partisi, dan kaca shower yang
              dapat disesuaikan dengan kebutuhan ruang Anda.
            </p>
            <a className="portfolio-video-jump" href="#galeri-video">
              Lihat {videos.length} video <ArrowDownIcon />
            </a>
          </Reveal>
        </div>
      </section>

      <section
        className="section portfolio-full-section dark-surface"
        data-nav-theme="dark"
      >
        <div className="container">
          <div className="portfolio-gallery-heading">
            <div>
              <p className="eyebrow">GALERI PRODUK DAN PEKERJAAN</p>
              <h2>Pilih yang sesuai untuk ruang Anda.</h2>
            </div>
            <span>01 — {services.length}</span>
          </div>
          <PortfolioGallery />
        </div>
      </section>

      <PortfolioVideos />

      <section className="section portfolio-upload-note">
        <div className="container upload-note-grid">
          <Reveal>
            <p className="eyebrow">PUNYA KEBUTUHAN SERUPA?</p>
            <h2>
              Konsultasikan pekerjaan
              <br />
              <span>aluminium & kaca Anda.</span>
            </h2>
          </Reveal>
          <Reveal className="upload-note" delay={0.08}>
            <p>
              Kirim jenis pekerjaan, lokasi, serta foto atau ukuran perkiraan
              bila ada. Kami bantu arahkan kebutuhan dan langkah selanjutnya
              melalui WhatsApp.
            </p>
            <a
              className="button button-primary"
              href={whatsappHref({ sourcePath: "/portofolio/" })}
              target="_blank"
              rel="noreferrer"
            >
              Konsultasi kebutuhan <ArrowUpRightIcon />
            </a>
          </Reveal>
        </div>
      </section>
    </>
  );
}
