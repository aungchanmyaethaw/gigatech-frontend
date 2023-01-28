import React from "react";
import { GET_TRENDING_PRODUCT } from "graphql/products";
import { client, ssrCache } from "utils/urqlClient";
import { ContainerStyled, UnderLine, Button } from "styles/global.styles";
import { withUrqlClient } from "next-urql";
import { useQuery } from "urql";
import { motion } from "framer-motion";
import ProductCard from "components/ProductCard";
import PreviewSkeleton from "components/PreviewSkeleton";
import { useRouter } from "next/router";
const Trending = () => {
  const router = useRouter();

  const [{ data, fetching, error }, reFetchProducts] = useQuery({
    query: GET_TRENDING_PRODUCT,
    variables: {
      trending: true,
      pagination: { start: parseInt(router.query.start), limit: 4 },
    },
  });

  console.log(data);

  if (fetching) {
    return <PreviewSkeleton heading="Trending" />;
  }

  const products = data.products.data;
  const pagination = data.products.meta.pagination;

  const handlePagination = (start) => {
    router.push(`/trending?start=${start}`);
    reFetchProducts({ requestPolicy: "network-only" });
  };

  return (
    <ContainerStyled>
      <div className="flex flex-col items-center mb-20">
        <h2 className="text-3xl lg:text-[40px] text-center font-normal capitalize">
          Trending
        </h2>
        <UnderLine />
      </div>
      <motion.div
        className="grid grid-cols-1 gap-8 md:gap-10 md:grid-cols-2 lg:grid-cols-4"
        initial={{ y: 40, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5, type: "tween", duration: 0.5 }}
      >
        {products.map((product) => (
          <ProductCard
            {...product.attributes}
            id={product.id}
            key={product.attributes.slug}
          />
        ))}
      </motion.div>
      <motion.div
        className="mt-20 flex justify-center items-center gap-4"
        disabled={parseInt(router.query.start) >= 8}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ type: "tween", duration: 0.7 }}
      >
        <Button
          className={`text-xs disabled:cursor-not-allowed disabled:opacity-50`}
          onClick={() => handlePagination(parseInt(router.query.start) - 4)}
          disabled={parseInt(router.query.start) === 0}
        >
          Prev
        </Button>
        <span className="text-xl">{pagination.page}</span>
        <Button
          className={`text-xs disabled:cursor-not-allowed disabled:opacity-50`}
          onClick={() => handlePagination(parseInt(router.query.start) + 4)}
          disabled={pagination.page === pagination.pageCount}
        >
          Next
        </Button>
      </motion.div>
    </ContainerStyled>
  );
};

export default withUrqlClient((_ssrExchange) => ({
  url: process.env.NEXT_PUBLIC_GRAPHQL_URL,
}))(Trending);

export async function getServerSideProps(ctx) {
  await client
    .query(GET_TRENDING_PRODUCT, {
      trending: true,
      pagination: { start: parseInt(ctx.query.start), limit: 4 },
    })
    .toPromise();

  return {
    props: {
      urqlState: ssrCache.extractData(),
    },
  };
}
