import React from "react";
import { ContainerStyled } from "styles/global.styles";
import nookies from "nookies";
import { withUrqlClient } from "next-urql";
import { UnderLine } from "styles/global.styles";
import styled from "styled-components";
import { useAppContext } from "contexts/AppContext";
import WishlistCard from "components/WishlistCard";
import { motion, AnimatePresence } from "framer-motion";
import Loader from "components/Loader";
import { BsHeart } from "react-icons/bs";
const WishLists = () => {
  const { wishlistFetching, wishlists } = useAppContext();

  let body;
  if (wishlistFetching) {
    body = <Loader />;
  } else {
    if (wishlists.length > 0) {
      body = (
        <>
          <AnimatePresence>
            {wishlists.map((wishlist) => (
              <WishlistCard key={wishlist.id} {...wishlist} />
            ))}
          </AnimatePresence>
        </>
      );
    } else {
      body = (
        <div className="flex flex-col items-center gap-8">
          <BsHeart className="text-[6rem] text-primary" />
          <h4 className="text-3xl font-extralight">Your Wishlists is Empty.</h4>
        </div>
      );
    }
  }

  return (
    <ContainerStyled>
      <div className="flex flex-col items-center mb-20">
        <h2 className="text-3xl lg:text-[40px] text-center font-normal capitalize">
          Wishlist
        </h2>
        <UnderLine className="!w-[6rem]" />
      </div>
      <WishContainerstyled
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, type: "tween", duration: 0.5 }}
      >
        {body}
      </WishContainerstyled>
    </ContainerStyled>
  );
};

export default withUrqlClient((_ssrExchange) => ({
  url: process.env.NEXT_PUBLIC_GRAPHQL_URL,
}))(WishLists);

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

const WishContainerstyled = styled.section`
  display: flex;
  flex-direction: column;
  gap: 2em;
`;
