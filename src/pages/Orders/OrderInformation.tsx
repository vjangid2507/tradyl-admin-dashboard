import React from "react";

const OrderInformation = (props: any) => {
  return (
    <>
      <div className="sm:col-span-1">
        <dt className="text-sm font-medium text-gray-500">Bill To</dt>
        <dd className="mt-1 text-sm text-gray-900">
          {props.orderDetailsData.billTo}
        </dd>
      </div>
      <div className="sm:col-span-1">
        <dt className="text-sm font-medium text-gray-500">Ship To</dt>
        <dd className="mt-1 text-sm text-gray-900">
          {props.orderDetailsData.shipTo}
        </dd>
      </div>
      <div className="sm:col-span-1">
        <dt className="text-sm font-medium text-gray-500">Total Amount</dt>
        <dd className="mt-1 text-sm text-gray-900">
          {props.orderDetailsData.totalAmount}
        </dd>
      </div>
      <div className="sm:col-span-1">
        <dt className="text-sm font-medium text-gray-500">Currency</dt>
        <dd className="mt-1 text-sm text-gray-900">
          {props.orderDetailsData.currency}
        </dd>
      </div>
      <div className="sm:col-span-1">
        <dt className="text-sm font-medium text-gray-500">Order Status</dt>
        <dd className="mt-1 text-sm text-gray-900">
          {/* {props.orderDetailsData.status} */}
          {props.orderDetailsData.status}
          Created
        </dd>
      </div>
      <div className="sm:col-span-1">
        <dt className="text-sm font-medium text-gray-500">Order Status</dt>
        <dd className="mt-1 text-sm text-gray-900">
          <a
            href={`https://tradyl.swell.store/admin/orders/${props.orderDetailsData}`}
            className="font-medium text-blue-600 hover:text-blue-500"
            target="_blank"
            rel="noreferrer"
          >
            Click here
          </a>
        </dd>
      </div>
    </>
  );
  //   <div>Hello</div>;
};

export default OrderInformation;
