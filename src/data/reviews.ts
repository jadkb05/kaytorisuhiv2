export type Review = {
  id: string;
  initials: string;
  name: string;
  dateLabel: string;
  rating: number;
  body: string;
  avatarColor: string;
};

export const REVIEWS: Review[] = [
  {
    id: "r1",
    initials: "SB",
    name: "Salma Benali",
    dateLabel: "il y a 3 jours",
    rating: 5,
    body:
      "Franchement c'est le meilleur resto japonais de Casa. Les aromakis sont incroyables et la présentation est digne d'un grand restaurant. Le service est aux petits soins, on s'est sentis vraiment bienvenus. On reviendra c'est sûr !",
    avatarColor: "#E53935",
  },
  {
    id: "r2",
    initials: "YA",
    name: "Youssef Alami",
    dateLabel: "il y a 1 semaine",
    rating: 5,
    body:
      "Le plateau California à 89 dh vaut vraiment le détour. Portions généreuses, poisson ultra frais et l'ambiance du restaurant est vraiment top. Les cocktails tiki sont un bonus. Je recommande à 100 %.",
    avatarColor: "#1E88E5",
  },
  {
    id: "r3",
    initials: "NC",
    name: "Nadia Chraibi",
    dateLabel: "il y a 2 semaines",
    rating: 5,
    body:
      "On a fêté mon anniversaire chez Kaytori et c'était parfait. L'équipe a été super attentionnée. Les rouleaux mangue sont à tomber par terre. Cadre magnifique, digne des grandes villes. Merci Kaytori !",
    avatarColor: "#43A047",
  },
];
