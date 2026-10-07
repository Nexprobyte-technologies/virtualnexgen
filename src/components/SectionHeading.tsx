import Reveal from "./Reveal";
import TypewriterText from "./TypewriterText";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  highlight?: string;
  description?: string;
  align?: "center" | "left";
  typewriterWords?: string[];
  typewriterPrefix?: string;
  lightBackground?: boolean;
};

export default function SectionHeading({
  eyebrow,
  title,
  highlight,
  description,
  align = "center",
  typewriterWords,
  typewriterPrefix,
  lightBackground = false,
}: SectionHeadingProps) {
  const centered = align === "center";
  const primaryText = lightBackground ? "text-[#02024E]" : "text-white";
  const secondaryText = lightBackground ? "text-[#02024E]/80" : "text-white/95";
  return (
    <div className={centered ? "mx-auto max-w-3xl text-center" : "max-w-2xl"}>
      {eyebrow && (
        <Reveal>
          <span className={`inline-block rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] ${primaryText}`}>
            {eyebrow}
          </span>
        </Reveal>
      )}
      <Reveal delay={0.1}>
        <h2 className={`mt-5 text-3xl font-extrabold tracking-tight ${primaryText} sm:text-4xl lg:text-5xl`}>
          {title} {highlight && <span className="text-gradient">{highlight}</span>}
        </h2>
      </Reveal>
      {typewriterWords && typewriterWords.length > 0 && (
        <Reveal delay={0.15}>
          <p className={`mt-4 text-lg font-semibold ${secondaryText} sm:text-xl`}>
            {typewriterPrefix && (
              <span className="whitespace-nowrap">{typewriterPrefix} </span>
            )}
            <TypewriterText
              words={typewriterWords}
              className={primaryText}
            />
          </p>
        </Reveal>
      )}
      {description && (
        <Reveal delay={0.2}>
          <p className={`mt-5 text-base leading-relaxed ${secondaryText} sm:text-lg`}>
            {description}
          </p>
        </Reveal>
      )}
    </div>
  );
}
