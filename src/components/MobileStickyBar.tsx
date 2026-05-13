import { useEffect, useState } from "react";
import { useCart } from "../cart/CartContext";
import { SITE, whatsappHref } from "../config/site";

/**
 * Sticky bar mobile uniquement — toujours visible en bas de l'écran.
 * Affiche : Menu | Appeler | WhatsApp
 * Se masque automatiquement quand le panier est actif (CartBar le remplace).
 * S'affiche après scroll de 200px pour pas gêner le hero.
 */
export function MobileStickyBar() {
  const { itemCount } = useCart();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 200);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Si panier actif, on cache (le CartBar prend la place)
  if (itemCount > 0) return null;

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 transition-all duration-500 ease-smooth lg:hidden ${
        visible ? "pointer-events-auto translate-y-0 opacity-100" : "pointer-events-none translate-y-full opacity-0"
      }`}
      role="navigation"
      aria-label="Raccourcis mobile"
      inert={!visible}
    >
      {/* Fond opaque : évite le « flou » grisâtre (blur + transparence) qui masque le texte */}
      <div className="border-t border-kaytori-gold/45 bg-kaytori-black shadow-[0_-6px_24px_rgba(0,0,0,0.45)]">
        <div
          className="grid grid-cols-3 gap-0"
          style={{ paddingBottom: "max(0.25rem, env(safe-area-inset-bottom, 0))" }}
        >
          <a
            href="#menu"
            className="group flex min-h-[44px] flex-col items-center justify-center gap-0.5 py-1.5 text-white transition-colors active:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-kaytori-gold"
          >
            <span className="text-[1.05rem] leading-none drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]" aria-hidden>
              🍣
            </span>
            <span className="text-[0.62rem] font-bold uppercase leading-none tracking-[0.1em] text-white [text-shadow:0_1px_2px_rgba(0,0,0,1)]">
              Menu
            </span>
          </a>
          <a
            href="tel:+212520026824"
            className="group flex min-h-[44px] flex-col items-center justify-center gap-0.5 border-x border-white/15 py-1.5 text-white transition-colors active:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-kaytori-gold"
            aria-label={`Appeler ${SITE.phoneFixeDisplay}`}
          >
            <span className="text-[1.05rem] leading-none drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]" aria-hidden>
              📞
            </span>
            <span className="text-[0.62rem] font-bold uppercase leading-none tracking-[0.1em] text-white [text-shadow:0_1px_2px_rgba(0,0,0,1)]">
              Appeler
            </span>
          </a>
          <a
            href={whatsappHref(
              "Bonjour Kaytôri, je souhaite réserver / commander."
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex min-h-[44px] flex-col items-center justify-center gap-0.5 bg-gold-shine py-1.5 text-kaytori-black transition-transform active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-white"
          >
            <span className="text-[1.05rem] leading-none" aria-hidden>
              💬
            </span>
            <span className="text-[0.62rem] font-extrabold uppercase leading-none tracking-[0.1em]">
              WhatsApp
            </span>
          </a>
        </div>
      </div>
    </div>
  );
}
