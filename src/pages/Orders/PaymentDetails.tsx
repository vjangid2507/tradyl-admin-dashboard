import React, { useState } from "react";
import { useTable } from "react-table";
import PaymentForm from "./PaymentForm";

const PaymentDetails = (props: any) => {
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  }: any = useTable({
    columns: props.COLUMNS,
    data: props.paymentData,
  });
  const formClose = () => {
    setShowPaymentForm(false);
  };
  return (
    <>
      {showPaymentForm && (
        <PaymentForm isOpen={showPaymentForm} isClose={formClose} />
      )}
      <div className="py-6">
        <div className="px-2 flex justify-between">
          <h2 className="text-xl font-semibold text-gray-900">
            Payment Details
          </h2>
          <button
            onClick={() => setShowPaymentForm(true)}
            className="inline-flex items-center justify-center px-2 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500"
          >
            Add Payment
          </button>
        </div>
        <div className="mt-4 flex flex-col">
          <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                <table
                  className="min-w-full divide-y divide-gray-300"
                  {...getTableProps()}
                >
                  <thead className="bg-gray-200">
                    {headerGroups?.map(
                      (headerGroup: Record<string, any>, index: number) => {
                        return (
                          <tr
                            {...headerGroup.getHeaderGroupProps()}
                            key={index}
                          >
                            {headerGroup.headers?.map(
                              (column: Record<string, any>, index: number) => {
                                return (
                                  <th
                                    scope="col"
                                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                                    {...column.getHeaderProps()}
                                    key={index}
                                  >
                                    <div className="flex items-center justify-between">
                                      {column.render("Header")}
                                    </div>
                                  </th>
                                );
                              }
                            )}
                          </tr>
                        );
                      }
                    )}
                  </thead>
                  <tbody
                    className="divide-y divide-gray-200 bg-white"
                    {...getTableBodyProps()}
                  >
                    {rows
                      .sort(
                        (x: any, y: any) =>
                          x.original.is_deleted - y.original.is_deleted
                      )
                      .map((row: Record<string, any>, index: number) => {
                        prepareRow(row);
                        return (
                          <tr {...row.getRowProps()} key={index}>
                            {row.cells.map(
                              (cell: Record<string, any>, index: number) => {
                                return (
                                  <td
                                    // style={{ minWidth: "180px" }}
                                    style={{
                                      minWidth: cell.column.minWidth,
                                      maxWidth: cell.column.maxWidth,
                                      width: cell.column.width,
                                    }}
                                    className="py-4 pl-4 table-auto pr-3 text-sm font-medium text-gray-900 sm:pl-6"
                                    {...cell.getCellProps()}
                                    key={index}
                                  >
                                    {cell.render("Cell")}
                                  </td>
                                );
                              }
                            )}
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentDetails;
