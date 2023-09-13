// stores the user's selected tickets
import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"
import { TicketPurchaseType } from "@/types/ticket"

interface TicketsState {
  selectedTickets: Array<TicketPurchaseType>
  totalTicketsPrice: number
  serviceFee: number
  totalTicketsPriceWithServiceFee: number
  setSelectedTickets: (selectedTickets: Array<TicketPurchaseType>) => void
  updateSelectedTickets: (selectedTickets: Array<TicketPurchaseType>) => void
  selectSingleTicket: (ticket: TicketPurchaseType) => void
  setTotalTicketsPrice: (total: number) => void
  resetAllTickets: () => void
}

// selected tickets are referenced in a batch that contains the quantity of each ticket selected
export const useTicketsStore = create<TicketsState>()(
  persist(
    (set, get) => ({
        selectedTickets: [],
        totalTicketsPrice: 0,
        serviceFee: 0,
        totalTicketsPriceWithServiceFee: 0,
        setSelectedTickets: (selectedTickets) => set(() => ({ selectedTickets })),
        updateSelectedTickets: (selectedTickets: Array<any>) => set(() => ({ selectedTickets })),
        selectSingleTicket: (ticket) => set((state) => ({ selectedTickets: [...state.selectedTickets, ticket] })),
        setTotalTicketsPrice: (total) => set(() => ({ totalTicketsPrice: total, serviceFee: Math.round(total*0.035), totalTicketsPriceWithServiceFee: Math.round(total+(total*0.035)) })),
        resetAllTickets: () => set(() => ({ selectedTickets: [], totalTicketsPrice: 0 })),

    }),
    {
      name: "tickets-storage", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
    },
  ),
)
