import { Dialog } from "@headlessui/react";
import { AxiosResponse } from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Modal } from "../../components/Modal";
import { inputClasses } from "../../helpers/form-utils";
import { orderService } from "../../services/order.service";
import { BeatLoader } from "react-spinners";
const GeneratePaymentLinkForm = (props: any) => {
  const [email, setEmail] = useState<string>("");
  const [currency, setCurrency] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Record<string, boolean>>({});
  useEffect(() => {
    setEmail(props.email);
  }, [props.email]);

  useEffect(() => {
    setCurrency(props.currency);
  }, [props.currency]);

  useEffect(() => {
    setAmount(props.amount);
  }, [props.amount]);

  const submitHandler = () => {
    const errorNew = {
      email: email ? false : true,
      currency: currency ? false : true,
      amount: amount ? false : true,
      dueDate: date ? false : true,
      description: description ? false : true,
    };
    setError(errorNew);

    if (email && currency && amount && description) {
      const formPaymentDetail = {
        email: email,
        currency: currency,
        amount: amount,
        dueDate: date,
        customerOrderId: props.customerOrderId,
        description: description,
      };
      setLoading(true);
      orderService
        .generatePaymentLink(formPaymentDetail)
        .then((res: AxiosResponse) => {
          if (res.status == 200) {
            if (res.data.success) {
              props.onPaymentGenerate(res.data.data);
              toast.success("Payment link generated successfully.");
            } else {
              toast.error(res.data.message);
            }
          } else {
            toast.error("Failed to generate payment link");
          }
        })
        .catch((error: any) => {
          toast.error(error.toString());
        })
        .finally(() => {
          console.log("Over");
          setLoading(false);
          props.isClose();
        });
    }
  };

  const handleInput = (input: string, value: string) => {
    if (error[input] && value) {
      setError({ ...error, [input]: false });
    }
    if (input === "email") {
      setEmail(value);
    } else if (input === "currency") {
      setCurrency(value);
    } else if (input === "amount") {
      setAmount(value);
    } else if (input === "description") {
      setDescription(value);
    } else {
      setDate(value);
    }
  };
  return (
    <Modal isOpen={props.isOpen} isClose={props.isClose}>
      <div className="relative inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
        <form onSubmit={submitHandler}>
          <div className="pb-1">
            <div className="mt-3 sm:mt-5">
              <Dialog.Title
                as="h3"
                className="text-lg mb-3 text-center leading-6 font-medium text-gray-900"
              >
                Generate Payment Link
              </Dialog.Title>

              <div className="mb-3 col-span-3 sm:col-span-2">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email<span className="text-red-700">*</span>
                </label>
                <div className="mt-1 ">
                  <input
                    type="email"
                    id="email"
                    value={email}
                    className={inputClasses(error.email)}
                    placeholder="Example@gmail.com"
                    onChange={(e: any) => handleInput("email", e.target.value)}
                  />
                </div>
              </div>
              {error.email && (
                <p className="text-sm text-red-600" id="email-error">
                  Email is required
                </p>
              )}

              <div className="mb-3 col-span-3 sm:col-span-2">
                <label
                  htmlFor="currency"
                  className="block mt-3 text-sm font-medium text-gray-700"
                >
                  Currency<span className="text-red-700">*</span>
                </label>
                <div className="mt-1 ">
                  <input
                    type="text"
                    id="currency"
                    value={currency}
                    className={inputClasses(error.currency)}
                    placeholder="INR"
                    onChange={(e: any) =>
                      handleInput("currency", e.target.value)
                    }
                  />
                </div>
              </div>
              {error.currency && (
                <p className="text-sm text-red-600" id="email-error">
                  Currency is required
                </p>
              )}

              <div className="mb-3 col-span-3 sm:col-span-2">
                <label
                  htmlFor="amount"
                  className="block mt-3 text-sm font-medium text-gray-700"
                >
                  Amount<span className="text-red-700">*</span>
                </label>
                <div className="mt-1 ">
                  <input
                    type="text"
                    id="amount"
                    value={amount}
                    className={inputClasses(error.amount)}
                    placeholder="40.50"
                    onChange={(e: any) => handleInput("amount", e.target.value)}
                  />
                </div>
              </div>
              {error.amount && (
                <p className="text-sm text-red-600" id="email-error">
                  Amount is required
                </p>
              )}
              <div className="mb-3 col-span-3 sm:col-span-2">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700"
                >
                  Description<span className="text-red-700">*</span>
                </label>
                <div className="mt-1 ">
                  <input
                    type="text"
                    id="description"
                    value={description}
                    className={inputClasses(error.description)}
                    // placeholder="Example@gmail.com"
                    onChange={(e: any) =>
                      handleInput("description", e.target.value)
                    }
                  />
                </div>
              </div>
              {error.description && (
                <p className="text-sm text-red-600" id="description-error">
                  Description is required
                </p>
              )}
              <div className="mb-3 col-span-3 sm:col-span-2">
                <label
                  htmlFor="dueDate"
                  className="block mt-3 text-sm font-medium text-gray-700"
                >
                  Due Date<span className="text-red-700">*</span>
                </label>
                <div className="mt-1 ">
                  <input
                    type="date"
                    id="dueDate"
                    value={date}
                    min={new Date().toISOString().split("T")[0]}
                    className={inputClasses(error.dueDate)}
                    onChange={(e) => handleInput("dueDate", e.target.value)}
                  />
                </div>
              </div>
              {error.dueDate && (
                <p className="text-sm text-red-600" id="email-error">
                  Date is required
                </p>
              )}
            </div>
          </div>

          <div className="mt-6 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
            <button
              onClick={submitHandler}
              type="button"
              disabled={loading}
              className={`${
                loading ? "bg-indigo-300" : "bg-indigo-600 hover:bg-indigo-700"
              } w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2  text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:col-start-2 sm:text-sm`}
            >
              {loading ? (
                <BeatLoader loading={loading} color="black" />
              ) : (
                "Generate"
              )}
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

export default GeneratePaymentLinkForm;
