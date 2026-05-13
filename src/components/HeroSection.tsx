import { useLayoutEffect, useRef, useState } from "react";
import { SITE, heroTodayHoursRange, whatsappHref } from "../config/site";
import { HeroBackdrop } from "./HeroBackdrop";
import { HeroTitleCinematic } from "./HeroTitleCinematic";
import { TypewriterTagline } from "./TypewriterTagline";

export function HeroSection() {
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const [ctaWidthPx, setCtaWidthPx] = useState<number | null>(null);

  useLayoutEffect(() => {
    const el = taglineRef.current;
    if (!el) return;

    const mq = window.matchMedia("(max-width: 767px)");

    const measure = () => {
      if (!mq.matches) {
        setCtaWidthPx(null);
        return;
      }
      setCtaWidthPx(Math.round(el.getBoundingClientRect().width));
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    mq.addEventListener("change", measure);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      mq.removeEventListener("change", measure);
      window.removeEventListener("resize", measure);
    };
  }, []);

  return (
    <section
      id="accueil"
      className="relative min-h-[100svh] overflow-hidden bg-kaytori-black md:min-h-[92svh]"
    >
      <HeroBackdrop />

      {/* Gradient overlay : plus doux en haut pour la photo, plus sombre en bas */}
      <div
        className="absolute inset-0 z-[1] bg-gradient-to-b from-kaytori-black/40 via-[#0a1410]/75 to-kaytori-black/95"
        aria-hidden
      />
      {/* Vignette latérale subtile pour faire ressortir le texte */}
      <div
        className="absolute inset-0 z-[1] bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(0,0,0,0.4)_100%)]"
        aria-hidden
      />
      <div className="noise-overlay z-[1] !opacity-[0.05]" aria-hidden />

      <div className="relative z-[2] mx-auto flex min-h-[100svh] w-[min(1120px,92vw)] flex-col px-[5vw] max-md:justify-start max-md:pt-[calc(var(--header-h)+0.75rem)] max-md:pb-28 md:min-h-[92svh] md:justify-center md:pt-28 md:pb-20">
        <div className="hero-stagger mx-auto w-full max-w-[580px] text-center lg:mx-0 lg:max-w-[540px] lg:text-left">
          <TypewriterTagline ref={taglineRef} text={SITE.tagline} />

          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-kaytori-gold/40 bg-kaytori-gold/[0.12] px-3.5 py-1.5 text-[0.65rem] font-bold uppercase tracking-[0.14em] text-[#f5edd8] backdrop-blur-md md:text-[0.68rem] md:px-4">
            <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-kaytori-gold shadow-[0_0_12px_rgba(212,175,55,0.85)]" />
            Ouvert aujourd&apos;hui • {heroTodayHoursRange()}
          </div>

          <HeroTitleCinematic nameAccent={SITE.nameAccent} />

          <p className="mx-auto mt-4 max-w-full px-1 text-center text-[0.88rem] font-light leading-relaxed text-[#e8dfd2]/95 sm:px-0 md:mt-5 md:text-[0.97rem] lg:mx-0 lg:text-left">
            Une cuisine raffinée, une ambiance feutrée et un service attentif —
            sur place ou à emporter, aux Perles de Californie.
          </p>

          {/* CTAs — sur mobile, même largeur que la tagline (mesure ResizeObserver) */}
          <div
            className="mt-6 flex flex-col gap-2 sm:mt-6 sm:gap-2.5 sm:flex-row sm:flex-wrap sm:items-center sm:justify-center lg:justify-start max-md:mx-auto md:mx-0"
            style={
              ctaWidthPx != null
                ? { width: `${ctaWidthPx}px`, maxWidth: "100%" }
                : undefined
            }
          >
            <a
              href="#menu"
              className="btn-shine inline-flex w-full shrink-0 items-center justify-center gap-1.5 rounded-xl bg-gold-shine px-3.5 py-3 text-[0.8125rem] font-semibold leading-tight text-kaytori-black shadow-card transition-all duration-300 ease-smooth hover:-translate-y-0.5 hover:shadow-gold sm:w-auto sm:gap-2 sm:px-5 sm:py-3.5 sm:text-[0.875rem]"
            >
              Voir le menu
            </a>
            <a
              href={whatsappHref(
                "Bonjour, je souhaite réserver une table chez Kaytôri."
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full shrink-0 items-center justify-center gap-1.5 rounded-xl border-2 border-kaytori-gold/50 bg-kaytori-black/30 px-3.5 py-3 text-center text-[0.8125rem] font-semibold leading-tight text-[#f2ebe3] backdrop-blur-sm transition-all duration-300 ease-smooth hover:border-kaytori-gold hover:bg-kaytori-gold/15 sm:w-auto sm:gap-2 sm:px-5 sm:py-3.5 sm:text-[0.875rem]"
              aria-label="Réserver via WhatsApp — ouvrir une conversation"
            >
              <span aria-hidden className="shrink-0">
                💬
              </span>
              Réserver via WhatsApp
            </a>
            <a
              href={SITE.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full shrink-0 items-center justify-center gap-1.5 rounded-xl border-2 border-[#f5edd8]/55 bg-transparent px-3.5 py-3 text-[0.8125rem] font-semibold leading-tight text-kaytori-goldLight transition-all duration-300 ease-smooth hover:border-kaytori-gold hover:bg-kaytori-gold/10 sm:w-auto sm:gap-2 sm:px-5 sm:py-3.5 sm:text-[0.875rem]"
              aria-label={`Nous trouver — ouvrir ${SITE.district} sur Google Maps`}
            >
              <span aria-hidden className="shrink-0">
                📍
              </span>
              Nous trouver
            </a>
          </div>

          {/* Bloc infos rapide — uniquement desktop, sur mobile on a la sticky bar */}
          <div className="mx-auto mt-7 hidden max-w-lg grid-cols-3 gap-2 border-t border-kaytori-gold/20 pt-5 sm:mt-8 sm:grid lg:mx-0">
            <a
              href={SITE.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group block rounded-xl border border-kaytori-gold/25 bg-black/35 px-3 py-2.5 backdrop-blur-sm transition-all duration-300 ease-smooth hover:border-kaytori-gold/45 hover:bg-black/45"
              aria-label={`Voir ${SITE.district} sur Google Maps`}
            >
              <span className="block text-[0.6rem] font-bold uppercase tracking-[0.14em] text-kaytori-gold/55">
                Quartier
              </span>
              <span className="mt-0.5 block font-display text-base font-semibold leading-tight text-[#f4eee6] group-hover:underline">
                {SITE.district}
              </span>
            </a>
            <a
              href="tel:+212520026824"
              className="group block rounded-xl border border-kaytori-gold/25 bg-black/35 px-3 py-2.5 backdrop-blur-sm transition-all duration-300 ease-smooth hover:border-kaytori-gold/45 hover:bg-black/45"
            >
              <span className="block text-[0.6rem] font-bold uppercase tracking-[0.14em] text-kaytori-gold/55">
                Réservation
              </span>
              <span className="mt-0.5 block font-display text-base font-semibold text-kaytori-goldLight group-hover:underline">
                {SITE.phoneFixeDisplay}
              </span>
            </a>
            <a
              href={whatsappHref()}
              target="_blank"
              rel="noopener noreferrer"
              className="group block rounded-xl border border-kaytori-gold/25 bg-black/35 px-3 py-2.5 backdrop-blur-sm transition-all duration-300 ease-smooth hover:border-kaytori-gold/45 hover:bg-black/45"
            >
              <span className="block text-[0.6rem] font-bold uppercase tracking-[0.14em] text-kaytori-gold/55">
                WhatsApp
              </span>
              <span className="mt-0.5 block font-display text-base font-semibold text-[#f4eee6] group-hover:underline">
                {SITE.phoneMobileDisplay}
              </span>
            </a>
          </div>
        </div>
      </div>

      {/* Indicateur scroll en bas — masqué sur mobile (peu utile) */}
      <div
        className="pointer-events-none absolute bottom-4 left-1/2 z-[3] hidden -translate-x-1/2 animate-scrollhint flex-col items-center gap-2 text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-kaytori-gold/45 md:flex md:left-auto md:right-[max(1.5rem,4vw)] md:translate-x-0 md:flex-row"
        aria-hidden
      >
        <span className="hidden h-8 w-px bg-gradient-to-b from-kaytori-gold/70 to-transparent md:block" />
        Scroll
      </div>
    </section>
  );
}
