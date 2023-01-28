import React from "react";
import { ContainerStyled, UnderLine, Button } from "styles/global.styles";
import { client, ssrCache } from "utils/urqlClient";
import { GET_PRODUCTS } from "graphql/products";
import { withUrqlClient } from "next-urql";
import { useQuery } from "urql";
import { useRouter } from "next/router";
import PreviewSkeleton from "components/PreviewSkeleton";
import { motion } from "framer-motion";
import ProductCard from "components/ProductCard";
const NewArrivals = () => {
  const router = useRouter();

  const [{ data, fetching, error }, reFetchProducts] = useQuery({
    query: GET_PRODUCTS,
    variables: {
      sort: router.query.sort,
      pagination: {
        start: parseInt(router.query.start),
        limit: 4,
      },
    },
  });

  const handlePagination = (start) => {
    router.push(`/newarrivals?sort=createdAt:desc&start=${start}`);
    reFetchProducts({ requestPolicy: "network-only" });
  };

  if (fetching) {
    return <PreviewSkeleton heading="New Arrivals" />;
  }

  const products = data.products.data;
  const pagination = data.products.meta.pagination;

  return (
    <ContainerStyled>
      <div className="flex flex-col items-center mb-20">
        <h2 className="text-3xl lg:text-[40px] text-center font-normal capitalize">
          New Arrivals
        </h2>
        <UnderLine />
      </div>
      {!fetching ? (
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
              latest
            />
          ))}
        </motion.div>
      ) : null}
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
          disabled={parseInt(router.query.start) >= 8}
        >
          Next
        </Button>
      </motion.div>
    </ContainerStyled>
  );
};

export default withUrqlClient((_ssrExchange) => ({
  url: process.env.NEXT_PUBLIC_GRAPHQL_URL,
}))(NewArrivals);

export async function getServerSideProps(ctx) {
  const start = parseInt(ctx.query.start);

  await client
    .query(GET_PRODUCTS, {
      sort: ctx.query.sort,
      pagination: {
        start,
        limit: 4,
      },
    })
    .toPromise();

  return {
    props: {
      urqlState: ssrCache.extractData(),
    },
  };
}
