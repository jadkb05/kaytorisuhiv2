import { Fragment, useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { useCart } from "../cart/CartContext";
import { SITE } from "../config/site";
import { CLIENT_DISH_IMAGES, CUSTOM_DISH_IMAGES } from "../data/dishImages";
import { STARTER_IMAGE_URL_BY_ID } from "../data/startersYakamon";
import { CLIENT_SUSHU_POOL } from "../data/clientSushuPhotoPool";
import { ZIP_ORDER_DISH_IMAGES } from "../data/zipOrderDishImages";
import { YUMLO_CATEGORIES, YUMLO_MENU, type YumloMenuItem } from "../data/yumloMenu";
import { groupItemsForMenuTab } from "../data/menuTabSections";

type YumloCategory = (typeof YUMLO_CATEGORIES)[number];

function formatPriceDH(priceMAD: string) {
  const parts = priceMAD.split(".");
  const int = parts[0] ?? "0";
  let dec = parts[1] ?? "00";
  if (dec.length === 1) dec = `${dec}0`;
  if (dec.length > 2) dec = dec.slice(0, 2);
  return `${int},${dec}`;
}

function norm(s: string) {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "");
}

function categoryAnchorId(c: string) {
  return (
    "menu-cat-" +
    norm(c)
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "")
  );
}

function dishPoolFallback(id: string): string | undefined {
  const pool: readonly string[] = CLIENT_SUSHU_POOL;
  if (pool.length === 0) return undefined;
  let h = 0;
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) >>> 0;
  return pool[h % pool.length];
}

function dishImage(item: YumloMenuItem) {
  return (
    STARTER_IMAGE_URL_BY_ID[item.id] ??
    CLIENT_DISH_IMAGES[item.id] ??
    CUSTOM_DISH_IMAGES[item.id] ??
    ZIP_ORDER_DISH_IMAGES[item.id] ??
    dishPoolFallback(item.id) ??
    item.image
  );
}

type DishCardProps = {
  item: YumloMenuItem;
};

