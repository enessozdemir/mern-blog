import { useTheme } from "../hooks/useTheme";

export default function ThemeProvider({ children }) {
  const { theme } = useTheme();
  return (
    <div className={theme}>
      <div className="bg-white text-primary-color dark:text-soft-white dark:bg-primary-color min-h-screen">{children}</div>
    </div>
  );
}
