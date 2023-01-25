import React from "react";
import { parseCookies } from "nookies";
import { useQuery } from "urql";
import { useAppContext } from "contexts/AppContext";
import { GET_SINGLE_PRODUCT } from "graphql/products";
import Image from "next/image";
import { currencyFormatter } from "utils";
import { Button } from "styles/global.styles";
import Link from "next/link";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { motion } from "framer-motion";
import styled from "styled-components";
import { useRouter } from "next/router";
const WishlistCard = ({ productSlug, collectionSlug, id }) => {
  const router = useRouter();
  const { removeFromWishList } = useAppContext();
  const cookies = parseCookies();
  const [{ data, fetching, error }] = useQuery({
    query: GET_SINGLE_PRODUCT,
    variables: {
      slug: productSlug,
    },
  });

  if (fetching) {
    return (
      <article className="flex flex-col items-center gap-20 px-2 py-2 border rounded md:flex-row">
        <SkeletonTheme baseColor="#ddd" highlightColor="#fff">
          <Skeleton height={156} width={156} />
          <Skeleton width={240} count="2" />
        </SkeletonTheme>
      </article>
    );
  }

  const { name, price, images } = data.products.data[0].attributes;

  return (
    <WishlistCardStyled
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      layout
      className="shadow grid  items-center grid-cols-12 p-4 rounded gap-4"
    >
      <div className="flex items-center justify-center  col-span-12  md:col-span-2">
        <Image
          src={images.data[0].attributes.formats.thumbnail.url}
          width={160}
          height={160}
          alt={name}
          onClick={() =>
            router.push(`/collections/${collectionSlug}/${productSlug}`)
          }
        />
      </div>
      <div className="flex md:col-span-6 col-span-12 row-span-2 items-center">
        <Link
          className="text-center md:text-left max-w-[25rem] line-clamp-2"
          href={`/collections/${collectionSlug}/${productSlug}`}
        >
          {name}
        </Link>
      </div>

      <span className="text-primary col-span-6 md:col-span-2 flex items-center justify-center text-xl md:text-2xl">
        {currencyFormatter.format(price)}
      </span>
      <div className="flex items-center justify-center gap-2  col-span-6 md:col-span-2">
        <Button
          className="!border-error !text-error hover:before:!hidden active:before:!hidden text-xs !bg-transparent"
          onClick={() => removeFromWishList(id)}
        >
          Remove
        </Button>
      </div>
    </WishlistCardStyled>
  );
};

export default WishlistCard;

const WishlistCardStyled = styled(motion.div)`
  background-color: ${(props) => props.theme.cardBackgroundColor};
  svg {
    font-size: 1.75rem;
    cursor: pointer;
    color: ${(props) => props.theme.textColor};
  }
`;
