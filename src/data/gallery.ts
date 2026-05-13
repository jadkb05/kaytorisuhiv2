export type GalleryPhoto = {
  id: string;
  src: string;
  alt: string;
  layout: "hero-tall" | "wide" | "square";
};

/**
 * Galerie — photos haute définition (Unsplash, licence libre pour sites / usage commercial).
 * Paramètres `w` / `q` poussés pour une qualité maximale côté CDN (équivalent « très haute déf » ; le 8K dépend du fichier source Unsplash).
 * Pour des clichés 100 % Kaytôri : remplacez ces URLs par vos fichiers dans /public/gallery/.
 */
const U = "https://images.unsplash.com";

export const GALLERY: GalleryPhoto[] = [
  {
    id: "g1",
    src: `${U}/photo-1579584425555-c3ce17fd4351?auto=format&fit=crop&w=2000&h=2800&q=88`,
    alt: "Le festin Kaytôri — Sushi, Wok et cocktails Tiki",
    layout: "hero-tall",
  },
  {
    id: "g2",
    src: `${U}/photo-1559410545-0bdcd187e0a6?auto=format&fit=crop&w=2400&q=88`,
    alt: "L'art du sushi raffiné — chaque détail compte",
    layout: "wide",
  },
  {
    id: "g3",
    src: `${U}/photo-1611143669185-af224c5e3252?auto=format&fit=crop&w=2000&q=88`,
    alt: "Rouleaux tropicaux à la mangue douce",
    layout: "square",
  },
  {
    id: "g4",
    src: `${U}/photo-1534482421-64566f976cfa?auto=format&fit=crop&w=2000&q=88`,
    alt: "Entre amis, en couple ou solo — bienvenue chez Kaytôri",
    layout: "square",
  },
  {
    id: "g5",
    src: `${U}/photo-1580822184713-fc5400e7fe10?auto=format&fit=crop&w=3840&q=90`,
    alt: "Votre porte d'entrée vers un voyage culinaire",
    layout: "square",
  },
  {
    id: "g6",
    src: `${U}/photo-1553621042-f6e147245754?auto=format&fit=crop&w=3840&q=90`,
    alt: "Sushi & makis — fraîcheur et création maison",
    layout: "square",
  },
];
