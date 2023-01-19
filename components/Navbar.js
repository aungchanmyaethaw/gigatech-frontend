import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  BsCart,
  BsSearch,
  BsHeart,
  BsPersonCircle,
  BsSun,
  BsMoon,
} from "react-icons/bs";
import { motion } from "framer-motion";
import styled from "styled-components";
import { useRouter } from "next/router";
import { useAppContext } from "contexts/AppContext";
import { UnderLine } from "styles/global.styles";
import { useQuery } from "urql";
import { GET_CART } from "graphql/cart";
import { parseCookies } from "nookies";
const Navbar = () => {
  const cookies = parseCookies();
  const { handleToggleTheme, theme, jwt, carts } = useAppContext();
  // const [result] = useQuery({
  //   query: GET_CART,
  //   variables: {
  //     user_id: userInfo.id,
  //   },
  // });
  // const { data, fetching, error } = result;

  const router = useRouter();

  const handleProfileRoute = () => {
    if (jwt) {
      router.push("/profile");
    } else {
      router.push("/auth");
    }
  };

  return (
    <NavbarStyled className="px-4 py-4 lg:py-6">
      <div className="flex items-center gap-x-8">
        <div className="flex flex-col w-max">
          <Link
            href="/"
            className="text-2xl font-semibold font-heading lg:text-3xl"
          >
            Giga<span className="text-primary !font-heading">Tech</span>
          </Link>
          <UnderLine className="!w-1/2" />
        </div>
        <Link href="/collections" className="font-medium">
          Collections
        </Link>
      </div>

      <div className="flex items-center gap-x-8">
        <ul className="flex gap-x-8">
          <li>
            <BsSearch className="text-xl xl:text-2xl " />
          </li>
          <li>
            <Link href="/cart">
              <BsCart className="text-xl xl:text-2xl " />
            </Link>

            <span>{carts.length || 0} </span>
          </li>
          <li>
            <BsHeart className="text-xl xl:text-2xl " />
            <span className="">0</span>
          </li>
          <li onClick={handleProfileRoute}>
            <BsPersonCircle className="text-xl xl:text-2xl " />
          </li>
        </ul>
        <ToggleBtn
          onClick={handleToggleTheme}
          className={theme === "dark" ? "active" : null}
        >
          <motion.span layout transition={{ type: "tween", duration: 0.4 }}>
            {theme === "light" ? <BsMoon /> : <BsSun />}
          </motion.span>
        </ToggleBtn>
      </div>
    </NavbarStyled>
  );
};

export default Navbar;

const NavbarStyled = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1400px;
  width: 100%;
  margin: 0 auto;
  color: ${(props) => props.theme.textColor};
  li {
    cursor: pointer;
    display: flex;
    align-items: center;
    column-gap: 8px;
    span {
      font-size: 0.875rem;
    }
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
