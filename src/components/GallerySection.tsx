import { GALLERY } from "../data/gallery";
import { GalleryImage } from "./GalleryImage";
import { Reveal } from "./Reveal";

function cellClass(index: number): string {
  const shell =
    "group relative overflow-hidden rounded-2xl border border-kaytori-black/10 bg-kaytori-creamDark shadow-card ring-1 ring-black/[0.03]";

  // Layout desktop : grand carré 2x2 en haut à gauche, le reste autour
  if (index === 0) {
    return `${shell} min-h-[280px] sm:col-span-2 sm:row-span-2 sm:min-h-[460px] lg:min-h-[520px]`;
  }
  return `${shell} min-h-[200px] sm:min-h-[220px] lg:min-h-[250px]`;
}

export function GallerySection() {
  return (
    <section
      id="galerie"
      className="relative bg-gradient-to-b from-kaytori-cream via-white to-white py-16 md:py-24"
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-kaytori-gold/40 to-transparent"
        aria-hidden
      />

      <div className="mx-auto w-[min(1200px,92vw)]">
        <Reveal>
          <div className="mb-10 flex flex-col gap-3 text-center md:mb-14 lg:text-left">
            <span className="text-[0.7rem] font-bold uppercase tracking-[0.22em] text-kaytori-gold">
              Galerie
            </span>
            <h2 className="font-display text-[clamp(1.85rem,4.5vw,3rem)] font-semibold leading-tight tracking-tight text-kaytori-black">
              L&apos;univers <em className="italic text-kaytori-green">Kaytôri</em>, en images
            </h2>
            <p className="mx-auto max-w-xl text-[0.95rem] font-light text-kaytori-muted md:text-lg lg:mx-0">
              Des textures, des couleurs et une présentation digne d&apos;une
              maison fine — avant votre première bouchée.
            </p>
          </div>
        </Reveal>

        {/* Grille responsive — adaptée mobile/tablette/desktop */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4 lg:gap-5">
          {GALLERY.map((photo, index) => (
            <Reveal key={photo.id}>
              <div className={cellClass(index)}>
                <figure className="relative m-0 h-full min-h-[inherit]">
                  <GalleryImage
                    src={photo.src}
                    alt={photo.alt}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                  {/* Overlay gradient toujours visible mobile, hover desktop */}
                  <div
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-kaytori-black/80 via-kaytori-black/15 to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-95"
                    aria-hidden
                  />
                  <figcaption className="absolute bottom-0 left-0 right-0 z-[1] p-4 text-[0.82rem] font-semibold leading-snug text-white drop-shadow-md transition-all duration-500 md:text-sm">
                    {photo.alt}
                  </figcaption>
                </figure>
              </div>
            </Reveal>
          ))}
        </div>

        {/* CTA après galerie — vers Instagram pour plus de contenu */}
        <Reveal>
          <div className="mt-10 text-center md:mt-14">
            <a
              href="https://www.instagram.com/kaytorisushi/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-kaytori-black/10 bg-white px-6 py-3 text-sm font-semibold text-kaytori-black shadow-card transition-all duration-300 ease-smooth hover:-translate-y-0.5 hover:border-kaytori-gold hover:shadow-lift"
            >
              <span aria-hidden>📷</span>
              Plus de photos sur @kaytorisushi
              <span aria-hidden>→</span>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
