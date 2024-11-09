import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DashSidebar from "../components/Dashboard/DashSidebar";
import DashProfile from "../components/Dashboard/DashProfile";
import DashPosts from "../components/Dashboard/DashPosts";
import DashUsers from "../components/Dashboard/DashUsers";
import DashComments from "../components/Dashboard/DashComments";
import DashComponent from "../components/Dashboard/DashComponent";

export default function Dashboard() {
  const location = useLocation();
  const [tab, setTab] = useState("dash");
  useEffect(() => {
    const currentTab = new URLSearchParams(location.search);
    const tabFromUrl = currentTab.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  return (
    <div className="min-h-screen flex flex-col md:flex-row border-b border-lighter-icon-color border-opacity-10">
      {/* Sidebar */}
      <div className="md:w-64 hidden sm:block">
        <DashSidebar />
      </div>

      {location.pathname === "/dashboard" && tab === "dash" && (
        <DashComponent />
      )}

      {/* Profile */}
      {tab === "profile" && <DashProfile />}

      {/* Posts */}
      {tab === "posts" && <DashPosts />}

      {/* Users */}
      {tab === "users" && <DashUsers />}

      {/* Comments */}
      {tab === "comments" && <DashComments />}
    </div>
  );
}
