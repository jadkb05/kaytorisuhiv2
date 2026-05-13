import { lazy, Suspense, useState } from "react";
import { SITE } from "../config/site";
import { Reveal } from "./Reveal";
import { YakamonOnlineMenu } from "./YakamonOnlineMenu";

const MenuPdfViewer = lazy(async () => {
  const mod = await import("./MenuPdfViewer");
  return { default: mod.MenuPdfViewer };
});

function MenuPdfSkeleton() {
  return (
    <div className="flex h-[min(74vh,900px)] flex-col items-center justify-center gap-4 bg-[#151c19] sm:h-[min(80vh,980px)]">
      <div className="h-14 w-14 animate-spin rounded-full border-[3px] border-white/10 border-t-kaytori-goldLight" />
      <p className="text-sm font-medium text-white/45">Préparation du lecteur…</p>
    </div>
  );
}

export function MenuSection() {
  const [menuTab, setMenuTab] = useState<"online" | "pdf">("online");

  return (
    <section
      id="menu"
      className="relative scroll-mt-24 overflow-x-hidden bg-gradient-to-b from-kaytori-cream via-[#ebe6dc] to-kaytori-creamDark py-16 md:py-32"
    >
      <div className="pointer-events-none absolute inset-0 opacity-40" aria-hidden>
        <div className="absolute -left-40 top-24 h-[420px] w-[420px] rounded-full bg-kaytori-green/12 blur-[100px]" />
        <div className="absolute -right-32 bottom-20 h-[380px] w-[380px] rounded-full bg-kaytori-gold/14 blur-[90px]" />
      </div>
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-kaytori-gold/35 to-transparent" />

      <div className="relative mx-auto w-full max-w-[1180px] px-2 sm:px-4 md:px-5">
        <Reveal>
          <header className="mx-auto mb-12 max-w-2xl text-center md:mb-16">
            <span className="inline-flex items-center gap-2 rounded-full border border-kaytori-gold/45 bg-white/70 px-4 py-1.5 text-[0.68rem] font-bold uppercase tracking-[0.22em] text-kaytori-black shadow-sm backdrop-blur-sm">
              Carte officielle
            </span>
            <h2 className="mt-5 bg-gradient-to-br from-kaytori-black via-kaytori-black to-kaytori-gold bg-clip-text font-display text-[clamp(2.2rem,4.5vw,3.6rem)] font-semibold tracking-tight text-transparent md:mt-6">
              La carte Kaytori
            </h2>
            <div className="mx-auto mt-6 flex max-w-md flex-wrap justify-center gap-2 rounded-2xl border border-kaytori-gold/25 bg-white/85 p-1.5 shadow-[0_2px_20px_-8px_rgba(212,175,55,0.25)] backdrop-blur-sm md:mt-8">
              <button
                type="button"
                onClick={() => setMenuTab("online")}
                className={`flex-1 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all duration-300 ${
                  menuTab === "online"
                    ? "bg-kaytori-black text-kaytori-goldLight shadow-[0_4px_18px_-4px_rgba(10,15,13,0.35)] ring-1 ring-kaytori-gold/35"
                    : "text-kaytori-black/55 hover:bg-kaytori-cream/60 hover:text-kaytori-black"
                }`}
              >
                Menu en ligne / Commander
              </button>
              <button
                type="button"
                onClick={() => setMenuTab("pdf")}
                className={`flex-1 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all duration-300 ${
                  menuTab === "pdf"
                    ? "bg-kaytori-black text-kaytori-goldLight shadow-[0_4px_18px_-4px_rgba(10,15,13,0.35)] ring-1 ring-kaytori-gold/35"
                    : "text-kaytori-black/55 hover:bg-kaytori-cream/60 hover:text-kaytori-black"
                }`}
              >
                Menu PDF
              </button>
            </div>
          </header>
        </Reveal>

        {menuTab === "online" ? (
          <div className="relative mx-auto max-w-[1100px] max-md:-mx-0.5">
            <div className="overflow-hidden rounded-2xl border border-kaytori-black/[0.07] shadow-[0_12px_40px_-18px_rgba(10,15,13,0.14)] max-md:rounded-xl max-md:shadow-md md:rounded-[1.35rem] md:border-kaytori-gold/35 md:shadow-[0_22px_56px_-28px_rgba(10,15,13,0.18)]">
              <YakamonOnlineMenu />
            </div>
          </div>
        ) : (
          <Reveal>
          <div className="relative mx-auto max-w-[960px]">
            <div className="rounded-[28px] bg-gradient-to-br from-kaytori-goldLight via-kaytori-gold to-[#8a6f28] p-[3px] shadow-[0_28px_90px_-18px_rgba(10,15,13,0.5),0_0_72px_-24px_rgba(212,175,55,0.45)] ring-1 ring-kaytori-gold/30">
              <div className="overflow-hidden rounded-[25px] bg-[#0d1210] ring-1 ring-white/10">
                <div className="relative overflow-hidden border-b border-white/[0.08] bg-gradient-to-r from-[#0e1714] via-[#0a1412] to-[#0e1714] px-4 py-3.5 sm:px-6">
                  <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-kaytori-gold/30 to-transparent" aria-hidden />

                  <div className="relative mx-auto flex max-w-3xl flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-5">
                    <div className="flex items-center gap-3">
                      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-kaytori-gold/22 to-kaytori-gold/[0.06] text-base font-display font-semibold text-kaytori-goldLight shadow-[0_0_20px_-6px_rgba(212,175,55,0.4)] ring-1 ring-kaytori-gold/30">
                        K
                      </span>
                      <div className="text-left">
                        <p className="text-[0.58rem] font-bold uppercase tracking-[0.18em] text-kaytori-goldLight/85">
                          Lecteur Kaytori
                        </p>
                        <p className="font-display text-[0.95rem] font-semibold leading-tight tracking-wide text-white sm:text-[1.02rem]">
                          Menu PDF · navigation fluide
                        </p>
                      </div>
                    </div>
                    <a
                      href={SITE.menuPdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex shrink-0 items-center justify-center rounded-lg border border-white/[0.16] bg-white/[0.05] px-4 py-2 text-[0.68rem] font-bold uppercase tracking-[0.12em] text-white transition-all hover:border-kaytori-gold/45 hover:bg-kaytori-gold/[0.1] hover:text-kaytori-goldLight sm:ml-1"
                    >
                      Nouvel onglet
                    </a>
                  </div>
                </div>

                <div className="relative overflow-hidden bg-[#121816]">
                  <div
                    className="pointer-events-none absolute inset-0 opacity-[0.06]"
                    aria-hidden
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                    }}
                  />
                  <Suspense fallback={<MenuPdfSkeleton />}>
                    <MenuPdfViewer fileUrl={SITE.menuPdfUrl} />
                  </Suspense>
                </div>

                <div className="border-t border-white/[0.07] bg-gradient-to-r from-transparent via-white/[0.03] to-transparent px-5 py-3 text-center sm:px-8">
                  <p className="text-[0.78rem] leading-relaxed text-white/52">
                    Sur mobile, si la fenêtre est étroite, utilisez{" "}
                    <strong className="font-semibold text-kaytori-goldLight/90">Nouvel onglet</strong>{" "}
                    ou le zoom pour une lecture confortable.
                  </p>
                </div>
              </div>
            </div>
          </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
