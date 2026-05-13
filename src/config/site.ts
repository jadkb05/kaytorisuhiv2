/** URLs et coordonnées — alignées sur le profil @kaytorisushi. */

export const SITE = {
  name: "Kaytori Sushi",
  nameAccent: "Kaytôri",
  city: "Casablanca",
  tagline: "Une expérience culinaire unique.",
  district: "Les Perles de Californie",

  phoneFixeDisplay: "05 20 02 68 24",
  phoneMobileDisplay: "06 75 56 59 13",

  /** WhatsApp : ligne mobile (sans + ni espaces) */
  whatsappE164: "212675565913",

  address: "Les Perles de Californie, Mag 5 Av. Al Hachimi Al Filali, Casablanca",

  instagram: "https://www.instagram.com/kaytorisushi/",

  /** Logo officiel nettoyé et centré (fond extérieur transparent) */
  logoUrl: "/kaytori-logo-clean.png",

  /** Carte officielle PDF (plein écran Kaytori — pages image) */
  menuPdfUrl: "/menu-kaytori.pdf",

  /**
   * Fond hero plein écran (photo HD, licence Unsplash).
   * Remplacez par `/hero-plateau-sushi.png` ou autre fichier dans /public pour une photo maison.
   */
  heroHeroBgImage:
    "https://images.unsplash.com/photo-1611143669185-af224c5e3252?auto=format&fit=crop&w=2880&q=90",

  mapsUrl: "https://maps.app.goo.gl/gmXPPxTwrmFtF1U36",
  googleReviewsUrl:
    "https://www.google.com/maps/place/KAYT%C3%94RI+SUSHI/@33.5280816,-7.6180753,17z/data=!4m18!1m9!3m8!1s0xda62db0d6bc48fb:0xd46a63a15e06ffb7!2sKAYT%C3%94RI+SUSHI!8m2!3d33.5280816!4d-7.6155004!9m1!1b1!16s%2Fg%2F11xswkn5nh!3m7!1s0xda62db0d6bc48fb:0xd46a63a15e06ffb7!8m2!3d33.5280816!4d-7.6155004!9m1!1b1!16s%2Fg%2F11xswkn5nh?entry=ttu&g_ep=EgoyMDI2MDUwNi4wIKXMDSoASAFQAw%3D%3D",

  /** Horaires affichés (footer, contact, badge hero — une seule source de vérité) */
  hoursWeekdays: "12h – 23h",
  hoursWeekend: "12h – minuit",
} as const;

/** Base HTTPS du site en prod (ex. `https://xxx.vercel.app`). Fichier `.env` : `VITE_PUBLIC_SITE_URL=...` */
export function siteOrigin(): string {
  const raw = import.meta.env.VITE_PUBLIC_SITE_URL;
  if (typeof raw !== "string" || !raw.trim()) return "";
  return raw.replace(/\/+$/, "");
}

/**
 * Plage d’ouverture du jour pour le badge hero (lun–jeu vs ven–dim, selon la date du navigateur).
 */
export function heroTodayHoursRange(): string {
  const day = new Date().getDay(); // 0 dim … 6 sam
  const isLunJeu = day >= 1 && day <= 4;
  return isLunJeu ? SITE.hoursWeekdays : SITE.hoursWeekend;
}

export function whatsappHref(message?: string): string {
  const base = `https://wa.me/${SITE.whatsappE164}`;
  if (!message) return base;
  return `${base}?text=${encodeURIComponent(message)}`;
}
