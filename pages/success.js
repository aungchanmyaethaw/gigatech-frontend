import React, { useEffect } from "react";
import styled from "styled-components";
import { ContainerStyled } from "styles/global.styles";
import { UnderLine } from "styles/global.styles";
import Link from "next/link";
import { useMutation } from "urql";
import { ADD_ORDER } from "graphql/orders";
import { ADD_ORDER_DETAILS } from "graphql/order_details";
import { DELETE_CART } from "graphql/cart";
import { useAppContext } from "contexts/AppContext";
import { parseCookies } from "nookies";

const stripe = require("stripe")(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);
const Success = ({ order }) => {
  const cookies = parseCookies();

  const { carts, setOrders, setCarts, setTotalAmount } = useAppContext();
  const [addOrderResult, addOrder] = useMutation(ADD_ORDER);
  const [addOrderDetailResult, addOrderDetails] =
    useMutation(ADD_ORDER_DETAILS);
  const [deleteResult, deleteCart] = useMutation(DELETE_CART);

  useEffect(() => {
    if (carts.length > 0) {
      handleCart();
    }
  }, [carts]);

  const handleCart = async () => {
    const totalAmount = order.amount_total / 100;
    const userId = JSON.parse(localStorage.getItem("user")).id;
    handleAddOrder(totalAmount, userId).then((orderId) => {
      carts.forEach((cart) => {
        handleAddOrderDetails(cart, orderId);
      });
    });
    setCarts([]);
    setTotalAmount(0);
  };

  const handleAddOrder = async (totalAmount, id) => {
    const orderVariables = { total_amount: totalAmount, user_id: id };
    try {
      const { data, fetching, error } = await addOrder(orderVariables, {
        fetchOptions: {
          headers: {
            Authorization: `Bearer ${cookies.jwt}`,
          },
        },
      });
      if (!fetching && !error) {
        console.log("reached");
        setOrders((prev) => {
          return [
            ...prev,
            {
              id: data.createOrder.data.id,
              totalAmount: data.createOrder.data.attributes.total_amount,
              date: data.createOrder.data.attributes.createdAt,
              status: data.createOrder.data.attributes.status,
            },
          ];
        });
      }
      const orderId = await data.createOrder.data.id;
      return orderId;
    } catch (e) {
      console.log(e);
    }
  };

  const handleAddOrderDetails = async (cart, orderId) => {
    try {
      const orderDetailsVariables = {
        order_id: orderId,
        product: cart.productId,
        qty: cart.qty,
      };
      const { data, fetching, error } = await addOrderDetails(
        orderDetailsVariables,
        {
          fetchOptions: {
            headers: {
              Authorization: `Bearer ${cookies.jwt}`,
            },
          },
        }
      );

      if (!fetching && !error) {
        const variables = { cart_id: cart.id };
        const { data, fetching, error } = await deleteCart(variables, {
          fetchOptions: {
            headers: {
              Authorization: `Bearer ${cookies.jwt}`,
            },
          },
        });
        if (!fetching && !error) {
          setCarts((prev) => {
            return prev.filter((prevCart) => prevCart.id !== cart.id);
          });
        }
      }
    } catch (e) {
      return e.message;
    }
  };

  return (
    <ContainerStyled>
      <ThankYouContainer>
        <div className="flex flex-col items-center mb-8">
          <h2 className="mb-2 text-6xl font-thin ">Thank you</h2>
          <UnderLine className="mb-6" />
          <span className="text-lg">For your shopping!!! ❤️</span>
        </div>
        <Link href="/collections">Shop More</Link>
      </ThankYouContainer>
    </ContainerStyled>
  );
};

export default Success;

const ThankYouContainer = styled.div`
  padding: 2em;

  a {
    display: block;
    width: max-content;
    margin: 0 auto;
    padding: 0.75em 1.5em;
    position: relative;
    overflow: hidden;
    color: var(--primary);
    font-family: var(--font-heading);
    font-weight: 600;
    background-color: ${(props) => props.theme.backgroundColor};
    border-radius: 4px;
    z-index: 1;
    transition: color 300ms ease-in;
    border: 2px solid var(--primary);
    &:before {
      content: "";
      width: 100%;
      height: 100%;
      display: block;
      position: absolute;
      inset: 0;
      background-color: var(--primary);
      border-radius: 0.75rem;
      transform: scale(0);
      transition: transform 300ms ease-in;
      z-index: -1;
    }
    &:hover,
    &:active {
      color: var(--light);
      &:before {
        transform: scale(1.5);
      }
    }
  }
`;

export async function getServerSideProps(ctx) {
  const order = await stripe.checkout.sessions.retrieve(ctx.query.session_id, {
    expand: ["line_items"],
  });

  return {
    props: { order },
  };
}
