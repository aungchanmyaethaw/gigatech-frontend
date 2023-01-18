import React from "react";
import { ContainerStyled, UnderLine } from "styles/global.styles";
import { motion } from "framer-motion";
import { withUrqlClient } from "next-urql";
import { useQuery } from "urql";
import { client, ssrCache } from "utils/urqlClient";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { GET_COLLECTIONS } from "graphql/collections";
import CollectionCard from "components/CollectionCard";
const Collections = () => {
  const [results] = useQuery({
    query: GET_COLLECTIONS,
  });

  const { data, fetching, error } = results;

  return (
    <ContainerStyled>
      <div className="flex flex-col items-center mb-20">
        <h2 className="text-3xl lg:text-[40px] text-center font-normal capitalize">
          Collections
        </h2>
        <UnderLine />
      </div>
      {fetching ? (
        <div className="grid grid-cols-1 gap-6 md:gap-8 lg:gap-10 md:grid-cols-2 lg:grid-cols-4">
          <SkeletonTheme baseColor="#ddd" highlightColor="#fff">
            <Skeleton height={260} width="100%" />
            <Skeleton height={260} width="100%" />
            <Skeleton height={260} width="100%" />
            <Skeleton height={260} width="100%" />
            <Skeleton height={260} width="100%" />
            <Skeleton height={260} width="100%" />
          </SkeletonTheme>
        </div>
      ) : (
        <motion.div
          className="grid grid-cols-1 gap-6 md:gap-8 lg:gap-10 md:grid-cols-2 lg:grid-cols-4"
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, type: "tween", duration: 0.5 }}
        >
          {data.collections.data.map((collection) => (
            <CollectionCard
              key={collection.attributes.slug}
              {...collection.attributes}
            />
          ))}
        </motion.div>
      )}
    </ContainerStyled>
  );
};

export default withUrqlClient((_ssrExchange) => ({
  url: process.env.NEXT_PUBLIC_GRAPHQL_URL,
}))(Collections);

export async function getStaticProps() {
  await client.query(GET_COLLECTIONS).toPromise();

  return {
    props: {
      urqlState: ssrCache.extractData(),
    },
    revalidate: 600,
  };
}
