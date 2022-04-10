import React, { useState } from "react";
import { Dialog } from "@headlessui/react";
import { Modal } from "../../components/Modal";
import { inputClasses } from "../../helpers/form-utils";

const AttachmentForm = (props: any) => {
  const [type, setType] = useState("");
  const [selectedFile, setSelectedFile] = useState<any>();
  const [error, setError] = useState<Record<string, boolean>>({});

  const submitHandler = (e: any) => {
    e.preventDefault();
    const errorNew = {
      type: type ? false : true,
      selectedFile: selectedFile ? false : true,
    };
    setError(errorNew);

    if (props.editOrderid && type && selectedFile) {
      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("order_id", props.editOrderid);
      formData.append("type", type);
      props.saveAttachmentData(formData);
    }
  };
  const handleInput = (input: string, value: string) => {
    if (error[input] && value) {
      setError({ ...error, [input]: false });
    }
    if (input === "type") {
      setType(value);
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
                Add Attachment
              </Dialog.Title>

              <div className="mb-3 col-span-3 sm:col-span-2">
                <label
                  htmlFor="type"
                  className="block text-sm font-medium text-gray-700"
                >
                  Document Type<span className="text-red-700">*</span>
                </label>
                <div className="mt-1 ">
                  <input
                    type="text"
                    id="type"
                    name="type"
                    value={type}
                    className={inputClasses(error.type)}
                    placeholder="purchase_order"
                    onChange={(e) => handleInput("type", e.target.value)}
                  />
                </div>
              </div>
              {error.type && (
                <p className="text-sm text-red-600" id="type-error">
                  Document Type is required
                </p>
              )}

              <div>
                <label
                  className="block mt-3 text-sm font-medium text-gray-700"
                  htmlFor="fileUpload"
                >
                  Upload File<span className="text-red-700">*</span>
                </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                  <div className="space-y-1 text-center">
                    {selectedFile ? (
                      <p>{selectedFile.name}</p>
                    ) : (
                      <svg
                        className="mx-auto h-12 w-12 text-gray-400"
                        stroke="currentColor"
                        fill="none"
                        viewBox="0 0 48 48"
                        aria-hidden="true"
                      >
                        <path
                          d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                    <div className="flex text-sm text-gray-600">
                      <label
                        htmlFor="fileUpload"
                        className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                      >
                        <span>Click here to upload</span>
                        <input
                          id="fileUpload"
                          type="file"
                          className="sr-only"
                          onChange={(e: any) =>
                            setSelectedFile(e.target.files[0])
                          }
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">
                      PNG, JPG, PDF up to 10MB
                    </p>
                  </div>
                </div>
              </div>
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

export default AttachmentForm;
