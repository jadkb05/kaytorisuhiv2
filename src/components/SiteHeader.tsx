import type { MouseEvent } from "react";
import { useEffect, useState } from "react";
import { whatsappHref } from "../config/site";
import { BrandLogo } from "./BrandLogo";

const NAV = [
  { href: "#menu", label: "Menu" },
  { href: "#signature", label: "Signatures" },
  { href: "#galerie", label: "Galerie" },
  { href: "#avis", label: "Avis" },
  { href: "#contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [onHero, setOnHero] = useState(true);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    const update = () => {
      const hero = document.getElementById("accueil");
      if (!hero) return;
      const bottom = hero.getBoundingClientRect().bottom;
      setOnHero(bottom > 56);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update, { passive: true });
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const onRipple = (e: MouseEvent<HTMLAnchorElement>) => {
    const btn = e.currentTarget;
    const rect = btn.getBoundingClientRect();
    const span = document.createElement("span");
    span.className =
      "pointer-events-none absolute rounded-full bg-white/50 animate-[ripple-k_0.55s_linear]";
    span.style.left = `${e.clientX - rect.left}px`;
    span.style.top = `${e.clientY - rect.top}px`;
    span.style.width = "12px";
    span.style.height = "12px";
    btn.appendChild(span);
    window.setTimeout(() => span.remove(), 600);
  };

  const linkLight =
    "rounded-xl px-3 py-2 text-[0.9rem] font-medium tracking-wide text-kaytori-green/90 transition-colors hover:bg-kaytori-green/5 hover:text-kaytori-green";
  const linkDark =
    "rounded-xl px-3 py-2 text-[0.9rem] font-medium tracking-wide text-white/92 transition-colors hover:bg-white/10 hover:text-white";

  const headerSurface = onHero
    ? "border-white/10 bg-black/20 backdrop-blur-xl supports-[backdrop-filter]:bg-black/15"
    : "border-kaytori-line/80 bg-kaytori-cream/85 backdrop-blur-xl supports-[backdrop-filter]:bg-kaytori-cream/75";

  const titleClass = onHero ? "text-white" : "text-kaytori-black";
  const subClass = onHero
    ? "text-[#f4e4a6] [text-shadow:0_1px_2px_rgba(0,0,0,0.75),0_0_12px_rgba(0,0,0,0.35)]"
    : "text-kaytori-gold [text-shadow:0_0.5px_0_rgba(255,253,248,0.95),0_1px_2px_rgba(10,15,13,0.14)]";

  const burgerSurface = onHero
    ? "border-white/25 bg-white/10 text-white"
    : "border-kaytori-line bg-white/85 text-kaytori-black";

  const burgerBar = onHero ? "bg-white" : "bg-kaytori-black";

  return (
    <>
      <a
        href="#contenu-principal"
        className="fixed left-4 top-4 z-[100] -translate-y-[280%] rounded-xl border-2 border-kaytori-black bg-gold-shine px-4 py-3 text-sm font-bold text-kaytori-black shadow-lift transition-transform duration-300 ease-smooth focus-visible:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-kaytori-green"
      >
        Aller au contenu
      </a>
      <header className={`sticky top-0 z-50 border-b transition-colors duration-300 ${headerSurface}`}>
        <div className="mx-auto flex h-[72px] w-[min(1200px,92vw)] items-center justify-between gap-4">
          <a
            href="#accueil"
            className="group flex items-center gap-3 no-underline"
            onClick={() => setMenuOpen(false)}
          >
            <BrandLogo size={46} className="shrink-0 shadow-[0_8px_28px_rgba(0,0,0,0.35)] transition-transform duration-300 group-hover:scale-[1.03]" />
            <div>
              <div className={`font-display text-[1.5rem] font-semibold leading-none tracking-tight transition-colors ${titleClass}`}>
                Kaytôri
              </div>
              <div
                className={`mt-0.5 text-[0.75rem] font-semibold uppercase tracking-[0.12em] transition-colors sm:text-[0.78rem] ${subClass}`}
              >
                Sushi • Wok • Thaï
              </div>
            </div>
          </a>

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Navigation principale">
            {NAV.map((item) => (
              <a key={item.href} className={onHero ? linkDark : linkLight} href={item.href}>
                {item.label}
              </a>
            ))}
            <a
              className="relative btn-shine ml-2 inline-flex items-center justify-center gap-2 rounded-xl bg-gold-shine px-5 py-2.5 text-sm font-semibold text-kaytori-black shadow-card transition-all duration-300 ease-smooth hover:-translate-y-0.5 hover:shadow-gold"
              href={whatsappHref()}
              target="_blank"
              rel="noopener noreferrer"
              onClick={onRipple}
            >
              WhatsApp
            </a>
          </nav>

          <div className="flex items-center gap-2 lg:hidden">
            <a
              className="btn-shine rounded-xl bg-gold-shine px-3 py-2 text-xs font-semibold text-kaytori-black shadow-card"
              href={whatsappHref()}
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp
            </a>
            <button
              type="button"
              className={`flex h-11 w-11 flex-col items-center justify-center gap-1.5 rounded-xl border transition-colors ${burgerSurface}`}
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
              aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
              onClick={() => setMenuOpen((o) => !o)}
            >
              <span
                className={`block h-0.5 w-5 rounded-full transition-transform ${burgerBar} ${menuOpen ? "translate-y-2 rotate-45" : ""}`}
              />
              <span className={`block h-0.5 w-5 rounded-full transition-opacity ${burgerBar} ${menuOpen ? "opacity-0" : ""}`} />
              <span
                className={`block h-0.5 w-5 rounded-full transition-transform ${burgerBar} ${menuOpen ? "-translate-y-2 -rotate-45" : ""}`}
              />
            </button>
          </div>
        </div>
      </header>

      <div
        id="mobile-nav"
        className={`fixed inset-0 z-40 lg:hidden ${menuOpen ? "pointer-events-auto" : "pointer-events-none"}`}
        aria-hidden={!menuOpen}
      >
        <button
          type="button"
          className={`absolute inset-0 bg-kaytori-black/40 backdrop-blur-sm transition-opacity ${menuOpen ? "opacity-100" : "opacity-0"}`}
          onClick={() => setMenuOpen(false)}
          tabIndex={menuOpen ? 0 : -1}
          aria-label="Fermer"
        />
        <nav
          className={`absolute right-0 top-0 flex h-full w-[min(320px,88vw)] flex-col gap-1 bg-kaytori-cream px-6 pb-10 pt-24 shadow-lift transition-transform duration-500 ease-smooth ${menuOpen ? "translate-x-0" : "translate-x-full"}`}
        >
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-xl px-4 py-3.5 text-lg font-medium text-kaytori-black transition-colors hover:bg-white/80"
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </>
  );
}
