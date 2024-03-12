import { TicketDataType } from "./ticket"

export interface EventDataType {
  eventId?: number
  name: string
  description: string
  location: string
  mapLink?: string
  environment?: string
  startDate: string
  endDate: string
  startTime?: string
  endTime?: string
  ageLimit: number
  poster?: FileList
  posterUrl: string
  cancelled?: boolean
  published?: boolean
  tickets?: null | TicketDataType[],
  slug?: string
}
