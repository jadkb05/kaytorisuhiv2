import { SITE, whatsappHref } from "../config/site";
import { BrandLogo } from "./BrandLogo";
import { Reveal } from "./Reveal";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-kaytori-black px-4 py-12 text-white/75 md:py-14">
      <div className="mx-auto w-[min(1200px,92vw)]">
        <Reveal>
          <div className="flex flex-col items-center gap-6 border-b border-white/10 pb-10 text-center md:pb-12 lg:flex-row lg:justify-between lg:text-left">
            <div className="flex flex-col items-center gap-4 lg:flex-row lg:items-start lg:gap-5">
              <BrandLogo
                size={52}
                className="shadow-[0_12px_40px_rgba(201,168,76,0.25)]"
              />
              <div>
                <div className="font-display text-2xl font-semibold text-white">
                  {SITE.name}
                </div>
                <div className="mt-1 text-sm font-semibold uppercase tracking-[0.18em] text-[#f2c94c]">
                  Sushi • Wok • Thaï
                </div>
              </div>
            </div>
            <p className="max-w-md text-[0.9rem] leading-relaxed text-white/55 md:text-sm">
              Signature culinaire entre traditions nippones, wok et accents thaï
              — le tout orchestré dans un esprit maison, précis et chaleureux.
            </p>
          </div>
        </Reveal>

        {/* Grid contact rapide */}
        <Reveal>
          <div className="my-10 grid gap-4 sm:grid-cols-2 md:grid-cols-4 md:gap-6">
            <div className="text-center sm:text-left">
              <div className="text-[0.7rem] font-bold uppercase tracking-wider text-kaytori-gold/70">
                Adresse
              </div>
              <p className="mt-1.5 text-[0.85rem] leading-relaxed text-white/70">
                {SITE.address}
              </p>
            </div>
            <div className="text-center sm:text-left">
              <div className="text-[0.7rem] font-bold uppercase tracking-wider text-kaytori-gold/70">
                Horaires
              </div>
              <p className="mt-1.5 text-[0.85rem] leading-relaxed text-white/70">
                Lun–Jeu : {SITE.hoursWeekdays}
                <br />
                Ven–Dim : {SITE.hoursWeekend}
              </p>
            </div>
            <div className="text-center sm:text-left">
              <div className="text-[0.7rem] font-bold uppercase tracking-wider text-kaytori-gold/70">
                Contact
              </div>
              <p className="mt-1.5 text-[0.85rem] leading-relaxed text-white/70">
                <a
                  href="tel:+212520026824"
                  className="block hover:text-kaytori-goldLight"
                >
                  {SITE.phoneFixeDisplay}
                </a>
                <a
                  href={whatsappHref()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block hover:text-kaytori-goldLight"
                >
                  WhatsApp
                </a>
              </p>
            </div>
            <div className="text-center sm:text-left">
              <div className="text-[0.7rem] font-bold uppercase tracking-wider text-kaytori-gold/70">
                Suivez-nous
              </div>
              <p className="mt-1.5 text-[0.85rem] leading-relaxed text-white/70">
                <a
                  href={SITE.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-kaytori-goldLight"
                >
                  @kaytorisushi
                </a>
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal>
          <div className="mx-auto mb-8 max-w-[640px] rounded-2xl border border-kaytori-gold/35 bg-gradient-to-br from-white/[0.07] to-transparent px-6 py-5 text-center backdrop-blur-sm md:mb-10 md:py-6">
            <p className="m-0 font-display text-[0.95rem] italic leading-relaxed text-white/88 md:text-[1.05rem]">
              « Chaque bouchée chez Kaytôri est une histoire.
              <br />
              Merci de la partager avec nous. »
            </p>
          </div>
        </Reveal>

        <div className="border-t border-white/10 pt-6 text-center text-[0.78rem] text-white/40 md:flex md:justify-between md:text-left">
          <p>
            © {new Date().getFullYear()} {SITE.name}. Tous droits réservés.
          </p>
          <p className="mt-2 md:mt-0">
            Site web — Sushi · Wok · Thaï
          </p>
        </div>
      </div>
    </footer>
  );
}
