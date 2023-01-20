import React from "react";
import { parseCookies } from "nookies";
import { useQuery } from "urql";
import { useAppContext } from "contexts/AppContext";
import { GET_SINGLE_PRODUCT } from "graphql/products";
import Image from "next/image";
import { currencyFormatter } from "utils";
import { Button } from "styles/global.styles";
import Link from "next/link";
const WishlistCard = ({ productSlug, collectionSlug }) => {
  const { setCarts } = useAppContext();
  const cookies = parseCookies();
  const [{ data, fetching, error }] = useQuery({
    query: GET_SINGLE_PRODUCT,
    variables: {
      slug: productSlug,
    },
  });

  if (fetching) {
    return <h1>Fetching...</h1>;
  }

  const { name, price, images } = data.products.data[0].attributes;

  return (
    <article className="flex flex-col items-center justify-between gap-4 px-2 py-2 border rounded md:flex-row">
      <div className="flex items-center gap-4 grow">
        <Link href={`/collections/${collectionSlug}/${productSlug}`}>
          <Image
            src={images.data[0].attributes.formats.thumbnail.url}
            width={images.data[0].attributes.formats.thumbnail.width}
            height={images.data[0].attributes.formats.thumbnail.height}
            alt={name}
          />
        </Link>
        <Link
          className=" max-w-[30rem] line-clamp-2"
          href={`/collections/${collectionSlug}/${productSlug}`}
        >
          {name}
        </Link>
      </div>
      <div className="basis-full md:basis-[40%] flex justify-center items-center">
        <span className="text-xl text-primary md:basis-1/2">
          {currencyFormatter.format(price)}
        </span>
        <div>
          <Button className="!border-error !text-error hover:before:!hidden active:before:!hidden text-xs ">
            Remove
          </Button>
        </div>
      </div>
    </article>
  );
};

export default WishlistCard;
