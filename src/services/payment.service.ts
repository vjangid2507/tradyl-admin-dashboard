import { AxiosResponse } from "axios";
import { axiosInstance } from "./axios.service";

export interface BankCode {
  "ABA Code": string;
  "SWIFT Code": string;
}
export interface User {
  email: string;
  country: string;
  id: string;
  company_name: string;
  first_name: string;
  last_name: string;
  country_code: string;
  contact_code: string;
  contact_number: string;
  customer_id: string;
  ind_bus_type: string;
}

export interface Bank {
  id: string;
  currency: string;
  country: string;
  bank_name: string;
  account_number: string;
  legal_name: string;
  contact_code: string;
  contact_number: string;
  bank_codes: BankCode;
}
export interface TazaPayUser {
  user: User;
  banks: Bank[];
}

const getTazapayBankDetails = async (
  email: string
): Promise<TazaPayUser | undefined> => {
  try {
    const response: AxiosResponse<{ success: boolean; data: TazaPayUser }> =
      await axiosInstance.get("/payment-service/tazapay/bank-details", {
        params: { email },
      });

    return response.data.data;
  } catch (e) {
    Promise.reject(e);
  }
};

const postTazapayBankDetails = async (bankDetail: any): Promise<any> => {
  try {
    const response: AxiosResponse<{ success: boolean; data: TazaPayUser }> =
      await axiosInstance.post(
        "/payment-service/tazapay/bank-detail",
        bankDetail
      );

    return response.data;
  } catch (e) {
    Promise.reject(e);
  }
};

const postTazapayPaymentDetails = async (formData: any): Promise<any> => {
  try {
    const response: AxiosResponse<{ success: boolean; data: TazaPayUser }> =
      await axiosInstance.post(
        "/payment-service/tazapay/generate-payment-link",
        formData
      );

    return response.data;
  } catch (e) {
    Promise.reject(e);
  }
};

const paymentStatus = async (data: any): Promise<any> => {
  try {
    const response: AxiosResponse<{ success: boolean; data: TazaPayUser }> =
      await axiosInstance.post("/payment-service/tazapay/escrow-status", data);
    return response.data;
  } catch (e) {
    Promise.reject(e);
  }
};

const cancelPayment = async (data: any): Promise<any> => {
  try {
    const response: AxiosResponse<{ success: boolean; data: TazaPayUser }> =
      await axiosInstance.post("/payment-service/cancel-payment", data);
    return response.data;
  } catch (e) {
    Promise.reject(e);
  }
};

export const paymentService = {
  getTazapayBankDetails,
  postTazapayBankDetails,
  postTazapayPaymentDetails,
  cancelPayment,
  paymentStatus,
};
