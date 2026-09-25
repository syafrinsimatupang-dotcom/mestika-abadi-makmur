import type { Metadata } from "next";
import { PortfolioCarousel } from "@/components/PortfolioCarousel";
import { Reveal } from "@/components/Reveal";
import { ArrowUpRightIcon } from "@/components/ArrowUpRightIcon";
import { whatsappHref } from "@/lib/site";

export const metadata: Metadata = {
  alternates: { canonical: "/portofolio/" },
  title: "Portofolio & Referensi Pekerjaan Aluminium Kaca",
  description:
    "Galeri tipe pekerjaan pintu aluminium, jendela aluminium, kusen, partisi kaca dan shower box untuk kebutuhan Jabodetabek dan sekitarnya.",
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
            <p className="eyebrow">REFERENSI PEKERJAAN</p>
            <h1>
              Lihat jenis pekerjaan
              <br />
              <span>aluminium & kaca.</span>
            </h1>
          </Reveal>
          <Reveal className="portfolio-disclaimer glass-panel" delay={0.08}>
            <span>CATATAN FOTO</span>
            <p>
              Foto pada galeri ini digunakan sebagai referensi jenis pekerjaan
              yang kami layani dan bukan dokumentasi proyek Mestika Abadi Makmur.
            </p>
          </Reveal>
        </div>
      </section>

      <section
        className="section portfolio-full-section dark-surface"
        data-nav-theme="dark"
      >
        <div className="container">
          <PortfolioCarousel />
        </div>
      </section>

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
