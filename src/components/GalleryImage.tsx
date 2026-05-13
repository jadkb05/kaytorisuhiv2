import { useState } from "react";

type GalleryImageProps = {
  src: string;
  alt: string;
  className?: string;
};

/** Image avec repli lisible si Unsplash / réseau bloque le chargement. */
export function GalleryImage({ src, alt, className = "" }: GalleryImageProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className={`absolute inset-0 flex h-full w-full flex-col items-center justify-center gap-2 bg-gradient-to-br from-kaytori-cream via-kaytori-creamDark to-kaytori-green/15 px-6 text-center ${className}`}
      >
        <span className="text-3xl" aria-hidden>
          🍣
        </span>
        <span className="text-sm font-semibold text-kaytori-green">{alt}</span>
        <span className="text-xs text-kaytori-muted">Image indisponible — vérifiez la connexion ou remplacez l’URL.</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      width={800}
      height={533}
      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
      decoding="async"
      loading="lazy"
      className={className}
      onError={() => setFailed(true)}
    />
  );
}
