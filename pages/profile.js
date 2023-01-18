import React from "react";
import { ContainerStyled } from "styles/global.styles";
import { useAppContext } from "contexts/AppContext";
import { destroyCookie } from "nookies";
import { useRouter } from "next/router";
import { UnderLine, Button } from "styles/global.styles";
import { motion } from "framer-motion";
const Profile = () => {
  const { userInfo, setUserInfo, setJwt } = useAppContext();
  const router = useRouter();
  const handleLogout = () => {
    setUserInfo({ username: "", email: "" });
    setJwt("");
    destroyCookie(null, "jwt");
    localStorage.removeItem("user");
    router.push("/");
  };

  return (
    <ContainerStyled>
      <div className="flex flex-col items-center mb-20">
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
        <h2 className="text-2xl font-semibold">{userInfo.username}</h2>
        <span>{userInfo.email}</span>
        <Button
          className="!border-error !text-error hover:before:!hidden active:before:!hidden"
          onClick={handleLogout}
        >
          Logout
        </Button>
      </motion.div>
    </ContainerStyled>
  );
};

export default Profile;
