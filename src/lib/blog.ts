import { promises as fs } from "fs";
import path from "path";
import type { BlogPost } from "./types";
import { slugify } from "./services";

const DATA_DIR = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "blog.json");
const FULL_DATA_FILE = path.join(DATA_DIR, "blogs_full.json");

const seed: BlogPost[] = [
  {
    id: "seed-1",
    slug: "ai-automation-for-small-businesses",
    title: "AI Automation for Small Businesses: Where to Start",
    excerpt:
      "Learn how small businesses can use AI automation to save hours every week — from lead qualification to document processing.",
    content:
      "AI automation is no longer just for large enterprises. Small businesses can automate repetitive tasks like lead follow-ups, chatbot conversations, data entry and report generation.\n\n## Why Businesses Need AI Automation\n\nStart by mapping your workflows and identifying the highest-impact bottlenecks. Then pick two or three automations that save the most time:\n\n- Lead qualification and scoring\n- Chatbot conversations\n- Document processing\n- Report generation\n\nAt **Virtual Nexgen Solutions**, we audit your operation end-to-end and build automations your staff will actually enjoy using. Every solution is monitored, measured and refined so the savings keep compounding.",
    image:
      "https://file.aiquickdraw.com/imgcompressed/img/compressed_14fa0f4e9d0153477eed77c2d5a81be6.webp",
    link: "https://virtualnexgen.com/blog",
    author: "Virtual Nexgen Team",
    date: "2026-01-20",
    tags: ["AI Automation", "Business", "Automation"],
    createdAt: "2026-01-20T09:00:00.000Z",
  },
  {
    id: "seed-2",
    slug: "benefits-of-virtual-assistants",
    title: "Top Benefits of Hiring Virtual Assistants in 2026",
    excerpt:
      "From cost savings to round-the-clock productivity, discover why virtual assistants are the smartest hire for growing teams.",
    content:
      "Virtual assistants bring dedicated support to your back office without the overhead of full-time hiring.\n\n## The Cost Advantage\n\nYou save on recruitment, training, and infrastructure while gaining a team that adapts to your workload — from administrative support to insurance, real estate, legal, healthcare, marketing and bookkeeping.\n\n## Scale With Ease\n\n- Onboarding within days\n- No long-term lock-in\n- Pay-as-you-go options\n- Dedicated team support\n\nWith a mature process and a trained team, you can scale up or down as your business demands.",
    image:
      "https://static.vecteezy.com/system/resources/previews/054/845/292/non_2x/agentic-ai-workflow-automation-artificial-intelligence-ai-driven-decision-making-concept-illustration-clipart-png.png",
    link: "https://virtualnexgen.com/blog",
    author: "Virtual Nexgen Team",
    date: "2026-02-05",
    tags: ["Virtual Assistant", "Business"],
    createdAt: "2026-02-05T09:00:00.000Z",
  },
  {
    id: "seed-3",
    slug: "insurance-back-office-optimization",
    title: "How to Streamline Your Insurance Back Office",
    excerpt:
      "Policy data entry, claims follow-ups and documentation — here is how insurance teams cut admin time and errors.",
    content:
      "The insurance back office is full of repetitive, detail-heavy work. Policy data entry into CRMs, claims follow-ups, documentation and customer status updates consume your agents' time.\n\n## The Administrative Workload\n\n- Policy data entry into CRMs\n- Claims follow-ups\n- Documentation\n- Customer status updates\n\n## How We Help\n\nOur assistants are trained on **compliance awareness** and **data accuracy**, reducing errors and keeping your records audit-ready.\n\nScale your servicing capacity without hiring: our team plugs directly into your agencies, portals and management systems.",
    image:
      "https://png.pngtree.com/png-clipart/20250515/original/pngtree-ai-matrix-head-png-sticker-illustration-png-image_20982168.png",
    link: "https://virtualnexgen.com/blog",
    author: "Virtual Nexgen Team",
    date: "2026-03-02",
    tags: ["Insurance", "Back Office", "Support"],
    createdAt: "2026-03-02T09:00:00.000Z",
  },
];

async function loadFullContent(): Promise<Record<string, { contentHtml: string; contentText: string }>> {
  try {
    const raw = await fs.readFile(FULL_DATA_FILE, "utf-8");
    const list = JSON.parse(raw) as Array<{ slug: string; contentHtml: string; contentText: string }>;
    const map: Record<string, { contentHtml: string; contentText: string }> = {};
    for (const item of list) {
      if (item.slug && item.contentHtml) {
        map[item.slug] = { contentHtml: item.contentHtml, contentText: item.contentText };
      }
    }
    return map;
  } catch {
    return {};
  }
}

async function ensureFile(): Promise<BlogPost[]> {
  await fs.mkdir(DATA_DIR, { recursive: true });
  try {
    await fs.access(DATA_FILE);
    const raw = await fs.readFile(DATA_FILE, "utf-8");
    const list = JSON.parse(raw) as BlogPost[];
    if (Array.isArray(list) && list.length > 0) return list;
    throw new Error("empty");
  } catch {
    await fs.writeFile(DATA_FILE, JSON.stringify(seed, null, 2), "utf-8");
    return seed;
  }
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  const [posts, fullMap] = await Promise.all([ensureFile(), loadFullContent()]);
  return posts.map((post) => {
    const full = fullMap[post.slug];
    if (full) {
      return { ...post, content: full.contentHtml };
    }
    return post;
  });
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  const [all, fullMap] = await Promise.all([getBlogPosts(), loadFullContent()]);
  const post = all.find((p) => p.slug === slug) ?? null;
  if (post && fullMap[slug]) {
    return { ...post, content: fullMap[slug].contentHtml };
  }
  return post;
}

export type BlogPostInput = {
  title: string;
  excerpt: string;
  content: string;
  image: string;
  link: string;
  author: string;
  date: string;
  tags?: string[];
  slug?: string;
};

export async function addBlogPost(input: BlogPostInput): Promise<BlogPost> {
  const all = await getBlogPosts();
  const base = slugify(input.slug ?? input.title) || "post";
  let slug = base;
  let n = 2;
  while (all.some((p) => p.slug === slug)) {
    slug = `${base}-${n++}`;
  }
  const post: BlogPost = {
    id: crypto.randomUUID(),
    slug,
    title: input.title,
    excerpt: input.excerpt,
    content: input.content,
    image: input.image,
    link: input.link,
    author: input.author,
    date: input.date || new Date().toISOString().slice(0, 10),
    tags: input.tags ?? [],
    createdAt: new Date().toISOString(),
  };
  all.unshift(post);
  await fs.writeFile(DATA_FILE, JSON.stringify(all, null, 2), "utf-8");
  return post;
}

export async function updateBlogPost(
  slug: string,
  input: BlogPostInput,
): Promise<BlogPost | null> {
  const all = await getBlogPosts();
  const index = all.findIndex((p) => p.slug === slug);
  if (index === -1) return null;
  const next: BlogPost = {
    ...all[index],
    title: input.title,
    excerpt: input.excerpt,
    content: input.content,
    image: input.image,
    link: input.link,
    author: input.author,
    date: input.date || all[index].date,
    tags: input.tags ?? all[index].tags,
  };
  all[index] = next;
  await fs.writeFile(DATA_FILE, JSON.stringify(all, null, 2), "utf-8");
  return next;
}

export async function deleteBlogPost(slug: string): Promise<boolean> {
  const all = await getBlogPosts();
  const next = all.filter((p) => p.slug !== slug);
  if (next.length === all.length) return false;
  await fs.writeFile(DATA_FILE, JSON.stringify(next, null, 2), "utf-8");
  return true;
}