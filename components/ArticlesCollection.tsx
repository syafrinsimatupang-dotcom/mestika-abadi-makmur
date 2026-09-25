"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRightIcon } from "@/components/ArrowUpRightIcon";
import { LineGlyph } from "@/components/LineGlyph";
import { useHorizontalScrollTracker } from "@/components/useHorizontalScrollTracker";

export type ArticleCardData = {
  id: number;
  slug: string;
  date: string;
  title: string;
  excerpt: string;
  image?: { src: string; alt: string } | null;
};

function Card({ post, index }: { post: ArticleCardData; index: number }) {
  return (
    <article className={`article-card article-card-${(index % 5) + 1}`}>
      <Link href={`/artikel/${post.slug}/`}>
        <div className="article-card-visual">
          {post.image ? (
            <img
              src={post.image.src}
              alt={post.image.alt}
              width="1000"
              height="720"
              loading="lazy"
            />
          ) : (
            <div className="article-placeholder" aria-hidden="true">
              <span>AM</span>
            </div>
          )}
        </div>
        <div className="article-card-body">
          <p className="article-date">{post.date}</p>
          <h2>{post.title}</h2>
          <p>{post.excerpt}</p>
          <span className="text-link">
            Baca artikel <b aria-hidden="true"><ArrowUpRightIcon /></b>
          </span>
        </div>
      </Link>
    </article>
  );
}

export function ArticlesCollection({ posts }: { posts: ArticleCardData[] }) {
  const carousel = posts.length > 3;
  const { viewportRef, activeIndex, progress, scrollToIndex, scrollByItem } =
    useHorizontalScrollTracker(posts.length);

  return (
    <>
      <div className="article-bento article-bento-desktop">
        {posts.map((post, index) => (
          <Card post={post} index={index} key={post.id} />
        ))}
      </div>

      {carousel ? (
        <div className="articles-mobile-carousel">
          <div className="mobile-carousel-toolbar">
            <p>Geser untuk membaca panduan lainnya.</p>
            <div className="carousel-controls" aria-label="Kontrol artikel">
              <button
                type="button"
                onClick={() => scrollByItem(-1)}
                aria-label="Artikel sebelumnya"
              >
                <LineGlyph kind="navLeft" />
              </button>
              <button
                type="button"
                onClick={() => scrollByItem(1)}
                aria-label="Artikel berikutnya"
              >
                <LineGlyph kind="navRight" />
              </button>
            </div>
          </div>
          <div
            className="articles-mobile-viewport native-horizontal-carousel"
            ref={viewportRef}
          >
            <div className="articles-mobile-track">
              {posts.map((post, index) => (
                <div
                  className="articles-mobile-item"
                  data-carousel-item
                  key={post.id}
                >
                  <Card post={post} index={index} />
                </div>
              ))}
            </div>
          </div>
          <div className="carousel-pagination articles-mobile-pagination">
            <div className="carousel-dots">
              {posts.map((_, index) => (
                <button
                  type="button"
                  key={index}
                  aria-current={index === activeIndex ? "true" : undefined}
                  className={index === activeIndex ? "active" : ""}
                  onClick={() => scrollToIndex(index)}
                  aria-label={`Buka artikel ${index + 1}`}
                />
              ))}
            </div>
            <div className="carousel-progress" aria-hidden="true">
              <motion.span
                initial={false}
                animate={{ scaleX: progress }}
                transition={{ duration: 0.08, ease: "linear" }}
              />
            </div>
            <span className="carousel-count">
              {String(activeIndex + 1).padStart(2, "0")} /{" "}
              {String(posts.length).padStart(2, "0")}
            </span>
          </div>
        </div>
      ) : (
        <div className="articles-mobile-short-grid">
          {posts.map((post, index) => (
            <Card post={post} index={index} key={post.id} />
          ))}
        </div>
      )}
    </>
  );
}
