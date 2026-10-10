import sanitizeHtml from "sanitize-html";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowUpRight,
  CheckCircle2,
  PhoneCall,
  Clock,
  Shield,
  Users,
  TrendingUp,
  Zap,
  Award,
  FolderOpen,
  ChevronDown,
  List,
} from "lucide-react";
import TestimonialsMarquee from "../TestimonialsMarquee";
import { getService, getServices } from "@/lib/services";
import {
  clientLogos as defaultClientLogos,
  defaultBenefits,
  defaultSteps,
  defaultTestimonials,
  defaultTrustBadges,
  folderHints,
  problemCards,
  problemPoints,
  relatedTitle,
} from "@/lib/service-defaults";
import Reveal from "@/components/Reveal";
import InfiniteSpiral from "@/components/InfiniteSpiral";
import ChapterFolder from "@/components/ChapterFolder";
import ClientLogos from "@/components/ClientLogos";
import FAQ9 from "@/components/FAQ9";

const RICH_HTML_STYLES = [
  "h2", "h3", "h4", "p", "strong", "em", "a", "ul", "ol", "li", "blockquote",
  "hr", "code", "pre", "table", "thead", "tbody", "tr", "th", "td", "br", "span",
  "img", "u", "s", "div", "b", "i"
];

const SANITIZE_OPTIONS: sanitizeHtml.IOptions = {
  allowedTags: RICH_HTML_STYLES,
  allowedAttributes: {
    a: ["href", "target", "rel"],
    img: ["src", "alt", "title", "style", "width", "height"],
    td: ["colspan", "rowspan"],
    th: ["colspan", "rowspan"],
    div: ["class", "style"],
    span: ["class", "style"],
    p: ["class", "style"],
    h2: ["class", "style"],
    h3: ["class", "style"],
    h4: ["class", "style"],
    ul: ["class", "style"],
    ol: ["class", "style"],
    li: ["class", "style"],
    strong: ["class", "style"],
    em: ["class", "style"],
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
    img: (tagName, attribs) => ({
      tagName,
      attribs: {
        src: attribs.src,
        alt: attribs.alt || "",
        title: attribs.title,
        style: attribs.style,
        width: attribs.width,
        height: attribs.height,
      },
    }),
  },
};

const RICH_CONTENT_CLASSES =
  "rich-content [&_h2]:mt-10 [&_h2]:mb-4 [&_h2]:text-2xl [&_h2]:font-extrabold [&_h2]:leading-tight [&_h2]:text-ink sm:[&_h2]:text-3xl [&_h3]:mt-8 [&_h3]:mb-3 [&_h3]:text-xl [&_h3]:font-extrabold [&_h3]:text-ink [&_h4]:mt-6 [&_h4]:mb-2 [&_h4]:text-lg [&_h4]:font-bold [&_h4]:text-ink [&_p]:my-5 [&_p]:text-base [&_p]:leading-relaxed [&_p]:text-ink/70 sm:[&_p]:text-lg [&_strong]:font-bold [&_strong]:text-ink [&_em]:italic [&_u]:underline [&_a]:font-semibold [&_a]:text-brand-dark [&_a]:underline [&_a]:decoration-brand/40 [&_a]:underline-offset-4 [&_ul]:my-5 [&_ul]:space-y-2.5 [&_ul]:pl-5 [&_ul]:text-base [&_ul]:leading-relaxed [&_ul]:text-ink/70 sm:[&_ul]:text-lg [&_ol]:my-5 [&_ol]:space-y-2.5 [&_ol]:pl-5 [&_ol]:text-base [&_ol]:leading-relaxed [&_ol]:text-ink/70 sm:[&_ol]:text-lg [&_li]:marker:text-brand-dark [&_blockquote]:my-6 [&_blockquote]:border-l-4 [&_blockquote]:border-brand [&_blockquote]:pl-5 [&_blockquote]:text-lg [&_blockquote]:font-medium [&_blockquote]:italic [&_blockquote]:text-ink/80 [&_hr]:my-8 [&_hr]:border-line [&_code]:rounded [&_code]:bg-brand/10 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:text-sm [&_code]:font-semibold [&_code]:text-brand-deep [&_table]:my-6 [&_table]:w-full [&_table]:border-collapse [&_table]:text-left [&_table]:text-sm [&_table]:text-ink/70 [&_th]:border [&_th]:border-line [&_th]:bg-cream [&_th]:px-3 [&_th]:py-2 [&_th]:font-bold [&_th]:text-ink [&_td]:border [&_td]:border-line [&_td]:px-3 [&_td]:py-2 [&_img]:h-auto [&_img]:w-full [&_img]:rounded-2xl [&_img]:mt-4 [&_img]:mb-6 [&_b]:font-bold [&_i]:italic [&_div]:my-2 [&_span]:inline";

