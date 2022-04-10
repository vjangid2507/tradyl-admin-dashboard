import { Dialog } from "@headlessui/react";
import React, { useState } from "react";
import { Modal } from "../../components/Modal";
import { inputClasses } from "../../helpers/form-utils";

const PaymentForm = (props: any) => {
  const [txnId, setTxnId] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [collectionAmount, setCollectionAmount] = useState("");
  const [disbursalAmount, setDisbursalAmount] = useState("");
  const [currency, setCurrency] = useState("");
  const [paymentChannel, setPaymentChannel] = useState("");
  const [nameOfPayer, setNameOfPayer] = useState("");
  const [paymentFees, setPaymentFees] = useState("");
  const [status, setStatus] = useState("");
  const [generatedPaymentLink, setGeneratedPaymentLink] = useState("");
  const [error, setError] = useState<Record<string, boolean>>({});

  const submitHandler = (e: any) => {
    e.preventDefault();
    const errorNew = {
      txnId: txnId ? false : true,
      dueDate: dueDate ? false : true,
      collectionAmount: collectionAmount ? false : true,
      disbursalAmount: disbursalAmount ? false : true,
      currency: currency ? false : true,
      paymentChannel: paymentChannel ? false : true,
      nameOfPayer: nameOfPayer ? false : true,
      paymentFees: paymentFees ? false : true,
      status: status ? false : true,
      generatedPaymentLink: generatedPaymentLink ? false : true,
    };
    setError(errorNew);

    if (
      txnId &&
      dueDate &&
      collectionAmount &&
      disbursalAmount &&
      currency &&
      paymentChannel &&
      nameOfPayer &&
      paymentFees &&
      status &&
      generatedPaymentLink
    ) {
      const formData = {
        txn_no: txnId,
        due_date: dueDate,
        collection_amount: collectionAmount,
        disbursal_amount: disbursalAmount,
        disbursal_currency: currency,
        payment_channel: paymentChannel,
        nameOfPayer: nameOfPayer,
        payment_fees: paymentFees,
        status: status,
        payment_link: generatedPaymentLink,
      };
      console.log(formData);
      props.isClose();
    }
  };
  const handleInput = (input: string, value: string) => {
    if (error[input] && value) {
      setError({ ...error, [input]: false });
    }
    if (input === "txnId") {
      setTxnId(value);
    } else if (input === "dueDate") {
      setDueDate(value);
    } else if (input === "collectionAmount") {
      setCollectionAmount(value);
    } else if (input === "disbursalAmount") {
      setDisbursalAmount(value);
    } else if (input === "currency") {
      setCurrency(value);
    } else if (input === "paymentChannel") {
      setPaymentChannel(value);
    } else if (input === "nameOfPayer") {
      setNameOfPayer(value);
    } else if (input === "paymentFees") {
      setPaymentFees(value);
    } else if (input === "status") {
      setStatus(value);
    } else {
      setGeneratedPaymentLink(value);
    }
  };
  return (
    <Modal isOpen={props.isOpen} isClose={props.isClose}>
      <div className="relative inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all w-1/2 sm:my-8 sm:align-middle sm:p-6">
        <form onSubmit={submitHandler}>
          <Dialog.Title
            as="h3"
            className="text-lg mb-3 text-center leading-6 font-medium text-gray-900"
          >
            Add Payment Details
          </Dialog.Title>

          {/* <div className="flex gap-x-5">
            <div className="w-full mb-3 col-span-3 sm:col-span-2">
              <label
                htmlFor="txnId"
                className="block text-sm font-medium text-gray-700"
              >
                Transaction ID<span className="text-red-700">*</span>
              </label>
              <div className="mt-1 ">
                <input
                  type="text"
                  name="txnId"
                  id="txnId"
                  value={txnId}
                  className={inputClasses(error.txnId)}
                  placeholder="123.."
                  onChange={(e: any) => handleInput("txnId", e.target.value)}
                />
              </div>
              {error.txnId && (
                <p className="text-sm text-red-600" id="txnId-error">
                  Transaction ID is required
                </p>
              )}
            </div>
            <div className="w-full mb-3 col-span-3 sm:col-span-2">
              <label
                htmlFor="dueDate"
                className="block text-sm font-medium text-gray-700"
              >
                Due Date<span className="text-red-700">*</span>
              </label>
              <div className="mt-1 ">
                <input
                  type="date"
                  name="dueDate"
                  id="dueDate"
                  value={dueDate}
                  className={inputClasses(error.dueDate)}
                  onChange={(e: any) => handleInput("dueDate", e.target.value)}
                />
              </div>
              {error.dueDate && (
                <p className="text-sm text-red-600" id="dueDate-error">
                  Due-Date is required
                </p>
              )}
            </div>
          </div> */}

          <div className="flex gap-x-5">
            <div className="w-full mb-3 col-span-3 sm:col-span-2">
              <label
                htmlFor="collectionAmount"
                className="block text-sm font-medium text-gray-700"
              >
                Collection Amount<span className="text-red-700">*</span>
              </label>
              <div className="mt-1 ">
                <input
                  type="text"
                  name="collectionAmount"
                  id="collectionAmount"
                  value={collectionAmount}
                  className={inputClasses(error.collectionAmount)}
                  // placeholder="John Doe"
                  onChange={(e: any) =>
                    handleInput("collectionAmount", e.target.value)
                  }
                />
              </div>
              {error.collectionAmount && (
                <p className="text-sm text-red-600" id="collectionAmount-error">
                  Collection Amount is required
                </p>
              )}
            </div>
            <div className="w-full mb-3 col-span-3 sm:col-span-2">
              <label
                htmlFor="currency"
                className="block text-sm font-medium text-gray-700"
              >
                Currency<span className="text-red-700">*</span>
              </label>
              <div className="mt-1 ">
                <input
                  type="text"
                  name="currency"
                  id="currency"
                  value={currency}
                  className={inputClasses(error.currency)}
                  // placeholder="John Doe"
                  onChange={(e: any) => handleInput("currency", e.target.value)}
                />
              </div>
              {error.currency && (
                <p className="text-sm text-red-600" id="currency-error">
                  Currency is required
                </p>
              )}
            </div>
          </div>

          <div className="flex gap-x-5">
            <div className="w-full mb-3 col-span-3 sm:col-span-2">
              <label
                htmlFor="disbursalAmount"
                className="block text-sm font-medium text-gray-700"
              >
                Disbursal Amount<span className="text-red-700">*</span>
              </label>
              <div className="mt-1 ">
                <input
                  type="text"
                  name="disbursalAmount"
                  id="disbursalAmount"
                  value={disbursalAmount}
                  className={inputClasses(error.disbursalAmount)}
                  // placeholder="5050.."
                  onChange={(e: any) =>
                    handleInput("disbursalAmount", e.target.value)
                  }
                />
              </div>
              {error.disbursalAmount && (
                <p className="text-sm text-red-600" id="name-error">
                  Disbursal Amount is required
                </p>
              )}
            </div>

            <div className="w-full mb-3 col-span-3 sm:col-span-2">
              <label
                htmlFor="paymentChannel"
                className="block text-sm font-medium text-gray-700"
              >
                Payment Channel<span className="text-red-700">*</span>
              </label>
              <div className="mt-1 ">
                <input
                  type="text"
                  name="paymentChannel"
                  id="paymentChannel"
                  value={paymentChannel}
                  className={inputClasses(error.paymentChannel)}
                  // placeholder="John Doe"
                  onChange={(e: any) =>
                    handleInput("paymentChannel", e.target.value)
                  }
                />
              </div>
              {error.paymentChannel && (
                <p className="text-sm text-red-600" id="paymentChannel-error">
                  Payment Channel is required
                </p>
              )}
            </div>
          </div>

          <div className="flex gap-x-5">
            <div className="w-full mb-3 col-span-3 sm:col-span-2">
              <label
                htmlFor="nameOfPayer"
                className="block text-sm font-medium text-gray-700"
              >
                Name of Payer<span className="text-red-700">*</span>
              </label>
              <div className="mt-1 ">
                <input
                  type="text"
                  name="nameOfPayer"
                  id="nameOfPayer"
                  value={nameOfPayer}
                  className={inputClasses(error.nameOfPayer)}
                  // placeholder="John Doe"
                  onChange={(e: any) =>
                    handleInput("nameOfPayer", e.target.value)
                  }
                />
              </div>
              {error.nameOfPayer && (
                <p className="text-sm text-red-600" id="nameOfPayer-error">
                  Name Of Payer is required
                </p>
              )}
            </div>
            <div className="w-full mb-3 col-span-3 sm:col-span-2">
              <label
                htmlFor="paymentFees"
                className="block text-sm font-medium text-gray-700"
              >
                Payment Fees<span className="text-red-700">*</span>
              </label>
              <div className="mt-1 ">
                <input
                  type="text"
                  name="paymentFees"
                  id="paymentFees"
                  value={paymentFees}
                  className={inputClasses(error.paymentFees)}
                  // placeholder="John Doe"
                  onChange={(e: any) =>
                    handleInput("paymentFees", e.target.value)
                  }
                />
              </div>
              {error.paymentFees && (
                <p className="text-sm text-red-600" id="paymentFees-error">
                  Payment Fees is required
                </p>
              )}
            </div>
          </div>

          <div className="flex gap-x-5">
            <div className="w-full mb-3 col-span-3 sm:col-span-2">
              <label
                htmlFor="status"
                className="block text-sm font-medium text-gray-700"
              >
                Status<span className="text-red-700">*</span>
              </label>
              <div className="mt-1 ">
                <input
                  type="text"
                  name="status"
                  id="status"
                  value={status}
                  className={inputClasses(error.status)}
                  // placeholder="John Doe"
                  onChange={(e: any) => handleInput("status", e.target.value)}
                />
              </div>
              {error.status && (
                <p className="text-sm text-red-600" id="status-error">
                  Status is required
                </p>
              )}
            </div>
            <div className="w-full mb-3 col-span-3 sm:col-span-2">
              <label
                htmlFor="generatedPaymentLink"
                className="block text-sm font-medium text-gray-700"
              >
                Payment Link Generated<span className="text-red-700">*</span>
              </label>
              <div className="mt-1 ">
                <input
                  type="text"
                  name="generatedPaymentLink"
                  id="generatedPaymentLink"
                  value={generatedPaymentLink}
                  className={inputClasses(error.generatedPaymentLink)}
                  // placeholder="John Doe"
                  onChange={(e: any) =>
                    handleInput("generatedPaymentLink", e.target.value)
                  }
                />
              </div>
              {error.generatedPaymentLink && (
                <p
                  className="text-sm text-red-600"
                  id="generatedPaymentLink-error"
                >
                  Payment Link is required
                </p>
              )}
            </div>
          </div>

          <div className="mt-6 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
            <button
              onClick={submitHandler}
              type="button"
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:col-start-2 sm:text-sm"
            >
              Submit
            </button>
            <button
              onClick={props.isClose}
              type="button"
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:col-start-1 sm:text-sm"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default PaymentForm;
