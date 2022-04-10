import React from "react";
import { Disclosure } from "@headlessui/react";
import {
  // CalendarIcon,
  // ChartBarIcon,
  // BellIcon,
  // InboxIcon,
  FolderIcon,
  HomeIcon,
  UsersIcon,
  XIcon,
  MenuIcon,
} from "@heroicons/react/outline";
import { Outlet, NavLink } from "react-router-dom";

const navigation = [
  { name: "Orders", href: "orders", icon: HomeIcon },
  {
    name: "Update Supplier Bank",
    href: "update-supplier-bank",
    icon: UsersIcon,
  },
  { name: "Settings", href: "settings", icon: FolderIcon },
];

const Home = () => {
  return (
    <>
      <Disclosure as="nav" className="bg-white shadow">
        {({ open }) => (
          <>
            <div className="mx-auto px-2 sm:px-6 lg:px-8">
              <div className="relative flex justify-between h-16">
                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                  {/* Mobile menu button */}
                  <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
                <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                  <div className="flex-shrink-0 flex items-center">
                    <img
                      className="block lg:hidden h-8 w-auto"
                      src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                      alt="Workflow"
                    />
                    <img
                      className="hidden lg:block h-8 w-auto"
                      src="https://tailwindui.com/img/logos/workflow-logo-indigo-600-mark-gray-800-text.svg"
                      alt="Workflow"
                    />
                  </div>
                  <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                    {/* Current: "border-indigo-500 text-gray-900", Default: "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700" */}
                    {navigation.map((item) => (
                      <NavLink
                        key={item.name}
                        to={item.href}
                        className={({ isActive }) =>
                          `${
                            isActive
                              ? "bg-gray-100 text-gray-900"
                              : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                          }group rounded-md py-2 px-2 flex items-center text-sm font-medium`
                        }
                      >
                        <item.icon
                          className="mr-3 flex-shrink-0 h-6 w-6"
                          aria-hidden="true"
                        />
                        {item.name}
                      </NavLink>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </Disclosure>
      <div>
        <div className="md:px-10">
          <div className="mx-auto flex flex-col md:px-8 xl:px-0">
            <main className="flex-1">
              <Outlet />
            </main>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
