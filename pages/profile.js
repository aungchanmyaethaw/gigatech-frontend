import React from "react";
import { ContainerStyled } from "styles/global.styles";
import { useAppContext } from "contexts/AppContext";
import { destroyCookie } from "nookies";
import { useRouter } from "next/router";
import { UnderLine, Button } from "styles/global.styles";
import { motion } from "framer-motion";
import Link from "next/link";
import { currencyFormatter } from "utils";
const Profile = () => {
  const {
    userInfo,
    setUserInfo,
    setJwt,
    setCarts,
    setWishlists,
    orders,
    setOrders,
  } = useAppContext();
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
        <div className="flex flex-col items-center mb-20">
          <h2 className="text-xl font-normal text-center capitalize lg:text-2xl ">
            My Orders
          </h2>
        </div>
        <div className=" border rounded min-w-[20rem] w-[30rem] ">
          <div className="flex justify-between p-4 border-b-2">
            <h5 className="text-xl font-semibold text-primary">Date</h5>
            <h5 className="text-xl font-semibold text-primary">Total Amount</h5>
          </div>
          <div>
            {orders.map((order) => (
              <div
                onClick={() => router.push(`/orders?order_id=${order.id}`)}
                key={order.id}
                className="flex p-4 transition-colors cursor-pointer duration-250 hover:bg-primary hover:bg-opacity-25"
              >
                <span>{new Date(order.date).toLocaleString()}</span>
                <span className="ml-auto">
                  {currencyFormatter.format(order.totalAmount)}
                </span>
              </div>
            ))}
          </div>
        </div>
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
