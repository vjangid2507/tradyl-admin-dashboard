import React from "react";
import { PaperClipIcon } from "@heroicons/react/solid";

const AttachmentLists = (props: any) => {
  return (
    <dd className="mt-1 text-sm text-gray-900">
      <ul
        role="list"
        className="border border-gray-200 rounded-md divide-y divide-gray-200"
      >
        {props.attachmentList
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
                <button
                  disabled={attachment.isDeleted}
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
  );
};

export default AttachmentLists;
