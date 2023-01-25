import React, { useEffect, useState } from "react";
import { withUrqlClient } from "next-urql";
import { GET_ORDER_DETAILS } from "graphql/order_details";
import { client, ssrCache } from "utils/urqlClient";
import { ssrExchange, useQuery } from "urql";
import { useRouter } from "next/router";
import { ContainerStyled, UnderLine } from "styles/global.styles";
import { currencyFormatter } from "utils";
import Image from "next/image";
const OrderDetails = () => {
  const router = useRouter();
  // const [allOrders, setAllOrders] = useState([]);
  const [results] = useQuery({
    query: GET_ORDER_DETAILS,
    variables: { order_id: router.query.order_id },
  });

  const { data, fetching, error } = results;

  if (fetching) {
    return <h1>Loading...</h1>;
  }

  const allOrders = data.orderDetails.data;
  console.log(allOrders);
  return (
    <ContainerStyled>
      <div className="flex flex-col items-center mb-20">
        <h2 className="text-3xl lg:text-[40px] text-center font-normal capitalize mb-2">
          Order Details
        </h2>
        <UnderLine />
      </div>
      <div className="border rounded ">
        <div className="flex  justify-between  border-b-2 p-4 ">
          <h2 className="text-xl font-semibold text-primary basis-1/2 text-center">
            Name
          </h2>
          <h2 className="text-xl font-semibold text-primary basis-1/4 text-center">
            QTY
          </h2>
          <h2 className="text-xl font-semibold text-primary basis-1/4 text-center">
            Total
          </h2>
        </div>
        {fetching && allOrders.length > 1
          ? allOrders?.map((order) => {
              const qty = order.attributes.QTY;
              const product = order.attributes.product;
              const { name, price, images } = product.data.attributes;

              return (
                <div
                  className="flex justify-between items-center p-4"
                  key={order.id}
                >
                  <div className="basis-1/2 text-center flex items-center justify-start gap-2">
                    <Image
                      alt={order.id}
                      src={images.data[0].attributes.formats.thumbnail.url}
                      width={
                        images.data[0].attributes.formats.thumbnail.width / 2
                      }
                      height={
                        images.data[0].attributes.formats.thumbnail.height / 2
                      }
                    />
                    <span className="text-center line-clamp-2 w-3/4">
                      {name}
                    </span>
                  </div>
                  <span className="basis-1/4 text-center">{qty}</span>
                  <span className="basis-1/4 text-center">
                    {currencyFormatter.format(price * qty)}
                  </span>
                </div>
              );
            })
          : null}
        <div>
          <h2>Total Amount:</h2>
        </div>
      </div>
    </ContainerStyled>
  );
};

export default withUrqlClient((_ssrExchange) => ({
  url: process.env.NEXT_PUBLIC_GRAPHQL_URL,
}))(OrderDetails);

export async function getServerSideProps(ctx) {
  await client
    .query(GET_ORDER_DETAILS, { order_id: ctx.query.order_id })
    .toPromise();

  return {
    props: {
      urqlState: ssrCache.extractData(),
    },
  };
}
