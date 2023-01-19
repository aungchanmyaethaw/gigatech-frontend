import React from "react";
import { GET_SINGLE_PRODUCT } from "graphql/products";
import { useQuery } from "urql";
import { currencyFormatter } from "utils";
const CartCard = ({ id, qty, productId, productSlug, userId }) => {
  const [{ data, fetching, error }] = useQuery({
    query: GET_SINGLE_PRODUCT,
    variables: {
      slug: productSlug,
    },
  });

  if (fetching) {
    return <h1>Loading</h1>;
  }

  const { name, price, images } = data.products.data[0].attributes;
  return (
    <article className="flex items-center gap-4 px-2 py-2 border-2 rounded">
      <img src={images.data[0].attributes.formats.thumbnail.url} />
      <h2 className="w-[30rem] line-clamp-2">{name}</h2>
      <span>{currencyFormatter.format(price)}</span>
    </article>
  );
};

export default CartCard;
