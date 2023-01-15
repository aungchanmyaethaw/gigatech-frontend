import { createContext, useContext, useEffect, useState } from "react";

const AppContext = createContext();

export function useAppContext() {
  return useContext(AppContext);
}

export function AppContextProvider({ children }) {
  const [theme, setTheme] = useState("");

  const handleToggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme((prev) => (prev == "light" ? "dark" : "light"));
    localStorage.setItem("theme", newTheme);
  };

  useEffect(() => {
    const currentTheme = localStorage.getItem("theme");
    if (currentTheme == null) {
      setTheme("light");
      localStorage.setItem("theme", "light");
    } else {
      setTheme(currentTheme);
    }
  }, []);

  const contextValue = {
    theme,
    handleToggleTheme,
  };

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
}
