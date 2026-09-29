import type { Metadata } from "next";
import Link from "next/link";
import { LineGlyph } from "@/components/LineGlyph";
import { ArrowUpRightIcon } from "@/components/ArrowUpRightIcon";
import { MobileMicroAccordion } from "@/components/MobileMicroAccordion";
import { AboutStoryMoment } from "@/components/AboutStoryMoment";
import { serviceBySlug } from "@/lib/services";
import { siteConfig, whatsappHref } from "@/lib/site";

export const metadata: Metadata = {
  alternates: { canonical: "/tentang/" },
  title: "Tentang Mestika Abadi Makmur",
  description:
    "Tentang Mestika Abadi Makmur, layanan fabrikasi dan pemasangan aluminium & kaca untuk rumah, ruko, kantor, dan bangunan komersial di Jabodetabek dan sekitarnya.",
};

const heroImage = serviceBySlug["partisi-kaca"].image;
const principleImage = serviceBySlug["pintu-lipat"].image;
const ctaImage = serviceBySlug["pintu-kaca-swing-multi"].image;

export default function AboutPage() {
  return (
    <>
      <section
        className="about-refined-hero section-pad"
        data-nav-theme="light"
      >
        <div className="container about-refined-hero-grid">
          <div className="about-refined-hero-copy">
            <p className="eyebrow">
              TENTANG · {siteConfig.name.toUpperCase()}
            </p>
            <h1>
              Aluminium & kaca
              <br />
              <span>yang menyesuaikan ruang.</span>
            </h1>
            <p>
              Mestika Abadi Makmur melayani fabrikasi dan pemasangan
              untuk rumah, ruko, kantor, dan bangunan komersial di Jabodetabek
              dan sekitarnya.
            </p>

            <div className="about-refined-hero-actions">
              <a
                className="button button-primary"
                href={whatsappHref({ sourcePath: "/tentang/" })}
                target="_blank"
                rel="noreferrer"
              >
                Konsultasi WhatsApp <ArrowUpRightIcon />
              </a>
              <Link className="about-refined-secondary" href="/layanan/">
                Layanan dan Produk <ArrowUpRightIcon />
              </Link>
            </div>
          </div>

          <div className="about-refined-hero-visual">
            <img
              src={heroImage}
              alt="Partisi kaca dengan rangka hitam pada ruang kerja"
              width="1400"
              height="1100"
              fetchPriority="high"
            />
          </div>
        </div>
      </section>

      <section className="section about-refined-principle">
        <div className="container about-refined-principle-grid">
          <div className="about-refined-principle-media">
            <img
              src={principleImage}
              alt="Pintu lipat aluminium dan kaca terpasang pada bukaan ruang"
              width="1300"
              height="1000"
              loading="lazy"
            />
            <span className="reference-badge">FOTO PRODUK</span>
          </div>

          <div className="about-refined-principle-copy">
            <p className="eyebrow">PRINSIP KERJA</p>
            <h2>
              Ukur yang nyata.
              <br />
              <span>Pasang yang tepat.</span>
            </h2>

            <MobileMicroAccordion summary="Bagaimana kami menentukan pengerjaan?">
              <p>
                Ukuran aktual, fungsi ruang, arah bukaan, jenis kaca, frame,
                hardware, dan kondisi lokasi menjadi dasar untuk menentukan
                sistem yang sesuai sebelum pengerjaan dilakukan.
              </p>
            </MobileMicroAccordion>

            <div
              className="about-refined-pills"
              aria-label="Tahapan utama pengerjaan"
            >
              <span>Ukur aktual</span>
              <span>Pilih sistem</span>
              <span>Pasang rapi</span>
            </div>
          </div>
        </div>
      </section>

      <AboutStoryMoment />

      <section className="section about-refined-values">
        <div className="container">
          <div className="about-refined-values-heading">
            <div>
              <p className="eyebrow">YANG KAMI PRIORITASKAN</p>
              <h2>
                Tiga hal penting
                <br />
                <span>sebelum hasil akhir.</span>
              </h2>
            </div>
            <p>
              Setiap proyek bisa berbeda. Karena itu keputusan material dan
              sistem harus mengikuti kondisi ruang, bukan sekadar memilih
              tampilan.
            </p>
          </div>

          <div className="about-values-bento">
            <article className="about-value-card about-value-primary">
              <div className="about-value-top">
                <LineGlyph kind="measure" />
                <span>01</span>
              </div>
              <div>
                <h3>Konteks lokasi</h3>
                <p>
                  Ukuran dan kondisi aktual menjadi titik awal sebelum
                  fabrikasi.
                </p>
              </div>
            </article>

            <article className="about-value-card about-value-dark">
              <div className="about-value-top">
                <LineGlyph kind="frame" />
                <span>02</span>
              </div>
              <div>
                <h3>Proporsi & fungsi</h3>
                <p>
                  Frame, kaca, arah bukaan, dan hardware harus bekerja sebagai
                  satu sistem.
                </p>
              </div>
            </article>

            <article className="about-value-card about-value-light">
              <div className="about-value-top">
                <LineGlyph kind="install" />
                <span>03</span>
              </div>
              <div>
                <h3>Hasil yang rapi</h3>
                <p>
                  Finishing dan alignment diarahkan agar hasil akhir terasa
                  menyatu dengan ruang.
                </p>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="about-refined-cta" data-nav-theme="dark">
        <div className="about-refined-cta-media">
          <img
            src={ctaImage}
            alt="Pintu kaca swing multi dengan rangka aluminium hitam"
            width="1800"
            height="1200"
            loading="lazy"
          />
          <div className="about-refined-cta-shade" />
        </div>

        <div className="container about-refined-cta-content">
          <div className="about-refined-cta-glass">
            <p className="eyebrow light">JABODETABEK & SEKITARNYA</p>
            <h2>
              Punya kebutuhan
              <br />
              <span>aluminium &amp; kaca?</span>
            </h2>
            <p>
              Kirim kebutuhan, lokasi, dan foto kondisi ruang agar konsultasi
              lebih terarah.
            </p>
            <div className="about-refined-cta-actions">
              <a
                className="button button-light"
                href={whatsappHref({ sourcePath: "/tentang/" })}
                target="_blank"
                rel="noreferrer"
              >
                Konsultasi WhatsApp <ArrowUpRightIcon />
              </a>
              <Link className="button button-dark-ghost" href="/layanan/">
                Layanan dan Produk
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
