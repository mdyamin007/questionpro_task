import { Outlet } from "react-router";
import type { TabLink } from "../ui/MyTabs";
import MyTabs from "../ui/MyTabs";
import Divider from "../ui/Divider";
import UserInfo from "../common/UserInfo";

const outerTabs: TabLink[] = [
  { label: "Home", to: "/", end: true },
  { label: "Dashboard", to: "/dashboard" }, // lands on default inner tab
  { label: "MyComponent", to: "/my-component", end: true },
];

function MainLayout() {
  return (
    <div className="container mx-auto p-2">
      <MyTabs items={outerTabs} />

      <Divider className="my-2" />

      <div className="relative">
        <Outlet />

        <UserInfo username="John Doe" email="test@gmail.com" />
      </div>
    </div>
  );
}

export default MainLayout;
