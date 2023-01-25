import React, { useEffect } from "react";
import nookies from "nookies";
import { withUrqlClient } from "next-urql";
import { useAppContext } from "contexts/AppContext";
import styled from "styled-components";
import { ContainerStyled, UnderLine } from "styles/global.styles";
import CartCard from "components/CartCard";
import { Button } from "styles/global.styles";
import { BsCartXFill } from "react-icons/bs";
import { currencyFormatter } from "utils";
import { motion, AnimatePresence } from "framer-motion";
import Loader from "components/Loader";
import connectStripe from "lib/connectStripe";

const Carts = () => {
  const { carts, fetching, totalAmount } = useAppContext();

  const handleCheckout = async () => {
    try {
      const stripe = await connectStripe();
      const res = await fetch("/api/stripe", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(carts),
      });

      const result = await res.json();

      await stripe.redirectToCheckout({ sessionId: result.id });
    } catch (e) {
      console.log(e.message);
    }
  };

  let body;

  if (fetching) {
    body = <Loader />;
  } else {
    if (carts.length > 0) {
      body = (
        <>
          <AnimatePresence>
            {carts.map((cart) => (
              <CartCard key={cart.id} {...cart} />
            ))}
            <motion.div
              className="flex flex-col items-center justify-center gap-8 mt-4 md:mt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              layout
            >
              <span className="ml-auto text-xl font-medium">
                Total Amount : {currencyFormatter.format(totalAmount)}
              </span>
              <Button onClick={handleCheckout}>Checkout</Button>
            </motion.div>
          </AnimatePresence>
        </>
      );
    } else {
      body = (
        <div className="flex flex-col items-center gap-8">
          <BsCartXFill className="text-[6rem] text-primary" />
          <h4 className="text-3xl font-extralight">Your Cart is Empty.</h4>
        </div>
      );
    }
  }

  return (
    <ContainerStyled>
      <div className="flex flex-col items-center md:mb-20 mb-10">
        <h2 className="text-3xl lg:text-[40px] text-center font-normal capitalize">
          Cart
        </h2>
        <UnderLine className="!w-[4rem]" />
      </div>
      <CartContainerStyled
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, type: "tween", duration: 0.5 }}
      >
        {body}
      </CartContainerStyled>
    </ContainerStyled>
  );
};

export default withUrqlClient((_ssrExchange) => ({
  url: process.env.NEXT_PUBLIC_GRAPHQL_URL,
}))(Carts);

export async function getServerSideProps(ctx) {
  const cookies = nookies.get(ctx);
  if (!cookies.jwt) {
    return {
      redirect: {
        destination: "/auth",
        permanment: false,
      },
    };
  }

  return {
    props: {},
  };
}

const CartContainerStyled = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 1.25em;
`;
