import { Reveal } from "./Reveal";

type Dish = {
  id: string;
  name: string;
  description: string;
  image: string;
  price: string;
  badge?: string;
  badgeColor?: string;
};

/** Plats mis en avant — visuels HD locaux (même base que le menu en ligne) */
const SIGNATURE_DISHES: Dish[] = [
  {
    id: "crispy-saumon-avocat",
    name: "Crispy Rice Saumon Avocat",
    description: "Saumon et avocat sur riz croustillant — 2 pièces",
    image: "/menu-hd-onglet13/crispy-rice-saumon-avocat.png",
    price: "34",
    badge: "Meilleure vente",
    badgeColor: "#b8860b",
  },
  {
    id: "california-nara",
    name: "California Nara",
    description: "Saumon, crevette panée, avocat et fromage — 4 pièces",
    image: "/menu-hd-onglet17/california-nara.png",
    price: "48",
    badge: "Populaire",
    badgeColor: "#c8102e",
  },
  {
    id: "futomaki-crabe-mango",
    name: "Futomaki Crabe Mango",
    description: "Crevettes pochées, mangue, saumon, crabe et tobiko — 5 pièces",
    image: "/menu-hd-onglet16/futomaki-crabe-mango.png",
    price: "58",
    badge: "Exotique",
    badgeColor: "#c9781a",
  },
  {
    id: "special-unagui",
    name: "Special Unagui Roll",
    description: "Anguille, crevettes panées, avocat et fromage — 4 pièces",
    image: "/menu-hd-onglet18/special-unagui-roll.png",
    price: "59",
    badge: "Signature",
    badgeColor: "#0d8f63",
  },
];

export function SignatureDishes() {
  return (
    <section
      id="signature"
      className="relative overflow-hidden bg-gradient-to-b from-white via-kaytori-cream to-white py-16 md:py-24"
    >
      <div
        className="pointer-events-none absolute -left-32 top-12 h-72 w-72 rounded-full bg-kaytori-gold/8 blur-[80px]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-24 bottom-12 h-72 w-72 rounded-full bg-kaytori-green/8 blur-[80px]"
        aria-hidden
      />

      <div className="relative mx-auto w-[min(1200px,92vw)]">
        <Reveal>
          <header className="mb-10 text-center md:mb-14">
            <span className="inline-block text-[0.7rem] font-bold uppercase tracking-[0.22em] text-kaytori-gold">
              Plats signature
            </span>
            <h2 className="mt-3 font-display text-[clamp(1.8rem,4.5vw,2.8rem)] font-semibold leading-tight tracking-tight text-kaytori-black">
              Ceux que nos clients{" "}
              <em className="italic text-kaytori-green">redemandent</em>
            </h2>
            <p className="mx-auto mt-3 max-w-md text-[0.95rem] font-light text-kaytori-muted md:text-base">
              Une sélection de plats stars choisis par nos chefs.
            </p>
          </header>
        </Reveal>

        {/* Grille — 2 cols mobile, 4 cols desktop */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4 md:gap-5">
          {SIGNATURE_DISHES.map((dish, i) => (
            <Reveal key={dish.id}>
              <article
                className="group relative h-full overflow-hidden rounded-2xl border border-kaytori-black/8 bg-white shadow-card transition-all duration-500 ease-smooth hover:-translate-y-1 hover:shadow-lift"
                style={{ transitionDelay: `${i * 40}ms` }}
              >
                {/* Image carrée */}
                <div className="relative aspect-square overflow-hidden bg-kaytori-creamDark">
                  <img
                    src={dish.image}
                    alt={dish.name}
                    loading="lazy"
                    decoding="async"
                    sizes="(max-width: 639px) 45vw, 25vw"
                    className="img-zoom h-full w-full object-cover"
                  />
                  {dish.badge && (
                    <span
                      className="absolute left-2 top-2 max-w-[85%] rounded-full px-2 py-0.5 text-[0.55rem] font-bold tracking-wide text-white shadow-sm normal-case md:left-3 md:top-3 md:max-w-[90%] md:px-2.5 md:py-1 md:text-[0.62rem]"
                      style={{ background: dish.badgeColor }}
                    >
                      {dish.badge}
                    </span>
                  )}
                  {/* Prix badge en bas */}
                  <span className="absolute bottom-2 right-2 rounded-full bg-gold-shine px-2.5 py-1 text-[0.7rem] font-bold tabular-nums text-kaytori-black shadow-sm md:bottom-3 md:right-3 md:px-3 md:text-[0.8rem]">
                    {dish.price} DH
                  </span>
                  {/* Overlay au hover */}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-kaytori-black/55 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                </div>

                {/* Texte */}
                <div className="p-3 md:p-4">
                  <h3 className="font-display text-[0.95rem] font-semibold leading-tight text-kaytori-black md:text-base">
                    {dish.name}
                  </h3>
                  <p className="mt-1 line-clamp-2 text-[0.72rem] leading-snug text-kaytori-muted md:text-[0.8rem]">
                    {dish.description}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        {/* CTA vers le menu complet */}
        <Reveal>
          <div className="mt-10 text-center md:mt-14">
            <a
              href="#menu"
              className="btn-shine inline-flex items-center justify-center gap-2 rounded-2xl bg-kaytori-black px-7 py-3.5 text-sm font-semibold text-white shadow-lift transition-all duration-300 ease-smooth hover:-translate-y-1 hover:bg-kaytori-green hover:shadow-green md:px-9 md:py-4"
            >
              Voir la carte complète
              <span aria-hidden>→</span>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
