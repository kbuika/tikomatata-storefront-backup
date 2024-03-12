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
    quantity: string | number
    saleStartDate: string
    saleEndDate: string
    saleStartTime: string
    saleEndTime: string
  }

  export interface TicketDataTypeTest extends TicketDataType {
    eventId: number
    ticketId?: number
    name: string
    price: string
    quantity: number
    saleStartDate: string
    saleEndDate: string
    saleStartTime: string
    saleEndTime: string
  }