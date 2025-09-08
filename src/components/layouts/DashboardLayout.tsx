import { Outlet } from "react-router";
import MyTabs from "../ui/MyTabs";
import { INNER_TABS } from "../../constants/tabs.constants";

export default function DashboardLayout() {
  return (
    <div>
      <MyTabs items={INNER_TABS} />
      <div className="mt-3">
        <Outlet />
      </div>
    </div>
  );
}
