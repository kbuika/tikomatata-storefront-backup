import axios from "axios"
import axiosInstance from "./axios-interceptor"
const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL

export interface PayForTicketParams {
  tickets: TicketObjParams[],
  email: string,
  name: string,
  phoneNumber: string,
  reference: string
}

interface TicketObjParams {
    ticketId: number,
    quantity: number
}

export const fetchAllEvents = async (): Promise<any> => {
  const { data } = await axiosInstance.get(`${baseUrl}/event/all?size=40&page=0`)
  return data.data.events ?? {}
}
export const fetchEventBySlug = async (slug: string): Promise<any> => {
  const { data } = await axiosInstance.get(`${baseUrl}/ticket/event-slug/${slug}`)
  return data.data ?? {}
}

export const payViaMpesa = async (payData: PayForTicketParams) => {
  const { data } = await axiosInstance.post(
    `${baseUrl}/ticket/pay/mpesa`,
    payData
  );
  return data ?? {};
};

export const fetchUserOrder = async (orderId: string): Promise<any> => {
  const { data } = await axiosInstance.get(`${baseUrl}/ticket/download/${orderId}`)
  return data.data ?? {}
}
