import { UseQueryResult, useQuery } from "@tanstack/react-query"
import { fetchAllEvents, fetchEventBySlug } from "./api"
import { EventDataType } from "@/types/event"

export const useAllEvents = (): UseQueryResult<any, Error> => {
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
