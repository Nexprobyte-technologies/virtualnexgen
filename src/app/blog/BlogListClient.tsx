"use client";

import { useState } from "react";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { ArrowUpRight } from "lucide-react";
import { getCardDescription, getCardTitle } from "@/lib/blog-seo";
import type { BlogPostSummary } from "@/lib/blog-seo";
import { POSTS_PER_PAGE } from "@/lib/blog-listing";

/** Cards per row and per stacked column of the article list. */
const GROUP_SIZE = 3;

/** Identifier of the "Most recent" tab. */
const RECENT_FILTER = "most-recent";

function formatDate(date: string): string {
  const d = new Date(date);
  if (Number.isNaN(d.getTime())) return date;
  return d.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}

function getCategory(post: BlogPostSummary): string {
  return post.tags?.[0] ?? "General";
}

/** Article image with a letter placeholder for posts that have no artwork. */
function PostThumb({
  post,
  letterClassName,
}: {
  post: BlogPostSummary;
  letterClassName: string;
}) {
  if (post.image) {
    return (
      <img
        src={post.image}
        alt={getCardTitle(post)}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
      />
    );
  }
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-[#fffaf3]">
      <span className={letterClassName}>{getCardTitle(post).charAt(0)}</span>
    </div>
  );
}

function FeaturedCard({ post }: { post: BlogPostSummary }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex min-w-0 grow basis-full flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-[0_4px_24px_rgba(0,0,0,0.06)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_16px_48px_rgba(249,115,22,0.12)] md:basis-[46%]"
    >
      <div className="relative aspect-[16/9] w-full shrink-0 overflow-hidden">
        <PostThumb post={post} letterClassName="text-5xl font-extrabold text-brand/20" />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center gap-3">
          <span className="rounded-full bg-brand/10 px-3 py-1 text-xs font-bold text-brand-dark">
            {getCategory(post)}
          </span>
          <span className="text-xs text-ink/40">{formatDate(post.date)}</span>
        </div>
        <h3 className="mt-3 text-xl font-extrabold leading-snug text-ink transition">
          {getCardTitle(post)}
        </h3>
        <p className="mt-2.5 line-clamp-2 text-sm leading-relaxed text-ink/60">
          {getCardDescription(post)}
        </p>
        <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-ink/70 transition group-hover:gap-2.5">
          Read More <ArrowUpRight className="h-4 w-4" />
        </span>
      </div>
    </Link>
  );
}

