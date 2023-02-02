import React from "react";
import { motion } from "framer-motion";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { ContainerStyled, Button } from "styles/global.styles";
import { GET_PRODUCTS } from "graphql/products";
import { withUrqlClient } from "next-urql";
import { useQuery } from "urql";
import { client, ssrCache } from "utils/urqlClient";
import { useRouter } from "next/router";
import ProductCard from "components/ProductCard";
import { GET_COLLECTIONS } from "graphql/collections";
import { UnderLine } from "styles/global.styles";
import styled from "styled-components";
import { BiSort } from "react-icons/bi";
const Collection = () => {
  const router = useRouter();

  const [productResult, reFetchProducts] = useQuery({
    query: GET_PRODUCTS,
    variables: {
      collection: router.query.collection,
      sort: router.query.sort,
      pagination: {
        start: parseInt(router.query.start),
        limit: 4,
      },
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

  const handleSorting = (sortingValue) => {
    router.push(
      `/collections/${
        router.query.collection
      }?sort=${sortingValue}&start=${parseInt(router.query.start)}`
    );
    reFetchProducts({ requestPolicy: "network-only" });
  };

  const handlePagination = (start) => {
    router.push(
      `/collections/${router.query.collection}?sort=${router.query.sort}&start=${start}`
    );
    reFetchProducts({ requestPolicy: "network-only" });
  };

  const products = data?.products.data;
  const pagination = data?.products.meta.pagination;

  return (
    <ContainerStyled>
      <div className="flex flex-col items-center mb-20">
        <h2 className="text-3xl lg:text-[40px] text-center font-normal capitalize mb-1">
          {!collectionFetching &&
            collectionData?.collections.data[0].attributes.name}
        </h2>
        <UnderLine />
      </div>
      <div className="flex gap-4">
        <div className="p-4 grow">
          <SelectContainerStyled className="flex items-center justify-end mb-12 ml-auto rounded w-max">
            <select
              className="w-[8rem] p-2  text-dark-200 rounded font-body "
              id="sorting"
              defaultValue={router.query.sort}
              onChange={(e) => handleSorting(e.target.value)}
            >
              <option className="bg-white" value={"createdAt:desc"}>
                Date:New-Old
              </option>
              <option className="bg-white" value={"createdAt"}>
                Date:Old-New
              </option>
              <option className="bg-white" value={"slug"}>
                A-Z
              </option>
              <option className="bg-white" value={"slug:desc"}>
                Z-A
              </option>
              <option className="bg-white" value={"price:desc"}>
                Price:High-Low
              </option>
              <option className="bg-white" value={"price"}>
                Price:Low-High
              </option>
            </select>
            <label
              className="w-[2rem] h-[2rem] rounded-full flex justify-center items-center "
              htmlFor="sorting"
            >
              <BiSort className="text-xl" />
            </label>
          </SelectContainerStyled>
          {fetching ? (
            <div className="grid grid-cols-1 gap-6 md:gap-8 lg:gap-10 md:grid-cols-3 lg:grid-cols-4">
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
            <>
              <motion.div
                className="grid grid-cols-1 gap-6 md:gap-8 lg:gap-10 md:grid-cols-3 lg:grid-cols-4"
                initial={{ y: 40, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, type: "tween", duration: 0.5 }}
              >
                {products.map((product) => (
                  <ProductCard
                    id={product.id}
                    {...product.attributes}
                    key={product.attributes.slug}
                  />
                ))}
              </motion.div>
            </>
          )}
        </div>
      </div>
      <motion.div
        className="flex items-center justify-center gap-4 mt-20"
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
}))(Collection);

export async function getServerSideProps(ctx) {
  await client
    .query(GET_PRODUCTS, {
      collection: ctx.query.collection,
      sort: ctx.query.sort,
      pagination: {
        start: parseInt(ctx.query.start),
        limit: 4,
      },
    })
    .toPromise();
  await client
    .query(GET_COLLECTIONS, {
      collection: ctx.query.collection,
    })
    .toPromise();

  return {
    props: {
      urqlState: ssrCache.extractData(),
    },
  };
}

const SelectContainerStyled = styled.div`
  border: 1px solid ${(props) => props.theme.selectBoxBorderColor};
  select {
    background-color: transparent;
    color: ${(props) => props.theme.textColor};
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    option {
      color: ${(props) => props.theme.optionTextColor};
    }
  }
`;
