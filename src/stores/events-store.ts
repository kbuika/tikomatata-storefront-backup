import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"
import { EventDataType } from "../types/event"

interface EventsState {
  allEvents: Array<EventDataType>
  selectedEvent: EventDataType | null
  setAllEvents: (events: Array<EventDataType>) => void
  setSelectedEvent: (event: EventDataType) => void
  resetAllEvents: () => void
}

export const useEventsStore = create<EventsState>()(
  persist(
    (set) => ({
      allEvents: [],
      selectedEvent: null,
      setAllEvents: (events) => set(() => ({ allEvents: events })),
      setSelectedEvent: (event) => set(() => ({ selectedEvent: event })),
      resetAllEvents: () => set(() => ({ allEvents: [] })),
    }),
    {
      name: "events-storage", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
    },
  ),
)
