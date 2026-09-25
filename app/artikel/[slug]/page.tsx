import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/Reveal";
import { ArticleBodyMobile } from "@/components/ArticleBodyMobile";
import { ArrowLeftIcon, ArrowUpRightIcon } from "@/components/ArrowUpRightIcon";
import {
  featuredImage,
  getArticleBySlug,
  getArticleSlugs,
  plainText,
} from "@/lib/wordpress";
import { siteConfig } from "@/lib/site";

export const dynamicParams = false;

const CMS_PLACEHOLDER = "__cms-placeholder";

export async function generateStaticParams() {
  const slugs = await getArticleSlugs();
  return (slugs.length ? slugs : [CMS_PLACEHOLDER]).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  if (slug === CMS_PLACEHOLDER) {
    return {
      title: "Artikel CMS",
      robots: { index: false, follow: false },
    };
  }

  const post = await getArticleBySlug(slug);
  if (!post) return {};

  const title = plainText(post.title.rendered);
  const description = plainText(post.excerpt.rendered).slice(0, 160);
  const image = featuredImage(post);

  return {
    title,
    description,
    alternates: {
      canonical: `${siteConfig.url}/artikel/${post.slug}/`,
    },
    openGraph: {
      type: "article",
      locale: "id_ID",
      title,
      description,
      publishedTime: post.date,
      modifiedTime: post.modified || post.date,
      ...(image ? { images: [{ url: image.src, alt: image.alt }] } : {}),
    },
  };
}

export default async function ArticleDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  if (slug === CMS_PLACEHOLDER) {
    return (
      <section className="article-detail section-pad">
        <div className="container article-empty">
          <p className="eyebrow">ARTIKEL</p>
          <h1>Artikel belum tersedia.</h1>
          <p>
            Silakan kembali ke halaman artikel untuk melihat panduan yang sudah
            tersedia.
          </p>
          <Link className="text-link" href="/artikel/">
            Kembali ke artikel <ArrowUpRightIcon />
          </Link>
        </div>
      </section>
    );
  }

  const post = await getArticleBySlug(slug);
  if (!post?.content) notFound();

  const title = plainText(post.title.rendered);
  const image = featuredImage(post);
  const published = new Intl.DateTimeFormat("id-ID", {
    dateStyle: "long",
  }).format(new Date(post.date));

  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    datePublished: post.date,
    dateModified: post.modified || post.date,
    mainEntityOfPage: `${siteConfig.url}/artikel/${post.slug}/`,
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
    },
    ...(image ? { image: [image.src] } : {}),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
        }}
      />

      <article className="article-detail section-pad">
        <div className="container article-detail-shell">
          <Reveal className="article-detail-header">
            <Link className="back-link" href="/artikel/">
              <ArrowLeftIcon /> Semua artikel
            </Link>
            <p className="eyebrow">ARTIKEL · {published.toUpperCase()}</p>
            <h1>{title}</h1>
            <p className="article-detail-intro">
              {plainText(post.excerpt.rendered)}
            </p>
          </Reveal>

          {image && (
            <Reveal className="article-detail-cover" delay={0.06}>
              <img
                src={image.src}
                alt={image.alt}
                width="1400"
                height="900"
                fetchPriority="high"
              />
            </Reveal>
          )}

          <Reveal className="article-body" delay={0.08}>
            <ArticleBodyMobile html={post.content.rendered} />
          </Reveal>
        </div>
      </article>
    </>
  );
}
