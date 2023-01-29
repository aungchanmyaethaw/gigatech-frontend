import React, { useEffect, useState } from "react";
import { client, ssrCache } from "utils/urqlClient";
import { withUrqlClient } from "next-urql";
import { GET_PRODUCTS } from "graphql/products";
import { useQuery } from "urql";
import { motion } from "framer-motion";
import { ContainerStyled, UnderLine } from "styles/global.styles";
import ProductCard from "components/ProductCard";
import topSellings from "utils/topSellings";
import PreviewSkeleton from "components/PreviewSkeleton";
import { Button } from "styles/global.styles";
const TopSellings = () => {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [{ data, fetching, error }] = useQuery({
    query: GET_PRODUCTS,
    variables: { pagination: { limit: 100 } },
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(4);
  useEffect(() => {
    if (fetching) {
      return;
    } else {
      setFilteredProducts(topSellings(data.products.data));
    }
  }, [fetching]);

  const handleNext = () => {
    const tempCurrentPage = currentPage + 1;
    setCurrentPage(tempCurrentPage);
    const tempStart = end;
    setStart(tempStart);
    const tempEnd = end + 4;
    setEnd(tempEnd);
  };

  const handlePrev = () => {
    const tempCurrentPage = currentPage - 1;
    setCurrentPage(tempCurrentPage);
    const tempStart = start - 4;
    setStart(tempStart);
    const tempEnd = end - 4;
    setEnd(tempEnd);
  };

  console.log(start, end);

  return (
    <ContainerStyled>
      {filteredProducts.length > 1 ? (
        <>
          <div className="flex flex-col items-center mb-20">
            <h2 className="text-3xl lg:text-[40px] text-center font-normal capitalize">
              Top Sellings
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
            {filteredProducts.slice(start, end).map((product) => (
              <ProductCard
                {...product.attributes}
                id={product.id}
                key={product.attributes.slug}
              />
            ))}
          </motion.div>
          <motion.div
            className="flex items-center justify-center gap-4 mt-20"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ type: "tween", duration: 0.7 }}
          >
            <Button
              className={`text-xs disabled:cursor-not-allowed disabled:opacity-50`}
              onClick={handlePrev}
              disabled={currentPage === 1}
            >
              Prev
            </Button>
            <span className="text-xl">{currentPage}</span>
            <Button
              className={`text-xs disabled:cursor-not-allowed disabled:opacity-50`}
              onClick={handleNext}
              disabled={
                Math.ceil(filteredProducts.length / 4) === currentPage ||
                Math.ceil(filteredProducts.length / 4) === 3
              }
            >
              Next
            </Button>
          </motion.div>
        </>
      ) : (
        <PreviewSkeleton heading="Top Sellings" />
      )}
    </ContainerStyled>
  );
};

export default withUrqlClient((_ssrExchange) => ({
  url: process.env.NEXT_PUBLIC_GRAPHQL_URL,
}))(TopSellings);

export async function getServerSideProps() {
  await client.query(GET_PRODUCTS, { pagination: { limit: 100 } }).toPromise();

  return {
    props: {
      urqlState: ssrCache.extractData(),
    },
  };
}
