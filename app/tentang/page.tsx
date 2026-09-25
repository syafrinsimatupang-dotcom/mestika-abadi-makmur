import type { Metadata } from "next";
import Link from "next/link";
import { LineGlyph } from "@/components/LineGlyph";
import { ArrowUpRightIcon } from "@/components/ArrowUpRightIcon";
import { MobileMicroAccordion } from "@/components/MobileMicroAccordion";
import { AboutStoryMoment } from "@/components/AboutStoryMoment";
import { siteConfig, whatsappHref } from "@/lib/site";

export const metadata: Metadata = {
  alternates: { canonical: "/tentang/" },
  title: "Tentang Mestika Abadi Makmur",
  description:
    "Tentang Mestika Abadi Makmur, layanan fabrikasi dan pemasangan aluminium & kaca untuk rumah, ruko, kantor, dan bangunan komersial di Jabodetabek dan sekitarnya.",
};

const heroImage =
  "https://images.pexels.com/photos/5511093/pexels-photo-5511093.jpeg?auto=compress&cs=tinysrgb&w=1800";

const principleImage =
  "https://images.pexels.com/photos/17168858/pexels-photo-17168858/free-photo-of-modern-design-of-room.jpeg?auto=compress&cs=tinysrgb&w=1800";

const ctaImage =
  "https://images.pexels.com/photos/1098982/pexels-photo-1098982.jpeg?auto=compress&cs=tinysrgb&w=1800";

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
              alt="Partisi kaca dan frame aluminium pada ruang kantor modern"
              width="1400"
              height="1100"
              fetchPriority="high"
            />
            <div className="about-refined-hero-shade" />

            <div className="about-refined-identity glass-panel">
              <span className="status-dot" />
              <div>
                <small>NAMA BADAN USAHA</small>
                <strong>{siteConfig.legalName}</strong>
              </div>
            </div>

            <div className="about-refined-area glass-panel">
              <small>AREA LAYANAN</small>
              <strong>Jabodetabek & sekitarnya</strong>
            </div>
          </div>
        </div>
      </section>

      <section className="section about-refined-principle">
        <div className="container about-refined-principle-grid">
          <div className="about-refined-principle-media">
            <img
              src={principleImage}
              alt="Bukaan kaca dan frame sebagai fokus perencanaan pemasangan"
              width="1300"
              height="1000"
              loading="lazy"
              style={{ objectPosition: "61% 50%" }}
            />
            <span className="reference-badge">REFERENSI PEKERJAAN</span>
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
            alt="Pintu kaca dengan frame aluminium hitam"
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
              <span>aluminium atau kaca?</span>
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
