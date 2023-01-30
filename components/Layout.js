import React from "react";
import Head from "next/head";
import { useAppContext } from "contexts/AppContext";
import { motion } from "framer-motion";
import { GlobalStyles, darkTheme, lightTheme } from "styles/global.styles";
import Navbar from "components/Navbar";
import Footer from "components/Footer";
import { ThemeProvider } from "styled-components";
import { AnimatePresence } from "framer-motion";
import SearchBar from "./SearchBar";
import MobileNavbar from "./MobileNavbar";
import ScrollToTop from "react-scroll-to-top";
import { RxCaretUp } from "react-icons/rx";
const Layout = ({ children }) => {
  const { theme, isSearchBarOpen, isMobileNavbarClose } = useAppContext();

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Head>
        <title>GigaTech</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
        <GlobalStyles />
        <Navbar />
        <AnimatePresence mode="popLayout">
          {isMobileNavbarClose && <MobileNavbar />}
        </AnimatePresence>
        <AnimatePresence mode="popLayout">
          {isSearchBarOpen && <SearchBar />}
        </AnimatePresence>
        {children}
        <ScrollToTop
          smooth
          component={<RxCaretUp />}
          className="flex items-center justify-center !rounded text-3xl !bg-primary text-light !w-[2.5rem] !h-[2.5rem]"
        />
        <Footer />
      </ThemeProvider>
    </motion.main>
  );
};

export default Layout;
