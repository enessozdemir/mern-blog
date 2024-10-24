import { useState } from "react";
import { Button, Navbar, TextInput } from "flowbite-react";
import { Link } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon } from "react-icons/fa";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Navbar className="border-b-2">
      <Link
        to="/"
        className="self-center whitespace-nowrap text-2xl sm:text-3xl font-airone"
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

          <Button className="w-12 h-10 p-1" color="gray" pill>
            <FaMoon />
          </Button>
          <Link to="/sign-in">
            <Button gradientDuoTone="greenToBlue" outline>
              Sign In
            </Button>
          </Link>
        </div>
      </div>
    </Navbar>
  );
}
