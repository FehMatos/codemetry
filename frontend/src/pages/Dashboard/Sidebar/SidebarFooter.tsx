import { useEffect, useRef, useState } from "react";
import { ChevronRight, LogOut, Moon } from "lucide-react";

export default function SidebarFooter() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);

  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    }

    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  return (
    <div ref={menuRef} className="relative border-t border-border px-4 py-5">
      {/* User */}
      <div className="flex items-center gap-3">
        {/* Avatar */}
        <div className="h-9 w-9 shrink-0 rounded-full bg-surface-secondary">
          {/* Futuramente: imagem do usuário */}
        </div>

        {/* User name */}
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium text-text-primary">
            Felipe M.
          </p>
        </div>

        {/* Toggle menu */}
        <button
          onClick={() => setIsMenuOpen((prev) => !prev)}
          className="shrink-0"
          aria-label="Open user menu"
        >
          <ChevronRight
            className={`
              h-5 w-5 cursor-pointer text-text-secondary
              transition-transform duration-200
              ${isMenuOpen ? "rotate-90" : ""}
            `}
          />
        </button>
      </div>

      {/* User menu */}
      <div
        className={`
          absolute bottom-full right-4 mb-2 w-52
          origin-bottom-right rounded-xl border border-border
          bg-surface p-1.5 shadow-lg
          transition-all duration-200 ease-out
          ${
            isMenuOpen
              ? "translate-y-0 scale-100 opacity-100"
              : "pointer-events-none translate-y-2 scale-95 opacity-0"
          }
        `}
      >
        {/* Dark mode */}
        <div
          className="
            flex items-center gap-3
            rounded-lg px-3 py-2.5
            text-sm text-text-secondary bg-white/5
          "
        >
          <Moon className="h-4 w-4 shrink-0" />

          <span className="flex-1">Dark mode</span>

          {/* Toggle */}
          <button
            type="button"
            role="switch"
            aria-checked={isDarkMode}
            onClick={() => setIsDarkMode((prev) => !prev)}
            className={`
    relative h-5 w-9 shrink-0 rounded-full
    transition-colors duration-200
    ${isDarkMode ? "bg-primary" : "bg-black/20"}
  `}
          >
            <span
              className={`
      absolute left-0.5 top-0.5
      h-4 w-4 rounded-full
      bg-white shadow-sm
      transition-transform duration-200
      ${isDarkMode ? "translate-x-4" : "translate-x-0"}
    `}
            />
          </button>
        </div>

        {/* Logout */}
        <button
          className="
            flex w-full items-center gap-3
            rounded-lg px-3 py-2.5
            text-sm text-text-secondary
            transition-colors
            hover:bg-surface-secondary
            hover:text-text-primary
          "
        >
          <LogOut className="h-4 w-4" />

          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}
