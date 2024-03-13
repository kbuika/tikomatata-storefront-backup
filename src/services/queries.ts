import { UseQueryResult, useQuery } from "@tanstack/react-query"
import { fetchAllEvents, fetchEventBySlug, fetchUserOrder } from "./api"
import { EventDataType } from "@/types/event"

export const useAllEvents = (): UseQueryResult<EventDataType[], Error> => {
  return useQuery({
    queryKey: ["events"],
    queryFn: () => fetchAllEvents(),
    refetchOnWindowFocus: false,
  })
}

export const useEventBySlug = (slug: string): UseQueryResult<EventDataType, Error> => {
  return useQuery({
    queryKey: ["event", slug],
    queryFn: () => fetchEventBySlug(slug),
    refetchOnWindowFocus: false,
  })
}

export const useUserOrder = (orderId: string): UseQueryResult<any, Error> => {
  return useQuery({
    queryKey: ["order-data"],
    queryFn: () => fetchUserOrder(orderId),
    retry: true,
    refetchOnMount: true,
  })
}
