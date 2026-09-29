const videos = [
  { number: "001", title: "Pintu kaca — cuplikan 01" },
  { number: "002", title: "Pintu kaca — cuplikan 02" },
  { number: "003", title: "Pintu kaca — cuplikan 03" },
  { number: "004", title: "Pintu kaca — cuplikan 04" },
] as const;

export function PortfolioVideos() {
  return (
    <section id="galeri-video" className="section portfolio-video-section" aria-labelledby="portfolio-video-title">
      <div className="container">
        <div className="portfolio-gallery-heading portfolio-video-heading">
          <div>
            <p className="eyebrow">GALERI VIDEO</p>
            <h2 id="portfolio-video-title">Lihat pintu kaca dalam penggunaan.</h2>
            <p>Empat cuplikan pekerjaan pintu kaca. Pilih video untuk memutarnya.</p>
          </div>
          <span>01 — 04</span>
        </div>
        <div className="portfolio-video-grid">
          {videos.map((video) => (
            <figure className="portfolio-video-card" key={video.number}>
              <video
                controls
                playsInline
                preload="none"
                poster={`/foto-produk/VIDEO/poster-${video.number}.jpg`}
                aria-label={video.title}
              >
                <source
                  src={`/foto-produk/VIDEO/${encodeURIComponent(`Video Pintu Kaca MAM - ${video.number}.mp4`)}`}
                  type="video/mp4"
                />
                Browser Anda tidak mendukung pemutaran video.
              </video>
              <figcaption>
                <span>VIDEO {video.number}</span>
                <strong>{video.title}</strong>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
