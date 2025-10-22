import DashSidebar from "../components/DashSidebar";
import DashProfile from "../components/DashProfile";
import DashPosts from "../components/DashPosts";
import DashUsers from "../components/DashUsers";
import DashComponent from "../components/DashComponent";
import DashUserPostsComments from "../components/DashUserPostsComments";
import DashMyComments from "../components/DashMyComments";
import DashAllComments from "../components/DashAllComments";
import { useDashboardTab } from "../hooks/useDashboardTab";

export default function Dashboard() {
  const { tab } = useDashboardTab();

  return (
    <div className="min-h-screen flex flex-col md:flex-row border-b border-lighter-icon-color border-opacity-10">
      {/* Sidebar */}
      <div className="md:w-64 hidden sm:block">
        <DashSidebar />
      </div>

      {tab === "dash" && <DashComponent />}

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
