import Hero from "components/Hero";
import PreviewProductRow from "components/PreviewProductRow";
import PreviewSkeleton from "components/PreviewSkeleton";
import { ssrCache, client } from "utils/urqlClient";
import { withUrqlClient } from "next-urql";
import { GET_PRODUCTS, GET_TRENDING_PRODUCT } from "graphql/products";
import { useQuery } from "urql";
function Home() {
  const [{ data, fetching, error }] = useQuery({
    query: GET_PRODUCTS,
    variables: { pagination: { limit: 4 }, sort: "createdAt:desc" },
  });

  const [{ data: trendingData, fetching: trendingFetching, error: trending }] =
    useQuery({
      query: GET_TRENDING_PRODUCT,
      variables: { pagination: { limit: 4 }, trending: true },
    });

  return (
    <>
      <Hero />

      {!fetching ? (
        <PreviewProductRow
          products={data.products.data}
          heading="New Arrivals"
          link={"/newarrivals?sort=createdAt:desc&start=0"}
          latest
        />
      ) : (
        <PreviewSkeleton heading="New Arrivals" />
      )}

      {trendingData ? (
        <PreviewProductRow
          products={trendingData.products.data}
          heading="Trending"
          link={"/trending?start=0"}
        />
      ) : (
        <PreviewSkeleton heading="Trending" />
      )}
      {/* <PreviewProductRow heading="Top Sellings" link={"/"} />  */}
    </>
  );
}

export default withUrqlClient((_ssrExchange) => ({
  url: process.env.NEXT_PUBLIC_GRAPHQL_URL,
}))(Home);

export async function getServerSideProps() {
  await client
    .query(GET_PRODUCTS, { pagination: { limit: 4 }, sort: "createdAt:desc" })
    .toPromise();
  await client
    .query(GET_TRENDING_PRODUCT, { pagination: { limit: 4 }, trending: true })
    .toPromise();
  return {
    props: {
      urqlState: ssrCache.extractData(),
    },
  };
}
