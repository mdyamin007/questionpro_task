import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type InputHTMLAttributes,
  type KeyboardEvent,
} from "react";

export type Option = { value: string; label: string; disabled?: boolean };

type Props = {
  options: Option[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  emptyText?: string;
  disabled?: boolean;
  className?: string;
  inputProps?: InputHTMLAttributes<HTMLInputElement>;
};

export function MySelect({
  options,
  value,
  defaultValue,
  onChange,
  placeholder = "Select…",
  emptyText = "No results",
  disabled = false,
  className = "w-72",
  inputProps,
}: Props) {
  const listboxId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = useState<string | undefined>(
    defaultValue
  );
  const selectedValue = isControlled ? value : internalValue;

  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [highlight, setHighlight] = useState<number>(-1);

  const selectedIndex = useMemo(
    () => options.findIndex((o) => o.value === selectedValue),
    [options, selectedValue]
  );
  const selected = selectedIndex >= 0 ? options[selectedIndex] : undefined;

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return options;
    return options.filter((o) => o.label.toLowerCase().includes(q));
  }, [options, search]);

  const clampAndSkipDisabled = useCallback(
    (start: number, dir: 1 | -1) => {
      if (filtered.length === 0) return -1;
      let i = start;
      for (let steps = 0; steps < filtered.length; steps++) {
        if (i < 0) i = filtered.length - 1;
        if (i >= filtered.length) i = 0;
        if (!filtered[i].disabled) return i;
        i += dir;
      }
      return -1;
    },
    [filtered]
  );

  const openMenu = useCallback(
    (resetSearch: boolean) => {
      if (disabled) return;
      setOpen(true);
      if (resetSearch) setSearch("");
      const idxInFiltered = filtered.findIndex(
        (o) => o.value === selectedValue
      );
      const start = idxInFiltered >= 0 ? idxInFiltered : 0;
      setHighlight(clampAndSkipDisabled(start, 1));
      queueMicrotask(() => inputRef.current?.focus());
    },
    [disabled, filtered, selectedValue, clampAndSkipDisabled]
  );

  const closeMenu = useCallback(() => {
    setOpen(false);
    setHighlight(-1);
    if (selected) setSearch("");
  }, [selected]);

  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (!wrapperRef.current) return;
      if (!wrapperRef.current.contains(e.target as Node)) {
        setOpen(false);
        setHighlight(-1);
      }
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  useEffect(() => {
    if (!open || highlight < 0 || !listRef.current) return;
    const el = listRef.current.querySelector<HTMLElement>(
      `[data-index="${highlight}"]`
    );
    el?.scrollIntoView({ block: "nearest" });
  }, [open, highlight]);

  const commit = useCallback(
    (opt: Option | undefined) => {
      if (!opt || opt.disabled) return;
      if (!isControlled) setInternalValue(opt.value);
      onChange?.(opt.value);
      setSearch("");
      setOpen(false);
    },
    [isControlled, onChange]
  );

  const inputDisplay = open ? search : selected?.label ?? "";

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (disabled) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (!open) openMenu(true);
      else setHighlight((i) => clampAndSkipDisabled((i < 0 ? -1 : i) + 1, 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (!open) openMenu(true);
      else
        setHighlight((i) =>
          clampAndSkipDisabled((i < 0 ? filtered.length : i) - 1, -1)
        );
    } else if (e.key === "Home") {
      if (open) {
        e.preventDefault();
        setHighlight(clampAndSkipDisabled(0, 1));
      }
    } else if (e.key === "End") {
      if (open) {
        e.preventDefault();
        setHighlight(clampAndSkipDisabled(filtered.length - 1, -1));
      }
    } else if (e.key === "Enter") {
      if (open) {
        e.preventDefault();
        const target = filtered[highlight] ?? filtered.find((o) => !o.disabled);
        commit(target);
      } else {
        openMenu(false);
      }
    } else if (e.key === "Escape") {
      if (open) {
        e.preventDefault();
        closeMenu();
      }
    }
  };

  return (
    <div ref={wrapperRef} className={`relative ${className}`}>
      {/* Control */}
      <div
        className={[
          "flex items-center rounded-md border bg-white text-sm",
          "border-gray-300 ",
          disabled ? "cursor-not-allowed opacity-60" : "cursor-text",
          "px-2.5 py-2",
          "focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500",
          "transition",
        ].join(" ")}
        onClick={() => (open ? inputRef.current?.focus() : openMenu(false))}
        aria-disabled={disabled || undefined}
      >
        <input
          ref={inputRef}
          role="combobox"
          aria-expanded={open}
          aria-controls={listboxId}
          aria-autocomplete="list"
          aria-activedescendant={
            open && highlight >= 0 ? `${listboxId}-opt-${highlight}` : undefined
          }
          placeholder={selected ? selected.label : placeholder}
          value={inputDisplay}
          onChange={(e) => {
            if (!open) setOpen(true);
            setSearch(e.target.value);
            setHighlight(0);
          }}
          onKeyDown={onKeyDown}
          disabled={disabled}
          className="w-full bg-transparent outline-none placeholder-gray-400"
          {...inputProps}
        />

        {/* Caret */}
        <svg
          aria-hidden="true"
          viewBox="0 0 20 20"
          className={[
            "ml-1 h-4 w-4 shrink-0 transition-transform",
            open ? "rotate-180" : "",
          ].join(" ")}
        >
          <path
            d="M6 8l4 4 4-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* Menu */}
      {open && (
        <div
          ref={listRef}
          id={listboxId}
          role="listbox"
          aria-label="Options"
          className={[
            "absolute z-50 mt-1 w-full rounded-md border bg-white shadow-lg",
            "border-gray-200 ",
            "max-h-60 overflow-y-auto p-1",
          ].join(" ")}
        >
          {filtered.length === 0 ? (
            <div className="px-3 py-2 text-sm text-gray-500">{emptyText}</div>
          ) : (
            filtered.map((opt, i) => {
              const isSelected = opt.value === selectedValue;
              const isActive = i === highlight;
              return (
                <div
                  key={opt.value}
                  id={`${listboxId}-opt-${i}`}
                  data-index={i}
                  role="option"
                  aria-selected={isSelected}
                  onMouseEnter={() => setHighlight(i)}
                  onMouseDown={(e) => e.preventDefault()} // keep focus on input
                  onClick={() => commit(opt)}
                  className={[
                    "flex items-center gap-2 rounded-md px-3 py-2 text-sm select-none",
                    opt.disabled
                      ? "text-gray-400 cursor-not-allowed"
                      : "cursor-pointer",
                    isActive ? "bg-gray-100" : "",
                    isSelected ? "font-medium" : "font-normal",
                  ].join(" ")}
                >
                  <span className="w-4 text-xs opacity-80" aria-hidden="true">
                    {isSelected ? "✓" : ""}
                  </span>
                  <span>{opt.label}</span>
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
}
