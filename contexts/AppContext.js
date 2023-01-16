import { createContext, useContext, useEffect, useState } from "react";

import { parseCookies } from "nookies";
const AppContext = createContext();

export function useAppContext() {
  return useContext(AppContext);
}

export function AppContextProvider({ children }) {
  const [theme, setTheme] = useState("");
  const [jwt, setJwt] = useState("");
  const [userInfo, setUserInfo] = useState({ username: "", email: "" });

  const handleToggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme((prev) => (prev == "light" ? "dark" : "light"));
    localStorage.setItem("theme", newTheme);
  };

  useEffect(() => {
    const cookies = parseCookies();

    if (cookies.jwt) {
      setJwt(cookies.jwt);
      const user = JSON.parse(localStorage.getItem("user"));
      console.log(user);
      console.log("hello");
      setUserInfo((prev) => {
        return { ...prev, ...user };
      });
    }
    console.log(jwt, userInfo);
  }, []);

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
    jwt,
    setJwt,
    userInfo,
    setUserInfo,
  };

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
}
