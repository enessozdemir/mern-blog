import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DashSidebar from "../components/Dashboard/DashSidebar";
import DashProfile from "../components/Dashboard/DashProfile";
import DashPosts from "../components/Dashboard/DashPosts";
import DashUsers from "../components/Dashboard/DashUsers";
import DashComponent from "../components/Dashboard/DashComponent";
import DashUserPostsComments from "../components/Dashboard/DashUserPostsComments";
import DashMyComments from "../components/Dashboard/DashMyComments";
import DashAllComments from "../components/Dashboard/DashAllComments";

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
      {tab === "comments" && <DashUserPostsComments />}

      {/* My Comments */}
      {tab === "my-comments" && <DashMyComments />}

      {/* All Comments */}
      {tab === "all-comments" && <DashAllComments />}
    </div>
  );
}
