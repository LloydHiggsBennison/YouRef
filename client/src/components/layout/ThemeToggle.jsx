import { classNames } from "../../utils";

export function ThemeToggle({ theme, onToggle, className }) {
  return (
    <div className={classNames("theme-toggle", className)} aria-label="Cambiar tema">
      <button type="button" onClick={() => theme !== "light" && onToggle()} className={classNames("theme-icon-button", theme === "light" ? "is-active" : "")} aria-label="Modo claro">
        <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2.2M12 19.8V22M4.93 4.93l1.56 1.56M17.51 17.51l1.56 1.56M2 12h2.2M19.8 12H22M4.93 19.07l1.56-1.56M17.51 6.49l1.56-1.56" />
        </svg>
      </button>
      <button type="button" onClick={() => theme !== "dark" && onToggle()} className={classNames("theme-icon-button", theme === "dark" ? "is-active" : "")} aria-label="Modo oscuro">
        <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4" fill="currentColor">
          <path d="M20.2 14.1A8.5 8.5 0 0 1 9.9 3.8a.75.75 0 0 0-.94-.94A9.75 9.75 0 1 0 21.14 15a.75.75 0 0 0-.94-.9Z" />
        </svg>
      </button>
    </div>
  );
}
