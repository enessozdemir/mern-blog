import { useState } from "react";
import {
  Avatar,
  Button,
  Dropdown,
  DropdownDivider,
  DropdownItem,
  Navbar,
  TextInput,
} from "flowbite-react";
import { Link } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { PiMoon, PiSun } from "react-icons/pi";
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "../redux/theme/themeSlice";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const { theme } = useSelector((state) => state.theme);
  const dispatch = useDispatch();

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
        <form action="">
          <TextInput
            type="text"
            placeholder="Search"
            rightIcon={AiOutlineSearch}
            className="hidden lg:inline"
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
                <DropdownItem>Profile</DropdownItem>
              </Link>
              <DropdownDivider />
              <DropdownItem>Sign Out</DropdownItem>
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
    </Navbar>
  );
}
