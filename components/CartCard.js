import React from "react";
import { GET_SINGLE_PRODUCT } from "graphql/products";
import { useMutation, useQuery } from "urql";
import { currencyFormatter } from "utils";
import Image from "next/image";
import styled from "styled-components";
import { AiFillPlusCircle, AiFillMinusCircle } from "react-icons/ai";
import { useAppContext } from "contexts/AppContext";
import { UPDATE_QTY, DELETE_CART } from "graphql/cart";
import { parseCookies } from "nookies";
import toast, { Toaster } from "react-hot-toast";
const CartCard = ({ id, qty, productId, productSlug, userId }) => {
  const { setCarts } = useAppContext();
  const cookies = parseCookies();
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
            Authorization: `Bearer ${cookies.jwt}`,
          },
        },
      });
      console.log(error);
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
              Authorization: `Bearer ${cookies.jwt}`,
            },
          },
        });

        if (!fetching && !error) {
          setCarts((prev) => {
            return prev.filter((cart) => cart.id !== id);
          });
          toast.success(
            `${data.deleteCart.data.attributes.product.data.attributes.name} is  remove from cart.`
          );
        }
        console.log(error);
      } catch (e) {
        console.log(e);
      }
    } else {
      try {
        const variables = { qty: qty - 1, cart_id: id, product: productId };
        const { data, fetching, error } = await updateQty(variables, {
          fetchOptions: {
            headers: {
              Authorization: `Bearer ${cookies.jwt}`,
            },
          },
        });
        console.log(error);
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
    return <h1>Loading</h1>;
  }

  const { name, price, images } = data.products.data[0].attributes;

  return (
    <article className="flex flex-col items-center justify-between gap-4 px-2 py-2 border rounded md:flex-row">
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
      <div className="flex items-center gap-4 grow">
        <Image
          src={images.data[0].attributes.formats.thumbnail.url}
          width={images.data[0].attributes.formats.thumbnail.width}
          height={images.data[0].attributes.formats.thumbnail.height}
          alt={name}
        />
        <h2 className=" max-w-[30rem] line-clamp-2">{name}</h2>
      </div>

      <Quantity className="basis-full md:basis-[40%]">
        <div className="flex items-center gap-3 basis-1/2">
          <AiFillMinusCircle onClick={() => subStractQty()} />
          <p className="text-2xl font-medium">{qty}</p>
          <button onClick={addQty}>
            <AiFillPlusCircle />
          </button>
        </div>
        <span className="ml-auto text-xl text-primary basis-1/2">
          {currencyFormatter.format(price * qty)}
        </span>
      </Quantity>
    </article>
  );
};

export default CartCard;

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
