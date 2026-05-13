import { SITE } from "../config/site";
import { Reveal } from "./Reveal";

const ITEMS = [
  {
    icon: "🍣",
    title: "Produits frais sélectionnés",
    text: "Sushi, wok et thaï avec la même exigence — une carte pensée comme une maison.",
  },
  {
    icon: "🛍️",
    title: "Sur place & à emporter",
    text: "Installez-vous dans notre cadre ou repartez avec vos commandes soigneusement préparées.",
  },
  {
    icon: "📍",
    title: SITE.district,
    text: "Repérez-nous vite depuis Maps ou WhatsApp.",
  },
] as const;

export function TrustStrip() {
  return (
    <section
      className="relative border-y border-kaytori-black/8 bg-white py-10 shadow-[inset_0_1px_0_rgba(212,175,55,0.12)] md:py-12"
      aria-label="Pourquoi Kaytôri"
    >
      <div className="mx-auto grid max-w-[1200px] gap-6 px-[5vw] sm:grid-cols-3 md:gap-8">
        {ITEMS.map((item, i) => (
          <Reveal key={item.title}>
            <div
              className="group relative flex gap-3 rounded-xl border-l-2 border-kaytori-gold/70 pl-4 transition-all duration-300 hover:border-kaytori-gold md:gap-4 md:pl-5"
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              <span
                className="font-display text-2xl font-semibold leading-none text-kaytori-gold/40 transition-colors group-hover:text-kaytori-gold/70 md:text-3xl"
                aria-hidden
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="flex-1">
                <h3 className="flex items-center gap-2 font-display text-base font-semibold text-kaytori-black md:text-lg">
                  <span aria-hidden>{item.icon}</span>
                  {item.title}
                </h3>
                <p className="mt-1.5 text-[0.85rem] leading-relaxed text-kaytori-muted md:mt-2 md:text-sm">
                  {item.text}
                </p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
