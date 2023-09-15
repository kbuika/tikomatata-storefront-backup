import React, { useState } from "react"
import { Minus, Plus } from "lucide-react"
import { Button } from "./ui/button"
import { useTicketsStore } from "@/stores/tickets-store"
import { TicketDataType, TicketDataTypeTest } from "@/types/ticket"

interface EventTicketProps {
  ticket: TicketDataTypeTest
}

const TicketCard: React.FC<EventTicketProps> = ({ticket}) => {
  const [ticketCount, setTicketCount] = useState(0)
  const selectedTickets = useTicketsStore((state) => state.selectedTickets)
  const updateSelectedTickets = useTicketsStore((state) => state.updateSelectedTickets)
  const setTotalPrice = useTicketsStore((state) => state.setTotalTicketsPrice)

  // create a ticket quantity value - it finds the ticket in the array and returns the totalQuantitySelected and if it doesn't find it, it returns 0
  const ticketQuantity = selectedTickets.find((ticketItem) => ticketItem.ticketId === ticket?.ticketId)?.totalQuantitySelected || 0
  
  const addTicket = (selectedTicket:any) => {
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
      if(selectedTickets.length !== 0) {
        alert("Sorry, you can only select one ticket type")
        return;
      }
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
    <>
      <div className="flex flex-col items-center justify-center bg-center bg-cover h-full w-[90%] sm:w-[45%] m-2 max-[640px]:w-[90%]">
        <div className="w-full mx-auto z-10 rounded">
          <div className="flex flex-col">
            <div className="bg-white relative border-2 shadow-sm rounded p-4 m-2 w-full">
              <div className="flex-none sm:flex">
                <div className="flex-auto justify-evenly">
                  <div className="flex items-center justify-center sm:justify-between">
                    <div className="flex items-center">
                      <h2 className="font-medium">{ticket?.name}</h2>
                    </div>
                  </div>

                  <div className="border-b border-dashed border-b-2 my-3"></div>
                  <div className="flex flex-col items-center justify-center text-sm sm:items-start">
                    <div className="flex flex-col items-start">
                      <p className="font-bold text-center text-xl mt-2 text-mainSecondary">
                        <span className="text-gray-600">KES </span>{ticket?.price}
                      </p>
                      <div className="flex flex-row mt-4 items-center justify-center">
                        {ticket?.quantity === 0 ? (
                          <p className="font-bold text-red-600">Sold Out</p>
                        ): (
                          <>
                          <Button className="border rounded" onClick={() => removeTicket(ticket)} disabled={ticketQuantity === 0}>
                          <Minus className="cursor-pointer" size={13} />
                        </Button>
                        <p className="flex items-center justify-center w-[2em] text-base">{ticketQuantity}</p>{" "}
                        <Button className="bg-neutralDark rounded focus-visible:bg-neutralDark" onClick={() => addTicket(ticket)}>
                          <Plus className="cursor-pointer" size={13} color="white" />
                        </Button>
                          </>
                        )}
                        
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default TicketCard
