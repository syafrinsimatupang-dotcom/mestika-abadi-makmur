import videos from "@/lib/portfolio-videos.json";
export function PortfolioVideos() {
  return (
    <section id="galeri-video" className="section portfolio-video-section" aria-labelledby="portfolio-video-title">
      <div className="container">
        <div className="portfolio-gallery-heading portfolio-video-heading">
          <div>
            <p className="eyebrow">GALERI VIDEO</p>
            <h2 id="portfolio-video-title">Lihat detail dan gerak produknya.</h2>
            <p>{videos.length} video produk dan pekerjaan. Pilih video untuk memutarnya.</p>
          </div>
          <span>01 — {String(videos.length).padStart(2, "0")}</span>
        </div>
        <div className="portfolio-video-grid">
          {videos.map((video, index) => (
            <figure className="portfolio-video-card" key={video.src}>
              <video
                controls
                playsInline
                preload="none"
                poster={video.poster}
                aria-label={video.title}
              >
                <source
                  src={video.src}
                  type="video/mp4"
                />
                Browser Anda tidak mendukung pemutaran video.
              </video>
              <figcaption>
                <span>VIDEO {String(index + 1).padStart(2, "0")}</span>
                <strong>{video.title}</strong>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
