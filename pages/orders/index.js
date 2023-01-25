import React from "react";
import { GET_ORDER_DETAILS } from "graphql/order_details";
import { useQuery } from "urql";
import { useRouter } from "next/router";
import { ContainerStyled, UnderLine } from "styles/global.styles";
import { currencyFormatter } from "utils";
import Image from "next/image";
const OrderDetails = () => {
  const router = useRouter();

  const [results] = useQuery({
    query: GET_ORDER_DETAILS,
    variables: { order_id: router.query.order_id },
  });

  const { data, fetching, error } = results;

  if (fetching) {
    return <h1>Loading...</h1>;
  }

  const allOrders = data?.orderDetails.data;

  return (
    <ContainerStyled>
      <div className="flex flex-col items-center mb-20">
        <h2 className="text-3xl lg:text-[40px] text-center font-normal capitalize mb-2">
          Order Details
        </h2>
        <UnderLine />
      </div>
      <div className="border rounded ">
        <div className="flex justify-between p-4 border-b-2 ">
          <h2 className="text-xl font-semibold text-center text-primary basis-1/2">
            Name
          </h2>
          <h2 className="text-xl font-semibold text-center text-primary basis-1/4">
            QTY
          </h2>
          <h2 className="text-xl font-semibold text-center text-primary basis-1/4">
            Total
          </h2>
        </div>
        {!fetching && !error
          ? allOrders.map((order) => {
              const qty = order.attributes.QTY;
              const product = order.attributes.product;
              const { name, price, images } = product.data.attributes;

              return (
                <div
                  className="flex items-center justify-between p-4"
                  key={order.id}
                >
                  <div className="flex items-center justify-start gap-2 text-center basis-1/2">
                    <Image
                      src={images.data[0].attributes.formats.thumbnail.url}
                      width={
                        images.data[0].attributes.formats.thumbnail.width / 2
                      }
                      height={
                        images.data[0].attributes.formats.thumbnail.height / 2
                      }
                      alt={name}
                    />
                    <span className="w-3/4 text-center line-clamp-2">
                      {name}
                    </span>
                  </div>
                  <span className="text-center basis-1/4">{qty}</span>
                  <span className="text-center basis-1/4">
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

export default OrderDetails;

// export default withUrqlClient((_ssrExchange) => ({
//   url: process.env.NEXT_PUBLIC_GRAPHQL_URL,
// }))(OrderDetails);

// export async function getServerSideProps(ctx) {
//   await client
//     .query(GET_ORDER_DETAILS, { order_id: ctx.query.order_id })
//     .toPromise();

//   return {
//     props: {
//       urqlState: ssrCache.extractData(),
//     },
//   };
// }
