import React, { useState } from "react";
import { toast } from "react-toastify";
import { inputClasses } from "../helpers/form-utils";
import { Bank, paymentService, TazaPayUser } from "../services/payment.service";

interface BankDeail {
  bank_name: string;
  legal_name: string;
  account_number: string;
  currency: string;
  country_code: string;
  contact_number: string;
  bank_code?: string;
  bank_code_type?: "SWIFT" | "ABA";
}

export const UpdateSupplierBank: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [banks, setBanks] = useState<Bank[]>([]);
  const [user, setUser] = useState<any>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Record<string, boolean>>({});
  const [bankDetail, setBankDetail] = useState<BankDeail>({
    bank_name: "",
    legal_name: "",
    account_number: "",
    currency: "",
    country_code: "",
    contact_number: "",
    bank_code: "",
  });

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const errorNew = {
      email: email ? false : true,
    };
    setError(errorNew);
    if (email) {
      setLoading(true);
      try {
        const response: TazaPayUser | undefined =
          await paymentService.getTazapayBankDetails(email);
        if (response && response.banks && response.banks.length) {
          const firstBank: Bank = response.banks[0];
          const bankType = firstBank.bank_codes["SWIFT Code"] ? "SWIFT" : "ABA";
          const bankDetailNew: BankDeail = {
            bank_name: firstBank.bank_name,
            legal_name: firstBank.legal_name,
            account_number: firstBank.account_number,
            currency: firstBank.currency,
            country_code: firstBank.country,
            contact_number: firstBank.contact_number,
            bank_code:
              bankType == "SWIFT"
                ? firstBank.bank_codes["SWIFT Code"]
                : firstBank.bank_codes["ABA Code"],
            bank_code_type: bankType,
          };
          setBankDetail(bankDetailNew);
          setBanks(response.banks);
        } else {
          setBanks([]);
        }

        if (response && response.user) {
          setUser(response.user);
          setLoading(false);
        } else {
          setUser(null);
        }
      } catch (e: any) {
        console.error(e.message);
      } finally {
        setLoading(false);
      }
    }
  };
  const handleInput = (input: string, value: string) => {
    if (error[input] && value) {
      setError({ ...error, [input]: false });
    }
    if (input === "email") {
      setEmail(value);
    }
  };

  const handleInputChange = (input: keyof BankDeail, value: string) => {
    setBankDetail({ ...bankDetail, [input]: value });
  };

  const handleBankSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const bankCodeKey =
      bankDetail.bank_code_type === "SWIFT" ? "SWIFT Code" : "ABA Code";
    const postData = {
      ...bankDetail,
      account_id: user.id,
      bank_codes: {
        [bankCodeKey]: bankDetail.bank_code,
      },
    };
    delete postData.bank_code_type;
    delete postData.bank_code;

    const response: any = await paymentService.postTazapayBankDetails(postData);
    if (response.success) {
      toast.success("Bank detail successfully added.");
    }
  };

  return (
    <div className="py-6">
      <div className="px-4 sm:px-6 md:px-0">
        <h1 className="text-2xl font-semibold text-gray-900">
          Update Supplier Bank Detail
        </h1>
      </div>
      <div className="px-4 sm:px-6 md:px-0">
        <div className="py-4">
          <div className="bg-white shadow sm:rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Enter supplier email address
              </h3>
              <div className="mt-2 max-w-xl text-sm text-gray-500">
                <p>
                  Enter the supplier email address you want to update bank
                  detail.
                </p>
              </div>
              <form
                className="mt-5 sm:flex sm:items-center"
                onSubmit={handleSubmit}
              >
                <div className="w-full sm:max-w-xs">
                  <label htmlFor="email" className="sr-only">
                    Email
                  </label>
                  <input
                    value={email}
                    onChange={(e) => handleInput("email", e.target.value)}
                    type="email"
                    name="email"
                    id="email"
                    className={inputClasses(error.email)}
                    placeholder="supplier@email.com"
                  />
                  {error.email && (
                    <p className="text-sm ml-1 text-red-600" id="name-error">
                      Email is required
                    </p>
                  )}
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className={`${
                    loading
                      ? "bg-indigo-300"
                      : "bg-indigo-600 hover:bg-indigo-700"
                  } mt-3 w-full inline-flex items-center justify-center px-4 py-2 border border-transparent shadow-sm font-medium rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm`}
                >
                  {loading ? "Fetching..." : "Fetch Detail"}
                </button>
              </form>
            </div>
          </div>
          {banks.length != 0 && (
            <div>
              {banks.map((bank: Bank) => (
                <div
                  key={bank.id}
                  className="shadow overflow-hidden sm:rounded-md max-w-7xl mx-auto px-4 bg-white sm:px-6 lg:px-8 mt-10"
                >
                  <div className="px-4 py-5 ">
                    <dl className="grid grid-cols-3 gap-x-4 gap-y-8 sm:grid-cols-3">
                      <div className="sm:col-span-1">
                        <dt className="text-sm font-medium text-gray-500">
                          Legal Name
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900">
                          {bank.legal_name}
                        </dd>
                      </div>
                      <div className="sm:col-span-1">
                        <dt className="text-sm font-medium text-gray-500">
                          Bank Name
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900">
                          {bank.bank_name}
                        </dd>
                      </div>
                      <div className="sm:col-span-1">
                        <dt className="text-sm font-medium text-gray-500">
                          Account Number
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900">
                          {bank.account_number}
                        </dd>
                      </div>
                      <div className="sm:col-span-1">
                        <dt className="text-sm font-medium text-gray-500">
                          Contact Number
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900">
                          {bank.contact_code}&nbsp;{bank.contact_number}
                        </dd>
                      </div>
                      <div className="sm:col-span-1">
                        <dt className="text-sm font-medium text-gray-500">
                          Country
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900">
                          {bank.country}
                        </dd>
                      </div>
                      <div className="sm:col-span-1">
                        <dt className="text-sm font-medium text-gray-500">
                          Currency
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900">
                          {bank.currency}
                        </dd>
                      </div>
                      <div className="sm:col-span-1">
                        <dt className="text-sm font-medium text-gray-500">
                          Swift Code
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900">
                          {bank.bank_codes["SWIFT Code"]}
                        </dd>
                      </div>
                      <div className="sm:col-span-1">
                        <dt className="text-sm font-medium text-gray-500">
                          ABA Code
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900">
                          {bank.bank_codes["ABA Code"]}
                        </dd>
                      </div>
                    </dl>
                  </div>
                </div>
              ))}
            </div>
          )}
          {user && banks.length == 0 && (
            <form className="mt-6" onSubmit={handleBankSubmit}>
              <div className="shadow overflow-hidden sm:rounded-md">
                <div className="px-4 py-5 bg-white">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    Bank Details
                  </h3>
                </div>
                <div className="px-4 py-5 bg-white sm:p-6">
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                      <label
                        htmlFor="legal-name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Legal name
                      </label>
                      <input
                        value={bankDetail.legal_name}
                        onChange={(e) =>
                          handleInputChange("legal_name", e.target.value)
                        }
                        type="text"
                        name="legal_name"
                        id="legal-name"
                        autoComplete="legal-name"
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                      <label
                        htmlFor="account-number"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Account Number
                      </label>
                      <input
                        value={bankDetail.account_number}
                        onChange={(e) =>
                          handleInputChange("account_number", e.target.value)
                        }
                        type="text"
                        name="account_number"
                        id="account-number"
                        autoComplete="account-number"
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                      <label
                        htmlFor="bank-name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Bank Name
                      </label>
                      <input
                        value={bankDetail.bank_name}
                        onChange={(e) =>
                          handleInputChange("bank_name", e.target.value)
                        }
                        type="text"
                        name="bank_name"
                        id="bank-name"
                        autoComplete="bank-name"
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                      <label
                        htmlFor="country-code"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Country Code
                      </label>
                      <input
                        value={bankDetail.country_code}
                        onChange={(e) =>
                          handleInputChange("country_code", e.target.value)
                        }
                        type="text"
                        name="country_code"
                        id="country-code"
                        autoComplete="country-code"
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                      <label
                        htmlFor="contact-number"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Contact number
                      </label>
                      <input
                        value={bankDetail.contact_number}
                        onChange={(e) =>
                          handleInputChange("contact_number", e.target.value)
                        }
                        type="text"
                        name="contact_number"
                        id="contact-number"
                        autoComplete="contact-number"
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                      <label
                        htmlFor="currency"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Currency
                      </label>
                      <input
                        value={bankDetail.currency}
                        onChange={(e) =>
                          handleInputChange("currency", e.target.value)
                        }
                        type="text"
                        name="currency"
                        id="currency"
                        autoComplete="currency"
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Bank Code Type
                      </label>
                      <fieldset className="mt-4">
                        <legend className="sr-only">Bank Code Type</legend>
                        <div className="space-y-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-10">
                          {[
                            { id: "SWIFT", title: "Swift Code" },
                            { id: "ABA", title: "ABA Code" },
                          ].map((bankCodeType) => (
                            <div
                              key={bankCodeType.id}
                              className="flex items-center"
                            >
                              <input
                                value={bankCodeType.id}
                                id={bankCodeType.id}
                                name="notification-method"
                                type="radio"
                                defaultChecked={
                                  bankCodeType.id == bankDetail.bank_code_type
                                }
                                className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                              />
                              <label
                                htmlFor={bankCodeType.id}
                                className="ml-3 block text-sm font-medium text-gray-700"
                              >
                                {bankCodeType.title}
                              </label>
                            </div>
                          ))}
                        </div>
                      </fieldset>
                    </div>
                    <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                      <label
                        htmlFor="bank-code"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Bank Code
                      </label>
                      <input
                        value={bankDetail.bank_code}
                        onChange={(e) =>
                          handleInputChange("bank_code", e.target.value)
                        }
                        type="text"
                        name="bank_code"
                        id="bank-code"
                        autoComplete="bank-code"
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                  </div>
                </div>
                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                  <button
                    type="submit"
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Save
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
