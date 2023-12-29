import { TicketDataTypeTest } from "@/types/ticket"
import TicketCard from "./ticket-card"

interface TicketCardListProps {
  tickets: TicketDataTypeTest[]
  event: any
}

const TicketCardList: React.FC<TicketCardListProps> = ({ tickets, event }) => {
  if (!Array.isArray(tickets)) {
    console.error("Invalid tickets data. Expected an array.")
    return null
  }
  const sortedTickets = [...tickets]?.sort((a, b) => {
    // "Flash Sale" should come first, so we give it a lower sort value
    if (a.name === "Flash Sale") return -1
    if (b.name === "Flash Sale") return 1

    // For other tickets, use default alphabetical sorting
    return a.name.localeCompare(b.name)
  })

  return (
    <>
      {sortedTickets?.map((ticket: TicketDataTypeTest) => (
        <TicketCard key={ticket?.ticketId} ticket={ticket} event={event} />
      ))}
    </>
  )
}

export default TicketCardList
