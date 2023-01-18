import React from "react";
import { GET_CART } from "graphql/cart";
import nookies from "nookies";
import { withUrqlClient, initUrqlClient } from "next-urql";
import { dedupExchange, cacheExchange, fetchExchange, useQuery } from "urql";
import { ssrCache } from "utils/urqlClient";

const Cart = () => {
  const [result] = useQuery({ query: GET_CART });

  const { data, fetching, error } = result;

  console.log(error);
  console.log(data);

  return <div>Cart</div>;
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
  const client = initUrqlClient(
    {
      url: process.env.NEXT_PUBLIC_GRAPHQL_URL,
      exchanges: [dedupExchange, cacheExchange, ssrCache, fetchExchange],
      fetchOptions: { headers: { Authorization: `Bearer ${cookies.jwt}` } },
    },
    false
  );

  await client.query(GET_CART).toPromise();

  return {
    props: {
      urqlState: ssrCache.extractData(),
    },
  };
}
