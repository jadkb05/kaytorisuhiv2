import { useEffect, useMemo, useRef, useState } from "react";

type HeroTitleCinematicProps = {
  nameAccent: string;
  speedMs?: number;
};

function TypewriterCursor() {
  return (
    <span
      className="ml-0.5 inline-block min-h-[1em] w-[3px] translate-y-px animate-pulse bg-kaytori-gold align-middle"
      aria-hidden
    />
  );
}

function line1GoldWhite(fragment: string, accent: string) {
  if (!fragment) return null;
  const cut = accent.length;
  const goldPart = fragment.slice(0, Math.min(fragment.length, cut));
  const whitePart = fragment.length > cut ? fragment.slice(cut) : "";
  return (
    <>
      <span className="text-kaytori-gold">{goldPart}</span>
      {whitePart ? <span className="text-[#f2ebe3]">{whitePart}</span> : null}
    </>
  );
}

/**
 * Titre hero : frappe progressive comme la tagline — Kaytôri en or, suite en blanc cassé.
 */
export function HeroTitleCinematic({ nameAccent, speedMs = 18 }: HeroTitleCinematicProps) {
  const { line1, line2, line3, totalLen } = useMemo(() => {
    const l1 = `${nameAccent} — l'adresse`;
    const l2 = `incontournable du sushi,`;
    const l3 = "wok & thaï.";
    return { line1: l1, line2: l2, line3: l3, totalLen: l1.length + l2.length + l3.length };
  }, [nameAccent]);

  const [count, setCount] = useState(0);
  const intervalRef = useRef(0);

  useEffect(() => {
    setCount(0);
    let cancelled = false;

    const run = () => {
      if (cancelled) return;
      if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        setCount(totalLen);
        return;
      }

      let i = 0;
      intervalRef.current = window.setInterval(() => {
        if (cancelled) return;
        i += 1;
        setCount(Math.min(i, totalLen));
        if (i >= totalLen) {
          window.clearInterval(intervalRef.current);
        }
      }, speedMs);
    };

    const onDomReady = () => {
      if (!cancelled) run();
    };

    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", onDomReady, { once: true });
    } else {
      onDomReady();
    }

    return () => {
      cancelled = true;
      window.clearInterval(intervalRef.current);
      document.removeEventListener("DOMContentLoaded", onDomReady);
    };
  }, [totalLen, speedMs]);

  const l1len = line1.length;
  const l2len = line2.length;

  let s1 = "";
  let s2 = "";
  let s3 = "";
  if (count <= l1len) {
    s1 = line1.slice(0, count);
  } else if (count <= l1len + l2len) {
    s1 = line1;
    s2 = line2.slice(0, count - l1len);
  } else {
    s1 = line1;
    s2 = line2;
    s3 = line3.slice(0, count - l1len - l2len);
  }

  const typing = count < totalLen;

  return (
    <h1
      className="hero-title-head font-display text-[clamp(1.45rem,3.5vw,2.55rem)] font-semibold leading-snug tracking-tight"
      aria-live="polite"
    >
      <span className="block">
        {line1GoldWhite(s1, nameAccent)}
        {typing && count < l1len ? <TypewriterCursor /> : null}
      </span>

      {count >= l1len && (
        <span className="block text-[#f2ebe3]">
          {s2}
          {typing && count >= l1len && count < l1len + l2len ? <TypewriterCursor /> : null}
        </span>
      )}

      {count >= l1len + l2len && (
        <span className="block text-[#f2ebe3]">
          {s3}
          {typing && count >= l1len + l2len && count < totalLen ? <TypewriterCursor /> : null}
        </span>
      )}
    </h1>
  );
}
