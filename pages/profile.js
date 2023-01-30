import React from "react";
import { ContainerStyled } from "styles/global.styles";
import { useAppContext } from "contexts/AppContext";
import { destroyCookie } from "nookies";
import { useRouter } from "next/router";
import { UnderLine, Button } from "styles/global.styles";
import { motion } from "framer-motion";
import Link from "next/link";
import styled from "styled-components";
import { FiLogOut } from "react-icons/fi";
const Profile = () => {
  const { userInfo, setUserInfo, setJwt, setCarts, setWishlists, setOrders } =
    useAppContext();
  const router = useRouter();
  const handleLogout = () => {
    setCarts([]);
    setWishlists([]);
    setUserInfo({ username: "", email: "" });
    setJwt("");
    setOrders([]);
    destroyCookie(null, "jwt");
    localStorage.removeItem("user");
    router.push("/");
  };

  return (
    <ContainerStyled>
      <div className="flex flex-col items-center mb-20 ">
        <h2 className="text-3xl lg:text-[40px] text-center font-normal capitalize ">
          Profile
        </h2>
        <UnderLine />
      </div>
      <motion.div
        className="flex flex-col items-center gap-8"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, type: "tween", duration: 0.5 }}
      >
        <ProfileContainerStyled>
          <div className="flex items-center min-h-[18rem] gap-20 ">
            <div className="flex flex-col items-center gap-2 mb-10 text-xl">
              <h2 className="text-2xl font-semibold">{userInfo.username}</h2>
              <span>{userInfo.email}</span>
            </div>
            <div className="flex flex-col items-center justify-center gap-4">
              <Link
                href="/orders"
                className="text-xl font-normal text-center capitalize lg:text-lg hover:text-primary"
              >
                Orders
              </Link>
              <Link
                href="/wishlist"
                className="text-xl font-normal text-center capitalize lg:text-lg hover:text-primary"
              >
                Wishlist
              </Link>
              <Link
                href="/cart"
                className="text-xl font-normal text-center capitalize lg:text-lg hover:text-primary"
              >
                Cart
              </Link>
              <Link
                href="/accountdetails"
                className="text-xl font-normal text-center capitalize lg:text-lg hover:text-primary"
              >
                Account Details
              </Link>
            </div>
          </div>

          <Button
            className="!border-error !text-error !bg-transparent hover:before:!hidden active:before:!hidden flex items-center gap-2"
            onClick={handleLogout}
          >
            <span className="font-heading">Logout</span>
            <FiLogOut />
          </Button>
        </ProfileContainerStyled>
      </motion.div>
    </ContainerStyled>
  );
};

export default Profile;

const ProfileContainerStyled = styled.div`
  min-width: 20rem;
  width: 30rem;
  min-height: 20rem;
  padding: 1em;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  border-radius: 4px;
  background-color: ${(props) => props.theme.cardBackgroundColor};
`;
