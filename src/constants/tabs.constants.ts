import type { TabLink } from "../components/ui/MyTabs";

export const INNER_TABS: TabLink[] = [
  { label: "Posts", to: "/dashboard/posts" },
  { label: "Comments", to: "/dashboard/comments" },
];

export const OUTER_TABS: TabLink[] = [
  { label: "Home", to: "/", end: true },
  { label: "Dashboard", to: "/dashboard" },
  { label: "My Component", to: "/component", end: true },
];
