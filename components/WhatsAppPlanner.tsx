"use client";

import { useId, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import { whatsappHref } from "@/lib/site";
import { services } from "@/lib/services";
import { ArrowUpRightIcon } from "@/components/ArrowUpRightIcon";

const options = [
  ...services.map((item) => ({ label: item.shortTitle, value: item.shortTitle })),
  { label: "Lainnya", value: "Lainnya" },
];

export function WhatsAppPlanner({
  defaultService,
}: {
  defaultService?: string;
}) {
  const serviceId = useId();
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
        <label className="planner-field-label" htmlFor={serviceId}>
          Layanan dan Produk
        </label>
        <div className="planner-service-select">
          <select
            id={serviceId}
            name="service"
            value={service}
            onChange={(event) => setService(event.target.value)}
          >
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
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
