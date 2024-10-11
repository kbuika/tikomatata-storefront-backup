import { useTicketsStore } from "@/stores/tickets-store"
import { TicketDataType } from "@/types/ticket"
import { Minus, Plus } from "lucide-react"
import moment from "moment"
import React, { useState } from "react"
import { Button } from "./ui/button"
// import Sparkles from 'react-sparkle'
import { EventDataType } from "@/types/event"

interface EventTicketProps {
  ticket: TicketDataType
  event: EventDataType
}

const TicketCard: React.FC<EventTicketProps> = ({ ticket, event }) => {
  const [ticketCount, setTicketCount] = useState(0)
  const selectedTickets = useTicketsStore((state) => state.selectedTickets)
  const updateSelectedTickets = useTicketsStore((state) => state.updateSelectedTickets)
  const setTotalPrice = useTicketsStore((state) => state.setTotalTicketsPrice)
  const startDateTime = `${event?.startDate} ${event?.startTime}`

  // create a ticket quantity value - it finds the ticket in the array and returns the totalQuantitySelected and if it doesn't find it, it returns 0
  const ticketQuantity =
    selectedTickets.find((ticketItem) => ticketItem.ticketId === ticket?.ticketId)
      ?.totalQuantitySelected || 0

  const addTicket = (selectedTicket: any) => {
    setTicketCount(ticketCount + 1)
    // check if the ticket is already in the array if it is, update the count, if not add it
    const ticket = selectedTickets.find((ticket) => ticket.ticketId === selectedTicket?.ticketId)
    if (ticket) {
      ticket.totalQuantitySelected = ticket.totalQuantitySelected + 1
      // update the selected tickets
      updateSelectedTickets(selectedTickets)
      // update the total price
      const totalPrice = selectedTickets.reduce((acc, ticket) => {
        return acc + ticket.totalQuantitySelected * parseInt(ticket.price)
      }, 0)
      setTotalPrice(totalPrice)
    }
    if (!ticket) {
      // if(selectedTickets.length !== 0) {
      //   alert("Sorry, you can only select one ticket type")
      //   return;
      // }
      selectedTicket = { ...selectedTicket, totalQuantitySelected: 1 }
      const updatedSelectedTickets = [...selectedTickets, selectedTicket]
      updateSelectedTickets(updatedSelectedTickets)
      // update the total price
      const totalPrice = updatedSelectedTickets.reduce((acc, ticket) => {
        return acc + ticket.totalQuantitySelected * parseInt(ticket.price)
      }, 0)
      setTotalPrice(totalPrice)
    }
  }

  const removeTicket = (selectedTicket: any) => {
    setTicketCount(ticketCount - 1)
    // check if the ticket is already in the array if it is, reduce totalQuantitySelected by 1, if the totalQuantitySelected is 0, remove the ticket from the array
    const ticket = selectedTickets.find((ticket) => ticket.ticketId === selectedTicket?.ticketId)
    if (ticket) {
      ticket.totalQuantitySelected = ticket.totalQuantitySelected - 1
      // update the selected tickets
      updateSelectedTickets(selectedTickets)
      const totalPrice = selectedTickets.reduce((acc, ticket) => {
        return acc + ticket.totalQuantitySelected * parseInt(ticket.price)
      }, 0)
      // update the total price
      setTotalPrice(totalPrice)
      if (ticketCount === 0) {
        // remove the ticket from the array
        const filteredSelectedTickets = selectedTickets.filter(
          (ticket) => ticket.ticketId !== selectedTicket?.ticketId,
        )
        updateSelectedTickets(filteredSelectedTickets)
        const totalPrice = filteredSelectedTickets.reduce((acc, ticket) => {
          return acc + ticket.totalQuantitySelected * parseInt(ticket.price)
        }, 0)
        // update the total price
        setTotalPrice(totalPrice)
      }
    }
  }
  return (
    <div
      className={` w-full mt-6 px-4 py-4 h-[auto] rounded-[4px] shadow-xl relative text-white sell-out-section`}
    >
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">{ticket?.name}</h1>
        <div>
          {ticket?.quantity === 0 && (
            <div className="font-semibold py-1 px-2 bg-red-600 text-white rounded-[4px]">
              Sold Out
            </div>
          )}
        </div>
      </div>
      <div className="mt-2">
        {/* <>
          <p className="text-[17px] font-normal">
            {moment(event?.startDate).format("ddd MMM Do")} -{" "}
            {moment(event?.endDate).format("ddd MMM Do")}
          </p>
        </> */}
        <p className="text-[17px] font-normal">Starts at {moment(startDateTime).format("LT")}</p>
        {event?.eventId == 22 && ticket?.ticketId == 25 && (
          <p className="text-sm font-medium text-yellow-400 mt-2">
            Disclaimer: This ticket is only for students. Student IDs will be checked at the event.
          </p>
        )}
      </div>
      <div className="mt-2 flex justify-between items-center flex-wrap w-full">
        <p className="text-2xl text-white font-bold">KES {ticket?.price}</p>
        <div>
          <div className="flex flex-row items-center justify-start">
            <>
              <Button
                className="border-none h-12 w-12 sm:h-14 sm:w-14 rounded-[50%] bg-rbackground"
                onClick={() => removeTicket(ticket)}
                disabled={ticketQuantity === 0}
              >
                <Minus className="cursor-pointer" size={18} color="white" />
              </Button>
              <p className="flex items-center justify-center w-[2em] px-6 text-base">
                {ticketQuantity}
              </p>{" "}
              <Button
                className="border-none h-12 w-12 sm:h-14 sm:w-14 rounded-[50%] bg-rbackground"
                onClick={() => addTicket(ticket)}
                disabled={ticket?.quantity === 0}
              >
                <Plus className="cursor-pointer" size={18} color="white" />
              </Button>
            </>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TicketCard
