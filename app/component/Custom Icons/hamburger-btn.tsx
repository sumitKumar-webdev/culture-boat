export function HamburgerButton({
  open,
  onToggle,
}: {
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      className="relative z-45 inline-flex h-12.5 w-12.5 cursor-pointer flex-col items-center justify-center gap-1.5 rounded-full border-0 bg-transparent text-white"
      onClick={onToggle}
      aria-expanded={open}
      aria-label={open ? "Close navigation menu" : "Open navigation menu"}
    >
      <span
        className={`block h-1 w-6.5 rounded-full bg-current transition-all duration-300 ${
          open ? "translate-y-2 rotate-45" : ""
        }`}
      />
      <span
        className={`block h-0.5 w-6.5 rounded-full bg-current transition-all duration-300 ${
          open ? "opacity-0" : ""
        }`}
      />
      <span
        className={`block h-0.5 w-6.5 rounded-full bg-current transition-all duration-300 ${
          open ? "-translate-y-2 -rotate-45" : ""
        }`}
      />
    </button>
  );
}