function YakamonDishCard({ item }: DishCardProps) {
  const { addItem } = useCart();
  const variants = item.variants;
  const hasVariants = Boolean(variants && variants.length > 0);
  const [pickerOpen, setPickerOpen] = useState(false);
  const [modalVariantId, setModalVariantId] = useState(() => variants?.[0]?.id ?? "");

  const openPicker = () => {
    if (!hasVariants || !variants?.length) return;
    setModalVariantId(variants[0].id);
    setPickerOpen(true);
  };

  const selectedInModal =
    hasVariants && variants
      ? (variants.find((x) => x.id === modalVariantId) ?? variants[0])
      : null;
  const displayPrice =
    pickerOpen && selectedInModal
      ? selectedInModal.priceMAD
      : hasVariants && variants
        ? variants[0].priceMAD
        : item.priceMAD;

  useEffect(() => {
    if (!pickerOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setPickerOpen(false);
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [pickerOpen]);

  const handleAdd = () => {
    if (hasVariants) {
      openPicker();
      return;
    }
    addItem(item.id, item.name, item.priceMAD);
  };

  const confirmVariantAdd = () => {
    if (!hasVariants || !variants || !selectedInModal) return;
    addItem(
      `${item.id}:${selectedInModal.id}`,
      `${item.name} — ${selectedInModal.label}`,
      selectedInModal.priceMAD,
    );
    setPickerOpen(false);
  };

  const dishBody = (
    <div className="flex w-full items-stretch gap-3 sm:gap-4 md:gap-5">
      <div className="relative aspect-square h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-[#0f1815] sm:h-28 sm:w-28 md:h-32 md:w-32">
        <img
          src={dishImage(item)}
          alt=""
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover object-center transition-transform duration-500 ease-out md:duration-700 md:group-hover:scale-[1.04]"
        />
      </div>

      <div className="flex min-w-0 flex-1 flex-col justify-center py-1.5 pr-1 sm:py-2">
        <h3 className="font-display text-[0.92rem] font-semibold leading-tight tracking-tight text-kaytori-black sm:text-[1rem] md:text-[1.05rem]">
          {item.name}
        </h3>
        {item.description ? (
          <p className="mt-1.5 line-clamp-3 font-sans text-[0.74rem] leading-relaxed text-kaytori-muted sm:line-clamp-2 sm:text-[0.78rem] md:text-[0.8rem]">
            {item.description}
          </p>
        ) : null}
        {hasVariants ? (
          <p className="mt-1.5 font-sans text-[0.62rem] font-semibold uppercase tracking-[0.08em] text-kaytori-green/85">
            ✦ Touchez pour choisir
          </p>
        ) : null}
      </div>
    </div>
  );

  const variantModal =
    pickerOpen &&
    hasVariants &&
    variants &&
    typeof document !== "undefined"
      ? createPortal(
          <div
            className="fixed inset-0 z-[9999] flex items-end justify-center bg-kaytori-black/50 p-0 backdrop-blur-[2px] sm:items-center sm:p-4"
            role="presentation"
            onClick={() => setPickerOpen(false)}
          >
            <div
              role="dialog"
              aria-modal="true"
              aria-labelledby={`variant-title-${item.id}`}
              className="max-h-[min(92vh,640px)] w-full max-w-md overflow-y-auto rounded-t-2xl border border-kaytori-black/10 bg-[#faf8f4] shadow-lift sm:rounded-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="border-b border-kaytori-black/[0.06] bg-white/80 px-4 py-3 sm:px-5 sm:py-4">
                <h3
                  id={`variant-title-${item.id}`}
                  className="text-center font-display text-base font-semibold uppercase tracking-wide text-kaytori-black"
                >
                  {item.name}
                </h3>
                <p className="mt-1.5 text-center font-sans text-[0.78rem] leading-relaxed text-kaytori-muted">
                  {item.description}
                </p>
              </div>
              <fieldset className="border-0 px-4 py-4 sm:px-5">
                <legend className="mb-3 w-full text-center font-sans text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-kaytori-black/70">
                  Votre choix
                </legend>
                <div className="flex flex-col gap-2">
                  {variants.map((v) => {
                    const checked = v.id === modalVariantId;
                    return (
                      <label
                        key={v.id}
                        className={`flex cursor-pointer items-center justify-between gap-3 rounded-xl border px-3 py-3 font-sans text-[0.82rem] transition-colors ${
                          checked
                            ? "border-kaytori-green/45 bg-kaytori-green/[0.06] text-kaytori-black"
                            : "border-kaytori-black/10 bg-white hover:border-kaytori-gold/35"
                        }`}
                      >
                        <span className="flex min-w-0 flex-1 items-center gap-2.5">
                          <input
                            type="radio"
                            name={`variant-${item.id}`}
                            value={v.id}
                            checked={checked}
                            onChange={() => setModalVariantId(v.id)}
                            className="h-4 w-4 shrink-0 accent-kaytori-green"
                          />
                          <span className="font-medium">{v.label}</span>
                        </span>
                        <span className="shrink-0 tabular-nums font-semibold text-kaytori-black">
                          {formatPriceDH(v.priceMAD)} DH
                        </span>
                      </label>
                    );
                  })}
                </div>
              </fieldset>
              <div className="flex flex-col gap-2 border-t border-kaytori-black/[0.06] bg-[#f2ebe3]/90 px-4 py-4 sm:flex-row-reverse sm:px-5">
                <button
                  type="button"
                  onClick={confirmVariantAdd}
                  className="btn-shine min-h-[48px] flex-1 rounded-xl bg-gold-shine px-4 py-3 text-sm font-semibold text-kaytori-black shadow-card transition-all hover:-translate-y-0.5 hover:shadow-gold"
                >
                  Ajouter au panier
                </button>
                <button
                  type="button"
                  onClick={() => setPickerOpen(false)}
                  className="min-h-[48px] rounded-xl border border-kaytori-black/15 bg-white px-4 py-3 text-sm font-semibold text-kaytori-black/80 transition-colors hover:bg-kaytori-cream"
                >
                  Annuler
                </button>
              </div>
            </div>
          </div>,
          document.body,
        )
      : null;

  return (
    <li className="touch-manipulation">
      <article className="group flex items-stretch overflow-hidden rounded-2xl border border-kaytori-black/[0.06] bg-white shadow-[0_1px_2px_rgba(10,15,13,0.04),0_8px_22px_-12px_rgba(10,15,13,0.08)] transition-shadow duration-300 ease-out hover:shadow-[0_1px_2px_rgba(10,15,13,0.05),0_14px_36px_-14px_rgba(10,15,13,0.12)] active:scale-[0.995] md:rounded-2xl">
        {hasVariants ? (
          <button
            type="button"
            onClick={openPicker}
            className="flex flex-1 items-stretch border-0 bg-transparent p-2.5 text-left outline-none transition-colors focus-visible:ring-2 focus-visible:ring-kaytori-green/40 focus-visible:ring-offset-2 focus-visible:ring-offset-white active:bg-black/[0.02] sm:p-3 md:p-3.5"
            aria-haspopup="dialog"
            aria-expanded={pickerOpen}
            aria-label={`Choisir une option pour ${item.name}`}
          >
            {dishBody}
          </button>
        ) : (
          <div className="flex flex-1 items-stretch p-2.5 sm:p-3 md:p-3.5">{dishBody}</div>
        )}

        <div className="flex shrink-0 flex-col items-stretch border-l border-kaytori-black/[0.05]">
          <div className="flex flex-1 items-center justify-center bg-gold-shine px-3 py-2 sm:px-4 md:px-5">
            <p className="flex items-baseline gap-x-1 font-sans tabular-nums text-kaytori-black">
              <span className="text-[1rem] font-bold sm:text-[1.05rem] md:text-[1.1rem]">
                {formatPriceDH(displayPrice)}
              </span>
              <span className="text-[0.6rem] font-semibold uppercase tracking-[0.12em] text-kaytori-black/60">
                DH
              </span>
            </p>
          </div>
          <button
            type="button"
            onClick={handleAdd}
            className="grid min-h-[44px] min-w-[56px] place-items-center border-t border-kaytori-black/[0.06] bg-[#fffcf9] text-2xl font-light leading-none text-kaytori-green shadow-[inset_0_1px_0_rgba(255,255,255,0.6)] transition-colors duration-200 touch-manipulation hover:bg-white active:bg-kaytori-cream/60"
            aria-label={hasVariants ? `Choisir une option pour ${item.name}` : `Ajouter ${item.name} au panier`}
          >
            +
          </button>
        </div>
      </article>
      {variantModal}
    </li>
  );
}

/** Icônes emoji par catégorie */
const CATEGORY_ICONS: Record<string, string> = {
  Starters: "🥟",
  "Nems & Gyoza & Rouleaux de printemps": "🥢",
  "Sushi Fusion": "🍕",
  Yakitori: "🍢",
  Soupes: "🍜",
  Salades: "🥗",
  "Poké Bowl": "🥣",
  Tartare: "🐟",
  Chirashi: "🍱",
  Sashimi: "🍣",
  Carpaccio: "🐟",
  Tacos: "🌮",
  "Crispy Rice": "🍙",
  Nigiri: "🍣",
  Maki: "🌯",
  Futomaki: "🌯",
  "California Roll": "🍣",
  "Special Roll": "✨",
  Aromaki: "🍃",
  Blossom: "🌸",
  Premium: "⭐",
  "Makito Fry": "🍤",
  "Crispy Roll": "🔥",
  "Crunchy Roll": "🔥",
  "Wok & Thaï": "🥡",
  Bentos: "🍱",
  "Plats Thaï": "🍛",
  Assortiments: "🎁",
  Desserts: "🍰",
  Jus: "🍹",
  Boissons: "🥤",
};

function categoryIcon(c: string): string {
  if (CATEGORY_ICONS[c]) return CATEGORY_ICONS[c];
  for (const k in CATEGORY_ICONS) {
    if (c.toLowerCase().includes(k.toLowerCase())) return CATEGORY_ICONS[k];
  }
  return "🍣";
}

/**
 * Menu en ligne — défilement vertical : toutes les catégories à la suite, recherche globale.
 */
export function YakamonOnlineMenu() {
  const [query, setQuery] = useState("");

  const counts = useMemo(() => {
    const m = new Map<string, number>();
    for (const it of YUMLO_MENU) {
      m.set(it.category, (m.get(it.category) ?? 0) + 1);
    }
    return m;
  }, []);

  const categories = useMemo(() => [...YUMLO_CATEGORIES], []);

  const sectionsData = useMemo(() => {
    const q = norm(query.trim());
    return categories
      .map((cat) => {
        const allInCat = YUMLO_MENU.filter((it) => it.category === cat);
        const items = q
          ? allInCat.filter(
              (it) => norm(it.name).includes(q) || norm(it.description).includes(q),
            )
          : allInCat;
        return { category: cat as YumloCategory, items };
      })
      .filter(({ category, items }) => {
        if (q) return items.length > 0;
        return (counts.get(category) ?? 0) > 0;
      });
  }, [categories, query, counts]);

  const totalVisible = useMemo(
    () => sectionsData.reduce((acc, s) => acc + s.items.length, 0),
    [sectionsData],
  );

  return (
    <div className="rounded-2xl border border-kaytori-green/[0.08] bg-[#f7f6f2] shadow-[0_12px_40px_-20px_rgba(10,15,13,0.12)] max-md:rounded-xl max-md:shadow-[0_8px_28px_-16px_rgba(10,15,13,0.1)] md:rounded-[1.65rem] md:shadow-[0_22px_56px_-32px_rgba(10,15,13,0.12)]">
      <header className="border-b border-kaytori-black/[0.05] bg-[#fafaf7] px-3 pb-4 pt-6 max-md:pt-5 md:px-10 md:pb-7 md:pt-9">
        <div className="text-center">
          <p className="font-display text-[1.45rem] font-medium tracking-tight text-kaytori-black max-md:leading-tight sm:text-[1.55rem] md:text-[1.75rem]">
            {SITE.nameAccent}
          </p>
          <p className="mt-1.5 font-sans text-[0.66rem] font-medium uppercase tracking-[0.26em] text-kaytori-muted md:mt-2 md:text-[0.65rem] md:tracking-[0.28em]">
            Notre carte
          </p>
        </div>

        <div className="mx-auto mt-4 max-w-2xl md:mt-5">
          <label className="sr-only" htmlFor="yakamon-menu-search">
            Rechercher un plat
          </label>
          <div className="flex min-h-[48px] items-center gap-2 rounded-full border border-kaytori-black/10 bg-white px-3 py-2 shadow-sm">
            <span className="shrink-0 text-base text-kaytori-muted" aria-hidden>
              🔍
            </span>
            <input
              id="yakamon-menu-search"
              type="search"
              enterKeyHint="search"
              autoComplete="off"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Rechercher un plat…"
              className="min-h-[44px] min-w-0 flex-1 bg-transparent font-sans text-base text-kaytori-black placeholder:text-kaytori-muted/55 outline-none md:min-h-0 md:text-[0.82rem]"
            />
            {query ? (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="grid h-7 w-7 shrink-0 place-items-center rounded-full text-kaytori-muted/60 transition-colors hover:bg-kaytori-cream hover:text-kaytori-black"
                aria-label="Effacer la recherche"
              >
                ✕
              </button>
            ) : null}
          </div>
        </div>

        {sectionsData.length > 1 ? (
          <nav
            className="mx-auto mt-5 max-w-5xl md:mt-6"
            aria-label="Accès rapide aux catégories"
          >
            <p className="mb-2.5 text-center font-sans text-[0.58rem] font-semibold uppercase tracking-[0.22em] text-kaytori-muted/80">
              Sommaire — défile pour tout voir ↓
            </p>
            <ul className="flex list-none flex-wrap justify-center gap-1.5 sm:gap-2">
              {sectionsData.map(({ category }) => (
                <li key={category}>
                  <a
                    href={`#${categoryAnchorId(category)}`}
                    className="group inline-flex items-center gap-1.5 rounded-full border border-kaytori-black/[0.08] bg-white px-3 py-1.5 font-sans text-[0.7rem] font-medium text-kaytori-black/85 shadow-[0_1px_0_rgba(10,15,13,0.03)] outline-none transition-all duration-200 hover:-translate-y-0.5 hover:border-kaytori-gold/50 hover:bg-gradient-to-b hover:from-white hover:to-kaytori-cream/50 hover:text-kaytori-black hover:shadow-[0_4px_14px_-6px_rgba(10,15,13,0.15)] focus-visible:ring-2 focus-visible:ring-kaytori-green/35 focus-visible:ring-offset-2 focus-visible:ring-offset-[#fafaf7] sm:px-3.5 sm:py-2 sm:text-[0.74rem]"
                  >
                    <span
                      className="text-[0.95rem] leading-none transition-transform duration-200 group-hover:scale-110"
                      aria-hidden
                    >
                      {categoryIcon(category)}
                    </span>
                    <span className="whitespace-nowrap">{category}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        ) : null}

        <p className="mx-auto mt-4 max-w-2xl text-center font-sans text-[0.72rem] leading-relaxed text-kaytori-muted md:mt-5 md:text-[0.72rem]">
          <span className="font-medium text-kaytori-black">+</span> au panier, puis{" "}
          <span className="font-medium text-kaytori-green">WhatsApp</span> avec le total
          <span className="mt-1 block text-[0.7rem] text-kaytori-muted/90">
            Tarifs indicatifs — confirmation au restaurant.
          </span>
        </p>
      </header>

      <div className="px-2.5 py-5 max-md:pb-8 sm:px-6 sm:py-8 md:px-10 md:py-10">
        {totalVisible === 0 ? (
          <div className="py-12 text-center">
            <div className="mb-3 text-4xl" aria-hidden>
              🔎
            </div>
            <p className="font-sans text-sm text-kaytori-muted">
              {query.trim()
                ? "Aucun plat ne correspond à ta recherche."
                : "Aucun plat à afficher pour le moment."}
            </p>
            {query ? (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="mt-4 inline-flex items-center gap-2 rounded-full border border-kaytori-black/10 bg-white px-4 py-2 text-[0.78rem] font-semibold text-kaytori-black transition-colors hover:bg-kaytori-cream"
              >
                Effacer la recherche
              </button>
            ) : null}
          </div>
        ) : (
          <div className="mx-auto max-w-5xl space-y-12 md:space-y-16">
            {sectionsData.map(({ category, items }) => {
              const sectionGroups = groupItemsForMenuTab(category, items);
              const q = query.trim();
              return (
                <section
                  key={category}
                  id={categoryAnchorId(category)}
                  className="scroll-mt-[calc(var(--header-h,0px)+1rem)]"
                  aria-labelledby={`heading-${categoryAnchorId(category)}`}
                >
                  <div className="flex items-end justify-between gap-3 border-b-2 border-kaytori-gold/40 pb-3 md:pb-4">
                    <div>
                      <h2
                        id={`heading-${categoryAnchorId(category)}`}
                        className="flex items-center gap-2.5 font-display text-[1.35rem] font-bold leading-tight tracking-tight text-kaytori-black sm:text-[1.5rem] md:text-[1.85rem]"
                      >
                        <span className="text-[1.4rem] md:text-2xl" aria-hidden>
                          {categoryIcon(category)}
                        </span>
                        {category}
                      </h2>
                      <p className="mt-1 font-sans text-[0.7rem] font-medium uppercase tracking-[0.16em] text-kaytori-muted md:text-[0.72rem]">
                        {items.length} plat{items.length !== 1 ? "s" : ""}
                        {q ? " · filtre actif" : ""}
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 space-y-6 md:mt-6 md:space-y-8">
                    <ul className="grid list-none grid-cols-1 gap-3 sm:gap-3.5 lg:grid-cols-2 lg:gap-4">
                      {sectionGroups.map((sec, gi) => (
                        <Fragment key={`${category}-${sec.title || "all"}-${gi}`}>
                          {sec.title ? (
                            <li className="col-span-full list-none">
                              <h3 className="mb-2 mt-2 border-b border-kaytori-black/[0.08] pb-2 text-center font-display text-[0.78rem] font-semibold uppercase tracking-[0.14em] text-kaytori-black/80 md:mb-3 md:text-[0.82rem]">
                                {sec.title}
                              </h3>
                            </li>
                          ) : null}
                          {sec.items.map((item) => (
                            <YakamonDishCard key={item.id} item={item} />
                          ))}
                        </Fragment>
                      ))}
                    </ul>
                  </div>
                </section>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
