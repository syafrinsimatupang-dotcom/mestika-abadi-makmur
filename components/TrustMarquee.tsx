const brands = [
  { key: "ykk", name: "YKK AP" },
  { key: "alko", name: "ALKO Aluminium" },
  { key: "almasa", name: "ALMASA" },
  { key: "alexindo", name: "ALEXINDO" },
  { key: "starmas", name: "STARMAS Inti Aluminium Industry" },
  { key: "alcomexindo", name: "ALCOMEXINDO" },
  { key: "alutama", name: "ALUTAMA" },
  { key: "saa", name: "SAA" },
  { key: "calindo", name: "CALINDO Aluminium" },
] as const;

function BrandGroup({ hidden = false }: { hidden?: boolean }) {
  return (
    <div className="trust-marquee-group" aria-hidden={hidden || undefined}>
      {brands.map((brand) => (
        <span className="trust-marquee-item" key={brand.key}>
          <span
            className={`material-brand-logo material-brand-logo-${brand.key}`}
            role={hidden ? undefined : "img"}
            aria-label={hidden ? undefined : brand.name}
          />
        </span>
      ))}
    </div>
  );
}

export function TrustMarquee() {
  return (
    <section
      className="trust-rail material-brand-marquee"
      aria-label="Merek material aluminium yang digunakan"
    >
      <div className="trust-marquee-viewport">
        <div className="trust-marquee-track">
          <BrandGroup />
          <BrandGroup hidden />
        </div>
      </div>
    </section>
  );
}
