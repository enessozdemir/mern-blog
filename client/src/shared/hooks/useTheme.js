import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "../store/themeSlice";

export const useTheme = () => {
  const { theme } = useSelector((state) => state.theme);
  const dispatch = useDispatch();

  const handleToggleTheme = () => {
    dispatch(toggleTheme());
  };

  return {
    theme,
    isDark: theme === "dark",
    isLight: theme === "light",
    toggleTheme: handleToggleTheme,
  };
};
