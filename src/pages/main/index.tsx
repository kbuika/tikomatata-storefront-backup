import Hero from "@/components/Hero"
import EventCard from "../../components/event-card"
import Nav from "@/components/Nav"
import DefaultLayout from "@/layouts/default-layout"
import { EventDataType } from "@/types/event"
import { useEventsStore } from "@/stores/events-store"

type Props = {
  events: Array<EventDataType>
}

const Home: React.FC<Props> = ({ events }) => {
  const setAllEventsStore = useEventsStore((state) => state.setAllEvents)
  setAllEventsStore(events)
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
  const res = await fetch("https://api.tikomatata.com/api/v1/event/all?size=10&page=0")
  const data = await res.json()
  const events = data?.data
  return {
    props: { events },
  }
}
