import { SITE, whatsappHref } from "../config/site";
import { BrandLogo } from "./BrandLogo";
import { Reveal } from "./Reveal";

export function ContactSection() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-white py-16 md:py-24"
    >
      {/* Décorations subtiles */}
      <div
        className="pointer-events-none absolute -left-32 top-1/3 h-72 w-72 rounded-full bg-kaytori-green/5 blur-[80px]"
        aria-hidden
      />

      <div className="relative mx-auto w-[min(1200px,92vw)]">
        <Reveal>
          <div className="mb-10 flex flex-col items-center gap-4 text-center md:mb-14 lg:flex-row lg:justify-between lg:text-left">
            <div>
              <span className="text-[0.7rem] font-bold uppercase tracking-[0.22em] text-kaytori-gold">
                Visites & réservations
              </span>
              <h2 className="mt-3 font-display text-[clamp(1.85rem,4.5vw,3rem)] font-semibold leading-tight tracking-tight text-kaytori-black">
                Contact &amp; <em className="italic text-kaytori-green">réservation</em>
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-[0.95rem] font-light leading-relaxed text-kaytori-muted md:text-lg lg:mx-0">
                Une table, un événement, une question — nous vous répondons avec
                la même attention qu&apos;au service.
              </p>
            </div>
            <div className="flex items-center gap-3 rounded-2xl border border-kaytori-black/8 bg-kaytori-cream px-5 py-4 shadow-card">
              <BrandLogo size={40} />
              <div className="text-left">
                <div className="text-xs font-bold uppercase tracking-wider text-kaytori-muted">
                  Maison Kaytori
                </div>
                <div className="font-display text-lg font-semibold text-kaytori-black">
                  {SITE.district}
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        <div className="grid gap-5 md:gap-6 lg:grid-cols-2 lg:gap-8">
          {/* Carte Coordonnées */}
          <Reveal>
            <article className="flex h-full flex-col rounded-2xl border border-kaytori-black/8 bg-kaytori-cream p-6 shadow-card md:p-8">
              <h3 className="font-display text-xl font-semibold text-kaytori-black">
                Coordonnées
              </h3>
              <p className="mt-3 leading-relaxed text-kaytori-muted">
                {SITE.address}
              </p>

              {/* Liens contact en grosses cartes touchables */}
              <div className="mt-6 grid gap-2.5">
                <a
                  href="tel:+212520026824"
                  className="group flex items-center gap-3 rounded-xl border border-kaytori-black/8 bg-white px-4 py-3.5 transition-all duration-300 ease-smooth hover:-translate-y-0.5 hover:border-kaytori-green/40 hover:shadow-card active:scale-[0.98]"
                >
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-kaytori-green/10 text-base">
                    📞
                  </span>
                  <div className="flex-1 text-left">
                    <div className="text-[0.7rem] font-bold uppercase tracking-wider text-kaytori-muted">
                      Téléphone fixe
                    </div>
                    <div className="font-display text-[0.95rem] font-semibold text-kaytori-black group-hover:text-kaytori-green">
                      {SITE.phoneFixeDisplay}
                    </div>
                  </div>
                  <span
                    className="text-kaytori-gold opacity-60 transition-opacity group-hover:opacity-100"
                    aria-hidden
                  >
                    →
                  </span>
                </a>

                <a
                  href={whatsappHref()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 rounded-xl border border-kaytori-black/8 bg-white px-4 py-3.5 transition-all duration-300 ease-smooth hover:-translate-y-0.5 hover:border-kaytori-green/40 hover:shadow-card active:scale-[0.98]"
                >
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#25D366]/15 text-base">
                    💬
                  </span>
                  <div className="flex-1 text-left">
                    <div className="text-[0.7rem] font-bold uppercase tracking-wider text-kaytori-muted">
                      WhatsApp
                    </div>
                    <div className="font-display text-[0.95rem] font-semibold text-kaytori-black group-hover:text-kaytori-green">
                      {SITE.phoneMobileDisplay}
                    </div>
                  </div>
                  <span
                    className="text-kaytori-gold opacity-60 transition-opacity group-hover:opacity-100"
                    aria-hidden
                  >
                    →
                  </span>
                </a>

                <a
                  href={SITE.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 rounded-xl border border-kaytori-black/8 bg-white px-4 py-3.5 transition-all duration-300 ease-smooth hover:-translate-y-0.5 hover:border-kaytori-green/40 hover:shadow-card active:scale-[0.98]"
                >
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gradient-to-br from-[#feda75]/40 via-[#d62976]/30 to-[#962fbf]/30 text-base">
                    📷
                  </span>
                  <div className="flex-1 text-left">
                    <div className="text-[0.7rem] font-bold uppercase tracking-wider text-kaytori-muted">
                      Instagram
                    </div>
                    <div className="font-display text-[0.95rem] font-semibold text-kaytori-black group-hover:text-kaytori-green">
                      @kaytorisushi
                    </div>
                  </div>
                  <span
                    className="text-kaytori-gold opacity-60 transition-opacity group-hover:opacity-100"
                    aria-hidden
                  >
                    →
                  </span>
                </a>

                <a
                  href={SITE.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 rounded-xl border border-kaytori-black/8 bg-white px-4 py-3.5 transition-all duration-300 ease-smooth hover:-translate-y-0.5 hover:border-kaytori-green/40 hover:shadow-card active:scale-[0.98]"
                >
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-kaytori-gold/15 text-base">
                    📍
                  </span>
                  <div className="flex-1 text-left">
                    <div className="text-[0.7rem] font-bold uppercase tracking-wider text-kaytori-muted">
                      Localisation
                    </div>
                    <div className="font-display text-[0.95rem] font-semibold text-kaytori-black group-hover:text-kaytori-green">
                      Ouvrir sur Google Maps
                    </div>
                  </div>
                  <span
                    className="text-kaytori-gold opacity-60 transition-opacity group-hover:opacity-100"
                    aria-hidden
                  >
                    →
                  </span>
                </a>
              </div>
            </article>
          </Reveal>

          {/* Carte Horaires + Réservation */}
          <Reveal>
            <article className="flex h-full flex-col rounded-2xl border border-kaytori-black/8 bg-white p-6 shadow-lift md:p-8">
              <h3 className="font-display text-xl font-semibold text-kaytori-black">
                Horaires d&apos;ouverture
              </h3>
              <ul className="mt-4 grid list-none gap-2.5 border-b border-kaytori-line pb-6 text-kaytori-muted">
                <li className="flex items-center justify-between gap-4">
                  <span className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-kaytori-green" />
                    Lundi – Jeudi
                  </span>
                  <span className="font-display text-[0.95rem] font-semibold text-kaytori-black">
                    {SITE.hoursWeekdays}
                  </span>
                </li>
                <li className="flex items-center justify-between gap-4">
                  <span className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-kaytori-gold" />
                    Vendredi – Dimanche
                  </span>
                  <span className="font-display text-[0.95rem] font-semibold text-kaytori-black">
                    {SITE.hoursWeekend}
                  </span>
                </li>
                <li className="mt-2 rounded-lg bg-kaytori-cream px-3 py-2 text-[0.8rem] italic text-kaytori-muted">
                  💡 Réservation recommandée le week-end
                </li>
              </ul>

              {/* CTAs grosses cartes */}
              <div className="mt-6 flex flex-col gap-3">
                <a
                  href={whatsappHref(
                    "Bonjour, je souhaite réserver une table chez Kaytôri."
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-shine group flex flex-col items-center justify-center gap-1 rounded-xl bg-gold-shine px-6 py-4 text-center text-kaytori-black shadow-card transition-all duration-300 ease-smooth hover:-translate-y-1 hover:shadow-gold"
                  aria-label="WhatsApp"
                >
                  <span className="font-display text-base font-semibold tracking-tight md:text-[1.05rem]">
                    💬 WhatsApp
                  </span>
                  <span className="text-[0.78rem] font-medium opacity-90">
                    Réponse rapide pendant les heures d&apos;ouverture
                  </span>
                </a>
                <a
                  href="tel:+212520026824"
                  className="group flex flex-col items-center justify-center gap-1 rounded-xl border-2 border-kaytori-black bg-transparent px-6 py-4 text-center transition-all duration-300 ease-smooth hover:-translate-y-0.5 hover:border-kaytori-gold hover:bg-kaytori-gold/10"
                  aria-label={`Appeler ${SITE.phoneFixeDisplay}`}
                >
                  <span className="font-display text-base font-semibold tracking-tight text-kaytori-black md:text-[1.05rem]">
                    📞 Appeler le restaurant
                  </span>
                  <span className="text-[0.78rem] font-semibold text-kaytori-green">
                    {SITE.phoneFixeDisplay}
                  </span>
                </a>
              </div>
            </article>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
