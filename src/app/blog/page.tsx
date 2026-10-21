import type { Metadata } from "next";
import { getBlogPosts } from "@/lib/blog";
import { SITE_URL, toBlogPostSummary } from "@/lib/blog-seo";
import BlogListClient, { POSTS_PER_PAGE } from "./BlogListClient";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Blog | Insights, Tips & Updates | Virtual Nexgen Solutions",
  description:
    "Expert advice on virtual assistants, AI automation and business process optimization — insights, tips and updates from the Virtual Nexgen Solutions team.",
  alternates: { canonical: `${SITE_URL}/blog` },
  openGraph: {
    type: "website",
    title: "Blog | Insights, Tips & Updates | Virtual Nexgen Solutions",
    description:
      "Expert advice on virtual assistants, AI automation and business process optimization — insights, tips and updates from the Virtual Nexgen Solutions team.",
    url: `${SITE_URL}/blog`,
    siteName: "Virtual Nexgen Solutions",
  },
};

export default async function BlogListPage() {
  // Listing cards only need the metadata, so the article bodies never have to
  // be merged in or serialised to the client.
  const posts = await getBlogPosts({ publishedOnly: true, includeContent: false });
  const summaries = posts.map(toBlogPostSummary);
  const categories = Array.from(
    new Set(summaries.map((post) => post.tags?.[0] ?? "General")),
  );

  return (
    <BlogListClient
      initialPosts={summaries.slice(0, POSTS_PER_PAGE)}
      categories={categories}
      total={summaries.length}
    />
  );
}
