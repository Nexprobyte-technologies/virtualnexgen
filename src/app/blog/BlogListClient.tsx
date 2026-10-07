"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronRight, Home, Loader2 } from "lucide-react";
import { ArrowUpRight } from "lucide-react";
import { getCardDescription, getCardTitle } from "@/lib/blog-seo";
import type { BlogPost } from "@/lib/types";

const POSTS_PER_PAGE = 9;

function formatDate(date: string): string {
  const d = new Date(date);
  if (Number.isNaN(d.getTime())) return date;
  return d.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

interface BlogListClientProps {
  initialPosts: BlogPost[];
}

export default function BlogListClient({ initialPosts }: BlogListClientProps) {
  const [displayedPosts, setDisplayedPosts] = useState<BlogPost[]>(initialPosts.slice(0, POSTS_PER_PAGE));
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(initialPosts.length > POSTS_PER_PAGE);

  const categories = Array.from(
    new Set(initialPosts.map((p) => p.tags?.[0] ?? "General"))
  );

  const loadMore = () => {
    setIsLoading(true);
    setTimeout(() => {
      const currentLength = displayedPosts.length;
      const nextPosts = initialPosts.slice(currentLength, currentLength + POSTS_PER_PAGE);
      setDisplayedPosts([...displayedPosts, ...nextPosts]);
      setHasMore(currentLength + nextPosts.length < initialPosts.length);
      setIsLoading(false);
    }, 300);
  };

  return (
    <main className="min-h-screen bg-[#fffaf3]">
      {/* Breadcrumb */}
      <div className="relative overflow-hidden py-6 bg-[#fffaf3]">
        <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
          <nav className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#02024E]/50">
            <Link
              href="/"
              className="flex items-center gap-1.5 transition hover:text-[#02024E]"
            >
              <Home className="h-3.5 w-3.5" /> Home
            </Link>
            <ChevronRight className="h-3.5 w-3.5 text-[#02024E]/30" />
            <span className="text-[#02024E]/80">Blog</span>
          </nav>
          <h1 className="mt-4 max-w-3xl text-3xl font-extrabold leading-[1.15] tracking-tight text-[#02024E] sm:text-4xl lg:text-5xl">
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

      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-20">
        {initialPosts.length === 0 ? (
          <div className="grid place-items-center rounded-[2rem] border border-[#01012F]/10 bg-white p-16">
            <p className="text-lg font-semibold text-[#02024E]/50">
              No blog posts yet — check back soon!
            </p>
          </div>
        ) : (
          <>
            {/* Featured */}
            {initialPosts.length >= 2 && (
              <div className="mb-16">
<h2 className="mb-8 text-2xl font-extrabold text-[#02024E] sm:text-3xl">
                  Featured
                </h2>
                <div className="grid gap-8 md:grid-cols-2">
                  {initialPosts.slice(0, 2).map((post) => (
                    <Link
                      key={post.id}
                      href={`/blog/${post.slug}`}
                      className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-[0_4px_24px_rgba(0,0,0,0.06)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_16px_48px_rgba(249,115,22,0.12)]"
                    >
                      <div className="relative aspect-[16/9] w-full shrink-0 overflow-hidden">
                        {post.image ? (
                          <img
                            src={post.image}
                            alt={getCardTitle(post)}
                            loading="lazy"
                            className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                          />
                        ) : (
                          <div className="grid h-full w-full place-items-center bg-[#fffaf3]">
                            <span className="text-5xl font-extrabold text-brand/20">
                              {getCardTitle(post).charAt(0)}
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="flex flex-1 flex-col p-6">
                        <div className="flex items-center gap-3">
                          <span className="rounded-full bg-brand/10 px-3 py-1 text-xs font-bold text-brand-dark">
                            {post.tags?.[0] ?? "General"}
                          </span>
                          <span className="text-xs text-ink/40">
                            {formatDate(post.date)}
                          </span>
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
                  ))}
                </div>
              </div>
            )}

            {/* All articles */}
            <div>
              <h2 className="mb-8 text-2xl font-extrabold text-[#02024E] sm:text-3xl">
                Read all articles
              </h2>

<div className="flex flex-wrap gap-3 mb-10">
                <span className="rounded-full bg-[#12B4CF]/10 px-5 py-2 text-sm font-semibold text-[#02024E]">
                  Most recent
                </span>
                {categories.map((cat) => (
                  <span
                    key={cat}
                    className="rounded-full border border-[#01012F]/20 bg-white px-5 py-2 text-sm font-medium text-[#02024E]/60 transition hover:border-[#12B4CF] hover:text-[#02024E]"
                  >
                    {cat}
                  </span>
                ))}
              </div>

              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {displayedPosts.map((post) => (
                  <Link
                    key={post.id}
                    href={`/blog/${post.slug}`}
                    className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[#01012F]/15 bg-white shadow-[0_4px_24px_rgba(0,0,0,0.06)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_16px_48px_rgba(6,182,212,0.12)]"
                  >
                    <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden">
                      {post.image ? (
                        <img
                          src={post.image}
                          alt={getCardTitle(post)}
                          loading="lazy"
                          className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                        />
                      ) : (
                        <div className="grid h-full w-full place-items-center bg-[#fffaf3]">
                          <span className="text-4xl font-extrabold text-[#02024E]/25">
                            {getCardTitle(post).charAt(0)}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="flex flex-1 flex-col p-6">
                      <div className="flex items-center gap-3">
                        <span className="rounded-full bg-[#12B4CF]/10 px-3 py-1 text-xs font-bold text-[#02024E]/80">
                          {post.tags?.[0] ?? "General"}
                        </span>
                        <span className="text-xs text-[#02024E]/40">
                          {formatDate(post.date)}
                        </span>
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
                ))}
              </div>

              {/* View More Button */}
{hasMore && (
                <div className="mt-12 text-center">
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
                  <p className="mt-4 text-sm text-[#02024E]/50">
                    Showing {displayedPosts.length} of {initialPosts.length} articles
                  </p>
                </div>
              )}
              {!hasMore && displayedPosts.length > 0 && (
                <div className="mt-12 text-center">
                  <p className="text-sm text-[#02024E]/50">
                    Showing all {initialPosts.length} articles
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