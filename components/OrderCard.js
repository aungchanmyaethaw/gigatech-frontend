import React from "react";
import { currencyFormatter } from "utils";
import Link from "next/link";
const OrderCard = ({ id, totalAmount, status, date }) => {
  return (
    <article className="p-4 rounded shadow-md ">
      <div className="flex items-baseline gap-2">
        <h2 className="text-xl font-semibold text-primary">Order ID:</h2>
        <span>{id}</span>
      </div>
      <div className="flex items-baseline gap-2">
        <h2 className="text-xl font-semibold text-primary ">Date:</h2>
        <span>{new Date(date).toLocaleString()}</span>
      </div>
      <div className="flex items-baseline gap-2">
        <h2 className="text-xl font-semibold text-primary">Total Amount:</h2>
        <span>{currencyFormatter.format(totalAmount)}</span>
      </div>
      <div className="flex items-baseline gap-2">
        <h2 className="text-xl font-semibold text-primary">Status:</h2>
        <span>{status}</span>
      </div>

      <Link href={`/orders/${id}`}>Details</Link>
    </article>
  );
};

export default OrderCard;
