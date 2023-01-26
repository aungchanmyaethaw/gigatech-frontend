import React from "react";
import { GET_SINGLE_PRODUCT } from "graphql/products";
import { useMutation, useQuery } from "urql";
import { currencyFormatter } from "utils";
import Image from "next/image";
import styled from "styled-components";
import { AiFillPlusCircle, AiFillMinusCircle } from "react-icons/ai";
import { useAppContext } from "contexts/AppContext";
import { UPDATE_QTY, DELETE_CART } from "graphql/cart";
import toast, { Toaster } from "react-hot-toast";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import Link from "next/link";
const CartCard = ({
  id,
  qty,
  productPrice,
  productId,
  productSlug,
  collectionSlug,
}) => {
  const router = useRouter();
  const { setCarts, jwt, setTotalAmount } = useAppContext();
  const [{ data, fetching, error }] = useQuery({
    query: GET_SINGLE_PRODUCT,
    variables: {
      slug: productSlug,
    },
  });

  const [cartResults, updateQty] = useMutation(UPDATE_QTY);
  const [deleteResult, deleteCart] = useMutation(DELETE_CART);

  const addQty = async () => {
    const variables = { qty: qty + 1, cart_id: id, product: productId };
    try {
      const { data, fetching, error } = await updateQty(variables, {
        fetchOptions: {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        },
      });

      if (!fetching && !error) {
        setCarts((prev) => {
          return prev.map((cart) =>
            cart.id === id ? { ...cart, qty: qty + 1 } : cart
          );
        });
        setTotalAmount((prev) => prev + productPrice);
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  const subStractQty = async () => {
    if (qty <= 1) {
      try {
        const variables = { cart_id: id };
        const { data, fetching, error } = await deleteCart(variables, {
          fetchOptions: {
            headers: {
              Authorization: `Bearer ${jwt}`,
            },
          },
        });

        if (!fetching && !error) {
          setCarts((prev) => {
            return prev.filter((cart) => cart.id !== id);
          });
          setTotalAmount((prev) => prev - productPrice);
        }
      } catch (e) {
        console.log(e);
      }
    } else {
      try {
        const variables = { qty: qty - 1, cart_id: id, product: productId };
        const { data, fetching, error } = await updateQty(variables, {
          fetchOptions: {
            headers: {
              Authorization: `Bearer ${jwt}`,
            },
          },
        });
        if (!fetching && !error) {
          setCarts((prev) => {
            return prev.map((cart) =>
              cart.id === id ? { ...cart, qty: qty - 1 } : cart
            );
          });
        }
        setTotalAmount((prev) => prev - productPrice);
      } catch (e) {
        console.log(e.message);
      }
    }
  };

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
    <CartCardStyled
      className="shadow grid  items-center grid-cols-12 p-4 rounded gap-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      layout
    >
      <Toaster
        position="top-center"
        toastOptions={{
          error: {
            duration: 3000,
          },
          success: {
            duration: 3000,
          },
        }}
      />
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
          className=" text-center md:text-left max-w-[25rem] line-clamp-2 mb-4 md:mb-0"
          href={`/collections/${collectionSlug}/${productSlug}`}
        >
          {name}
        </Link>
      </div>

      <div className="flex items-center justify-center gap-2  col-span-6 md:col-span-2 ">
        <AiFillMinusCircle onClick={() => subStractQty()} />
        <p className="text-xl md:text-2xl font-medium">{qty}</p>

        <AiFillPlusCircle onClick={addQty} />
      </div>
      <span className=" text-primary col-span-6 md:col-span-2 flex items-center justify-center text-xl md:text-2xl">
        {currencyFormatter.format(price * qty)}
      </span>
    </CartCardStyled>
  );
};

export default CartCard;

const CartCardStyled = styled(motion.div)`
  background-color: ${(props) => props.theme.cardBackgroundColor};
  svg {
    font-size: 1.75rem;
    cursor: pointer;
    color: ${(props) => props.theme.textColor};
  }
`;
