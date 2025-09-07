import { Outlet } from "react-router";
import type { TabLink } from "../ui/MyTabs";
import MyTabs from "../ui/MyTabs";

export default function DashboardLayout() {
  const innerTabs: TabLink[] = [
    { label: "Posts", to: "/dashboard/posts" },
    { label: "Comments", to: "/dashboard/comments" },
  ];

  return (
    <div>
      <MyTabs items={innerTabs} />
      <div className="mt-3">
        <Outlet />
      </div>
    </div>
  );
}
