import {
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  Sidebar,
  SidebarItem,
  SidebarItemGroup,
  SidebarItems,
} from "flowbite-react";
import { useEffect, useState } from "react";
import { FiUser, FiLogOut, FiFile, FiUsers } from "react-icons/fi";
// import { LuLayoutDashboard } from "react-icons/lu";
import { useSelector, useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { signOutSuccess } from "../../redux/user/userSlice";
import { TfiComment } from "react-icons/tfi";

export default function DashSidebar() {
  const location = useLocation();
  const dispatch = useDispatch();
  const { theme } = useSelector((state) => state.theme);
  const { currentUser } = useSelector((state) => state.user);
  const [tab, setTab] = useState(0);
  const [showModal, setShowModal] = useState(false);
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
        window.location.href = "/sign-in";
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
        <SidebarItemGroup className="flex flex-col gap-1">
          <Link to="/dashboard?tab=profile">
            <SidebarItem
              active={tab === "profile"}
              icon={FiUser}
              label={currentUser.isAdmin ? "Admin" : "User"}
              labelColor={"dark"}
              as="div"
            >
              Profile
            </SidebarItem>
          </Link>
          {currentUser.isAdmin && (
            <Link to="/dashboard?tab=posts">
              <SidebarItem active={tab === "posts"} icon={FiFile} as="div">
                Posts
              </SidebarItem>
            </Link>
          )}
          {currentUser.isAdmin && (
            <Link to="/dashboard?tab=comments">
              <SidebarItem
                active={tab === "comments"}
                icon={TfiComment}
                as="div"
              >
                Comments
              </SidebarItem>
            </Link>
          )}
          {currentUser.isAdmin && (
            <Link to="/dashboard?tab=users">
              <SidebarItem active={tab === "users"} icon={FiUsers} as="div">
                Users
              </SidebarItem>
            </Link>
          )}
          <SidebarItem
            onClick={() => setShowModal(true)}
            icon={FiLogOut}
            className="cursor-pointer"
          >
            Sign Out
          </SidebarItem>
        </SidebarItemGroup>
      </SidebarItems>
      {showModal && (
        <Modal
          show={showModal}
          onClose={() => setShowModal(false)}
          popup
          size="md"
          className="text-gray-500"
        >
          <ModalHeader className="p-6">Sign Out</ModalHeader>
          <ModalBody>
            <p className="text-sm text-justify">
              Are you sure you want to sign out?
            </p>

            <div className="flex justify-end gap-x-2 mt-5">
              <Button
                color="light"
                className="font-extralight text-red-600 border border-red-600"
                onClick={() => setShowModal(false)}
                size="sm"
                pill
              >
                Cancel
              </Button>
              <Button
                onClick={handleSignOut}
                color="failure"
                className="font-extralight"
                size="sm"
                pill
              >
                Sign Out
              </Button>
            </div>
          </ModalBody>
        </Modal>
      )}
    </Sidebar>
  );
}
