type Props = {
  className?: string;
  variant?: "asterisk" | "ring";
};

/** Decorative, hand-drawn-style accent marks. Purely ornamental; hidden from a11y tree. */
export function Scribble({ className = "", variant = "asterisk" }: Props) {
  if (variant === "ring") {
    return (
      <svg
        viewBox="0 0 100 100"
        className={className}
        aria-hidden
        fill="none"
        stroke="currentColor"
      >
        <circle cx="50" cy="50" r="46" strokeWidth="1.5" strokeDasharray="3 7" strokeLinecap="round" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden fill="none" stroke="currentColor">
      <path
        d="M24 4v40M6 14l36 20M42 14 6 34"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
