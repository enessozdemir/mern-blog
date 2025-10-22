import { useSelector } from "react-redux";

const LoginHeroSection = ({ context }) => {
  const { theme } = useSelector((state) => state.theme);
  return (
    <div className="flex-1 flex flex-col justify-center px-7 sm:px-0">
      <h1
        className={`${
          theme === "light" ? "text-primary-color" : "text-soft-white"
        } text-[4rem] sm:text-[6rem] font-airone font-light`}
      >
        Blog.
      </h1>
      <p className="text-gray-400 text-sm">{context}</p>
    </div>
  );
};

export default LoginHeroSection;