/** Standard white card used by the horizontal rows of the list. */
function GridCard({ post }: { post: BlogPostSummary }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex min-w-0 grow basis-full flex-col overflow-hidden rounded-2xl border border-[#01012F]/15 bg-white shadow-[0_4px_24px_rgba(0,0,0,0.06)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_16px_48px_rgba(6,182,212,0.12)] sm:basis-[46%] md:basis-[30%]"
    >
      <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden">
        <PostThumb post={post} letterClassName="text-4xl font-extrabold text-[#02024E]/25" />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center gap-3">
          <span className="rounded-full bg-[#12B4CF]/10 px-3 py-1 text-xs font-bold text-[#02024E]/80">
            {getCategory(post)}
          </span>
          <span className="text-xs text-[#02024E]/40">{formatDate(post.date)}</span>
        </div>
        <h3 className="mt-3 line-clamp-2 text-lg font-extrabold leading-snug text-[#02024E] transition group-hover:text-[#12B4CF]">
          {getCardTitle(post)}
        </h3>
        <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-[#02024E]/60">
          {getCardDescription(post)}
        </p>
        <span className="mt-auto pt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[#02024E]/70 transition group-hover:gap-2.5">
          Read More <ArrowUpRight className="h-4 w-4" />
        </span>
      </div>
    </Link>
  );
}

interface BlogListClientProps {
  featuredPosts: BlogPostSummary[];
  initialPosts: BlogPostSummary[];
  categories: string[];
  total: number;
}

/** Loads one page of articles for the active tab. */
async function fetchBlogPage(filter: string, offset: number, limit: number) {
  const params = new URLSearchParams({
    published: "1",
    sort: "date",
    offset: String(offset),
    limit: String(limit),
  });
  if (filter !== RECENT_FILTER) params.set("category", filter);

  const response = await fetch(`/api/blog?${params.toString()}`);
  if (!response.ok) throw new Error("Unable to load articles");

  const data = (await response.json()) as {
    posts?: BlogPostSummary[];
    total?: number;
  };
  return {
    posts: Array.isArray(data.posts) ? data.posts : [],
    total: typeof data.total === "number" ? data.total : 0,
  };
}

export default function BlogListClient({
  featuredPosts,
  initialPosts,
  categories,
  total,
}: BlogListClientProps) {
  const [activeFilter, setActiveFilter] = useState(RECENT_FILTER);
  const [displayedPosts, setDisplayedPosts] =
    useState<BlogPostSummary[]>(initialPosts);
  const [filterTotal, setFilterTotal] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const isRecent = activeFilter === RECENT_FILTER;
  const offsetBase = 0;
  const currentTotal = isRecent ? total : (filterTotal ?? 0);
  const hasMore = !hasError && offsetBase + displayedPosts.length < currentTotal;

  // Every article uses the same card, three to a row.
  const loadMore = async () => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      const result = await fetchBlogPage(
        activeFilter,
        offsetBase + displayedPosts.length,
        POSTS_PER_PAGE,
      );
      setDisplayedPosts((current) => [...current, ...result.posts]);
      if (!isRecent) setFilterTotal(result.total);
    } catch {
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const selectFilter = async (filter: string) => {
    if (filter === activeFilter || isLoading) return;
    setActiveFilter(filter);
    setHasError(false);
    setFilterTotal(null);

    if (filter === RECENT_FILTER) {
      setDisplayedPosts(initialPosts);
      return;
    }

    setIsLoading(true);
    try {
      const result = await fetchBlogPage(filter, 0, POSTS_PER_PAGE);
      setDisplayedPosts(result.posts);
      setFilterTotal(result.total);
    } catch {
      setDisplayedPosts([]);
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const chipClass = (isActive: boolean) =>
    isActive
      ? "rounded-full bg-[#12B4CF]/10 px-5 py-2 text-sm font-semibold text-[#02024E]"
      : "rounded-full border border-[#01012F]/20 bg-white px-5 py-2 text-sm font-medium text-[#02024E]/60 transition hover:border-[#12B4CF] hover:text-[#02024E]";

  return (
    <main className="flex min-h-screen flex-col bg-[#fffaf3]">
      <div className="relative flex flex-col overflow-hidden bg-[#fffaf3] pb-6 pt-14 sm:pt-16">
        <div className="relative mx-auto flex max-w-7xl flex-col px-5 sm:px-8">
          <h1 className="max-w-3xl text-3xl font-extrabold leading-[1.15] tracking-tight text-[#02024E] sm:text-4xl lg:text-5xl">
            Insights, Tips &{" "}
            <span className="text-[#12B4CF]">Updates</span>
          </h1>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-[#02024E]/60 sm:text-lg">
            Expert advice on virtual assistants, AI automation and business
            process optimization — straight from the Virtual Nexgen Solutions
            team.
          </p>
        </div>
      </div>

      <section className="mx-auto flex max-w-7xl flex-col px-5 py-12 sm:px-8 lg:py-14">
        {total === 0 ? (
          <div className="flex items-center justify-center rounded-[2rem] border border-[#01012F]/10 bg-white p-16">
            <p className="text-lg font-semibold text-[#02024E]/50">
              No blog posts yet — check back soon!
            </p>
          </div>
        ) : (
          <>
            {/* Featured */}
            {featuredPosts.length > 0 && (
              <div className="mb-16 flex flex-col">
                <h2 className="mb-8 text-2xl font-extrabold text-[#02024E] sm:text-3xl">
                  Featured
                </h2>
                <div className="flex flex-wrap gap-8">
                  {featuredPosts.map((post) => (
                    <FeaturedCard key={post.id} post={post} />
                  ))}
                </div>
                <div className="mt-10 flex justify-center">
                  <a
                    href="#all-articles"
                    className="inline-flex items-center gap-2 rounded-full border-2 border-[#12B4CF] px-8 py-3.5 text-base font-semibold text-[#12B4CF] transition-all duration-300 hover:border-[#12B4CF] hover:bg-[#12B4CF] hover:text-white"
                  >
                    Read all articles
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                </div>
              </div>
            )}

            {/* All articles */}
            <div id="all-articles" className="flex scroll-mt-28 flex-col">
              <h2 className="mb-8 text-2xl font-extrabold text-[#02024E] sm:text-3xl">
                Read all articles
              </h2>

              <div className="mb-10 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => selectFilter(RECENT_FILTER)}
                  aria-pressed={isRecent}
                  className={chipClass(isRecent)}
                >
                  Most recent
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => selectFilter(cat)}
                    aria-pressed={activeFilter === cat}
                    className={chipClass(activeFilter === cat)}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {isLoading && displayedPosts.length === 0 ? (
                <div className="flex flex-wrap gap-8">
                  {Array.from({ length: GROUP_SIZE }).map((_, index) => (
                    <div
                      key={index}
                      className="h-72 min-w-0 grow basis-full animate-pulse rounded-2xl border border-[#01012F]/10 bg-white/70 sm:basis-[46%] md:basis-[30%]"
                    />
                  ))}
                </div>
              ) : (
                <div className="flex flex-wrap gap-8">
                  {displayedPosts.map((post) => (
                    <GridCard key={post.id} post={post} />
                  ))}
                </div>
              )}

              {/* View More Button */}
              {hasMore && (
                <div className="mt-12 flex flex-col items-center gap-4">
                  <button
                    onClick={loadMore}
                    disabled={isLoading}
                    className="inline-flex items-center gap-2 rounded-full border-2 border-[#12B4CF] px-8 py-3.5 text-base font-semibold text-[#12B4CF] transition-all duration-300 hover:bg-[#12B4CF] hover:text-white hover:border-[#12B4CF] disabled:opacity-60"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin" />
                        Loading...
                      </>
                    ) : (
                      <>
                        View More Articles
                        <ArrowUpRight className="h-4 w-4" />
                      </>
                    )}
                  </button>
                  <p className="text-sm text-[#02024E]/50">
                    Showing {displayedPosts.length} of {currentTotal} articles
                  </p>
                </div>
              )}
              {!hasMore && displayedPosts.length > 0 && (
                <div className="mt-12 flex flex-col items-center">
                  <p className="text-sm text-[#02024E]/50">
                    Showing all {currentTotal} articles
                  </p>
                </div>
              )}
              {hasError && (
                <div className="mt-12 flex flex-col items-center">
                  <p className="text-sm text-[#02024E]/60">
                    Articles could not be loaded right now. Please try again.
                  </p>
                </div>
              )}
            </div>
          </>
        )}
      </section>
    </main>
  );
}
