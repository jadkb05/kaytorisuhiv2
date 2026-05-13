import { SITE } from "../config/site";
import { REVIEWS } from "../data/reviews";
import { Reveal } from "./Reveal";

function Stars({ n }: { n: number }) {
  return (
    <div
      className="mb-3 flex gap-0.5 text-[1.05rem] text-kaytori-goldLight drop-shadow-sm"
      aria-hidden
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className={i < n ? "opacity-100" : "opacity-25"}>
          ★
        </span>
      ))}
    </div>
  );
}

function GoogleBadge() {
  return (
    <span
      className="grid h-4 w-4 shrink-0 place-items-center rounded-full bg-white text-[0.55rem] font-bold"
      style={{
        background:
          "conic-gradient(#4285F4 0 25%, #34A853 25% 50%, #FBBC05 50% 75%, #EA4335 75% 100%)",
      }}
      aria-hidden
    >
      <span className="grid h-2 w-2 place-items-center rounded-full bg-white" />
    </span>
  );
}

export function ReviewsSection() {
  return (
    <section
      id="avis"
      className="relative overflow-hidden bg-gradient-to-br from-kaytori-black via-[#0f1815] to-kaytori-green py-16 text-white md:py-24"
    >
      <div className="noise-overlay !opacity-[0.06]" aria-hidden />
      <div
        className="pointer-events-none absolute -left-32 top-1/4 h-96 w-96 rounded-full bg-kaytori-gold/10 blur-[100px]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-kaytori-greenSoft/25 blur-[80px]"
        aria-hidden
      />

      <div className="relative z-[1] mx-auto w-[min(1200px,92vw)]">
        <Reveal>
          <div className="mb-10 text-center md:mb-14 lg:mx-auto lg:max-w-2xl">
            {/* Badge Note Google avec étoiles */}
            <div className="inline-flex flex-col items-center gap-2 rounded-2xl border border-white/15 bg-white/[0.06] px-5 py-3 backdrop-blur-md sm:flex-row sm:gap-4 sm:px-6">
              <div className="flex items-center gap-2">
                <GoogleBadge />
                <span className="text-[0.78rem] font-bold uppercase tracking-wider text-white/85">
                  Note Google
                </span>
              </div>
              <span className="hidden h-6 w-px bg-white/20 sm:block" aria-hidden />
              <div className="flex items-baseline gap-2">
                <span className="font-display text-3xl font-bold text-kaytori-goldLight">
                  5
                </span>
                <span className="text-[0.7rem] text-white/55">/ 5</span>
                <span className="flex gap-0.5 text-[0.9rem] text-kaytori-goldLight" aria-hidden>
                  ★★★★★
                </span>
              </div>
            </div>

            <h2 className="mt-6 font-display text-[clamp(1.85rem,4.5vw,3rem)] font-semibold leading-tight tracking-tight">
              Ce que disent nos <em className="italic text-kaytori-goldLight">convives</em>
            </h2>
            <p className="mt-3 text-[0.95rem] font-light text-white/65 md:text-lg">
              La parole à celles et ceux qui ont vécu l&apos;expérience Kaytori.
            </p>
          </div>
        </Reveal>

        <div className="grid gap-4 md:grid-cols-3 md:gap-5">
          {REVIEWS.map((r, i) => (
            <Reveal key={r.id}>
              <article
                className="flex h-full flex-col rounded-2xl border border-white/12 bg-white/[0.06] p-5 shadow-lift backdrop-blur-md transition-all duration-500 ease-smooth hover:-translate-y-1 hover:border-kaytori-gold/40 hover:bg-white/[0.09] md:p-6"
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                <div className="mb-4 flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div
                      className="grid h-11 w-11 shrink-0 place-items-center rounded-full text-[0.85rem] font-bold text-white shadow-lg ring-2 ring-white/15"
                      style={{ background: r.avatarColor }}
                    >
                      {r.initials}
                    </div>
                    <div>
                      <div className="font-semibold text-white">{r.name}</div>
                      <div className="text-[0.75rem] text-white/45">
                        {r.dateLabel}
                      </div>
                    </div>
                  </div>
                  <span className="flex items-center gap-1 rounded-full bg-black/30 px-2 py-1 text-[0.6rem] font-bold uppercase tracking-wide text-white/75">
                    <GoogleBadge />
                    Google
                  </span>
                </div>
                <Stars n={r.rating} />
                <p className="flex-1 text-[0.9rem] leading-relaxed text-white/82 md:text-[0.95rem]">
                  &laquo;&nbsp;{r.body}&nbsp;&raquo;
                </p>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="mt-10 flex flex-col items-center gap-3 md:mt-12">
            <a
              href={SITE.googleReviewsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-shine inline-flex items-center justify-center gap-2 rounded-2xl bg-gold-shine px-7 py-3.5 text-sm font-semibold text-kaytori-black shadow-card transition-all duration-300 ease-smooth hover:-translate-y-1 hover:shadow-gold md:px-9 md:py-4"
            >
              Voir tous les avis Google
              <span aria-hidden>→</span>
            </a>
            <p className="text-[0.78rem] text-white/40">
              Plus de 120 avis 5 étoiles
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
