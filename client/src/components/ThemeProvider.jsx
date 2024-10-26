/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";

export default function ThemeProvider({ children }) {
  const { theme } = useSelector((state) => state.theme);
  return (
    <div className={theme}>
      <div className="bg-white text-primary-color dark:text-soft-white dark:bg-primary-color min-h-screen">{children}</div>
    </div>
  );
}
