import { SITE, siteOrigin } from "../config/site";

/**
 * Données structurées Restaurant (Google / rich results).
 * Les champs absolus (url, image) ne sont ajoutés que si VITE_PUBLIC_SITE_URL est défini.
 */
export function JsonLdRestaurant() {
  const origin = siteOrigin();

  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: `${SITE.nameAccent} Sushi`,
    description: SITE.tagline,
    servesCuisine: ["Sushi", "Cuisine japonaise", "Wok", "Thaï"],
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE.address,
      addressLocality: SITE.city,
      addressCountry: "MA",
    },
    telephone: "+212520026824",
    sameAs: [SITE.instagram],
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday"],
        opens: "12:00",
        closes: "23:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Friday", "Saturday", "Sunday"],
        opens: "12:00",
        closes: "00:00",
      },
    ],
  };

  if (origin) {
    data.url = origin;
    const heroImg = SITE.heroHeroBgImage.startsWith("http")
      ? SITE.heroHeroBgImage
      : `${origin}${SITE.heroHeroBgImage}`;
    data.image = [heroImg, `${origin}${SITE.logoUrl}`];
  } else if (SITE.heroHeroBgImage.startsWith("http")) {
    data.image = [SITE.heroHeroBgImage];
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
