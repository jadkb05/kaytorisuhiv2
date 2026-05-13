import type { ReactNode } from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import pdfWorkerSrc from "pdfjs-dist/build/pdf.worker.min.mjs?url";

pdfjs.GlobalWorkerOptions.workerSrc = pdfWorkerSrc;

type MenuPdfViewerProps = {
  fileUrl: string;
};

const ZOOM_MIN = 0.75;
const ZOOM_MAX = 2;
const ZOOM_STEP = 0.15;
/** Zoom affiché au chargement et après « réinitialiser » */
const DEFAULT_ZOOM = 0.85;

function ToolbarBtn({
  children,
  onClick,
  disabled,
  title,
}: {
  children: ReactNode;
  onClick: () => void;
  disabled?: boolean;
  title: string;
}) {
  return (
    <button
      type="button"
      title={title}
      aria-label={title}
      disabled={disabled}
      onClick={onClick}
      className="grid h-8 min-w-[2.35rem] place-items-center rounded-lg border border-white/[0.14] bg-gradient-to-b from-white/[0.08] to-white/[0.03] px-2.5 text-xs font-semibold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] transition-all hover:border-kaytori-gold/55 hover:from-kaytori-gold/15 hover:to-white/[0.06] disabled:pointer-events-none disabled:opacity-35"
    >
      {children}
    </button>
  );
}

export function MenuPdfViewer({ fileUrl }: MenuPdfViewerProps) {
  const shellRef = useRef<HTMLDivElement>(null);
  const [innerWidth, setInnerWidth] = useState(0);
  const [numPages, setNumPages] = useState<number | null>(null);
  const [scale, setScale] = useState(DEFAULT_ZOOM);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    const el = shellRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => {
      const w = el.clientWidth;
      setInnerWidth(w > 0 ? w : 0);
    });
    ro.observe(el);
    setInnerWidth(el.clientWidth);
    return () => ro.disconnect();
  }, []);

  const pageWidth = Math.max(240, Math.floor(innerWidth * scale) - 32);

  const zoomOut = useCallback(() => setScale((s) => Math.max(ZOOM_MIN, +(s - ZOOM_STEP).toFixed(2))), []);
  const zoomIn = useCallback(() => setScale((s) => Math.min(ZOOM_MAX, +(s + ZOOM_STEP).toFixed(2))), []);
  const zoomReset = useCallback(() => setScale(DEFAULT_ZOOM), []);

  const onDocLoad = useCallback(({ numPages: n }: { numPages: number }) => {
    setNumPages(n);
    setLoadError(null);
  }, []);

  const onDocError = useCallback(() => {
    setLoadError("Impossible de charger le PDF dans le navigateur.");
  }, []);

  return (
    <div ref={shellRef} className="menu-pdf-viewer flex flex-col overflow-hidden">
      <div className="relative z-[2] shrink-0 overflow-hidden border-b border-white/[0.07] bg-[#0b1411] px-3 py-3 sm:px-5">
        <div className="relative mx-auto flex max-w-4xl flex-col items-stretch gap-2.5 text-center sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:text-left">
          <div className="min-w-0 flex-1 px-1">
            <p className="text-[0.58rem] font-bold uppercase tracking-[0.2em] text-kaytori-goldLight/72">
              Signature Kaytôri
            </p>
            <p className="mt-0.5 font-display text-[clamp(0.78rem,2.1vw,0.92rem)] italic leading-snug text-[#ebe4dc]/92">
              « Chaque bouchée chez Kaytôri est une histoire.
              <br />
              Merci de la partager avec nous. »
              {numPages !== null ? (
                <span className="sr-only">
                  {" "}
                  — {numPages} pages chargées.
                </span>
              ) : null}
            </p>
          </div>

          <div
            role="toolbar"
            aria-label="Contrôles du menu PDF"
            className="mx-auto flex shrink-0 items-center justify-center gap-1 rounded-xl border border-white/[0.1] bg-white/[0.035] px-1.5 py-1 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] backdrop-blur-sm sm:mx-0"
          >
            <ToolbarBtn title="Zoom arrière" onClick={zoomOut} disabled={scale <= ZOOM_MIN}>
              −
            </ToolbarBtn>
            <button
              type="button"
              title="Revenir au zoom par défaut (85 %)"
              aria-label="Revenir au zoom par défaut (85 %)"
              onClick={zoomReset}
              className="min-w-[3.75rem] rounded-lg border border-kaytori-gold/40 bg-gradient-to-b from-kaytori-gold/[0.18] to-kaytori-gold/[0.06] px-2 py-1.5 text-[0.72rem] font-bold tabular-nums text-kaytori-goldLight shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] transition-colors hover:border-kaytori-gold/55 hover:from-kaytori-gold/[0.24]"
            >
              {Math.round(scale * 100)}%
            </button>
            <ToolbarBtn title="Zoom avant" onClick={zoomIn} disabled={scale >= ZOOM_MAX}>
              +
            </ToolbarBtn>
          </div>
        </div>
      </div>

      {/* Hauteur fixe comme l’iframe : le défilement reste dans ce cadre, pas sur toute la page */}
      <div className="relative h-[min(74vh,900px)] overflow-y-auto overflow-x-hidden overscroll-contain bg-[#151c19] sm:h-[min(80vh,980px)]">
        <div className="pointer-events-none absolute inset-0 opacity-[0.05]" aria-hidden style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }} />

        {innerWidth === 0 ? (
          <div className="flex min-h-[min(40vh,360px)] items-center justify-center px-6 py-16">
            <div className="h-12 w-12 animate-pulse rounded-full border-2 border-kaytori-gold/40 border-t-kaytori-goldLight" />
          </div>
        ) : loadError ? (
          <div className="relative z-[1] mx-auto max-w-md px-6 py-16 text-center">
            <p className="font-display text-lg text-white/88">{loadError}</p>
            <a
              href={fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-shine mt-6 inline-flex rounded-xl bg-gold-shine px-6 py-3 text-sm font-semibold text-kaytori-black shadow-card"
            >
              Ouvrir le PDF dans un nouvel onglet
            </a>
          </div>
        ) : (
          <div className="relative z-[1] px-3 pb-10 pt-5 sm:px-6">
            <Document
              file={fileUrl}
              onLoadSuccess={onDocLoad}
              onLoadError={onDocError}
              loading={
                <div className="flex min-h-[min(40vh,360px)] flex-col items-center justify-center gap-4 py-12">
                  <div className="h-14 w-14 animate-spin rounded-full border-[3px] border-white/10 border-t-kaytori-goldLight" />
                  <p className="text-sm font-medium text-white/45">Ouverture de la carte…</p>
                </div>
              }
              className="flex flex-col items-center gap-6"
            >
              {numPages !== null &&
                Array.from({ length: numPages }, (_, i) => (
                  <div
                    key={`p-${i + 1}`}
                    className="overflow-hidden rounded-lg shadow-[0_16px_48px_-12px_rgba(0,0,0,0.65)] ring-1 ring-white/[0.09]"
                  >
                    <Page
                      pageNumber={i + 1}
                      width={pageWidth}
                      renderTextLayer={false}
                      renderAnnotationLayer={false}
                      loading={
                        <div
                          className="flex items-center justify-center bg-[#1e2622]"
                          style={{ width: pageWidth, minHeight: Math.floor(pageWidth * 1.35) }}
                        >
                          <span className="text-[0.72rem] font-semibold uppercase tracking-wider text-white/25">
                            Page {i + 1}
                          </span>
                        </div>
                      }
                    />
                  </div>
                ))}
            </Document>
          </div>
        )}
      </div>
    </div>
  );
}
