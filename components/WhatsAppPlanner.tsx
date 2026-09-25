"use client";

import { useId, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { whatsappHref } from "@/lib/site";
import { ArrowUpRightIcon } from "@/components/ArrowUpRightIcon";

const options = [
  { label: "Pintu", value: "Pintu Aluminium" },
  { label: "Jendela", value: "Jendela Aluminium" },
  { label: "Kusen", value: "Kusen Aluminium" },
  { label: "Partisi", value: "Partisi Kaca" },
  { label: "Shower", value: "Shower Box" },
  { label: "Lainnya", value: "Lainnya" },
];

export function WhatsAppPlanner({
  defaultService,
}: {
  defaultService?: string;
}) {
  const plannerId = useId();
  const pathname = usePathname();
  const [service, setService] = useState(defaultService || options[0].value);
  const [location, setLocation] = useState("");
  const [note, setNote] = useState("");

  const href = useMemo(() => {
    const details = [
      `Lokasi proyek: ${location || "belum diisi"}`,
      note ? `Catatan: ${note}` : "",
    ].filter(Boolean);

    return whatsappHref({
      sourcePath: pathname,
      service,
      details,
    });
  }, [pathname, service, location, note]);

  return (
    <div className="planner contact-refined-planner">
      <div className="planner-head">
        <span>01</span>
        <div>
          <p className="eyebrow">KONSULTASI CEPAT</p>
          <h3>Ceritakan kebutuhan Anda.</h3>
        </div>
      </div>

      <div className="planner-service-group">
        <span className="planner-field-label">Layanan dan Produk</span>
        <div
          className="planner-segmented"
          role="radiogroup"
          aria-label="Pilih layanan atau produk"
        >
          {options.map((option) => {
            const active = service === option.value;
            return (
              <button
                type="button"
                role="radio"
                aria-checked={active}
                tabIndex={active ? 0 : -1}
                onKeyDown={(event) => {
                  const current = options.findIndex(
                    (item) => item.value === service,
                  );
                  const direction =
                    event.key === "ArrowRight" || event.key === "ArrowDown"
                      ? 1
                      : event.key === "ArrowLeft" || event.key === "ArrowUp"
                        ? -1
                        : 0;
                  if (!direction && event.key !== "Home" && event.key !== "End")
                    return;
                  event.preventDefault();
                  const next =
                    event.key === "Home"
                      ? 0
                      : event.key === "End"
                        ? options.length - 1
                        : (current + direction + options.length) %
                          options.length;
                  setService(options[next].value);
                  event.currentTarget.parentElement
                    ?.querySelectorAll<HTMLButtonElement>("button")
                    [next]?.focus();
                }}
                className={active ? "active" : ""}
                key={option.value}
                onClick={() => setService(option.value)}
              >
                {active ? (
                  <motion.span
                    layoutId={`${plannerId}-service-pill`}
                    className="planner-segmented-pill"
                    transition={{ type: "spring", stiffness: 420, damping: 34 }}
                  />
                ) : null}
                <span className="planner-segmented-label">{option.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="planner-grid contact-refined-fields">
        <label>
          <span>Lokasi proyek</span>
          <input
            name="location"
            autoComplete="address-level2"
            maxLength={160}
            value={location}
            onChange={(event) => setLocation(event.target.value)}
            placeholder="Contoh: Jakarta Selatan, Depok, Bekasi..."
          />
        </label>

        <label className="planner-wide">
          <span>Catatan singkat</span>
          <textarea
            name="note"
            maxLength={1500}
            value={note}
            onChange={(event) => setNote(event.target.value)}
            placeholder="Ukuran perkiraan, jumlah bukaan, atau kebutuhan lain..."
            rows={3}
          />
        </label>
      </div>

      <div className="contact-refined-planner-footer">
        <a
          className="button button-primary planner-button"
          href={href}
          target="_blank"
          rel="noreferrer"
        >
          Kirim ke WhatsApp <ArrowUpRightIcon />
        </a>
        <p className="planner-footnote">Isi konsultasi tidak disimpan.</p>
      </div>
    </div>
  );
}
