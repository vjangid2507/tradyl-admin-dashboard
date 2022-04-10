import { AxiosResponse } from "axios";
import { axiosInstance } from "./axios.service";

export interface OrderDetail {
  id: string;
  orderId: string;
  name: string;
  status: string;
  billTo: string;
  shipTo: string;
  vatRequired: string;
  vat: string;
  purchaseOrder: string;
  performaInvoice: string;
  createdAt: string;
  updatedAt: string;
}

const getAllOrders = () => {
  return axiosInstance.get("/orderstate-machine/orders");
};

const getOrdersDetails = (id: string): Promise<AxiosResponse<OrderDetail>> => {
  return axiosInstance.get("/orderstate-machine/order/" + id);
};

const uploadAttachment = (formData: any): Promise<AxiosResponse<any>> => {
  return axiosInstance.post("/orderstate-machine/upload-attachment", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

const downloadAttachment = (
  id: string
): Promise<AxiosResponse<OrderDetail>> => {
  return axiosInstance.get("/orderstate-machine/download-attachment?id=" + id);
};

const getAllRemarks = (id: any): Promise<AxiosResponse<any>> => {
  return axiosInstance.get("/orderstate-machine/get-remarks?orderId=" + id);
};
const uploadRemarks = (formData: any): Promise<AxiosResponse<OrderDetail>> => {
  return axiosInstance.post("/orderstate-machine/set-remarks", formData);
};
const getPaymentDetails = (id: any): Promise<AxiosResponse<any>> => {
  return axiosInstance.get(
    "/orderstate-machine/getPaymentByOrderId?customerId=" + id
  );
};
const orderStatusUpdate = (data: any): Promise<AxiosResponse<any>> => {
  return axiosInstance.post("/orderstate-machine/update-order-status", data);
};
const generatePaymentLink = (formdata: any): Promise<AxiosResponse<any>> => {
  return axiosInstance.post(
    "/payment-service/tazapay/generate-payment-link",
    formdata
  );
};

const cancelAttachment = (data: any): Promise<AxiosResponse<any>> => {
  return axiosInstance.post("/orderstate-machine/cancel-attachment", data);
};

const cancelPayment = (id: any): Promise<AxiosResponse<any>> => {
  return axiosInstance.get(
    "/orderstate-machine/cancel-payment?paymentId=" + id
  );
};

export const orderService = {
  getAllOrders,
  getOrdersDetails,
  uploadAttachment,
  downloadAttachment,
  getAllRemarks,
  uploadRemarks,
  getPaymentDetails,
  orderStatusUpdate,
  generatePaymentLink,
  cancelPayment,
  cancelAttachment,
};
