import Hero from "@/components/Hero"
import EventCard from "../../components/event-card"
import Nav from "@/components/Nav"
import DefaultLayout from "@/layouts/default-layout"
import { EventDataType } from "@/types/event"
import { useEventsStore } from "@/stores/events-store"
import { API_BASE_URL } from "@/constants"
import { useTicketsStore } from "@/stores/tickets-store"

type Props = {
  events: Array<EventDataType>
}
// TODO: make the entire app CSR???
const Home: React.FC<Props> = ({ events }) => {
  const setAllEventsStore = useEventsStore((state) => state.setAllEvents)
  const resetAllTickets = useTicketsStore((state) => state.resetAllTickets)
  setAllEventsStore(events)
  resetAllTickets()
  return (
    <DefaultLayout noHeader={true}>
      <main className="home h-[60vh]">
        <Nav />
        <Hero />
      </main>
      <div className="mx-12 my-[3em]">
        <h2 className="mt-2 text-2xl ml-[1em] font-medium">Upcoming Events</h2>
        <div className="flex flex-wrap items-start justify-evenly min-h-[50vh] my-[3em]">
          {events?.map((event: EventDataType) => (
            <EventCard key={event?.eventId} event={event} />
          ))}
        </div>
      </div>
    </DefaultLayout>
  )
}

export default Home

export async function getServerSideProps() {
  const res = await fetch(`${API_BASE_URL}/event/all?size=40&page=0`)
  const data = await res.json()
  const events = data?.data
  return {
    props: { events },
  }
}
