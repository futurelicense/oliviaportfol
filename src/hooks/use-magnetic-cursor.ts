import { useEffect } from "react";

/**
 * Site-wide magnetic pull for any element with [data-magnetic]. Uses event
 * delegation so it works for elements mounted after the initial render, and
 * mutates transform directly to avoid React re-renders on every pointer move.
 */
export function useMagneticCursor(strength = 0.35) {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    let active: HTMLElement | null = null;
    let frame = 0;

    const reset = (el: HTMLElement) => {
      el.style.transform = "translate(0px, 0px)";
    };

    const onMove = (event: PointerEvent) => {
      const target =
        (event.target as HTMLElement | null)?.closest<HTMLElement>("[data-magnetic]") ?? null;

      if (target !== active) {
        if (active) reset(active);
        active = target;
      }
      if (!active) return;

      const rect = active.getBoundingClientRect();
      const x = (event.clientX - (rect.left + rect.width / 2)) * strength;
      const y = (event.clientY - (rect.top + rect.height / 2)) * strength;

      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        active?.style.setProperty("transform", `translate(${x}px, ${y}px)`);
      });
    };

    const onLeave = () => {
      if (active) reset(active);
      active = null;
    };

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
    };
  }, [strength]);
}
