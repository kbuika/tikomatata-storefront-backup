import { TicketDataType, TicketDataTypeTest } from "@/types/ticket"
import TicketCard from "./ticket-card"
import { EventDataType } from "@/types/event"

interface TicketCardListProps {
  tickets: TicketDataType[]
  event: EventDataType
}

const TicketCardList: React.FC<TicketCardListProps> = ({ tickets, event }) => {
  if (!Array.isArray(tickets)) {
    return null
  }

  return (
    <div className="w-full">
      {tickets?.map((ticket: TicketDataType) => (
        <TicketCard key={ticket?.ticketId} ticket={ticket} event={event} />
      ))}
    </div>
  )
}

export default TicketCardList
