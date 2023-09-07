export interface TicketPurchaseType {
    ticketId: number
    name: string
    price: string
    totalQuantitySelected: number
    timeOfPurchase?: Date
  }

  export interface TicketDataType {
    eventId: number
    ticketId?: number
    name: string
    price: string
    quantity: string
    saleStartDate: string
    saleEndDate: string
    saleStartTime: string
    saleEndTime: string
  }