/**
 * Chart atmosphere. The market image sits on the right and dissolves into
 * the navy field so the page keeps the same light as the photograph.
 */
export function WorldBackground({ variant = "home" }: { variant?: "home" | "experience" }) {
  const heightClass = variant === "home" ? "h-[100vh] min-h-[720px]" : "h-[62vh] min-h-[460px]";

  return (
    <div
      className={`pointer-events-none absolute inset-x-0 top-0 -z-10 overflow-hidden ${heightClass}`}
      aria-hidden
    >
      {variant === "experience" && (
        <img
          src="/market-chart.png"
          alt=""
          className="absolute right-0 top-0 h-full w-[min(100%,920px)] object-cover object-left opacity-70"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/75 to-background/10" />
      <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-transparent to-background" />
      <div className="absolute -left-10 top-24 h-56 w-56 rounded-full bg-primary/20 blur-3xl" />
      <div className="absolute bottom-10 right-[18%] h-40 w-40 rounded-full bg-energy/25 blur-3xl" />
    </div>
  );
}
