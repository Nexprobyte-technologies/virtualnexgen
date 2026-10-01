import type { Metadata } from "next";
import type { BlogPost } from "./types";

export const SITE_URL = "https://virtualnexgen.com";

const CARD_DESCRIPTION_LENGTH = 200;
const MAX_TITLE_LENGTH = 70;
const MAX_DESCRIPTION_LENGTH = 180;

export function plainTextFromHtml(html: string): string {
  if (!html) return "";
  return html
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, " ")
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, " ")
    .replace(/<br\s*\/?>/gi, " ")
    .replace(/<\/(p|h[1-6]|li|blockquote|div|section|article|tr)>/gi, " ")
    .replace(/<li\b[^>]*>/gi, " - ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/&#0?39;|&apos;/gi, "'")
    .replace(/&mdash;|&ndash;/gi, " - ")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/\s+/g, " ")
    .trim();
}

function truncate(text: string, limit: number): string {
  if (text.length <= limit) return text;
  const cut = text.slice(0, limit);
  const lastSpace = cut.lastIndexOf(" ");
  return `${(lastSpace > limit * 0.6 ? cut.slice(0, lastSpace) : cut).trimEnd()}..`;
}

/** Heading shown on listing cards: meta title wins, article title is the fallback. */
export function getCardTitle(post: BlogPost): string {
  return post.metaTitle?.trim() || post.title;
}

/** Body text shown on listing cards: meta description wins, then excerpt, then content. */
export function getCardDescription(post: BlogPost): string {
  const meta = post.metaDescription?.trim();
  if (meta) return truncate(meta, CARD_DESCRIPTION_LENGTH);
  const excerpt = post.excerpt?.trim();
  if (excerpt) return truncate(excerpt, CARD_DESCRIPTION_LENGTH);
  return truncate(plainTextFromHtml(post.content ?? ""), CARD_DESCRIPTION_LENGTH);
}

export function getMetaTitle(post: BlogPost): string {
  return truncate(post.metaTitle?.trim() || post.title, MAX_TITLE_LENGTH);
}

export function getMetaDescription(post: BlogPost): string {
  const meta = post.metaDescription?.trim();
  if (meta) return truncate(meta, MAX_DESCRIPTION_LENGTH);
  const excerpt = post.excerpt?.trim();
  if (excerpt) return truncate(excerpt, MAX_DESCRIPTION_LENGTH);
  return truncate(
    plainTextFromHtml(post.content ?? ""),
    MAX_DESCRIPTION_LENGTH,
  );
}

export function getMetaKeywords(post: BlogPost): string {
  const keywords = post.metaKeywords?.trim();
  if (keywords) return keywords;
  const tags = (post.tags ?? []).map((tag) => tag.trim()).filter(Boolean);
  if (tags.length > 0) return tags.join(", ");
  return getMetaDescription(post);
}

export function getCanonicalUrl(post: BlogPost): string {
  const canonical = post.canonicalUrl?.trim();
  if (canonical) {
    return canonical.startsWith("http")
      ? canonical
      : `${SITE_URL}${canonical.startsWith("/") ? "" : "/"}${canonical}`;
  }
  return `${SITE_URL}/blog/${post.slug}`;
}

function absoluteUrl(url?: string): string | undefined {
  const value = url?.trim();
  if (!value) return undefined;
  if (value.startsWith("http")) return value;
  return `${SITE_URL}${value.startsWith("/") ? "" : "/"}${value}`;
}

export function buildBlogPostMetadata(post: BlogPost): Metadata {
  const title = getMetaTitle(post);
  const description = getMetaDescription(post);
  const url = getCanonicalUrl(post);
  const images = [post.ogImage, post.previewImage, post.image, post.twitterImage]
    .map(absoluteUrl)
    .filter((value): value is string => Boolean(value));
  const ogType =
    post.ogType === "article" ||
    post.ogType === "website" ||
    post.ogType === "profile"
      ? post.ogType
      : "article";
  const twitterCard =
    post.twitterCard === "summary" || post.twitterCard === "player"
      ? post.twitterCard
      : "summary_large_image";

  return {
    title,
    description,
    keywords: getMetaKeywords(post).split(",").map((word) => word.trim()),
    alternates: { canonical: url },
    authors: post.author ? [{ name: post.author }] : undefined,
    openGraph: {
      type: ogType,
      title: post.ogTitle?.trim() || title,
      description: post.ogDescription?.trim() || description,
      url,
      siteName: "Virtual Nexgen Solutions",
      publishedTime: post.date || undefined,
      authors: post.author ? [post.author] : undefined,
      tags: post.tags?.length ? post.tags : undefined,
      images: images.length > 0 ? [{ url: images[0] }] : undefined,
    },
    twitter: {
      card: twitterCard,
      title: post.twitterTitle?.trim() || title,
      description: post.twitterDescription?.trim() || description,
      images: images.length > 0 ? [images[0]] : undefined,
    },
    other: {
      Title: title,
      subject: description,
    },
    robots: post.robots ?? "index, follow",
  };
}
