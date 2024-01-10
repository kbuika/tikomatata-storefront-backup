import { TicketDataTypeTest } from "@/types/ticket"
import TicketCard from "./ticket-card"
import { EventDataType } from "@/types/event"

interface TicketCardListProps {
  tickets: TicketDataTypeTest[]
  event: EventDataType
}

const TicketCardList: React.FC<TicketCardListProps> = ({ tickets, event }) => {
  if (!Array.isArray(tickets)) {
    return null
  }
  // const sortedTickets = [...tickets]?.sort((a, b) => {
  //   // "Flash Sale" should come first, so we give it a lower sort value
  //   if (a.name === "Gate Regular Ticket") return -1
  //   if (b.name === "Gate Regular Ticket") return 1

  //   // For other tickets, use default alphabetical sorting
  //   return a.name.localeCompare(b.name)
  // })

  return (
    <>
      {tickets?.map((ticket: TicketDataTypeTest) => (
        <TicketCard key={ticket?.ticketId} ticket={ticket} event={event} />
      ))}
    </>
  )
}

export default TicketCardList
