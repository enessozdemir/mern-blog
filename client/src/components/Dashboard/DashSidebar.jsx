import {
  Sidebar,
  SidebarItem,
  SidebarItemGroup,
  SidebarItems,
} from "flowbite-react";
import { useEffect, useState } from "react";
import { PiUser, PiSignOut } from "react-icons/pi";
import { Link, useLocation } from "react-router-dom";

export default function DashSidebar() {
  const location = useLocation();
  const [tab, setTab] = useState(0);
  useEffect(() => {
    const currentTab = new URLSearchParams(location.search);
    const tabFromUrl = currentTab.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);
  return (
    <Sidebar className="w-full md:w-56 border-b sm:border-r border-lighter-icon-color border-opacity-10">
      <SidebarItems>
        <SidebarItemGroup>
          <Link to="/dashboard?tab=profile">
            <SidebarItem
              active={tab === "profile"}
              icon={PiUser}
              label={"User"}
              labelColor={"dark"}
            >
              Profile
            </SidebarItem>
          </Link>
          <SidebarItem icon={PiSignOut} className="cursor-pointer">
            Sign Out
          </SidebarItem>
        </SidebarItemGroup>
      </SidebarItems>
    </Sidebar>
  );
}
