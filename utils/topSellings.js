const handleTopSellingProducts = (products) => {
  const withOrderedProducts = products.filter(
    (product) => product.attributes.order_details.data.length > 0
  );
  const sortedProducts = withOrderedProducts.sort(
    (firstProduct, secondProduct) => {
      const firstProductTotalQty =
        firstProduct.attributes.order_details.data.reduce(
          (prev, second) => prev + second.attributes.QTY,
          0
        );
      const secondProductTotalQty =
        secondProduct.attributes.order_details.data.reduce(
          (prev, second) => prev + second.attributes.QTY,
          0
        );
      return secondProductTotalQty - firstProductTotalQty;
    }
  );
  return sortedProducts;
};

export default handleTopSellingProducts;