const DARK_WHITE_OVERRIDES =
  "[&_h2]:text-[#02024E]! [&_h3]:text-[#02024E]! [&_h4]:text-[#02024E]! [&_p]:text-[#02024E]/80! [&_strong]:text-[#02024E]! [&_em]:text-[#02024E]! [&_b]:text-[#02024E]! [&_i]:text-[#02024E]! [&_a]:text-[#02024E]! [&_a]:decoration-[#02024E]/40! [&_ul]:text-[#02024E]/80! [&_ol]:text-[#02024E]/80! [&_li]:text-[#02024E]/80! [&_li]:marker:text-[#02024E]/60! [&_blockquote]:text-[#02024E]/85! [&_blockquote]:border-[#01012F]/15! [&_code]:bg-[#02024E]/10! [&_code]:text-[#02024E]! [&_table]:text-[#02024E]/80! [&_th]:bg-[#02024E]/10! [&_th]:text-[#02024E]! [&_th]:border-[#01012F]/15! [&_td]:text-[#02024E]/80! [&_td]:border-[#01012F]/15! [&_hr]:border-[#01012F]/15!";

const WHITE_OVERRIDES_ON_DARK =
  "[&_h2]:text-white! [&_h3]:text-white! [&_h4]:text-white! [&_p]:text-white/80! [&_strong]:text-white! [&_em]:text-white! [&_b]:text-white! [&_i]:text-white! [&_a]:text-white! [&_a]:decoration-white/40! [&_ul]:text-white/80! [&_ol]:text-white/80! [&_li]:text-white/80! [&_li]:marker:text-white/60! [&_blockquote]:text-white/85! [&_blockquote]:border-white/30! [&_code]:bg-white/10! [&_code]:text-white! [&_table]:text-white/80! [&_th]:bg-white/10! [&_th]:text-white! [&_th]:border-white/20! [&_td]:text-white/80! [&_td]:border-white/20! [&_hr]:border-white/15!";

type FullContentCard = {
  headingTag: "h2" | "h3" | "h4" | null;
  heading: string | null;
  body: string;
};

function splitFullContentCards(html: string): FullContentCard[] {
  const cards: FullContentCard[] = [];
  const re = /<h([234])(?:\s[^>]*)?>([\s\S]*?)<\/h\1>/g;
  let match: RegExpExecArray | null;
  let cursor = 0;
  let current: FullContentCard | null = null;

  while ((match = re.exec(html)) !== null) {
    const leading = html.slice(cursor, match.index);
    if (current) {
      current.body += leading;
    } else if (leading.trim()) {
      cards.push({ headingTag: null, heading: null, body: leading });
    }
    current = {
      headingTag: `h${match[1]}` as FullContentCard["headingTag"],
      heading: match[2],
      body: "",
    };
    cards.push(current);
    cursor = re.lastIndex;
  }

  const trailing = html.slice(cursor);
  if (current) current.body += trailing;
  else if (trailing.trim()) cards.push({ headingTag: null, heading: null, body: trailing });

  return cards;
}

function isGridCard(card: FullContentCard): boolean {
  if (card.headingTag === "h4") return false;
  if (!card.heading) return false;
  const text = card.heading.replace(/<[^>]*>/g, "").trim();
  return /^\d{1,2}\.\s/.test(text);
}

function isFaqHeadingCard(card: FullContentCard): boolean {
  if (!card.heading) return false;
  const text = card.heading.replace(/<[^>]*>/g, "").trim();
  return /faq|frequently asked/i.test(text);
}

