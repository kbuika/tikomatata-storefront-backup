import { useTicketsStore } from "@/stores/tickets-store"
import { TicketDataTypeTest } from "@/types/ticket"
import { Minus, Plus } from "lucide-react"
import moment from "moment"
import React, { useState } from "react"
import { Button } from "./ui/button"

interface EventTicketProps {
  ticket: TicketDataTypeTest
  event: any
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
    <div className="bg-white text-dark w-full mt-6 p-6 h-[auto] w-[366px] rounded-[8px] md:w-[48%] shadow-xl">
      <div>
        <h1 className="text-[18px] font-semibold">{ticket?.name}</h1>
      </div>
      <div className="mt-2">
        {process.env.NODE_ENV === "production" ? (
          <>
            <p className="text-[17px] font-normal">
              {moment(event?.startDate).format("ddd MMM Do")}{" "}
              {event?.eventId == "6" && (ticket?.ticketId?.toString() == "8" || ticket?.ticketId?.toString() == "9" || ticket?.ticketId?.toString() == "11") && (
                    <>or{" "}{moment("2023-12-31").format("ddd Do MMM")}</>
                    )}

              {event?.eventId == "6" && (ticket?.ticketId?.toString() == "10") && (
                <>
                  {(event?.eventId == "6" && (ticket?.ticketId?.toString() == "10")) ? (
                    <>and{" "}{moment("2023-12-31").format("ddd Do MMM")}</>
                  ) : (
                    <>-{" "}{moment(event?.endDate).format("ddd MMM Do")}</>
                  )}
                </>
              )}
            </p>
          </>
        ) : (
          <>
            <p className="text-[17px] font-normal">
              {moment(event?.startDate).format("ddd MMM Do")} -{" "}
              {moment(event?.endDate).format("ddd MMM Do")}
            </p>
          </>
        )}
        <p className="text-[17px] font-normal">Starts at {moment(startDateTime).format("LT")}</p>
      </div>
      <div className="mt-2">
        <p className="text-[18px] text-mainPrimary font-bold">KES {ticket?.price}</p>
      </div>
      <div>
        <div className="flex flex-row mt-4 items-center justify-start">
          {ticket?.quantity === 0 ? (
            <p className="font-bold text-red-600">Sold Out</p>
          ) : (
            <>
              <Button
                className="border rounded"
                onClick={() => removeTicket(ticket)}
                disabled={ticketQuantity === 0}
              >
                <Minus className="cursor-pointer" size={13} color="black" />
              </Button>
              <p className="flex items-center justify-center w-[2em] text-base">{ticketQuantity}</p>{" "}
              <Button
                className="bg-secondaryBrown rounded focus-visible:bg-secondaryBrown"
                onClick={() => addTicket(ticket)}
              >
                <Plus className="cursor-pointer" size={13} color="black" />
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default TicketCard
