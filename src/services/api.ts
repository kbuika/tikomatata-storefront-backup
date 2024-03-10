import axios from "axios"
import axiosInstance from "./axios-interceptor"
const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL

export const fetchAllEvents = async (): Promise<any> => {
  const { data } = await axiosInstance.get(`${baseUrl}/event/all?size=40&page=0`)
  return data.data.events ?? {}
}
export const fetchEventBySlug = async (slug: string): Promise<any> => {
  const { data } = await axiosInstance.get(`${baseUrl}/event/${slug}`)
  return data.data ?? {}
}
