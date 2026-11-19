"use client";

import { useEffect, useRef } from "react";

/**
 * Pratilac kursora: mali prsten koji meko prati miš, širi se iznad
 * kontrola, a iznad elemenata sa `data-cursor="Tekst"` ispisuje taj tekst.
 *
 * Sistemski kursor ostaje vidljiv. Pratilac se ne pokreće na ekranima na
 * dodir ni uz `prefers-reduced-motion`.
 */
export function CursorFollower() {
  const rootRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const label = labelRef.current;
    if (!root || !label) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let targetX = -100;
    let targetY = -100;
    let x = -100;
    let y = -100;
    let frame = 0;
    let started = false;

    // Stanje zavisi od elementa ispod kursora; menja se i kada se stranica
    // skroluje ispod miša koji miruje.
    const updateState = (element: Element | null) => {
      const labelled = element?.closest<HTMLElement>("[data-cursor]");

      if (labelled?.dataset.cursor) {
        label.textContent = labelled.dataset.cursor;
        root.dataset.state = "label";
      } else if (element?.closest("input, textarea, select")) {
        root.dataset.state = "hidden";
      } else if (element?.closest("a, button, label, [role='tab']")) {
        root.dataset.state = "active";
      } else {
        root.dataset.state = "idle";
      }
    };

    const handleMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      targetX = event.clientX;
      targetY = event.clientY;

      if (!started) {
        started = true;
        x = targetX;
        y = targetY;
        root.dataset.visible = "true";
      }

      updateState(event.target instanceof Element ? event.target : null);
    };

    const handleScroll = () => {
      if (started) updateState(document.elementFromPoint(targetX, targetY));
    };

    const handleLeave = () => {
      root.dataset.visible = "false";
      started = false;
    };

    const tick = () => {
      x += (targetX - x) * 0.18;
      y += (targetY - y) * 0.18;
      root.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0)`;
      frame = window.requestAnimationFrame(tick);
    };

    document.addEventListener("pointermove", handleMove, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });
    document.documentElement.addEventListener("pointerleave", handleLeave);
    frame = window.requestAnimationFrame(tick);

    return () => {
      window.cancelAnimationFrame(frame);
      document.removeEventListener("pointermove", handleMove);
      window.removeEventListener("scroll", handleScroll);
      document.documentElement.removeEventListener("pointerleave", handleLeave);
    };
  }, []);

  return (
    <div ref={rootRef} className="cursor-follower" data-state="idle" aria-hidden="true">
      <span className="cursor-follower__ring">
        <span ref={labelRef} className="cursor-follower__label" />
      </span>
    </div>
  );
}
