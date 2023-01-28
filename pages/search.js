import { GET_PRODUCTS } from "graphql/products";
import React from "react";
import { ContainerStyled } from "styles/global.styles";
import { withUrqlClient } from "next-urql";
import { client, ssrCache } from "utils/urqlClient";
import { useRouter } from "next/router";
import { useQuery } from "urql";
import { motion } from "framer-motion";
import ProductCard from "components/ProductCard";
import { TbSearchOff } from "react-icons/tb";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
const Search = () => {
  const { query } = useRouter();

  const [{ data, fetching, error }] = useQuery({
    query: GET_PRODUCTS,
    variables: { query: query.searchterm },
  });

  return (
    <ContainerStyled>
      <div className="flex items-center gap-4 mb-20 text-2xl">
        <h2>Results for</h2>
        <span className="font-bold text-primary">"{query.searchterm}"</span>
      </div>
      {fetching ? (
        <div className="grid grid-cols-1 gap-6 md:gap-8 lg:gap-10 md:grid-cols-2 lg:grid-cols-4">
          <SkeletonTheme baseColor="#ddd" highlightColor="#fff">
            <article>
              <Skeleton height={260} width={"100%"} />
              <div className="flex flex-col gap-2 mt-8">
                <Skeleton width={120} />
                <Skeleton count={2} />
                <Skeleton width={80} />
              </div>
            </article>
            <article>
              <Skeleton height={260} />
              <div className="flex flex-col gap-2 mt-8">
                <Skeleton width={120} />
                <Skeleton count={2} />
                <Skeleton width={80} />
              </div>
            </article>
            <article>
              <Skeleton height={260} />
              <div className="flex flex-col gap-2 mt-8">
                <Skeleton width={120} />
                <Skeleton count={2} />
                <Skeleton width={80} />
              </div>
            </article>
            <article>
              <Skeleton height={260} />
              <div className="flex flex-col gap-2 mt-8">
                <Skeleton width={120} />
                <Skeleton count={2} />
                <Skeleton width={80} />
              </div>
            </article>
          </SkeletonTheme>
        </div>
      ) : data.products.data.length < 1 ? (
        <div className="flex flex-col items-center gap-8">
          <TbSearchOff className="text-[6rem] text-primary" />
          <h4 className="text-3xl font-extralight">
            Sorry! No products were found matching your selection.
          </h4>
        </div>
      ) : (
        <motion.div
          className="grid grid-cols-1 gap-6 md:gap-8 lg:gap-10 md:grid-cols-2 lg:grid-cols-4"
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, type: "tween", duration: 0.5 }}
        >
          {data.products.data.map((product) => (
            <ProductCard
              {...product.attributes}
              id={product.id}
              key={product.attributes.slug}
            />
          ))}
        </motion.div>
      )}
    </ContainerStyled>
  );
};

export default withUrqlClient((_ssrExchange) => ({
  url: process.env.NEXT_PUBLIC_GRAPHQL_URL,
}))(Search);

export async function getServerSideProps(ctx) {
  await client.query(GET_PRODUCTS, { query: ctx.query.searchterm }).toPromise();

  return {
    props: {
      urqlState: ssrCache.extractData(),
    },
  };
}
