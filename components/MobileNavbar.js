import React, { useState } from "react";
import styled from "styled-components";
import { HiXMark } from "react-icons/hi2";
import {
  BsCart,
  BsSearch,
  BsHeart,
  BsPersonCircle,
  BsHouse,
  BsSun,
  BsMoon,
  BsCollection,
} from "react-icons/bs";
import Link from "next/link";
import { useRouter } from "next/router";
import { useAppContext } from "contexts/AppContext";
import { motion } from "framer-motion";

const MobileNavbar = () => {
  const {
    jwt,
    handleToggleTheme,
    theme,
    handleSearchBarClose,
    handleMobileNavbarClose,
  } = useAppContext();
  const [searchTerm, setSearchTerm] = useState("");

  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!searchTerm) {
      handleSearchBarClose();
      return;
    } else {
      handleMobileNavbarClose();
      router.push(`/search?searchterm=${searchTerm.trim()}`);
      setSearchTerm("");
      handleSearchBarClose();
    }
  };

  const handleProfileRoute = () => {
    handleMobileNavbarClose();
    if (jwt) {
      router.push("/profile");
    } else {
      router.push("/auth");
    }
  };

  return (
    <MobileNavbarStyled
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ type: "tween", duration: 0.3 }}
    >
      <div className="mb-8">
        <HiXMark
          className="ml-auto text-4xl"
          onClick={handleMobileNavbarClose}
        />
      </div>
      <form onSubmit={handleSubmit}>
        <FieldSetStyled className="mb-16">
          <input
            type="text"
            id="search"
            placeholder=""
            className="text-lg"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <label htmlFor="search">What do you need...?</label>
        </FieldSetStyled>
      </form>
      <ul className="flex flex-col gap-4 ">
        <li className="py-2">
          <Link
            href="/"
            className="flex items-center gap-6"
            onClick={handleMobileNavbarClose}
          >
            <BsHouse />
            <span>Home</span>
          </Link>
        </li>
        <li className="py-2">
          <Link
            href="/collections"
            className="flex items-center gap-6"
            onClick={handleMobileNavbarClose}
          >
            <BsCollection />
            <span>Collections</span>
          </Link>
        </li>
        <li className="py-2">
          <Link
            href="/cart"
            className="flex items-center gap-6"
            onClick={handleMobileNavbarClose}
          >
            <BsCart />
            <span>Cart</span>
          </Link>
        </li>
        <li className="py-2">
          <Link
            href="/wishlist"
            className="flex items-center gap-6"
            onClick={handleMobileNavbarClose}
          >
            <BsHeart />
            <span>Wishlist</span>
          </Link>
        </li>
        <li
          className="flex items-center gap-6 py-2"
          onClick={handleProfileRoute}
        >
          <BsPersonCircle />
          <span>Profile</span>
        </li>
      </ul>
      <div
        className="flex items-center gap-6 py-2 mt-4 "
        onClick={handleToggleTheme}
      >
        <ToggleBtn className={theme === "dark" ? "active" : null}>
          <motion.span layout transition={{ type: "tween", duration: 0.4 }}>
            {theme === "light" ? <BsMoon /> : <BsSun />}
          </motion.span>
        </ToggleBtn>
        <span className="text-lg">
          {theme === "light" ? "Light Mode" : "Dark Mode"}
        </span>
      </div>
    </MobileNavbarStyled>
  );
};

export default MobileNavbar;

const MobileNavbarStyled = styled(motion.div)`
  width: 100vw;
  height: 100vh;
  position: fixed;
  padding: 1em;
  top: 0;
  left: 0;
  z-index: 100;
  color: ${(props) => props.theme.textColor};
  background-color: ${(props) => props.theme.backgroundColor};

  li {
    font-size: 1.25rem;

    &:hover,
    &:active {
      span {
        color: var(--primary);
      }

      svg {
        fill: var(--primary);
      }
    }
  }

  svg {
    fill: ${(props) => props.theme.textColor};
    cursor: pointer;
  }
`;

const ToggleBtn = styled(motion.div)`
  width: 3rem;
  height: 2px;
  border-radius: 2rem;
  display: flex;
  padding: 0 2px;
  align-items: center;
  background-color: ${(props) => props.theme.textColor};
  cursor: pointer;
  &.active {
    justify-content: flex-end;
  }
  & > span {
    display: block;
    height: 1.5rem;
    width: 1.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1rem;
    border: 1px solid ${(props) => props.theme.textColor};
    background-color: ${(props) => props.theme.backgroundColor};
    border-radius: 50%;
  }
`;

const FieldSetStyled = styled.div`
  width: 90%;
  margin: 1.5em auto;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  input {
    width: 100%;
    padding: 8px 0;
    background-color: transparent;
    border: none;
    border-bottom: 2px solid var(--primary);

    &:not(focus),
    &:placeholder-shown {
      & + label {
        font-size: 1.25rem;
      }
    }

    &:focus,
    &:not(:placeholder-shown) {
      outline: none;
      & + label {
        font-size: 1rem;
        top: -1em;
        color: var(--primary);
      }
    }
  }
  label {
    position: absolute;
    top: 0.25em;
    left: 0;
    font-weight: 600;
    text-transform: capitalize;
    transition: top 200ms ease-in, font-size 200ms ease-in, color 200ms ease-in;
  }
`;
