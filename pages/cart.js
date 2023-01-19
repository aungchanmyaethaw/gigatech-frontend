import React from "react";
import { GET_CART } from "graphql/cart";
import nookies from "nookies";
import { withUrqlClient } from "next-urql";
import { useAppContext } from "contexts/AppContext";
import styled from "styled-components";
import { ContainerStyled, UnderLine } from "styles/global.styles";
import CartCard from "components/CartCard";
const Cart = () => {
  const { carts } = useAppContext();

  return (
    <ContainerStyled>
      <div className="flex flex-col items-center mb-20">
        <h2 className="text-3xl lg:text-[40px] text-center font-normal capitalize">
          Cart
        </h2>
        <UnderLine className="!w-[4rem]" />
      </div>
      <CartContainerStyled>
        {carts.map((cart) => (
          <CartCard key={cart.id} {...cart} />
        ))}
      </CartContainerStyled>
    </ContainerStyled>
  );
};

export default withUrqlClient((_ssrExchange) => ({
  url: process.env.NEXT_PUBLIC_GRAPHQL_URL,
}))(Cart);

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

const CartContainerStyled = styled.section`
  display: flex;
  flex-direction: column;
  gap: 2em;
`;
