import { NavLink } from "react-router";

export type TabLink = {
  label: string;
  to: string;
};

type PropsType = {
  items: TabLink[];
  "aria-label"?: string;
  className?: string;
};

export default function MyTabs({
  items,
  className,
  "aria-label": ariaLabel = "Tabs",
}: PropsType) {
  return (
    <div
      role="tablist"
      aria-label={ariaLabel}
      className={["flex gap-2", className].filter(Boolean).join(" ")}
    >
      {items.map((t) => (
        <NavLink
          key={t.to}
          to={t.to}
          end
          role="tab"
          className={({ isActive }) =>
            [
              "inline-flex items-center p-2 text-sm",
              "text-black hover:bg-blue-600 hover:text-white rounded",
              isActive ? "font-semibold bg-blue-600 text-white" : "font-medium",
            ].join(" ")
          }
        >
          {({ isActive }: { isActive: boolean }) => (
            <span
              tabIndex={isActive ? 0 : -1}
              aria-current={isActive ? "page" : undefined}
              aria-selected={isActive}
            >
              {t.label}
            </span>
          )}
        </NavLink>
      ))}
    </div>
  );
}
