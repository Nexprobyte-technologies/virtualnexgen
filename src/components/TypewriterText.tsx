"use client";

import { useEffect, useState } from "react";

type TypewriterTextProps = {
  words: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseBetween?: number;
  className?: string;
  onWordChange?: (index: number) => void;
};

export default function TypewriterText({
  words,
  typingSpeed = 90,
  deletingSpeed = 45,
  pauseBetween = 1600,
  className,
  onWordChange,
}: TypewriterTextProps) {
  const [wordIndex, setWordIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    onWordChange?.(wordIndex % words.length);
  }, [wordIndex, words.length, onWordChange]);

  useEffect(() => {
    if (words.length === 0) return;

    const currentWord = words[wordIndex % words.length];
    const isWordComplete = !deleting && subIndex === currentWord.length;
    const isWordDeleted = deleting && subIndex === 0;

    const delay = isWordComplete
      ? pauseBetween
      : deleting
        ? deletingSpeed
        : typingSpeed;

    const timeout = setTimeout(() => {
      if (isWordComplete) {
        setDeleting(true);
      } else if (isWordDeleted) {
        setDeleting(false);
        setWordIndex((prev) => (prev + 1) % words.length);
      } else {
        setSubIndex((prev) => prev + (deleting ? -1 : 1));
      }
    }, delay);

    return () => clearTimeout(timeout);
  }, [
    subIndex,
    deleting,
    wordIndex,
    words,
    typingSpeed,
    deletingSpeed,
    pauseBetween,
  ]);

  return (
    <span className={className}>
      <span>{words[wordIndex % words.length].substring(0, subIndex)}</span>
      <span className="typewriter-caret" aria-hidden />
    </span>
  );
}