import React, { useEffect, useState } from "react";
import nookies from "nookies";
import { withUrqlClient } from "next-urql";
import { useAppContext } from "contexts/AppContext";
import styled from "styled-components";
import { ContainerStyled, UnderLine } from "styles/global.styles";
import CartCard from "components/CartCard";
import { Button } from "styles/global.styles";
import { BsCartXFill } from "react-icons/bs";
import { currencyFormatter } from "utils";
const Cart = () => {
  const { carts } = useAppContext();
  const [totalAmount, setTotalAmount] = useState(0);

  const handleTotalAmount = () => {
    const tempTotal = carts.reduce(
      (prev, current) => prev + current.qty * current.productPrice,
      0
    );
    setTotalAmount(tempTotal);
  };

  useEffect(() => {
    handleTotalAmount();
  }, [carts]);

  return (
    <ContainerStyled>
      <div className="flex flex-col items-center mb-20">
        <h2 className="text-3xl lg:text-[40px] text-center font-normal capitalize">
          Cart
        </h2>
        <UnderLine className="!w-[4rem]" />
      </div>
      <CartContainerStyled>
        {carts.length > 0 ? (
          <>
            {carts.map((cart) => (
              <CartCard key={cart.id} {...cart} />
            ))}
            <div className="flex flex-col items-center justify-center gap-8">
              <span className="mr-auto text-xl">
                Total Amount : {currencyFormatter.format(totalAmount)}
              </span>
              <Button>Checkout</Button>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center gap-8">
            <BsCartXFill className="text-[6rem] text-primary" />
            <h4 className="text-3xl font-extralight">Your Cart is Empty.</h4>
          </div>
        )}
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
