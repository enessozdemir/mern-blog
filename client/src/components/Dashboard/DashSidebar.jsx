import {
  Sidebar,
  SidebarItem,
  SidebarItemGroup,
  SidebarItems,
} from "flowbite-react";
import { useEffect, useState } from "react";
import { FiUser, FiLogOut } from "react-icons/fi";
// import { LuLayoutDashboard } from "react-icons/lu";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";

export default function DashSidebar() {
  const location = useLocation();
  const { theme } = useSelector((state) => state.theme);
  const [tab, setTab] = useState(0);
  console.log(location.pathname);
  useEffect(() => {
    const currentTab = new URLSearchParams(location.search);
    const tabFromUrl = currentTab.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);
  return (
    <Sidebar className={`w-full md:w-64 ${theme === "dark" ? "border-r border-lighter-icon-color border-opacity-10" : null}`}>
      <SidebarItems>
        <SidebarItemGroup>
          <Link to="/dashboard?tab=profile">
            <SidebarItem
              active={tab === "profile"}
              icon={FiUser}
              label={"User"}
              labelColor={"dark"}
            >
              Profile
            </SidebarItem>
          </Link>
          <SidebarItem icon={FiLogOut} className="cursor-pointer">
            Sign Out
          </SidebarItem>
        </SidebarItemGroup>
      </SidebarItems>
    </Sidebar>
  );
}
