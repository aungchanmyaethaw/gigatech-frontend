import React from "react";
import { ContainerStyled } from "styles/global.styles";
import nookies from "nookies";
import { withUrqlClient } from "next-urql";
import { UnderLine } from "styles/global.styles";
import styled from "styled-components";
import { useAppContext } from "contexts/AppContext";
const WishLists = () => {
  const { wishlistFetching, wishlists } = useAppContext();

  return (
    <ContainerStyled>
      <div className="flex flex-col items-center mb-20">
        <h2 className="text-3xl lg:text-[40px] text-center font-normal capitalize">
          Wishlists
        </h2>
        <UnderLine className="!w-[6rem]" />
      </div>
      <WishContainerstyled>
        {!wishlistFetching && wishlists > 0 ? (
          <>
            {carts.map((cart) => (
              <CartCard key={cart.id} {...cart} />
            ))}
          </>
        ) : (
          <></>
        )}
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
