import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { withUrqlClient } from "next-urql";
import { useQuery } from "urql";
import ProductCard from "components/ProductCard";
import { ContainerStyled } from "styles/global.styles";
import { UnderLine } from "styles/global.styles";
import { GET_PRODUCTS } from "graphql/products";
import styled from "styled-components";
import { client, ssrCache } from "utils/urqlClient";
const PreviewProductRow = ({ variables, heading }) => {
  const [results] = useQuery({
    query: GET_PRODUCTS,
    variables,
  });

  const { data, fetching, error } = results;

  return (
    <ContainerStyled>
      <div className="flex flex-col items-center mb-20">
        <h2 className="text-3xl lg:text-[40px] text-center font-normal capitalize">
          {heading}
        </h2>
        <UnderLine />
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
      ) : (
        <motion.div
          className="grid grid-cols-1 gap-8 md:gap-10  md:grid-cols-2 lg:grid-cols-4"
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
      <ButtonContainer
        className="flex justify-center mt-16"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ type: "tween", duration: 0.7 }}
      >
        <Link href="/">Explore More</Link>
      </ButtonContainer>
    </ContainerStyled>
  );
};

export default withUrqlClient((_ssrExchange) => ({
  url: process.env.NEXT_PUBLIC_GRAPHQL_URL,
}))(PreviewProductRow);

export async function getServerSideProps() {
  await client.query(GET_PRODUCTS).toPromise();

  return {
    props: {
      urqlState: ssrCache.extractData(),
    },
  };
}

const ButtonContainer = styled(motion.div)`
  a {
    display: block;
    padding: 0.75em 1.5em;
    position: relative;
    overflow: hidden;
    color: var(--primary);
    font-family: var(--font-heading);
    font-weight: 600;
    background-color: ${(props) => props.theme.backgroundColor};
    border-radius: 4px;
    z-index: 1;
    transition: color 300ms ease-in;
    border: 2px solid var(--primary);
    &:before {
      content: "";
      width: 100%;
      height: 100%;
      display: block;
      position: absolute;
      inset: 0;
      background-color: var(--primary);
      border-radius: 0.75rem;
      transform: scale(0);
      transition: transform 300ms ease-in;
      z-index: -1;
    }
    &:hover,
    &:active {
      color: var(--light);
      &:before {
        transform: scale(1.5);
      }
    }
  }
`;
