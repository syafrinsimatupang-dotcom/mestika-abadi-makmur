"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { whatsappHref } from "@/lib/site";
import { ArrowUpRightIcon } from "@/components/ArrowUpRightIcon";

// Mobile menu icons are official Iconoir assets (MIT):
// https://github.com/iconoir-icons/iconoir/blob/main/icons/regular/menu.svg
// https://github.com/iconoir-icons/iconoir/blob/main/icons/regular/xmark.svg
function MenuGlyph({ open }: { open: boolean }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
      {open ? (
        <path
          d="M6.75827 17.2426L12.0009 12M17.2435 6.75736L12.0009 12M12.0009 12L6.75827 6.75736M12.0009 12L17.2435 17.2426"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ) : (
        <>
          <path
            d="M3 5H21"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M3 12H21"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M3 19H21"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </>
      )}
    </svg>
  );
}

const nav = [
  { href: "/", label: "Beranda" },
  { href: "/layanan/", label: "Layanan dan Produk" },
  { href: "/portofolio/", label: "Portofolio" },
  { href: "/artikel/", label: "Artikel" },
  { href: "/tentang/", label: "Tentang" },
  { href: "/kontak/", label: "Kontak" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(false);
  const headerRef = useRef<HTMLElement | null>(null);
  const pathname = usePathname();

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        headerRef.current
          ?.querySelector<HTMLButtonElement>(".menu-button")
          ?.focus();
      }
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const trapFocus = (event: KeyboardEvent) => {
      if (event.key !== "Tab") return;
      const items = Array.from(
        headerRef.current?.querySelectorAll<HTMLElement>("a, button") || [],
      ).filter((element) => element.getClientRects().length > 0);
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    };
    document.addEventListener("keydown", closeOnEscape);
    document.addEventListener("keydown", trapFocus);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", closeOnEscape);
      document.removeEventListener("keydown", trapFocus);
    };
  }, [open]);

  useEffect(() => {
    let frame = 0;
    const sampleTheme = () => {
      frame = 0;
      const header = headerRef.current;
      const shell = header?.querySelector<HTMLElement>(".nav-shell");
      if (!header || !shell) return;
      const rect = shell.getBoundingClientRect();
      const y = Math.min(
        window.innerHeight - 1,
        Math.max(1, rect.top + rect.height * 0.55),
      );
      const sampleXs = [0.28, 0.5, 0.72].map((ratio) =>
        Math.min(
          window.innerWidth - 1,
          Math.max(1, rect.left + rect.width * ratio),
        ),
      );
      let darkVotes = 0;
      let lightVotes = 0;
      sampleXs.forEach((x) => {
        const stack = document.elementsFromPoint(x, y);
        const underneath = stack.find((element) => !header.contains(element));
        const themed = underneath?.closest<HTMLElement>("[data-nav-theme]");
        const theme = themed?.dataset.navTheme;
        if (theme === "dark") darkVotes += 1;
        else if (theme === "light") lightVotes += 1;
      });
      setDark(darkVotes > lightVotes && darkVotes > 0);
    };
    const schedule = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(sampleTheme);
    };
    sampleTheme();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    const observer = new MutationObserver(schedule);
    observer.observe(document.body, { subtree: true, childList: true });
    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      observer.disconnect();
    };
  }, [pathname]);

  const isActive = (href: string) =>
    href === "/"
      ? pathname === "/"
      : pathname === href.slice(0, -1) || pathname.startsWith(href);

  return (
    <header
      ref={headerRef}
      className={dark ? "site-header nav-dark" : "site-header nav-light"}
    >
      <div className="nav-shell glass-panel">
        <Link
          className="brand brand-logo-link"
          href="/"
          aria-label="Mestika Abadi Makmur — Beranda"
        >
          <img
            className="brand-logo brand-logo-horizontal"
            src="/brand/Logo Mestika Abadi Makmur - Pakai - Panjang.png"
            alt="Mestika Abadi Makmur"
            width="2172"
            height="724"
          />
        </Link>
        <nav className="desktop-nav" aria-label="Navigasi utama">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? "page" : undefined}
              className={isActive(item.href) ? "active" : undefined}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <a
          className="nav-cta"
          href={whatsappHref({ sourcePath: pathname })}
          target="_blank"
          rel="noreferrer"
        >
          Konsultasi <ArrowUpRightIcon />
        </a>
        <button
          className="menu-button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls={open ? "mobile-navigation" : undefined}
          aria-label={open ? "Tutup menu" : "Buka menu"}
        >
          <MenuGlyph open={open} />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-navigation"
            aria-label="Navigasi mobile"
            onClick={(event) => {
              if ((event.target as HTMLElement).closest("a")) setOpen(false);
            }}
            className="mobile-nav glass-panel"
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.2 }}
          >
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={isActive(item.href) ? "active" : undefined}
              >
                {item.label}
                <ArrowUpRightIcon />
              </Link>
            ))}
            <a
              className="mobile-wa"
              href={whatsappHref({ sourcePath: pathname })}
              target="_blank"
              rel="noreferrer"
            >
              Konsultasi WhatsApp
            </a>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
