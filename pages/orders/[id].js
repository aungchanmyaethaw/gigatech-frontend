import React, { useEffect, useState } from "react";
import { GET_ORDER_DETAILS } from "graphql/order_details";
import { useQuery } from "urql";
import { useRouter } from "next/router";
import { ContainerStyled, UnderLine } from "styles/global.styles";
import { currencyFormatter } from "utils";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Image from "next/image";
import styled from "styled-components";
import { motion } from "framer-motion";
const OrderDetails = () => {
  const router = useRouter();

  const [{ data, fetching, error }, reexecuteQuery] = useQuery({
    query: GET_ORDER_DETAILS,
    variables: {
      order_id: router.query.id,
    },
  });

  const detailsId = router.query.id;

  useEffect(() => {
    reexecuteQuery({ requestPolicy: "network-only" });
  }, [detailsId]);

  const allOrders = data?.orderDetails.data;

  const totalAmount = allOrders?.reduce((prev, current) => {
    const qty = current.attributes.QTY;
    const product = current.attributes.product;
    const { price } = product.data.attributes;

    return qty * price + prev;
  }, 0);

  return (
    <ContainerStyled>
      <div className="flex flex-col items-center mb-20">
        <h2 className="text-3xl lg:text-[40px] text-center font-normal capitalize mb-2">
          Order Details
        </h2>
        <UnderLine />
      </div>
      <motion.div
        className="flex flex-col gap-5"
        initial={{ y: 40, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5, type: "tween", duration: 0.5 }}
      >
        {!fetching ? (
          allOrders.map((order) => {
            const qty = order.attributes.QTY;
            const product = order.attributes.product;
            const { name, price, images } = product.data.attributes;

            return (
              <OrderCardStyled
                className="grid items-center grid-cols-12 gap-4 p-4 rounded shadow"
                key={name}
              >
                <div className="flex items-center justify-center col-span-12 md:col-span-2">
                  <Image
                    src={images.data[0].attributes.formats.thumbnail.url}
                    width={160}
                    height={160}
                    alt={name}
                  />
                </div>
                <div className="flex items-center col-span-12 row-span-2 md:col-span-6">
                  <h2 className=" text-center md:text-left max-w-[30rem] line-clamp-2 mb-4 md:mb-0">
                    {name}
                  </h2>
                </div>

                <span className="col-span-6 text-xl text-center md:col-span-2 md:text-left">
                  {qty}
                </span>
                <span className="flex items-center justify-center col-span-6 text-xl text-primary md:col-span-2 md:text-2xl">
                  {currencyFormatter.format(price * qty)}
                </span>
              </OrderCardStyled>
            );
          })
        ) : (
          <div className="flex flex-col gap-5">
            <SkeletonTheme baseColor="#ddd" highlightColor="#fff">
              <OrderCardStyled className="grid items-center grid-cols-12 gap-4 p-4 rounded shadow">
                <div className="flex justify-center col-span-12 md:col-span-2">
                  <Skeleton width={160} height={160} />
                </div>
                <div className="flex justify-center col-span-12 md:col-span-6">
                  <Skeleton width={320} count={2} />
                </div>
                <div className="flex justify-center col-span-6 md:col-span-2">
                  <Skeleton width={80} />
                </div>
                <div className="flex justify-center col-span-6 md:col-span-2">
                  <Skeleton width={80} />
                </div>
              </OrderCardStyled>
              <OrderCardStyled className="grid items-center grid-cols-12 gap-4 p-4 rounded shadow">
                <div className="flex justify-center col-span-12 md:col-span-2">
                  <Skeleton width={160} height={160} />
                </div>
                <div className="flex justify-center col-span-12 md:col-span-6">
                  <Skeleton width={320} count={2} />
                </div>
                <div className="flex justify-center col-span-6 md:col-span-2">
                  <Skeleton width={80} />
                </div>
                <div className="flex justify-center col-span-6 md:col-span-2">
                  <Skeleton width={80} />
                </div>
              </OrderCardStyled>
            </SkeletonTheme>
          </div>
        )}

        <span className="ml-auto text-xl font-medium">
          Total Amount : {currencyFormatter.format(totalAmount || 0)}
        </span>
      </motion.div>
    </ContainerStyled>
  );
};

export default OrderDetails;

const OrderCardStyled = styled.article`
  background-color: ${(props) => props.theme.cardBackgroundColor};
`;
