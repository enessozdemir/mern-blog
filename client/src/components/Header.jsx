import { useEffect, useState } from "react";
import {
  Avatar,
  Button,
  Dropdown,
  DropdownDivider,
  DropdownItem,
  Modal,
  ModalBody,
  ModalHeader,
  Navbar,
  TextInput,
} from "flowbite-react";
import { Link, useLocation } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { PiMoon, PiSun } from "react-icons/pi";
import { FiUser, FiLogOut } from "react-icons/fi";
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "../redux/theme/themeSlice";
import { signOutSuccess } from "../redux/user/userSlice";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const { currentUser } = useSelector((state) => state.user);
  const { theme } = useSelector((state) => state.theme);
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm) {
      window.location.href = `/search?searchTerm=${searchTerm}`;
    }
  };

  return (
    <Navbar className="border-b-2 px-5">
      <Link
        to="/home"
        className={`${
          theme === "light" ? "text-primary-color" : "text-soft-white"
        } self-center whitespace-nowrap text-2xl sm:text-3xl font-airone`}
      >
        Blog.
      </Link>

      <div className="flex gap-10 md:order-2">
        <form onSubmit={handleSubmit}>
          <TextInput
            type="text"
            placeholder="Search"
            rightIcon={AiOutlineSearch}
            className="hidden lg:inline"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </form>

        <div className="flex gap-1 items-center">
          <Button
            className={`${isOpen ? "w-32" : "w-12"} h-10 lg:hidden`}
            color="gray"
            pill
            onClick={() => setIsOpen(!isOpen)}
          >
            {/* {isOpen ? <TextInput placeholder="Search" className="" /> : null} */}
            <AiOutlineSearch size={20} />
          </Button>

          <Button
            className="w-12 h-10 p-1 focus:ring-0"
            color="gray"
            pill
            onClick={() => dispatch(toggleTheme())}
          >
            {theme === "light" ? <PiMoon /> : <PiSun />}
          </Button>
          {currentUser ? (
            <Dropdown
              arrowIcon={false}
              inline
              label={
                <Avatar alt="user" img={currentUser.profilePicture} rounded />
              }
            >
              <Link to={"/dashboard?tab=profile"}>
                <DropdownItem icon={FiUser}>Profile</DropdownItem>
              </Link>
              <DropdownDivider />
              <DropdownItem icon={FiLogOut} onClick={() => setShowModal(true)}>
                Sign Out
              </DropdownItem>
            </Dropdown>
          ) : (
            <Link to="/sign-in">
              <button
                className={`${
                  theme === "light"
                    ? "text-black rounded-lg text-sm font-medium py-2 px-4 border-2 border-primary-color hover:bg-primary-color hover:text-soft-white"
                    : "text-soft-white rounded-lg text-sm font-medium py-2 px-4 border-2 border-white hover:bg-white hover:text-primary-color"
                } `}
              >
                Sign In
              </button>
            </Link>
          )}
        </div>
      </div>
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
    </Navbar>
  );
}
