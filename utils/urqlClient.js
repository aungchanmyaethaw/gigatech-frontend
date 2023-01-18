import {
  createClient,
  dedupExchange,
  cacheExchange,
  fetchExchange,
  ssrExchange,
} from "@urql/core";

import { parseCookies } from "nookies";

const isServerSide = typeof window === "undefined";

const ssrCache = ssrExchange({
  isClient: !isServerSide,
});

const client = createClient({
  url: process.env.NEXT_PUBLIC_GRAPHQL_URL,
  fetchOptions: () => {
    const cookies = parseCookies();
    return cookies.jwt
      ? { headers: { Authorization: `Bearer ${cookies.jwt}` } }
      : {};
  },
  exchanges: [dedupExchange, cacheExchange, ssrCache, fetchExchange],
});

export { client, ssrCache };
