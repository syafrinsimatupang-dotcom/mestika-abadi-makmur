import Link from "next/link";
import { whatsappHref } from "@/lib/site";
import { ArrowUpRightIcon } from "@/components/ArrowUpRightIcon";

const heroImage =
  "https://images.pexels.com/photos/34880778/pexels-photo-34880778/free-photo-of-modern-minimalist-house-facade-in-jakarta.jpeg";

export function HomeHero() {
  return (
    <section
      className="home-hero"
      data-nav-theme="dark"
      aria-labelledby="home-hero-title"
    >
      <img
        className="home-hero-image"
        src={`${heroImage}?auto=compress&cs=tinysrgb&w=1600`}
        srcSet={[640, 960, 1600, 2400]
          .map(
            (width) =>
              `${heroImage}?auto=compress&cs=tinysrgb&w=${width} ${width}w`,
          )
          .join(", ")}
        sizes="100vw"
        alt="Fasad rumah modern dengan bukaan kaca lebar dan frame aluminium hitam"
        width="1600"
        height="2000"
        fetchPriority="high"
        loading="eager"
      />
      <div className="home-hero-shade" aria-hidden="true" />

      <div className="container home-hero-content">
        <p className="eyebrow">JASA ALUMINIUM &amp; KACA · JABODETABEK</p>
        <h1 id="home-hero-title">
          Aluminium &amp; kaca.
          <span>Dibuat untuk ruang Anda.</span>
        </h1>
        <p className="home-hero-lead">
          Pintu, jendela, kusen, partisi kaca, dan shower box untuk hunian
          maupun komersial—dari pengukuran hingga pemasangan.
        </p>
        <div className="home-hero-actions">
          <a
            className="button home-hero-primary"
            href={whatsappHref({ sourcePath: "/" })}
            target="_blank"
            rel="noreferrer"
          >
            Konsultasi <ArrowUpRightIcon />
          </a>
          <Link className="button home-hero-secondary" href="/layanan/">
            Lihat layanan <ArrowUpRightIcon />
          </Link>
        </div>
        <p className="home-hero-caption">
          Pintu · Jendela · Kusen · Partisi kaca · Shower box
        </p>
      </div>
    </section>
  );
}
