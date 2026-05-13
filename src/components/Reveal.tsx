import { useEffect, useRef, useState } from "react";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
};

/** Révélation au scroll — seuils assouplis pour éviter les blocs restés invisibles. */
export function Reveal({ children, className = "" }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const markVisible = () => setVisible(true);

    const checkInView = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      if (rect.top < vh + 200 && rect.bottom > -120) {
        markVisible();
        return true;
      }
      return false;
    };

    if (checkInView()) return;

    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            markVisible();
            obs.disconnect();
            break;
          }
        }
      },
      { threshold: 0, rootMargin: "0px 0px 35% 0px" },
    );
    obs.observe(el);

    const t1 = window.setTimeout(() => {
      if (checkInView()) {
        obs.disconnect();
      }
    }, 120);

    return () => {
      window.clearTimeout(t1);
      obs.disconnect();
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal-anim${visible ? " is-visible" : ""} ${className}`.trim()}
    >
      {children}
    </div>
  );
}
