import { getBlogPosts } from "@/lib/blog";
import BlogListClient from "./BlogListClient";

export const dynamic = "force-dynamic";

export default async function BlogListPage() {
  const posts = await getBlogPosts();

  return <BlogListClient initialPosts={posts} />;
}