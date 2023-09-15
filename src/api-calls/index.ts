import { API_BASE_URL } from "@/constants"
import { TicketDataType, TicketPurchaseType } from "@/types/ticket"
import axios from "axios"

interface checkoutDataType {
  tickets: TicketPurchaseType[]
  customerName: string
  customerEmail: string
  customerPhone: string
  eventId?: string
  totalPrice?: number
}

export const PurchaseTicketsFn = async (checkoutData: checkoutDataType) => {
  const purchasedTickets = checkoutData.tickets.map((ticket: TicketPurchaseType) => {
    return {
      ticketId: ticket.ticketId,
      quantity: ticket.totalQuantitySelected,
    }
  })
  const orderData = {
    tickets: purchasedTickets,
    email: checkoutData?.customerEmail,
    name: checkoutData?.customerName,
    phoneNumber: `254${checkoutData?.customerPhone}`,
  }

  const config = {
    method: "post",
    maxBodyLength: Infinity,
    url: "https://api.tikomatata.co.ke/api/v1/ticket/pay",
    headers: {
      "Content-Type": "application/json",
    },
    data: orderData,
  }

  try {
    const response = await axios.request(config)
    if (response.status === 200) {
      return response.data
    }
  } catch (error: any) {
    throw new Error(error)
  }
}

export const VerifyPayment = async (referenceId: string) => {
  const config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `https://api.tikomatata.co.ke/api/v1/ticket/verify/${referenceId}`,
    headers: {
      "Content-Type": "application/json",
    },
  }

  try {
    const response = await axios.request(config)
    if (response.status === 200) {
      return response.data
    }
  } catch (error: any) {
    throw new Error(error)
  }
}