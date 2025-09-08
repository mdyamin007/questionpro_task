import { Outlet } from "react-router";
import MyTabs from "../ui/MyTabs";
import Divider from "../ui/Divider";
import UserInfo from "../common/UserInfo";
import { OUTER_TABS } from "../../constants/tabs.constants";

function MainLayout() {
  return (
    <div className="container mx-auto p-2">
      <MyTabs items={OUTER_TABS} />

      <Divider className="my-2" />

      <div className="relative">
        <Outlet />

        <UserInfo />
      </div>
    </div>
  );
}

export default MainLayout;
