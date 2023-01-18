import React from "react";
import { motion } from "framer-motion";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { ContainerStyled } from "styles/global.styles";
import { GET_PRODUCTS } from "graphql/products";
import { withUrqlClient } from "next-urql";
import { useQuery } from "urql";
import { client, ssrCache } from "utils/urqlClient";
import { useRouter } from "next/router";
import ProductCard from "components/ProductCard";
import { GET_COLLECTIONS } from "graphql/collections";
import { UnderLine } from "styles/global.styles";
const Collection = () => {
  const router = useRouter();

  const [productResult] = useQuery({
    query: GET_PRODUCTS,
    variables: {
      collection: router.query.collection,
    },
  });
  const [collectionResult] = useQuery({
    query: GET_COLLECTIONS,
    variables: {
      slug: router.query.collection,
    },
  });

  const { data, fetching, error } = productResult;
  const {
    data: collectionData,
    fetching: collectionFetching,
    error: collectionError,
  } = collectionResult;
  return (
    <ContainerStyled>
      <div className="flex flex-col items-center mb-20">
        <div className="text-3xl lg:text-[40px] text-center font-normal capitalize">
          {!collectionFetching &&
            collectionData?.collections.data[0].attributes.name}
        </div>
        <UnderLine />
      </div>
      <div className="flex gap-4">
        <aside className="p-4 basis-1/4">
          <h1>Aside</h1>
        </aside>
        <div className="p-4 basis-3/4">
          {fetching ? (
            <div className="grid grid-cols-1 gap-6 md:gap-8 lg:gap-10 md:grid-cols-2 lg:grid-cols-3">
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
              </SkeletonTheme>
            </div>
          ) : (
            <motion.div
              className="grid grid-cols-1 gap-6 md:gap-8 lg:gap-10 md:grid-cols-2 lg:grid-cols-3"
              initial={{ y: 40, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, type: "tween", duration: 0.5 }}
            >
              {data.products.data.map((product) => (
                <ProductCard
                  {...product.attributes}
                  key={product.attributes.slug}
                />
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </ContainerStyled>
  );
};

export default withUrqlClient((_ssrExchange) => ({
  url: process.env.NEXT_PUBLIC_GRAPHQL_URL,
}))(Collection);

export async function getServerSideProps(ctx) {
  await client
    .query(GET_PRODUCTS, { collection: ctx.query.collection })
    .toPromise();
  await client
    .query(GET_COLLECTIONS, { collection: ctx.query.collection })
    .toPromise();

  return {
    props: {
      urqlState: ssrCache.extractData(),
    },
  };
}
