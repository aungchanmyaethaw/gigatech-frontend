import React, { useEffect, useState } from "react";
import topSellings from "utils/topSellings";
import PreviewProductRow from "./PreviewProductRow";
import PreviewSkeleton from "./PreviewSkeleton";
const TopSellingsProductRow = ({ products }) => {
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    setFilteredProducts(topSellings(products));
  }, []);

  if (filteredProducts.length < 1) {
    return <PreviewSkeleton heading="Top Sellings" />;
  }

  return (
    <PreviewProductRow
      products={filteredProducts.slice(0, 4)}
      heading="Top Sellings"
      link="/topsellings"
    />
  );
};

export default TopSellingsProductRow;
