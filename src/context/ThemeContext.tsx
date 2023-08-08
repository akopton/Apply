import { createContext, useEffect, useState } from "react";

type TContext = {
  theme: string;
  toggleTheme: () => void;
};

const initialContext: TContext = {
  theme: "light",
  toggleTheme: () => console.log("theme"),
};
const ThemeContext = createContext(initialContext);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  const toggleTheme = () => {
    theme === "dark"
      ? localStorage.setItem("theme", "light")
      : localStorage.setItem("theme", "dark");
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  useEffect(() => {
    const theme = localStorage.getItem("theme") as "light" | "dark";
    if (theme) setTheme(theme);
    else setTheme("light");
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={`theme ${theme as string}`}>{children}</div>
    </ThemeContext.Provider>
  );
};
