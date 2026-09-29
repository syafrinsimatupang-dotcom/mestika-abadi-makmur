import Link from "next/link";
import { ArrowUpRightIcon } from "@/components/ArrowUpRightIcon";
import { serviceBySlug } from "@/lib/services";

const storyImage = serviceBySlug["partisi-kaca-aluminium"].image;

export function AboutStoryMoment() {
  return (
    <section className="section about-story-editorial" data-nav-theme="dark" aria-labelledby="about-story-title">
      <div className="container about-story-editorial-grid">
        <div className="about-story-editorial-photo">
          <img
            src={storyImage}
            alt="Partisi kaca aluminium terpasang pada ruang yang menghadap ke luar"
            width="1122"
            height="1402"
            loading="lazy"
          />
          <span className="reference-badge">FOTO PRODUK</span>
        </div>

        <div className="about-story-editorial-copy">
          <p className="eyebrow">UKUR · SESUAIKAN · PASANG</p>
          <h2 id="about-story-title">
            Rapi dilihat.
            <br />
            <span>Nyaman digunakan.</span>
          </h2>
          <p>
            Pintu, jendela, dan partisi yang tepat harus sesuai dengan ukuran,
            arah bukaan, dan cara ruang digunakan setiap hari. Detail itu kami
            bahas sebelum pekerjaan dimulai.
          </p>
          <Link href="/portofolio/">
            Lihat galeri pekerjaan <ArrowUpRightIcon />
          </Link>
        </div>
      </div>
    </section>
  );
}
