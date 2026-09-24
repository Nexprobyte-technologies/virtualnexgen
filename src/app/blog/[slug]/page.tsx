import Link from "next/link";
import { notFound } from "next/navigation";
import {
  CalendarCheck,
  ChevronRight,
  Clock,
  ExternalLink,
  Home,
  List,
  Phone,
  ShieldCheck,
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import sanitizeHtml from "sanitize-html";
import { getBlogPost, getBlogPosts } from "@/lib/blog";
import AskAboutUs from "@/components/AskAboutUs";

export const dynamic = "force-dynamic";

function formatDate(date: string): string {
  const d = new Date(date);
  if (Number.isNaN(d.getTime())) return date;
  return d.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function estimateReadTime(content: string): number {
  const words = content.replace(/<[^>]*>/g, "").split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}

function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-");
}

function extractHeadings(content: string): { id: string; text: string }[] {
  const headings: { id: string; text: string }[] = [];
  const counts = new Map<string, number>();
  const pushHeading = (text: string) => {
    const base = slugifyHeading(text);
    if (!base) return;
    const count = counts.get(base) ?? 0;
    counts.set(base, count + 1);
    headings.push({ id: count > 0 ? `${base}-${count}` : base, text });
  };
  const markdownRegex = /#{2,3}\s+(.+)/g;
  let match: RegExpExecArray | null;
  while ((match = markdownRegex.exec(content)) !== null) {
    pushHeading(match[1].trim());
  }
  const htmlRegex = /<h([23])[^>]*>(.*?)<\/h\1>/gi;
  while ((match = htmlRegex.exec(content)) !== null) {
    const text = (match[2] ?? "").replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();
    if (text) pushHeading(text);
  }
  return headings;
}

function isHtml(text: string): boolean {
  return /<\/?[a-zA-Z][\s\S]*>/i.test(text);
}

const RICH_HTML_STYLES = [
  "h2",
  "h3",
  "p",
  "strong",
  "em",
  "a",
  "ul",
  "ol",
  "li",
  "blockquote",
  "hr",
  "code",
  "pre",
  "table",
  "thead",
  "tbody",
  "tr",
  "th",
  "td",
  "br",
  "span",
];

function RenderRichHtml({ html }: { html: string }) {
  const safe = sanitizeHtml(html, {
    allowedTags: RICH_HTML_STYLES.concat(["a", "img", "u", "s"]),
    allowedAttributes: {
      a: ["href", "target", "rel"],
      img: ["src", "alt", "title"],
      td: ["colspan", "rowspan"],
      th: ["colspan", "rowspan"],
    },
    allowedSchemes: ["http", "https", "mailto", "tel"],
    transformTags: {
      a: (tagName, attribs) => ({
        tagName,
        attribs: {
          href: attribs.href,
          target: "_blank",
          rel: "noopener noreferrer",
        },
      }),
    },
  });

  return (
    <div
      className="rich-content [&_h2]:mt-10 [&_h2]:mb-4 [&_h2]:text-2xl [&_h2]:font-extrabold [&_h2]:leading-tight [&_h2]:text-ink [&_h2]:scroll-mt-36 sm:[&_h2]:text-3xl [&_h3]:mt-8 [&_h3]:mb-3 [&_h3]:text-xl [&_h3]:font-extrabold [&_h3]:text-ink [&_h3]:scroll-mt-36 [&_p]:my-5 [&_p]:text-base [&_p]:leading-relaxed [&_p]:text-ink/70 sm:[&_p]:text-lg [&_strong]:font-bold [&_strong]:text-ink [&_em]:italic [&_u]:underline [&_a]:font-semibold [&_a]:text-brand-dark [&_a]:underline [&_a]:decoration-brand/40 [&_a]:underline-offset-4 [&_ul]:my-5 [&_ul]:space-y-2.5 [&_ul]:pl-5 [&_ul]:text-base [&_ul]:leading-relaxed [&_ul]:text-ink/70 sm:[&_ul]:text-lg [&_ol]:my-5 [&_ol]:space-y-2.5 [&_ol]:pl-5 [&_ol]:text-base [&_ol]:leading-relaxed [&_ol]:text-ink/70 sm:[&_ol]:text-lg [&_li]:marker:text-brand-dark [&_blockquote]:my-6 [&_blockquote]:border-l-4 [&_blockquote]:border-brand [&_blockquote]:pl-5 [&_blockquote]:text-lg [&_blockquote]:font-medium [&_blockquote]:italic [&_blockquote]:text-ink/80 [&_hr]:my-8 [&_hr]:border-line [&_code]:rounded [&_code]:bg-brand/10 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:text-sm [&_code]:font-semibold [&_code]:text-brand-deep [&_table]:my-6 [&_table]:w-full [&_table]:border-collapse [&_table]:text-left [&_table]:text-sm [&_table]:text-ink/70 [&_th]:border [&_th]:border-line [&_th]:bg-cream [&_th]:px-3 [&_th]:py-2 [&_th]:font-bold [&_th]:text-ink [&_td]:border [&_td]:border-line [&_td]:px-3 [&_td]:py-2 [&_img]:h-auto [&_img]:w-full [&_img]:rounded-2xl [&_img]:mt-[10px] [&_img]:mb-6"
      dangerouslySetInnerHTML={{ __html: addHeadingIds(safe) }}
    />
  );
}

function addHeadingIds(html: string): string {
  const counts = new Map<string, number>();
  return html.replace(/<h([23])([^>]*)>(.*?)<\/h\1>/gi, (whole, level, attrs, inner) => {
    const text = inner.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();
    const base = slugifyHeading(text);
    if (!base) return whole;
    const count = counts.get(base) ?? 0;
    counts.set(base, count + 1);
    const id = count > 0 ? `${base}-${count}` : base;
    return `<h${level}${attrs} id="${id}">${inner}</h${level}>`;
  });
}

const MARKDOWN_COMPONENTS = {
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => {
    const text = props.children?.toString() ?? "";
    const id = text
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-");
    return (
      <h2
        {...props}
        id={id}
        className="mt-10 mb-4 scroll-mt-36 text-2xl font-extrabold leading-tight text-ink sm:text-3xl"
      />
    );
  },
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => {
    const text = props.children?.toString() ?? "";
    const id = text
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-");
    return (
      <h3
        {...props}
        id={id}
        className="mt-8 mb-3 scroll-mt-36 text-xl font-extrabold leading-snug text-ink"
      />
    );
  },
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p
      {...props}
      className="my-5 text-base leading-relaxed text-ink/70 sm:text-lg"
    />
  ),
  strong: (props: React.HTMLAttributes<HTMLElement>) => (
    <strong {...props} className="font-bold text-ink" />
  ),
  em: (props: React.HTMLAttributes<HTMLElement>) => (
    <em {...props} className="italic text-ink/80" />
  ),
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a
      {...props}
      target={props.href?.startsWith("http") ? "_blank" : undefined}
      rel="noopener noreferrer"
      className="font-semibold text-brand-dark underline decoration-brand/40 underline-offset-4 transition hover:decoration-brand-dark"
    />
  ),
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul
      {...props}
      className="my-5 space-y-2.5 pl-5 text-base leading-relaxed text-ink/70 sm:text-lg"
    />
  ),
  ol: (props: React.HTMLAttributes<HTMLOListElement>) => (
    <ol
      {...props}
      className="my-5 space-y-2.5 pl-5 text-base leading-relaxed text-ink/70 sm:text-lg"
    />
  ),
  li: (props: React.HTMLAttributes<HTMLLIElement>) => (
    <li {...props} className="relative pl-2 marker:text-brand-dark" />
  ),
  blockquote: (props: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      {...props}
      className="my-6 border-l-4 border-brand pl-5 text-lg font-medium italic text-ink/80"
    />
  ),
  hr: (props: React.HTMLAttributes<HTMLHRElement>) => (
    <hr {...props} className="my-8 border-line" />
  ),
  code: (props: React.HTMLAttributes<HTMLElement>) => (
    <code
      {...props}
      className="rounded bg-brand/10 px-1.5 py-0.5 text-sm font-semibold text-brand-deep"
    />
  ),
  table: (props: React.HTMLAttributes<HTMLTableElement>) => (
    <div className="my-6 overflow-x-auto">
      <table
        {...props}
        className="w-full border-collapse text-left text-sm text-ink/70"
      />
    </div>
  ),
  th: (props: React.ThHTMLAttributes<HTMLTableCellElement>) => (
    <th
      {...props}
      className="border border-line bg-cream px-3 py-2 font-bold text-ink"
    />
  ),
  td: (props: React.TdHTMLAttributes<HTMLTableCellElement>) => (
    <td {...props} className="border border-line px-3 py-2" />
  ),
};

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  if (!post) notFound();

  const allPosts = await getBlogPosts();
  const related = allPosts.filter((p) => p.slug !== slug).slice(0, 2);
  const category = post.tags?.[0] ?? "General";
  const readTime = estimateReadTime(post.content);
  const headings = extractHeadings(post.content);
  const articleUrl = `https://virtualnexgen.com/blog/${post.slug}`;

  return (
    <main className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="relative overflow-hidden py-5" style={{ background: "linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(151,199,199,1) 50%, rgba(255,255,255,1) 100%)" }}>
        <div className="pointer-events-none absolute -right-24 top-10 h-96 w-96 rounded-full bg-brand/8 blur-[120px]" />
        <div className="pointer-events-none absolute -left-32 bottom-0 h-96 w-96 rounded-full bg-brand-deep/8 blur-[120px]" />
        <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
          <nav className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-widest text-ink/50">
            <Link
              href="/"
              className="flex items-center gap-1.5 transition hover:text-ink"
            >
              <Home className="h-3.5 w-3.5" /> Home
            </Link>
            <ChevronRight className="h-3.5 w-3.5 text-ink/30" />
            <Link href="/blog" className="transition hover:text-ink">
              Blog
            </Link>
            <ChevronRight className="h-3.5 w-3.5 text-ink/30" />
            <span className="max-w-[30ch] truncate text-ink/80">
              {post.title}
            </span>
          </nav>

          <div className="mt-3 flex items-center gap-3">
            <span className="rounded-full bg-brand/10 px-3 py-1 text-xs font-bold text-brand-dark">
              {category}
            </span>
            <span className="flex items-center gap-1 text-xs text-ink/50">
              <Clock className="h-3 w-3" /> {readTime} min read
            </span>
          </div>

          <h1 className="mt-4 max-w-4xl text-2xl font-extrabold leading-[1.2] tracking-tight text-ink sm:text-3xl lg:text-4xl">
            {post.title}
          </h1>
        </div>
      </div>

      {/* Featured Image */}
      {post.image && (
        <div className="mx-auto max-w-7xl px-5 sm:px-8 mt-[50px]">
          <div className="overflow-hidden rounded-2xl border border-line shadow-[0_8px_40px_rgba(0,0,0,0.1)]">
            <img
              src={post.image}
              alt={post.title}
              className="h-auto w-full object-cover"
            />
          </div>
        </div>
      )}

      {/* Ask AI */}
      <div className="mx-auto max-w-7xl px-5 sm:px-8 mt-6">
        <AskAboutUs />
      </div>

      {/* Author Row */}
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex items-center gap-4 py-6 border-b border-line">
          <div className="h-10 w-10 shrink-0 rounded-full bg-gradient-to-br from-brand to-brand-deep flex items-center justify-center text-white font-bold text-sm">
            {post.author?.charAt(0) ?? "V"}
          </div>
          <div>
            <p className="text-sm font-bold text-ink">{post.author}</p>
            <p className="text-xs text-ink/50">Published on {formatDate(post.date)}</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:py-14">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px]">
          <article className="min-w-0 max-w-4xl">
            {post.excerpt && (
              <p className="mb-6 text-lg font-medium leading-relaxed text-ink/75 border-l-4 border-brand pl-5">
                {post.excerpt}
              </p>
            )}

            <div className="mt-6">
              {post.content ? (
                isHtml(post.content) ? (
                  <RenderRichHtml html={post.content} />
                ) : (
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={MARKDOWN_COMPONENTS}
                  >
                    {post.content}
                  </ReactMarkdown>
                )
              ) : null}
            </div>

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="mt-10 flex flex-wrap gap-2 border-t border-line pt-6">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-line bg-cream px-3 py-1.5 text-xs font-semibold text-ink/60"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* CTA */}
            <div className="mt-12 overflow-hidden rounded-2xl border border-line bg-white shadow-[0_8px_40px_rgba(0,0,0,0.08)]">
              <div className="bg-gradient-to-r from-brand-deep via-brand to-brand-deep p-7 sm:p-9">
                <h2 className="text-xl font-extrabold leading-snug text-ink sm:text-2xl">
                  Work With Virtual Nexgen Solutions
                </h2>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink/75">
                  If your business needs dependable virtual assistant support,
                  Virtual Nexgen Solutions can provide support around your
                  existing workflow. Book a discovery call today.
                </p>
                <a
                  href="https://calendly.com/virtualnexgen-info/30min"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center gap-2 rounded-full bg-ink px-7 py-3 text-sm font-bold text-cream transition hover:bg-black"
                >
                  Get in Touch Now! <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            </div>
          </article>

          {/* Right Sidebar */}
          <aside className="hidden lg:block">
            <div className="sticky top-32 space-y-6">
              {headings.length > 0 && (
                <div className="rounded-2xl border border-line bg-white p-6 shadow-[0_4px_24px_rgba(0,0,0,0.06)]">
                  <h3 className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-ink">
                    <List className="h-4 w-4 text-brand-dark" /> On This Page
                  </h3>
                  <nav className="mt-4">
                    <ul className="space-y-2.5">
                      {headings.map((h) => (
                        <li key={h.id}>
                          <a
                            href={`#${h.id}`}
                            className="group flex items-start gap-2 text-sm leading-snug text-ink/70 transition hover:text-brand-dark"
                          >
                            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand/50 transition group-hover:bg-brand-dark" />
                            {h.text}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </nav>
                </div>
              )}

              <div className="rounded-2xl border border-line bg-gradient-to-br from-brand-deep/10 to-brand/10 p-6">
                <h3 className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-ink">
                  <ShieldCheck className="h-4 w-4 text-brand-dark" /> Why Virtual Nexgen
                </h3>
                <ul className="mt-4 space-y-3 text-sm leading-relaxed text-ink/75">
                  <li className="flex gap-2">
                    <span className="mt-1 text-emerald-500">•</span>
                    Dedicated virtual assistants trained for your industry workflow
                  </li>
                  <li className="flex gap-2">
                    <span className="mt-1 text-emerald-500">•</span>
                    Flexible scheduling aligned with U.S. time zones
                  </li>
                  <li className="flex gap-2">
                    <span className="mt-1 text-emerald-500">•</span>
                    Fast onboarding — extra support within days
                  </li>
                  <li className="flex gap-2">
                    <span className="mt-1 text-emerald-500">•</span>
                    AI automation to cut repetitive admin work
                  </li>
                </ul>
              </div>

              <div className="overflow-hidden rounded-2xl bg-ink text-white shadow-[0_16px_48px_rgba(0,0,0,0.25)]">
                <div className="p-6">
                  <h3 className="text-xs font-extrabold uppercase tracking-widest text-white/60">
                    Need Support Like This?
                  </h3>
                  <p className="mt-3 text-sm font-medium leading-relaxed text-white/90">
                    Let a Virtual Nexgen assistant handle your back-office workload so your team stays focused on the job.
                  </p>
                  <a
                    href="/book-consultation"
                    className="mt-5 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-brand-deep to-brand px-5 py-2.5 text-sm font-semibold text-ink transition hover:shadow-[0_8px_24px_rgba(164,189,188,0.4)]"
                  >
                    <CalendarCheck className="h-4 w-4" /> Book a Free Call
                  </a>
                  <a
                    href="tel:+13418886504"
                    className="mt-3 flex items-center gap-2 text-sm font-semibold text-white/80 transition hover:text-white"
                  >
                    <Phone className="h-4 w-4" /> +1 341 888 6504
                  </a>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* Related Articles */}
      {related.length > 0 && (
        <section className="border-t border-line bg-cream/30">
          <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
            <h2 className="mb-8 text-2xl font-extrabold text-ink sm:text-3xl">
              Related Articles
            </h2>
            <div className="grid gap-8 md:grid-cols-2">
              {related.map((p) => (
                <Link
                  key={p.id}
                  href={`/blog/${p.slug}`}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-[0_4px_24px_rgba(0,0,0,0.06)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_16px_48px_rgba(164,189,188,0.12)]"
                >
                  <div className="relative aspect-[16/9] w-full shrink-0 overflow-hidden">
                    {p.image ? (
                      <img
                        src={p.image}
                        alt={p.title}
                        loading="lazy"
                        className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <div className="grid h-full w-full place-items-center bg-gradient-to-br from-brand-deep/15 to-brand/15">
                        <span className="text-4xl font-extrabold text-brand/20">
                          {p.title.charAt(0)}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <div className="flex items-center gap-3">
                      <span className="rounded-full bg-brand/10 px-3 py-1 text-xs font-bold text-brand-dark">
                        {p.tags?.[0] ?? "General"}
                      </span>
                      <span className="text-xs text-ink/40">
                        {formatDate(p.date)}
                      </span>
                    </div>
                    <h3 className="mt-3 line-clamp-2 text-lg font-extrabold leading-snug text-ink transition group-hover:text-brand-dark">
                      {p.title}
                    </h3>
                    <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-ink/60">
                      {p.excerpt}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-dark transition group-hover:gap-2.5">
                      Read More <ChevronRight className="h-4 w-4" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
