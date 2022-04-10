import React, { useEffect, useRef, useState, Fragment } from "react";
import { classNames } from "../../utils";
import {
  PaperClipIcon,
  LinkIcon,
  DocumentDuplicateIcon,
} from "@heroicons/react/solid";
import { orderService } from "../../services/order.service";
import { useParams } from "react-router-dom";
import { AxiosResponse } from "axios";
import moment from "moment";
import TimeLine from "./TimeLine";
import AttachmentForm from "./AttachmentForm";
import GeneratePaymentLinkForm from "./GeneratePaymentLinkForm";
import PaymentDetails from "./PaymentDetails";
import { paymentService } from "../../services/payment.service";
import { toast } from "react-toastify";
import { BeatLoader } from "react-spinners";
// const user = {
//   name: "Whitney Francis",
//   email: "whitney@example.com",
//   imageUrl:
//     "https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80",
// };
export const OrderDetail = (props: any) => {
  const params = useParams<{ orderid: string }>();
  const [showAttachmentForm, setShowAttachmentForm] = useState(false);
  const [orderDetailsData, setOrderDetailsData] = useState<any>({});
  const [fileUrl, setFileUrl] = useState<string>();
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [remarksData, setRemarksData] = useState<Record<string, any>[]>([]);
  const [paymentData, setPaymentData] = useState<Record<string, any>[]>([]);
  const tabs = [
    { name: "Customer Payment", href: "#", current: true },
    { name: "Others", href: "#", current: false },
  ];
  const selectOptions = [
    { id: 1, value: "-Select Status-" },
    { id: 2, value: "Created" },
    { id: 3, value: "Procurement" },
    { id: 4, value: "Tradyl QC complete" },
    { id: 5, value: "Ready to Dispatch" },
    { id: 6, value: "In Transit" },
    { id: 7, value: "Delivered" },
  ];
  const columns = [
    {
      Header: "Amount",
      accessor: "collection_amount",
    },
    {
      Header: "Currency",
      accessor: "collection_currency",
    },
    {
      Header: "Created On",
      accessor: (cell: any) =>
        moment(cell.date_of_payment).format("MMMM Do YYYY"),
      minWidth: 140,
    },
    {
      Header: "Description",
      accessor: "payment_description",
      minWidth: 200,
    },
    {
      Header: "Payment Link",
      accessor: "payment_link",
      Cell: (cell: any) => (
        <div
          className={`${
            cell.cell.row.original.is_deleted
              ? "text-indigo-200 flex"
              : "text-indigo-600 flex"
          }`}
        >
          <div>
            <a
              target="_blank"
              href={cell.value}
              className={`${
                cell.cell.row.original.is_deleted
                  ? "pointer-events-none h-4 w-7"
                  : "h-4 w-7"
              }`}
              rel="noreferrer"
            >
              {/* <LinkIcon className="h-4 w-4 inline" /> */}
              Payment_Link
            </a>
          </div>
          <div className="ml-4">
            {cell.cell.row.original.is_deleted ? null : (
              <DocumentDuplicateIcon
                onClick={() => copyLink(cell.value)}
                className="h-6 w-6 hover:cursor-pointer hover:text-indigo-900"
              />
            )}
          </div>
        </div>
      ),
    },
    {
      Header: "Status",
      accessor: (item: any) => (
        <p className={`${item.is_deleted ? "line-through" : ""}`}>
          {item.status}
        </p>
      ),
    },
    {
      Header: "Check Status",
      accessor: "txn_no",
      Cell: (cell: any) => (
        <button
          disabled={cell.cell.row.original.is_deleted}
          onClick={() => statusHandler(cell)}
          className={`${
            cell.cell.row.original.is_deleted
              ? "font-medium text-indigo-200 "
              : "font-medium text-indigo-600 hover:indigo-red-500"
          }p-0 m-0`}
        >
          Check_Status
        </button>
      ),
    },
    {
      Header: "",
      accessor: "id",
      Cell: (cell: any) => (
        <button
          disabled={cell.cell.row.original.is_deleted}
          onClick={() => cancelPaymentHandler(cell)}
          className={`${
            cell.cell.row.original.is_deleted
              ? "font-medium text-red-200"
              : "font-medium text-red-600 hover:text-red-500"
          }`}
        >
          Cancel
        </button>
      ),
    },
  ];

  const copyLink = (link: string) => {
    navigator.clipboard.writeText(link);
    toast.success("Payment link copied successfully.", {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  const cancelPaymentHandler = (cell: any) => {
    // const data = {
    //   payment_id: cell.value,
    // };
    // if (data) {
    //   paymentService.cancelPayment(data).then(() => getAllOrderDetails());
    // }
    if (cell.value) {
      const data = {
        payment_id: cell.value,
      };
      setLoading(true);
      paymentService
        .cancelPayment(data)
        .then(() => getAllOrderDetails())
        .catch((error: any) => {
          toast.error(error.toString());
        })
        .finally(() => {
          console.log("cancelled");
          setLoading(false);
        });
    }
  };
  const statusHandler = (cell: any) => {
    const data = {
      transactionNumber: cell.value,
      paymentId: cell.cell.row.original.id,
    };
    if (data) {
      paymentService.paymentStatus(data).then(() => getAllOrderDetails());
    }
  };
  const ref = useRef<HTMLAnchorElement | null>(null);
  useEffect(() => {
    getAllOrderDetails();
    getAllRemarkDetails();
  }, []);
  const getAllOrderDetails = () => {
    if (params.orderid) {
      orderService
        .getOrdersDetails(params.orderid)
        .then((res: AxiosResponse) => {
          if (res.data && res.data.success) {
            setOrderDetailsData(res.data.data);
            setPaymentData(res.data.data.customerPaymentList);
            // setOrderStatus(res.data.data.status);
            console.log(res.data.data);
          }
        });
    }
  };
  const saveAttachmentData = (formData: any) => {
    orderService
      .uploadAttachment(formData)
      .then((res) => console.log(res))
      .then(() => getAllOrderDetails());
    formClose();
  };
  const downloadHandler = (attachment: any) => {
    orderService.downloadAttachment(attachment.id).then((res: any) => {
      setFileUrl(res.data.data);
      ref.current?.click();
    });
  };
  const getAllRemarkDetails = () => {
    orderService.getAllRemarks(params.orderid).then((response) => {
      setRemarksData(response.data.data);
    });
  };
  const saveRemarkData = (formData: any) => {
    orderService
      .uploadRemarks(formData)
      .then((response: any) => console.log(response))
      .then(() => getAllRemarkDetails());
  };

  const formClose = () => {
    setShowAttachmentForm(false);
    setShowPaymentForm(false);
  };

  const cancelAttachmentHandler = (attachment: any) => {
    const data = {
      attachment_id: attachment.id,
    };
    if (data) {
      orderService.cancelAttachment(data).then(() => getAllOrderDetails());
    }
  };
  const optionHandler = (value: any) => {
    if (params.orderid && value != "-Select Status-") {
      const data = {
        order_id: params.orderid,
        order_status: value,
      };
      orderService.orderStatusUpdate(data).then(() => getAllOrderDetails());
    }
  };
  let defaultPaymentAmount = 0;
  if (orderDetailsData && orderDetailsData.totalAmount) {
    defaultPaymentAmount = Math.ceil(orderDetailsData.totalAmount * 0.2);
  }
  return (
    <>
      {showAttachmentForm && (
        <AttachmentForm
          isOpen={showAttachmentForm}
          isClose={formClose}
          editOrderid={params.orderid}
          saveAttachmentData={saveAttachmentData}
        />
      )}
      {showPaymentForm && (
        <GeneratePaymentLinkForm
          email={orderDetailsData?.customer?.email}
          amount={defaultPaymentAmount}
          currency={orderDetailsData?.currency || "INR"}
          customerOrderId={params.orderid}
          isClose={formClose}
          isOpen={showPaymentForm}
          onPaymentGenerate={setPaymentData}
        />
      )}
      <div className="pt-6 max-w-3xl mx-auto md:flex md:items-center md:justify-between md:space-x-5 lg:max-w-7xl">
        <div className="flex items-center space-x-5">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {`#${orderDetailsData.order_number}`}
            </h1>
            <p className="text-sm font-medium text-gray-500">
              Created on{" "}
              {moment(orderDetailsData.createdAt).format("MMMM Do YYYY")}
            </p>
          </div>
        </div>
        <div className="mt-6 flex flex-col-reverse justify-stretch space-y-4 space-y-reverse sm:flex-row-reverse sm:justify-end sm:space-x-reverse sm:space-y-0 sm:space-x-3 md:mt-0 md:flex-row md:space-x-3">
          <select
            id="location"
            name="location"
            className="inline-flex w-48 items-center justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500"
            onChange={(e) => optionHandler(e.target.value)}
          >
            {selectOptions.map((optin, index) => (
              <option key={index}>{optin.value}</option>
            ))}
          </select>

          <button
            onClick={() => setShowPaymentForm(true)}
            type="button"
            className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500"
          >
            Generate Payment Link
          </button>
        </div>
      </div>

      <div className="mt-8 max-w-3xl mx-auto grid grid-cols-1 gap-6 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-4">
        <div className="space-y-6 lg:col-start-1 lg:col-span-3">
          {/* Description list*/}
          <section aria-labelledby="applicant-information-title">
            <div className="bg-white shadow sm:rounded-lg">
              <div className="px-4 py-5 sm:px-6">
                <h2
                  id="applicant-information-title"
                  className="text-lg leading-6 font-medium text-gray-900"
                >
                  Order Information
                </h2>
              </div>

              <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
                <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">
                      Bill To
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {orderDetailsData.billTo}
                    </dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">
                      Ship To
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {orderDetailsData.shipTo}
                    </dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">
                      Total Amount
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {orderDetailsData.totalAmount}
                    </dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">
                      Currency
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {orderDetailsData.currency}
                    </dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">
                      Order Status
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {orderDetailsData.status}
                    </dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">
                      Swell Order
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      <a
                        href={`https://tradyl.swell.store/admin/orders/`}
                        className="font-medium text-blue-600 hover:text-blue-500"
                        target="_blank"
                        rel="noreferrer"
                      >
                        Click here
                      </a>
                    </dd>
                  </div>
                  {/* <OrderInformation orderDetailsData={orderDetailsData} /> */}
                  <div className="sm:col-span-2">
                    <div className="flex justify-between mx-1 mb-3">
                      <dt className="inline-flex text-sm font-medium text-gray-500">
                        Attachments
                      </dt>
                      <button
                        onClick={() => setShowAttachmentForm(true)}
                        className="inline-flex items-center justify-center px-3 py-1 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500"
                      >
                        Add
                      </button>
                    </div>

                    <dd className="mt-1 text-sm text-gray-900">
                      <ul
                        role="list"
                        className="border border-gray-200 rounded-md divide-y divide-gray-200"
                      >
                        {orderDetailsData.attachmentList
                          ?.sort((x: any, y: any) => x.isDeleted - y.isDeleted)
                          .map((attachment: any, index: number) => (
                            <li
                              key={index}
                              className="pl-3 pr-4 py-3 flex items-center justify-between text-sm"
                            >
                              <div className="w-0 flex-1 flex items-center">
                                <PaperClipIcon
                                  className="flex-shrink-0 h-5 w-5 text-gray-400"
                                  aria-hidden="true"
                                />
                                <span
                                  className={`${
                                    attachment.isDeleted
                                      ? "ml-2 flex-1 w-0 truncate line-through"
                                      : "ml-2 flex-1 w-0 truncate"
                                  }`}
                                >
                                  {attachment.type}
                                </span>
                              </div>
                              <div className="ml-4 flex-shrink-0">
                                <a href={fileUrl} download ref={ref} />
                                <button
                                  disabled={attachment.isDeleted}
                                  onClick={() => downloadHandler(attachment)}
                                  className={`${
                                    attachment.isDeleted
                                      ? "font-medium text-blue-200"
                                      : "font-medium text-blue-600 hover:text-blue-500"
                                  }`}
                                >
                                  Download
                                </button>
                                <button
                                  disabled={attachment.isDeleted}
                                  onClick={() =>
                                    cancelAttachmentHandler(attachment)
                                  }
                                  className={`${
                                    attachment.isDeleted
                                      ? "font-medium ml-3 text-red-200 "
                                      : "font-medium ml-3 text-red-600 hover:text-red-500"
                                  }`}
                                >
                                  Cancel
                                </button>
                              </div>
                            </li>
                          ))}
                      </ul>
                    </dd>
                    {/* <AttachmentLists
                      attachmentList={orderDetailsData.attachmentList}
                    /> */}
                  </div>
                </dl>
              </div>

              <div>
                <a
                  href="#"
                  className="block bg-gray-50 text-sm font-medium text-gray-500 text-center px-4 py-4 hover:text-gray-700 sm:rounded-b-lg"
                >
                  Read full application
                </a>
              </div>
            </div>
          </section>

          {/* Comments*/}
          <section aria-labelledby="notes-title" className="pb-10">
            <div className="bg-white shadow sm:rounded-lg sm:overflow-hidden">
              <div>
                <div className="hidden sm:block">
                  <nav
                    className="relative z-0 rounded-lg shadow flex divide-x divide-gray-200"
                    aria-label="Tabs"
                  >
                    {tabs.map((tab, tabIdx) => (
                      <a
                        key={tab.name}
                        href={tab.href}
                        className={classNames(
                          tab.current
                            ? "text-gray-900"
                            : "text-gray-500 hover:text-gray-700",
                          tabIdx === 0 ? "rounded-l-lg" : "",
                          tabIdx === tabs.length - 1 ? "rounded-r-lg" : "",
                          "group relative min-w-0 flex-1 overflow-hidden bg-white py-4 px-4 text-sm font-medium text-center hover:bg-gray-50 focus:z-10"
                        )}
                        aria-current={tab.current ? "page" : undefined}
                      >
                        <span>{tab.name}</span>
                        <span
                          aria-hidden="true"
                          className={classNames(
                            tab.current ? "bg-indigo-500" : "bg-transparent",
                            "absolute inset-x-0 bottom-0 h-0.5"
                          )}
                        />
                      </a>
                    ))}
                  </nav>
                </div>
              </div>
              <div className="px-4">
                <PaymentDetails
                  Orderid={params.orderid}
                  paymentData={paymentData}
                  getAllOrderDetails={getAllOrderDetails}
                  COLUMNS={columns}
                />
              </div>
            </div>
          </section>
        </div>
        <TimeLine
          Orderid={params.orderid}
          remarksData={remarksData}
          saveRemarkData={saveRemarkData}
        />
      </div>
    </>
  );
};
