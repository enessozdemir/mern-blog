import {
  Sidebar,
  SidebarItem,
  SidebarItemGroup,
  SidebarItems,
} from "flowbite-react";
import { useEffect, useState } from "react";
import { FiUser, FiLogOut } from "react-icons/fi";
// import { LuLayoutDashboard } from "react-icons/lu";
import { useSelector, useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { signOutSuccess } from "../../redux/user/userSlice";

export default function DashSidebar() {
  const location = useLocation();
  const dispatch = useDispatch();
  const { theme } = useSelector((state) => state.theme);
  const [tab, setTab] = useState(0);
  useEffect(() => {
    const currentTab = new URLSearchParams(location.search);
    const tabFromUrl = currentTab.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  const handleSignOut = async () => {
    try {
      const response = await fetch("/api/user/signout", {
        method: "POST",
      });
      const data = await response.json();

      if (!response.ok) {
        console.log(data.message);
      } else {
        // window.location.href = "/sign-in";
        dispatch(signOutSuccess());
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Sidebar
      className={`w-full md:w-64 ${
        theme === "dark"
          ? "border-r border-lighter-icon-color border-opacity-10"
          : null
      }`}
    >
      <SidebarItems>
        <SidebarItemGroup>
          <Link to="/dashboard?tab=profile">
            <SidebarItem
              active={tab === "profile"}
              icon={FiUser}
              label={"User"}
              labelColor={"dark"}
              as="div"
            >
              Profile
            </SidebarItem>
          </Link>
          <SidebarItem
            onClick={handleSignOut}
            icon={FiLogOut}
            className="cursor-pointer"
          >
            Sign Out
          </SidebarItem>
        </SidebarItemGroup>
      </SidebarItems>
    </Sidebar>
  );
}
