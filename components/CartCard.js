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
const CartCard = ({ id, qty, productId, productSlug }) => {
  const { setCarts, jwt } = useAppContext();
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
      } catch (e) {
        console.log(e.message);
      }
    }
  };

  if (fetching) {
    return (
      <article className="flex flex-col items-center gap-20 px-2 py-2 border rounded md:flex-row ">
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
      className="flex flex-col items-center justify-between gap-4 p-4 rounded md:flex-row shadow bg-primary"
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
      <div className="flex items-center gap-4 ">
        <Image
          src={images.data[0].attributes.formats.thumbnail.url}
          width={images.data[0].attributes.formats.thumbnail.width}
          height={images.data[0].attributes.formats.thumbnail.height}
          alt={name}
        />
      </div>

      <Quantity className="grow flex flex-col md:flex-row">
        <h2 className=" max-w-[30rem] line-clamp-2 basis-1/2 text-center">
          {name}
        </h2>
        <div className="basis-1/2 w-full md:w-auto ju flex items-center ">
          <div className="flex items-center gap-2 ml-auto">
            <AiFillMinusCircle onClick={() => subStractQty()} />
            <p className="text-2xl font-medium">{qty}</p>

            <AiFillPlusCircle onClick={addQty} />
          </div>
          <span className="ml-auto text-xl text-primary ">
            {currencyFormatter.format(price * qty)}
          </span>
        </div>
      </Quantity>
    </CartCardStyled>
  );
};

export default CartCard;

const CartCardStyled = styled(motion.div)`
  background-color: ${(props) => props.theme.cardBackgroundColor};
`;

const Quantity = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5em;

  svg {
    font-size: 1.75rem;
    cursor: pointer;
    color: ${(props) => props.theme.textColor};
  }
`;
