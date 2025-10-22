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
import {
  FiUser,
  FiLogOut,
  FiFile,
  FiUsers,
  FiMessageSquare,
} from "react-icons/fi";
import { Link } from "react-router-dom";
import { MdOutlineManageAccounts } from "react-icons/md";
import { useDashSidebar } from "../hooks/useDashSidebar";

export default function DashSidebar() {
  const {
    theme,
    currentUser,
    tab,
    showModal,
    setShowModal,
    handleSignOut,
  } = useDashSidebar();

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
          {currentUser && currentUser.isAdmin && (
            <Link to="/dashboard?tab=dash">
              <SidebarItem
                active={tab === "dash" || !tab}
                icon={MdOutlineManageAccounts}
                labelColor={"dark"}
                as="div"
              >
                Dashboard
              </SidebarItem>
            </Link>
          )}

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

          <Link to="/dashboard?tab=posts">
            <SidebarItem active={tab === "posts"} icon={FiFile} as="div">
              Posts
            </SidebarItem>
          </Link>

          <Link to="/dashboard?tab=comments">
            <SidebarItem
              active={
                tab === "comments" ||
                tab === "my-comments" ||
                tab === "all-comments"
              }
              icon={FiMessageSquare}
              as="div"
            >
              Comments
            </SidebarItem>
          </Link>

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
