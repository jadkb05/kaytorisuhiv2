import { SITE } from "../config/site";

/**
 * Fond hero : une grande photo sushi HD (SITE.heroHeroBgImage).
 * URL Unsplash ou fichier local dans /public — object-cover pour tous les écrans.
 */
export function HeroBackdrop() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-kaytori-greenDark">
      <img
        src={SITE.heroHeroBgImage}
        alt=""
        className="absolute inset-0 h-full w-full object-cover object-center"
        loading="eager"
        decoding="async"
        fetchPriority="high"
        sizes="100vw"
      />
    </div>
  );
}
