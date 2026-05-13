/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** URL canonique du site (HTTPS, sans slash final) — SEO / JSON-LD */
  readonly VITE_PUBLIC_SITE_URL?: string;
}
