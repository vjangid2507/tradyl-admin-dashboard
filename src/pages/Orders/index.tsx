import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { orderService } from "../../services/order.service";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  SortAscendingIcon,
  SortDescendingIcon,
} from "@heroicons/react/solid";
import {
  useTable,
  usePagination,
  useSortBy,
  useGlobalFilter,
} from "react-table";

export const COLUMNS = [
  {
    Header: "Name",
    accessor: "name",
  },
  {
    Header: "Status",
    accessor: "status",
  },
  {
    Header: "Bill To",
    // accessor: "billTo",
    accessor: (item: any) => item.billTo.substr(0, 15) + "...",
  },
  {
    Header: "Ship To",
    accessor: (item: any) => item.shipTo.substr(0, 15) + "...",
  },
  {
    Header: "",
    accessor: "id",
    Cell: (cell: any) => (
      <Link
        to={cell.cell.row.original.id.toString()}
        className="text-indigo-600 hover:text-indigo-900"
      >
        Edit
        <span className="sr-only">, {cell.cell.row.original.name}</span>
      </Link>
    ),
  },
];

export const Orders = (props: any) => {
  const [orders, setOrders] = useState<Record<string, any>[]>([]);
  const [pageNo, setPageNo] = useState();

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    previousPage,
    nextPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    state,
    gotoPage,
    setGlobalFilter,
    setPageSize,
    prepareRow,
  }: any = useTable(
    {
      columns: COLUMNS,
      data: orders,
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );
  const { pageIndex, globalFilter } = state;

  useEffect(() => {
    orderService.getAllOrders().then((response) => {
      if (response.data.success) {
        setOrders(response.data.data);
      }
    });
  }, []);
  return (
    <>
      <div className="py-6">
        <div className="px-4 sm:px-6 md:px-0">
          <h1 className="text-2xl font-semibold text-gray-900">Orders</h1>
        </div>
        <div className="mt-3">
          <input
            type="text"
            className="mt-1 block w-1/3 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            value={globalFilter || ""}
            onChange={(e) => setGlobalFilter(e.target.value)}
            placeholder="Search....."
          />
        </div>

        <div className="mt-8 flex flex-col">
          <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                <table
                  className="min-w-full divide-y divide-gray-300"
                  {...getTableProps()}
                >
                  <thead className="bg-gray-50">
                    {headerGroups.map(
                      (headerGroup: Record<string, any>, index: number) => {
                        return (
                          <tr
                            {...headerGroup.getHeaderGroupProps()}
                            key={index}
                          >
                            {headerGroup.headers.map(
                              (column: Record<string, any>, index: number) => {
                                return (
                                  <th
                                    scope="col"
                                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                                    {...column.getHeaderProps(
                                      column.getSortByToggleProps()
                                    )}
                                    key={index}
                                  >
                                    <div className="flex items-center justify-between">
                                      {column.render("Header")}
                                      <span>
                                        {column.isSorted ? (
                                          column.isSortedDesc ? (
                                            <SortDescendingIcon className="w-4 h-4 text-gray-400" />
                                          ) : (
                                            <SortAscendingIcon className="w-4 h-4 text-gray-400" />
                                          )
                                        ) : (
                                          ""
                                        )}{" "}
                                      </span>
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
                    {page.map((row: Record<string, any>, index: number) => {
                      prepareRow(row);
                      return (
                        <tr {...row.getRowProps()} key={index}>
                          {row.cells.map(
                            (cell: Record<string, any>, index: number) => {
                              return (
                                <td
                                  className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6"
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
      {/* Pagination */}
      <div className="px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
        <div className="flex-1 flex justify-between sm:hidden">
          <button
            onClick={() => previousPage()}
            disabled={!canPreviousPage}
            className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            Previous
          </button>
          <button
            onClick={() => nextPage()}
            disabled={!canNextPage}
            className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            Next
          </button>
        </div>

        <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-700">
              Page{" "}
              <span className="font-medium semibold text-gray-900">
                {pageIndex + 1}{" "}
              </span>
              of {pageOptions.length}
            </p>
          </div>
          <div className="flex gap-x-2">
            <select
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              value={state.pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
              }}
            >
              {[1, 2, 10, 20, 30].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  Show {pageSize}
                </option>
              ))}
            </select>
          </div>

          <div>
            <nav
              className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
              aria-label="Pagination"
            >
              <button
                onClick={() => {
                  // setPageNo(pageIndex);
                  return previousPage();
                }}
                disabled={!canPreviousPage}
                className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                <span className="sr-only">Previous</span>
                <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
              </button>
              {pageOptions.map((page: any, index: number) => {
                return (
                  <button
                    aria-current="page"
                    onClick={() => {
                      setPageNo(page);
                      return gotoPage(page);
                    }}
                    key={index}
                    // className="z-10 bg-indigo-50 border-indigo-500 text-indigo-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                    className={`${
                      page === pageNo
                        ? "z-10 bg-indigo-50 border-indigo-500 text-indigo-600"
                        : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
                    } relative inline-flex items-center px-4 py-2 border text-sm font-medium`}
                  >
                    {page + 1}
                  </button>
                );
              })}
              <button
                onClick={() => {
                  // setPageNo(pageIndex + 1);
                  return nextPage();
                }}
                disabled={!canNextPage}
                className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                <span className="sr-only">Next</span>
                <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
};