function FullContentCards({ html }: { html: string }) {
  const safe = sanitizeHtml(html, SANITIZE_OPTIONS);
  const cards = splitFullContentCards(safe);
  if (cards.length === 0) return null;

  function renderHeading(card: FullContentCard) {
    if (!card.heading) return null;
    const heading = card.heading.replace(/<strong>(.*?)<\/strong>/g, "$1");
    const cls = "text-lg font-extrabold text-[#02024E]";
    if (card.headingTag === "h2") {
      return (
        <h2
          className={`${cls} text-xl sm:text-2xl`}
          dangerouslySetInnerHTML={{ __html: heading }}
        />
      );
    }
    if (card.headingTag === "h4") {
      return (
        <h4 className={cls} dangerouslySetInnerHTML={{ __html: heading }} />
      );
    }
    return (
      <h3
        className={cls}
        dangerouslySetInnerHTML={{ __html: heading }}
      />
    );
  }

  function cardNumber(card: FullContentCard): string | null {
    const text = (card.heading || "").replace(/<[^>]*>/g, "").trim();
    const m = text.match(/^(\d{1,2})\.\s*/);
    return m ? m[1] : null;
  }

  function isWhyChooseImageCard(card: FullContentCard): boolean {
    const text = (card.heading || "").replace(/<[^>]*>/g, "").toLowerCase();
    return text.includes("why choose") && /\<img/i.test(card.body);
  }

  function renderIntroCard(card: FullContentCard, flip: boolean) {
    const images = card.body.match(/<img[^>]*>/gi) || [];
    const textBody = card.body.replace(/<img[^>]*>/gi, "");
    return (
      <article className="group overflow-hidden rounded-3xl border border-[#01012F]/10 bg-white backdrop-blur-sm">
        <div className={`grid lg:grid-cols-2 ${flip ? "lg:[direction:rtl]" : ""}`}>
          <div className="p-8 sm:p-10 lg:[direction:ltr]">
            <span className="inline-flex h-2.5 w-2.5 rounded-full bg-brand shadow-[0_0_0_5px_rgba(6,182,212,0.15)]" />
            {renderHeading(card)}
            <div
              className={`${RICH_CONTENT_CLASSES} mt-2 [&_h2]:mt-4 ${DARK_WHITE_OVERRIDES}`}
              dangerouslySetInnerHTML={{ __html: textBody }}
            />
          </div>
          <div className="relative min-h-[220px] bg-gradient-to-br from-brand-deep/20 via-brand/10 to-white/5">
            {images.length > 0 ? (
              <div className="grid h-full grid-cols-1 gap-3 p-6 sm:grid-cols-2 sm:p-8">
                {images.map((tag) => {
                  const src = (tag.match(/src="([^"]*)"/) || [])[1] || "";
                  return (
                    <img
                      key={src}
                      src={src}
                      alt=""
                      loading="lazy"
                      className="h-full w-full rounded-2xl border border-[#01012F]/15 object-cover shadow-[0_10px_30px_rgba(0,0,0,0.12)] transition duration-500 group-hover:scale-[1.02]"
                    />
                  );
                })}
              </div>
            ) : (
              <div className="flex h-full items-center justify-center">
                <div className="flex h-28 w-28 rounded-full bg-gradient-to-br from-brand to-brand-deep shadow-[0_18px_44px_rgba(6,182,212,0.35)]">
                  <FolderOpen className="m-auto h-12 w-12 text-white" />
                </div>
              </div>
            )}
          </div>
        </div>
      </article>
    );
  }

  function indexFromCard(card: FullContentCard): string {
    const text = (card.heading || "").replace(/<[^>]*>/g, "").trim();
    const m = text.match(/^(\d{1,2})\.\s*/);
    return m ? m[1].padStart(2, "0") : "";
  }

  function renderNumberedCard(card: FullContentCard) {
    const images = card.body.match(/<img[^>]*>/gi) || [];
    const textBody = card.body.replace(/<img[^>]*>/gi, "");
    const heading = (card.heading || "").replace(/<[^>]*>/g, "").trim();
    const label = heading.replace(/^\d{1,2}\.\s*/, "") || card.heading || "";
    return (
      <article className="relative overflow-hidden rounded-3xl border border-[#01012F]/10 bg-white p-7 backdrop-blur-sm transition duration-300 hover:border-brand/50 sm:p-9">
        <span className="pointer-events-none absolute -right-6 -top-8 text-[7rem] font-extrabold leading-none text-brand/10">
          {indexFromCard(card)}
        </span>
        <div className="relative grid gap-7 lg:grid-cols-[1fr_320px] lg:items-start">
          <div className="min-w-0">
            <div className="flex items-start gap-4">
              <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-brand to-brand-deep text-sm font-extrabold text-white shadow-[0_8px_20px_rgba(6,182,212,0.3)]">
                {indexFromCard(card)}
              </span>
              <div className="pt-1">
                <h4 className="text-lg font-extrabold leading-snug text-[#02024E]">
                  {label}
                </h4>
              </div>
            </div>
            <div
              className={`${RICH_CONTENT_CLASSES} mt-4 ${DARK_WHITE_OVERRIDES}`}
              dangerouslySetInnerHTML={{ __html: textBody }}
            />
          </div>
          {images.length > 0 && (
            <div className="flex flex-col gap-4">
              {images.map((tag, idx) => {
                const src = (tag.match(/src="([^"]*)"/) || [])[1] || "";
                return (
                  <img
                    key={idx}
                    src={src}
                    alt=""
                    loading="lazy"
                    className="h-auto w-full rounded-2xl border border-line object-cover"
                  />
                );
              })}
            </div>
          )}
        </div>
        <span className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-brand via-brand-accent to-brand-deep" />
      </article>
    );
  }

  function renderWideCard(card: FullContentCard, faqMode = false) {
    const images = card.body.match(/<img[^>]*>/gi) || [];
    let textBody = card.body.replace(/<img[^>]*>/gi, "");
    if (faqMode) {
      textBody = textBody
        .replace(/<i\b[^>]*>\s*<\/i>/gi, "")
        .replace(/<a\b[^>]*>([\s\S]*?)<\/a>/gi, "<strong>$1</strong>")
        .replace(
          /<h2\b[^>]*>([\s\S]*?)<\/h2>/gi,
          (all, inner: string) =>
            /faq|frequently asked/i.test(inner.replace(/<[^>]*>/g, ""))
              ? ""
              : all,
        )
        .replace(/<p\b[^>]*>\s*<\/p>/gi, "");
    }
    const extra = images.map((tag, idx) => {
      const src = (tag.match(/src="([^"]*)"/) || [])[1] || "";
      return (
        <img key={idx} src={src} alt="" loading="lazy" className="rounded-xl" />
      );
    });
    return (
      <article className="rounded-3xl border border-[#01012F]/10 bg-white p-6 backdrop-blur-sm sm:p-10">
        <div className="flex items-center gap-3">
          <span className="inline-block h-2 w-2 rounded-full bg-brand" />
          {renderHeading(card)}
        </div>
        <div
          className={`${RICH_CONTENT_CLASSES} [&_img]:mx-auto [&_img]:max-w-2xl ${DARK_WHITE_OVERRIDES} ${faqMode ? "sm:columns-2 sm:[column-gap:3rem]" : ""}`}
          dangerouslySetInnerHTML={{ __html: textBody }}
        />
        {extra.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-4">{extra}</div>
        )}
      </article>
    );
  }

  function renderFaqCard(card: FullContentCard, index: number) {
    const question = (card.heading || "").replace(
      /<[^>]*>/g,
      "",
    ).trim();
    return (
      <div id={`faq-${index}`} className="border-b border-[#01012F]/15 py-5 last:border-0 last:pb-2 first:pt-0">
        <div className="flex items-start gap-4">
          <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand/10">
            <ChevronDown className="h-3.5 w-3.5 text-brand" />
          </span>
          <div className="min-w-0">
            <h4 className="text-base font-extrabold leading-snug text-[#02024E]">
              {question}
            </h4>
            <div
              className={`${RICH_CONTENT_CLASSES} mt-2 [&_p]:my-2 [&_ul]:my-2 [&_h2]:mt-4 ${DARK_WHITE_OVERRIDES}`}
              dangerouslySetInnerHTML={{ __html: card.body }}
            />
          </div>
        </div>
      </div>
    );
  }

  const introCards = cards.slice(0, 2);
  const restCards = cards.slice(2);
  const faqHeadingCard = restCards.find(isFaqHeadingCard);
  const faqCards = cards.filter((card) => card.headingTag === "h4");
  const nonFaqCards = restCards.filter((card) => card !== faqHeadingCard);
  const numberedCards = nonFaqCards.filter(isGridCard);
  const wideCards = nonFaqCards.filter((card) => !isGridCard(card));
  const featuredImageCards = nonFaqCards.filter(isWhyChooseImageCard);

  return (
    <div className="mt-12 flex flex-col gap-12">
      {introCards.length > 0 && (
        <div className="space-y-8">
          {introCards.map((card, i) => (
            <Reveal key={i}>{renderIntroCard(card, i % 2 === 1)}</Reveal>
          ))}
        </div>
      )}

      {featuredImageCards.length > 0 && (
        <div className="overflow-hidden rounded-3xl border border-white/20 bg-gradient-to-br from-brand-dark to-brand-deep p-8 text-white sm:p-12">
          {featuredImageCards.map((card, i) => {
            const images = card.body.match(/<img[^>]*>/gi) || [];
            const textBody = card.body.replace(/<img[^>]*>/gi, "");
            return (
              <div
                key={i}
                className="grid items-center gap-8 lg:grid-cols-[minmax(0,1fr)_340px]"
              >
                <div>
                  <span className="inline-block rounded-full bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">
                    {cardNumber(card) ? `0${cardNumber(card)}. ` : ""}
                    {(card.heading || "").replace(/<[^>]*>/g, "")}
                  </span>
                  <div
                    className={`${RICH_CONTENT_CLASSES} mt-4 ${WHITE_OVERRIDES_ON_DARK}`}
                    dangerouslySetInnerHTML={{ __html: textBody }}
                  />
                </div>
                <div className="flex flex-col gap-4">
                  {images.map((tag, idx) => {
                    const src = (tag.match(/src="([^"]*)"/) || [])[1] || "";
                    return (
                      <img
                        key={idx}
                        src={src}
                        alt=""
                        loading="lazy"
                        className="h-auto w-full rounded-2xl border border-white/20 object-cover"
                      />
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {numberedCards.length > 0 && (
        <div className="grid gap-6 lg:grid-cols-2">
          {[
            numberedCards.slice(0, Math.ceil(numberedCards.length / 2)),
            numberedCards.slice(Math.ceil(numberedCards.length / 2)),
          ].map((column, colIdx) => (
            <div
              key={colIdx}
              className={`flex flex-col gap-6 ${colIdx === 1 ? "lg:mt-20" : ""}`}
            >
              {column.map((card, i) => (
                <Reveal key={i} delay={(i % 3) * 0.08}>
                  {renderNumberedCard(card)}
                </Reveal>
              ))}
            </div>
          ))}
        </div>
      )}

      {wideCards.length > 0 && (
        <div className="grid gap-6 lg:grid-cols-2">
          {wideCards.map((card, i) => (
            <Reveal key={i} delay={(i % 3) * 0.08}>
              {renderWideCard(card)}
            </Reveal>
          ))}
        </div>
      )}

      {faqCards.length > 0 && (
        <div className="scroll-mt-24">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px]">
            {/* Left Column: FAQ Answers */}
            <div className="min-w-0 max-w-4xl">
              <div className="rounded-[2rem] border border-[#01012F]/10 bg-white px-6 py-8 backdrop-blur-sm sm:px-10 sm:py-10">
                <div className="flex items-center gap-3">
                  <span className="inline-block h-2 w-2 rounded-full bg-brand" />
                  {faqHeadingCard ? (
                    renderHeading(faqHeadingCard)
                  ) : (
                    <h3 className="text-lg font-extrabold text-[#02024E] sm:text-xl">
                      Frequently Asked Questions
                    </h3>
                  )}
                </div>
                <div className="mt-6 space-y-4">
                  {faqCards.map((card, i) => (
                    <Reveal key={i} delay={(i % 3) * 0.05}>
                      {renderFaqCard(card, i)}
                    </Reveal>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Sidebar: FAQ Questions (Sticky) */}
            <aside className="hidden lg:block">
              <div className="sticky top-32">
                <div className="rounded-2xl border border-[#01012F]/10 bg-white p-6">
                  <h3 className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-[#02024E]">
                    <List className="h-4 w-4 text-[#12B4CF]" /> On This Page
                  </h3>
                  <nav className="mt-4">
                    <ul className="space-y-2.5">
                      {faqCards.map((card, i) => {
                        const question = (card.heading || "").replace(/<[^>]*>/g, "").trim();
                        return (
                          <li key={i}>
                            <a
                              href={`#faq-${i}`}
                              className="group flex items-start gap-2 text-sm leading-snug text-[#02024E]/70 transition hover:text-[#02024E]"
                            >
                              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#12B4CF]/50 transition group-hover:bg-[#12B4CF]" />
                              {question}
                            </a>
                          </li>
                        );
                      })}
                    </ul>
                  </nav>
                </div>
              </div>
            </aside>
          </div>
        </div>
      )}

      {faqHeadingCard && faqCards.length === 0 && (
        <Reveal>{renderWideCard(faqHeadingCard, true)}</Reveal>
      )}
    </div>
  );
}

export const dynamic = "force-dynamic";

const ICONS: Record<string, typeof Zap> = {
  Zap,
  Shield,
  TrendingUp,
  Users,
  Clock,
  Award,
};

function textOr(value: string | undefined, fallback: string): string {
  const trimmed = (value ?? "").trim();
  return trimmed || fallback;
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = await getService(slug);
  if (!service) notFound();

  const allServices = await getServices();
  const related = allServices
    .filter((s) => s.slug !== slug)
    .slice(0, 3);

  const ctaPoints = service.ctaPoints?.length
    ? service.ctaPoints
    : [
        "Dedicated team or pay-as-you-go",
        "Onboarding within days",
        "No long-term lock-in",
        "Data & compliance aware",
      ];

  const benefits = service.benefits?.length ? service.benefits : defaultBenefits;
  const steps = service.steps?.length ? service.steps : defaultSteps;
  const testimonials = service.testimonials?.length
    ? service.testimonials
    : defaultTestimonials;
  const serviceFaqs = service.faqs?.filter((faq) => faq.q?.trim()) ?? [];

  const trustBadges = (
    service.trustBadges?.length ? service.trustBadges : defaultTrustBadges
  ).map((badge) => ({
    icon: ICONS[badge.icon] ?? Award,
    label: badge.label,
  }));

  const problemPointsList =
    service.problem?.points?.length ? service.problem.points : problemPoints;
  const problemCardsList =
    service.problem?.cards?.length ? service.problem.cards : problemCards;

  const logosSection = service.logosSection;
  const logoItems = logosSection?.logos?.length
    ? logosSection.logos.filter((logo) => logo.name || logo.src)
    : defaultClientLogos;
  const logoCenter = logosSection?.centerText?.trim() || "AMS\nExperts";

  const heroPrimaryUrl =
    service.heroButtons?.primaryUrl?.trim() || "https://calendly.com/virtualnexgen-info/30min";
  const heroPrimaryLabel =
    service.heroButtons?.primaryLabel?.trim() || "Book Your Demo";
  const heroSecondaryLabel =
    service.heroButtons?.secondaryLabel?.trim() || "Learn More";
  const ctaUrl = service.ctaUrl?.trim() || heroPrimaryUrl;
  const relatedHeading = service.relatedTitle?.trim() || relatedTitle;

  const authoredCarousel = service.carouselImages?.filter(Boolean) ?? [];
  const sourceSpiralImages = Array.from(
    new Set(
      authoredCarousel.length > 0
        ? authoredCarousel
        : [
            ...(service.fullContent?.images ?? []),
            service.fullContent?.image,
            service.image,
          ].filter((src): src is string => Boolean(src)),
    ),
  );
  const spiralImages = [...sourceSpiralImages];
  const repeatableImages = sourceSpiralImages.slice(1);
  while (repeatableImages.length > 0 && spiralImages.length < 7) {
    const repeatIndex = (spiralImages.length - sourceSpiralImages.length) % repeatableImages.length;
    spiralImages.push(repeatableImages[repeatIndex]);
  }

  const contentHtml = service.fullContent?.contentHtml || "";
  const folderPopItems = service.fullContent?.folderPopItems?.length
    ? service.fullContent.folderPopItems
    : [];
  const folderItems = folderPopItems.length
    ? folderPopItems
    : (service.fullContent?.headings?.length
        ? service.fullContent.headings
        : (service.content?.slice(0, 6) ?? []));

  return (
    <main className="min-h-screen bg-[#fffaf3]">
      {/* Hero */}
      <section className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid items-center gap-12 py-12 lg:grid-cols-2 lg:py-14">
          <Reveal>
            <div>
              <span className="inline-block rounded-full bg-[#12B4CF]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#02024E]">
                {service.eyebrow || service.name}
              </span>
              <h1 className="mt-6 text-4xl font-extrabold leading-[1.1] tracking-tight text-[#02024E] sm:text-5xl">
                {service.name}
              </h1>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-[#02024E]/80 sm:text-lg">
                {service.short}
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href={heroPrimaryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-brand-deep to-brand px-7 py-3.5 text-sm font-semibold text-white transition"
                >
                  {heroPrimaryLabel}
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
                <a
                  href="#get-started"
                  className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-7 py-3.5 text-sm font-semibold text-ink/80 transition hover:border-brand hover:text-brand-dark"
                >
                  {heroSecondaryLabel}
                </a>
              </div>
            </div>
          </Reveal>

          {/* Auto-Moving Gallery */}
          <Reveal delay={0.15}>
            <div className="relative h-[420px] sm:h-[520px]">
              <InfiniteSpiral
                items={spiralImages}
                animationMode="all"
                speed={0.6}
                radius={190}
                cardWidth={220}
                cardHeight={160}
                verticalSpacing={64}
                cardsPerTurn={7}
                cardRadius={14}
                edgeFade={0.32}
                edgeBlur={4}
                imageFit="cover"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Trust Badges Marquee */}
      <section className="border-y border-[#01012F]/10 bg-[#fffaf3] py-6 overflow-hidden">
        <div className="flex gap-8 animate-[marquee-x_25s_linear_infinite] whitespace-nowrap">
          {[...trustBadges, ...trustBadges].map((b, i) => (
            <div key={i} className="flex items-center gap-2.5 shrink-0">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand/10">
                <b.icon className="h-4 w-4 text-brand" />
              </div>
              <span className="text-sm font-semibold text-[#02024E]/75">
                {b.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Problem Section */}
      <section className="mx-auto max-w-7xl px-5 py-14 sm:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <div>
              <span className="inline-block rounded-full bg-[#12B4CF]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#02024E]">
                {textOr(service.problem?.eyebrow, "The Problem")}
              </span>
              <h2 className="mt-6 text-3xl font-extrabold leading-tight text-[#02024E] sm:text-4xl">
                {textOr(
                  service.problem?.heading,
                  "Most Businesses Aren't Struggling to Grow —",
                )}
                {service.problem?.highlight?.trim() || service.problem?.heading?.trim() ? null : (
                  <span className="text-brand">
                    {" "}
                    They&rsquo;re Buried in Operations
                  </span>
                )}
              </h2>
              <p className="mt-5 text-base leading-relaxed text-[#02024E]/65">
                {textOr(
                  service.problem?.text,
                  "Repetitive tasks quietly consume the time your team should spend growing the business.",
                )}
              </p>
              <div className="mt-8 space-y-4">
                {problemPointsList.map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-brand" />
                    <span className="text-sm text-[#02024E]/70">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="grid grid-cols-2 gap-4">
              {problemCardsList.map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-[#01012F]/10 bg-white p-5 backdrop-blur-sm"
                >
                  <h4 className="text-sm font-bold text-[#02024E]">{item.title}</h4>
                  <p className="mt-2 text-xs leading-relaxed text-[#02024E]/60">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Benefits */}
      <section className="bg-cream/30 py-14">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal>
            <div className="text-center">
              <span className="inline-block rounded-full bg-[#12B4CF]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#02024E]">
                {textOr(service.benefitsSection?.eyebrow, "Why Choose Us")}
              </span>
              <h2 className="mt-6 text-3xl font-extrabold tracking-tight text-[#02024E] sm:text-4xl">
                {textOr(service.benefitsSection?.heading, "Built for")}
                <span className="text-brand">
                  {" "}
                  {textOr(service.benefitsSection?.highlight, "Your Industry")}
                </span>
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-base text-[#02024E]/60">
                {textOr(
                  service.benefitsSection?.text,
                  "Specialised support that plugs directly into your workflow, from day one.",
                )}
              </p>
            </div>
          </Reveal>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map((item, i) => {
              const Icon = ICONS[item.icon] || Zap;
              return (
                <Reveal key={i} delay={i * 0.08}>
                  <div className="group rounded-2xl border border-[#01012F]/10 bg-white p-7 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand/50 hover:shadow-[0_12px_40px_rgba(6,182,212,0.15)]">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand/10 transition-colors group-hover:bg-brand/20">
                      <Icon className="h-5 w-5 text-brand" />
                    </div>
                    <h3 className="mt-5 text-lg font-extrabold text-[#02024E]">
                      {item.title}
                    </h3>
                    <p className="mt-2.5 text-sm leading-relaxed text-[#02024E]/60">
                      {item.desc}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Interactive Chapter Folder */}
      {folderItems.length > 0 && (
        <section
          className="relative overflow-hidden py-10 sm:py-16 bg-[#fffaf3]"
        >
          <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
            <Reveal>
              <div className="text-center">
                 <span className="inline-block rounded-full bg-[#12B4CF]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-brand-accent-light">
                   {textOr(service.folderSection?.eyebrow, "INSURANCE VA PLAYBOOK")}
                 </span>
                 <h2 className="mt-6 text-3xl font-extrabold tracking-tight text-[#02024E] sm:text-4xl">
                   {textOr(
                      service.folderSection?.heading,
                      `${folderItems.length} Essential Tasks an`,
                    )}
                    <span className="text-brand-accent">
                      {" "}
                      {textOr(service.folderSection?.highlight, service.name)}
                    </span>
                    {service.folderSection?.highlight?.trim() ? null : (
                      <span> Can Handle</span>
                    )}
                  </h2>
                  <p className="mx-auto mt-3 max-w-2xl text-sm text-[#02024E]/65 sm:text-base">
                    {textOr(
                      service.folderSection?.text,
                      service.slug === "insurance-virtual-assistants"
                        ? "Explore how an insurance virtual assistant can streamline daily operations, improve client communication, and help your agency save time while staying organized and efficient."
                        : "Tap any folder to explore the exact workflows our virtual assistants take off your plate.",
                    )}
                  </p>
              </div>
            </Reveal>

            <div className="relative mt-4 flex justify-center overflow-x-clip">
              <ChapterFolder
                items={folderItems}
                label={service.name}
              />
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-sm">
              {folderHints.map((hint) => (
                <span
                  key={hint}
                  className="inline-flex items-center gap-2 rounded-full border border-[#01012F]/15 bg-white px-4 py-2 font-semibold text-[#02024E]/75 backdrop-blur"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-brand-accent" />
                  {hint}
                </span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Client Logos */}
      <ClientLogos
        logos={logoItems}
        eyebrow={logosSection?.eyebrow}
        heading={logosSection?.heading}
        highlight={logosSection?.highlight}
        centerText={logoCenter}
      />

      {/* How It Works */}
      <section className="bg-cream/30 py-14">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal>
            <div className="text-center">
              <span className="inline-block rounded-full bg-[#12B4CF]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#02024E]">
                {textOr(service.stepsSection?.eyebrow, "How It Works")}
              </span>
              <h2 className="mt-6 text-3xl font-extrabold tracking-tight text-[#02024E] sm:text-4xl">
                {textOr(service.stepsSection?.heading, "Get Started in")}
                {service.stepsSection?.highlight ? (
                  <span className="text-brand"> {service.stepsSection.highlight}</span>
                ) : (
                  <span className="text-brand"> {steps.length} Simple Steps</span>
                )}
              </h2>
              {service.stepsSection?.text?.trim() && (
                <p className="mx-auto mt-4 max-w-2xl text-base text-[#02024E]/60">
                  {service.stepsSection.text}
                </p>
              )}
            </div>
          </Reveal>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="rounded-2xl border border-[#01012F]/10 bg-white p-6 text-center backdrop-blur-sm">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-brand/10 text-lg font-extrabold text-brand">
                    {step.num}
                  </div>
                  <h4 className="mt-4 text-base font-extrabold text-[#02024E]">
                    {step.title}
                  </h4>
                  <p className="mt-2 text-sm leading-relaxed text-[#02024E]/60">
                    {step.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

<TestimonialsMarquee
        testimonials={testimonials}
        eyebrow={service.testimonialsSection?.eyebrow}
        heading={service.testimonialsSection?.heading}
        highlight={service.testimonialsSection?.highlight}
        text={service.testimonialsSection?.text}
      />

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-5 pb-14 sm:px-8">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] mt-20 border border-line bg-gradient-to-br from-brand-dark to-brand-deep p-8 sm:p-14">
            <div className="relative" >
              <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                {service.ctaTitle ||
                  `Ready to get started with ${service.name}?`}
              </h2>
              <p className="mt-[20px] max-w-2xl text-base leading-relaxed text-white/70">
                {service.ctaText ||
                  "Talk to our team and get a tailored plan for your business — no obligation, just a clear roadmap for how we can help."}
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href={ctaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-brand to-brand-deep px-7 py-3.5 text-sm font-bold text-white transition hover:brightness-110"
                >
                  {service.ctaButton || "Book a Free Consultation"}
                  <ArrowUpRight className="h-4 w-4" />
                </a>
                <a
                  href={`tel:${(service.ctaPhone || "+1 341 888 6504").replace(/[^+\d]/g, "")}`}
                  className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-white/20"
                >
                  <PhoneCall className="h-4 w-4" />
                  {service.ctaPhone || "+1 341 888 6504"}
                </a>
              </div>

              <div className="mt-8 grid gap-3 text-sm text-white/70 sm:grid-cols-2">
                {ctaPoints.map((point) => (
                  <div key={point} className="flex items-center gap-2.5">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-brand-accent" />
                    {point}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* FAQ */}
      <FAQ9
        faqs={serviceFaqs.map((faq) => ({
          question: faq.q,
          answer: faq.a,
        }))}
        eyebrow={service.faqSection?.eyebrow?.trim() || undefined}
        heading={service.faqSection?.heading?.trim() || undefined}
        text={service.faqSection?.text?.trim() || undefined}
      />

      {/* Related Services */}
      {related.length > 0 && (
        <section className="border-t border-[#01012F]/10 bg-[#fffaf3] py-14">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <Reveal>
              <div className="rounded-[2rem] border border-[#01012F]/15 bg-white p-6 backdrop-blur-sm sm:p-10">
                <h2 className="text-2xl font-extrabold text-[#02024E] sm:text-3xl">
                  {relatedHeading}
                </h2>
                <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {related.map((s, i) => (
                    <Reveal key={s.slug} delay={i * 0.1}>
                      <Link
                        href={`/services/${s.slug}`}
                        className="group block overflow-hidden rounded-2xl border border-[#01012F]/10 bg-white backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand/50"
                      >
                        {s.image && (
                          <div className="relative aspect-[16/9] overflow-hidden">
                            <img
                              src={s.image}
                              alt={s.name}
                              className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                            />
                          </div>
                        )}
                        <div className="p-6">
                          <h3 className="text-lg font-extrabold text-[#02024E] transition group-hover:text-brand-accent">
                            {s.name}
                          </h3>
                          <p className="mt-2 line-clamp-2 text-sm text-[#02024E]/60">
                            {s.short}
                          </p>
                          <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-accent transition group-hover:gap-2.5">
                            Learn More <ArrowUpRight className="h-4 w-4" />
                          </span>
                        </div>
                      </Link>
                    </Reveal>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      )}
    </main>
  );
}
