import Hero from "@/components/hero"
import EventCard from "../../components/event-card"
import Nav from "@/components/nav"
import DefaultLayout from "@/layouts/default-layout"
import { EventDataType } from "@/types/event"
import { useEventsStore } from "@/stores/events-store"

type Props = {
  data: any
}

const Home: React.FC<Props> = ({ data }) => {
  const setAllEventsStore = useEventsStore((state) => state.setAllEvents)
  setAllEventsStore(data?.data)
  return (
    <DefaultLayout noHeader={true}>
      <main className="home h-[60vh]">
        <Nav />
        <Hero />
      </main>
      <div className="mx-12 my-[3em]">
        <h2 className="mt-2 text-2xl ml-[1em] font-medium">Upcoming Events</h2>
        <div className="flex flex-wrap items-start justify-evenly min-h-[50vh] my-[3em]">
          {data?.data?.map((event: EventDataType) => (
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
  return {
    props: { data },
  }
}
