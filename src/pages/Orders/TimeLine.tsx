import React, { useState } from "react";
import { Switch } from "@headlessui/react";
import { classNames } from "../../utils";
import { ChatAltIcon, UserCircleIcon, TagIcon } from "@heroicons/react/solid";
import moment from "moment";

const TimeLine = (props: any) => {
  const [enabled, setEnabled] = useState(false);
  const [remark, setRemark] = useState<string>();
  const submitHandler = (e: any) => {
    e.preventDefault();
    if (remark) {
      const formData = {
        order_id: props.Orderid,
        updated_at: "2022-03-22",
        description: remark,
        type: enabled ? "external" : "internal",
      };
      props.saveRemarkData(formData);
    }
    setRemark("");
    setEnabled(false);
  };
  return (
    <section
      aria-labelledby="timeline-title"
      className="lg:col-start-4 lg:col-span-1 mb-10"
    >
      <div className="divide-y divide-gray-200 bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h2 id="notes-title" className="text-lg font-medium text-gray-900">
            Timeline
          </h2>
        </div>

        <div className="px-4 py-6 sm:px-6">
          <ul role="list" className="-mb-8">
            {props.remarksData.map((remarkItem: any, index: number) => (
              <li key={index}>
                <div className="relative pb-8">
                  {index !== props.remarksData.length - 1 ? (
                    <span
                      className="absolute top-5 left-5 -ml-px h-full w-0.5 bg-gray-200"
                      aria-hidden="true"
                    />
                  ) : null}
                  <div className="relative flex items-start space-x-3">
                    <div className="relative">
                      <UserCircleIcon className="h-10 w-10 rounded-full bg-gray-400 flex items-center justify-center ring-8 ring-white" />
                      <span className="absolute -bottom-0.5 -right-1 bg-white rounded-tl px-0.5 py-px">
                        <ChatAltIcon
                          className="h-5 w-5 text-gray-400"
                          aria-hidden="true"
                        />
                      </span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <div>
                        <div className="text-sm">
                          <p className="font-medium text-gray-900">
                            Commented{" "}
                            {/* {moment(remarkItem.created_at).format(
                              "MMMM Do YYYY"
                            )} */}
                            {moment(remarkItem.created_at).fromNow()}
                          </p>
                          <a className="relative inline-flex items-center rounded-full border border-gray-300 px-3 py-0.5 text-sm">
                            <span className="absolute flex-shrink-0 flex items-center justify-center">
                              <span
                                className={`${
                                  remarkItem.type === "internal"
                                    ? "bg-lime-500 h-1.5 w-1.5 rounded-full"
                                    : "bg-orange-500 h-1.5 w-1.5 rounded-full"
                                }`}
                                aria-hidden="true"
                              />
                            </span>
                            <span className="ml-3.5 font-medium text-gray-900">
                              {remarkItem.type}
                            </span>
                          </a>
                        </div>
                        {/* <p className="mt-0.5 text-sm text-gray-500">
                          {remarkItem.type}
                        </p> */}
                      </div>
                      <div className="mt-2 text-sm text-gray-700">
                        <p>{remarkItem.description}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-gray-50 px-4 py-6 sm:px-6">
          <div className="flex space-x-3">
            <div className="min-w-0 flex-1">
              <form onSubmit={submitHandler}>
                <div>
                  <textarea
                    id="comment"
                    name="comment"
                    value={remark}
                    rows={3}
                    onChange={(e: any) => setRemark(e.target.value)}
                    className="shadow-sm block w-full focus:ring-blue-500 focus:border-blue-500 sm:text-sm border border-gray-300 rounded-md"
                    placeholder="Add a note"
                    defaultValue={""}
                  />
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <div>
                    <Switch
                      checked={enabled}
                      onChange={() => setEnabled(!enabled)}
                      className={classNames(
                        enabled ? "bg-indigo-600" : "bg-gray-200",
                        "relative inline-flex flex-shrink-0 h-4 w-7 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-indigo-500"
                      )}
                    >
                      <span className="sr-only">Use setting</span>
                      <span
                        aria-hidden="true"
                        className={classNames(
                          enabled ? "translate-x-3" : "translate-x-0",
                          "pointer-events-none inline-block h-3 w-3 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"
                        )}
                      />
                    </Switch>
                    <span className="ml-2 text-sm text-gray-500">
                      Send to customer
                    </span>
                  </div>

                  <button
                    type="submit"
                    className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Comment
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TimeLine;
