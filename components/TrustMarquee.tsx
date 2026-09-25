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
      aria-labelledby="material-brand-title"
    >
      <div className="container material-brand-context">
        <p className="eyebrow">MATERIAL PILIHAN</p>
        <div className="material-brand-context-row">
          <h2 id="material-brand-title">Material dari brand ternama.</h2>
          <p>
            Pilihan profil aluminium dan material pendukung disesuaikan dengan
            kebutuhan, fungsi, dan karakter proyek.
          </p>
        </div>
      </div>

      <div
        className="trust-marquee-viewport"
        aria-label="Brand material aluminium"
      >
        <div className="trust-marquee-track">
          <BrandGroup />
          <BrandGroup hidden />
        </div>
      </div>
    </section>
  );
}
