"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, type ReactNode, type RefObject } from "react";

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]):not([type="hidden"]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

interface DialogProps {
  open: boolean;
  onClose: () => void;
  /** id naslova unutar dijaloga */
  labelledBy: string;
  describedBy?: string;
  children: ReactNode;
  /**
   * "sheet": centriran modal na većim ekranima, panel sa dna na telefonu.
   * "drawer": bočni panel sa desne strane (mobilni meni).
   */
  variant?: "sheet" | "drawer";
  /** Element koji dobija fokus pri otvaranju; podrazumevano sam panel */
  initialFocusRef?: RefObject<HTMLElement | null>;
  panelClassName?: string;
}

/**
 * Pristupačan dijalog: fokus ostaje unutar panela, Escape i klik na pozadinu
 * zatvaraju, skrol stranice je zaključan, a fokus se po zatvaranju vraća na
 * kontrolu koja je dijalog otvorila.
 */
export function Dialog({
  open,
  onClose,
  labelledBy,
  describedBy,
  children,
  variant = "sheet",
  initialFocusRef,
  panelClassName = "",
}: DialogProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const previouslyFocused =
      document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const { body, documentElement } = document;
    const scrollbarWidth = window.innerWidth - documentElement.clientWidth;
    const previousOverflow = body.style.overflow;
    const previousPadding = body.style.paddingRight;

    // Zaključavamo skrol i nadoknađujemo širinu skrolbara, da se stranica
    // i fiksirano zaglavlje ne pomere kada skrolbar nestane.
    body.style.overflow = "hidden";
    if (scrollbarWidth > 0) {
      body.style.paddingRight = `${scrollbarWidth}px`;
      documentElement.style.setProperty("--scrollbar-comp", `${scrollbarWidth}px`);
    }

    const frame = window.requestAnimationFrame(() => {
      const target = initialFocusRef?.current ?? panelRef.current;
      target?.focus({ preventScroll: true });
    });

    return () => {
      window.cancelAnimationFrame(frame);
      body.style.overflow = previousOverflow;
      body.style.paddingRight = previousPadding;
      documentElement.style.removeProperty("--scrollbar-comp");
      previouslyFocused?.focus({ preventScroll: true });
    };
  }, [open, initialFocusRef]);

  // Tastatura se prati na nivou dokumenta: Escape i zamka za fokus rade i kada
  // fokus privremeno ostane bez elementa (npr. forma se zameni potvrdom).
  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.stopPropagation();
        onClose();
        return;
      }
      if (event.key !== "Tab") return;

      const panel = panelRef.current;
      if (!panel) return;

      const items = Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
        (element) => element.getClientRects().length > 0,
      );
      if (items.length === 0) {
        event.preventDefault();
        panel.focus();
        return;
      }

      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement;
      const outside = !panel.contains(active);

      if (event.shiftKey && (active === first || active === panel || outside)) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && (active === last || outside)) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  const isDrawer = variant === "drawer";

  return (
    <AnimatePresence>
      {open ? (
        <div
          key="dialog"
          className={`fixed inset-0 z-[70] flex ${
            isDrawer ? "justify-end" : "items-end justify-center sm:items-center sm:p-6"
          }`}
        >
          <motion.div
            aria-hidden="true"
            className="absolute inset-0 bg-coal-950/70 backdrop-blur-[3px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            onClick={onClose}
          />
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={labelledBy}
            aria-describedby={describedBy}
            tabIndex={-1}
            className={`relative outline-none ${
              isDrawer
                ? "h-full w-[min(22rem,88vw)] overflow-y-auto overscroll-contain bg-coal-900 text-paper-50 shadow-lift"
                : "max-h-[92dvh] w-full overflow-y-auto overscroll-contain rounded-t-2xl bg-paper-50 text-ink shadow-sheet sm:max-w-2xl sm:rounded-2xl"
            } ${panelClassName}`}
            initial={isDrawer ? { x: "100%" } : { opacity: 0, y: 24 }}
            animate={isDrawer ? { x: 0 } : { opacity: 1, y: 0 }}
            exit={isDrawer ? { x: "100%" } : { opacity: 0, y: 16 }}
            transition={{ duration: isDrawer ? 0.32 : 0.28, ease: [0.16, 1, 0.3, 1] }}
          >
            {children}
          </motion.div>
        </div>
      ) : null}
    </AnimatePresence>
  );
}
