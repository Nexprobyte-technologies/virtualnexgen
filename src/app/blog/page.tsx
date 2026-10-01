import type { Metadata } from "next";
import { getBlogPosts } from "@/lib/blog";
import { SITE_URL } from "@/lib/blog-seo";
import BlogListClient from "./BlogListClient";

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
  const posts = await getBlogPosts({ publishedOnly: true });

  return <BlogListClient initialPosts={posts} />;
}
