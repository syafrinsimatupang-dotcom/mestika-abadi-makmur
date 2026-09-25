import { Reveal } from "@/components/Reveal";
import { LineGlyph } from "@/components/LineGlyph";

const reasons = [
  {
    index: "01",
    kind: "measure" as const,
    title: "Mulai dari kondisi nyata.",
    body:
      "Ukuran, arah bukaan, dan fungsi ruang dibahas sebelum fabrikasi agar keputusan tidak bergantung pada asumsi.",
  },
  {
    index: "02",
    kind: "frame" as const,
    title: "Material yang sesuai.",
    body:
      "Profil aluminium, kaca, dan hardware diarahkan mengikuti kebutuhan tampilan, fungsi, dan kondisi proyek.",
  },
  {
    index: "03",
    kind: "install" as const,
    title: "Rapi sampai instalasi.",
    body:
      "Kami membantu dari pengukuran hingga pemasangan dengan perhatian pada alignment, proporsi, dan finishing.",
  },
];

export function WhyChooseUs() {
  return (
    <section
      className="section why-us-section"
      aria-labelledby="why-us-title"
    >
      <div className="container">
        <Reveal className="why-us-heading">
          <p className="eyebrow">KENAPA MESTIKA ABADI MAKMUR</p>
          <div className="why-us-heading-grid">
            <h2 id="why-us-title">
              Lebih sedikit asumsi.
              <br />
              <span>Lebih banyak presisi.</span>
            </h2>
            <p>
              Setiap bukaan diperlakukan sebagai bagian dari ruang: diukur,
              dipilih sistemnya, lalu dipasang dengan detail yang terasa menyatu.
            </p>
          </div>
        </Reveal>

        <div className="why-us-grid">
          {reasons.map((reason, index) => (
            <Reveal
              className={`why-us-card why-us-card-${index + 1}`}
              delay={index * 0.05}
              key={reason.index}
            >
              <div className="why-us-card-top">
                <span className="why-us-icon">
                  <LineGlyph kind={reason.kind} />
                </span>
                <span className="why-us-index">{reason.index}</span>
              </div>
              <div>
                <h3>{reason.title}</h3>
                <p>{reason.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
