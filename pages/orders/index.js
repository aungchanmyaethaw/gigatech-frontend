import React from "react";
import { useAppContext } from "contexts/AppContext";
import { ContainerStyled, UnderLine } from "styles/global.styles";
import styled from "styled-components";
import { motion } from "framer-motion";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { TbTruckOff } from "react-icons/tb";
import OrderCard from "components/OrderCard";
const Orders = () => {
  const { orders, orderFetching } = useAppContext();
  let body;
  if (orderFetching) {
    body = (
      <OrderContainerStyled className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
        <SkeletonTheme baseColor="#ddd" highlightColor="#fff">
          <Skeleton height={260} />
          <Skeleton height={260} />
          <Skeleton height={260} />
          <Skeleton height={260} />
        </SkeletonTheme>
      </OrderContainerStyled>
    );
  } else {
    body = orders.length ? (
      <OrderContainerStyled
        className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4"
        initial={{ y: 40, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5, type: "tween", duration: 0.5 }}
      >
        {orders.map((order) => (
          <OrderCard key={order.id} {...order} />
        ))}
      </OrderContainerStyled>
    ) : (
      <div className="flex flex-col items-center gap-8">
        <TbTruckOff className="text-[6rem] text-primary" />
        <h4 className="text-3xl font-extralight">Currently Empty...</h4>
      </div>
    );
  }

  return (
    <ContainerStyled>
      <div className="flex flex-col items-center mb-20">
        <h2 className="text-3xl lg:text-[40px] text-center font-normal capitalize">
          Orders
        </h2>
        <UnderLine className="!w-[6rem]" />
      </div>
      {body}
    </ContainerStyled>
  );
};

export default Orders;

const OrderContainerStyled = styled(motion.div)`
  article {
    background-color: ${(props) => props.theme.cardBackgroundColor};
    display: flex;
    flex-direction: column;
    gap: 0.75em;
    a {
      margin-left: auto;
      margin-top: 1.5em;
      display: block;
      padding: 0.75em 1.5em;
      position: relative;
      overflow: hidden;
      color: var(--primary);
      font-family: var(--font-heading);
      font-weight: 600;
      font-size: 0.875rem;
      background-color: transparent;
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
  }
`;
