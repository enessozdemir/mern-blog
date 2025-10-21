import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "../../../shared/store/themeSlice";
import { Button, Navbar } from "flowbite-react";
import { PiMoon, PiSun } from "react-icons/pi";

export default function LoginHeader() {
  const { theme } = useSelector((state) => state.theme);
  const dispatch = useDispatch();
  return (
    <Navbar className="border-b-2 px-7">
      <Link
        to="/home"
        className={`${
          theme === "light" ? "text-primary-color" : "text-soft-white"
        } self-center whitespace-nowrap text-2xl sm:text-3xl font-airone`}
      >
        Blog.
      </Link>

      <Button
        className="w-12 h-10 p-1 focus:ring-0"
        color="gray"
        pill
        onClick={() => dispatch(toggleTheme())}
      >
        {theme === "light" ? <PiMoon /> : <PiSun />}
      </Button>
    </Navbar>
  );
}
