"use client";

import Link from "next/link";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { whatsappHref } from "@/lib/site";
import { ArrowUpRightIcon } from "@/components/ArrowUpRightIcon";

const heroImage =
  "https://images.pexels.com/photos/34880778/pexels-photo-34880778/free-photo-of-modern-minimalist-house-facade-in-jakarta.jpeg";

export function HomeHero() {
  const heroRef = useRef<HTMLElement>(null);
  const [enhanced, setEnhanced] = useState(false);
  const [complete, setComplete] = useState(false);

  useLayoutEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setComplete(true);
      return;
    }

    setEnhanced(true);
  }, []);

  useEffect(() => {
    if (!enhanced) return;

    const hero = heroRef.current;
    if (!hero) return;

    let frame = 0;
    let pointerX = 0;
    let pointerY = 0;
    let currentX = 0;
    let currentY = 0;

    const renderPointer = () => {
      currentX += (pointerX - currentX) * 0.075;
      currentY += (pointerY - currentY) * 0.075;
      hero.style.setProperty("--hero-pointer-x", `${50 + currentX * 24}%`);
      hero.style.setProperty("--hero-pointer-y", `${32 + currentY * 18}%`);
      frame = requestAnimationFrame(renderPointer);
    };

    const onPointerMove = (event: PointerEvent) => {
      const rect = hero.getBoundingClientRect();
      pointerX = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
      pointerY = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
    };

    const onPointerLeave = () => {
      pointerX = 0;
      pointerY = 0;
    };

    const onScroll = () => {
      const progress = Math.min(
        1,
        Math.max(0, window.scrollY / Math.max(1, hero.offsetHeight)),
      );
      hero.style.setProperty("--hero-scroll", progress.toFixed(4));
    };

    hero.addEventListener("pointermove", onPointerMove, { passive: true });
    hero.addEventListener("pointerleave", onPointerLeave);
    window.addEventListener("scroll", onScroll, { passive: true });

    renderPointer();
    onScroll();

    const timer = window.setTimeout(() => setComplete(true), 2550);

    return () => {
      window.clearTimeout(timer);
      cancelAnimationFrame(frame);
      hero.removeEventListener("pointermove", onPointerMove);
      hero.removeEventListener("pointerleave", onPointerLeave);
      window.removeEventListener("scroll", onScroll);
    };
  }, [enhanced]);

  const heroClass = [
    "home-hero",
    enhanced ? "home-hero--enhanced" : "",
    complete ? "home-hero--complete" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <section
      ref={heroRef}
      className={heroClass}
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
      <div className="home-hero-pointer-glow" aria-hidden="true" />
      <div className="home-hero-light-sweep" aria-hidden="true" />
      <div className="home-hero-intro-veil" aria-hidden="true" />

      <div className="home-portal-stage" aria-hidden="true">
        <div className="home-portal-frame">
          <span className="home-portal-bar home-portal-bar-top" />
          <span className="home-portal-bar home-portal-bar-right" />
          <span className="home-portal-bar home-portal-bar-bottom" />
          <span className="home-portal-bar home-portal-bar-left" />
          <span className="home-portal-inner-edge home-portal-inner-edge-left" />
          <span className="home-portal-inner-edge home-portal-inner-edge-right" />
          <span className="home-portal-glass" />
          <span className="home-portal-reflection" />
        </div>
        <div className="home-portal-caption">
          <small>ALUMINIUM · GLASS · PRECISION</small>
          <strong>Material menjadi ruang.</strong>
        </div>
      </div>

      <div className="container home-hero-content">
        <p className="eyebrow home-hero-eyebrow">
          JASA ALUMINIUM &amp; KACA · JABODETABEK
        </p>

        <h1 id="home-hero-title">
          <strong>Aluminium &amp; kaca.</strong>
          <span>Dibuat menyatu dengan ruang.</span>
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
            Konsultasi sekarang <ArrowUpRightIcon />
          </a>
          <Link className="button home-hero-secondary" href="/layanan/">
            Lihat layanan <ArrowUpRightIcon />
          </Link>
        </div>

        <p className="home-hero-caption">
          Pintu · Jendela · Kusen · Partisi kaca · Shower box
        </p>
      </div>

      <div className="home-hero-status" aria-hidden="true">
        <span className="home-hero-status-dot" />
        <span>
          <small>JABODETABEK</small>
          <strong>Survei &amp; konsultasi</strong>
        </span>
      </div>

      <span className="home-hero-scroll-cue" aria-hidden="true" />
    </section>
  );
}
