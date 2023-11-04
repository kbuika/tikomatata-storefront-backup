import Hero from "@/components/Hero"
import EventCard from "../components/event-card"
import Nav from "@/components/Nav"
import DefaultLayout from "@/layouts/default-layout"
import { EventDataType } from "@/types/event"
import { useEventsStore } from "@/stores/events-store"
import { useTicketsStore } from "@/stores/tickets-store"
import axios from "axios"
import { useEffect, useState } from "react"
import SellOutEventBanner from "@/components/sell-out-event-banner"
import { useOrderStore } from "@/stores/order-store"

type Props = {
  events: Array<EventDataType>
}
// TODO: make the entire app CSR???
const Home: React.FC<Props> = () => {
  const [events, setEvents] = useState<Array<EventDataType>>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [eventsError, setEventsError] = useState<any>(null)
  const setAllEventsStore = useEventsStore((state) => state.setAllEvents)
  const resetAllTickets = useTicketsStore((state) => state.resetAllTickets)
  const resetOrderDetails = useOrderStore((state) => state.resetOrderDetails)
  useEffect(() => {
    const fetchAllEvents = async () => {
      setLoading(true)
      const config = {
        method: "get",
        url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/event/all?size=40&page=0`,
      }
      try {
        const response = await axios.request(config)
        if (response.status === 200) {
          setEvents(response.data.data)
          setAllEventsStore(response.data.data)
        } else {
          setEventsError(response.data)
        }
      } catch (error) {
        setEventsError(error)
      } finally {
        setLoading(false)
      }
    }
    fetchAllEvents()
    // return () => {}
  }, [setAllEventsStore])
  resetAllTickets()
  resetOrderDetails()
  return (
    <DefaultLayout noHeader={true} isMain={true}>
      <main className="home h-[414px] bg-beigeLight md:h-[65vh]">
        <Nav />
        <Hero />
      </main>
      <div className="mx-8">
        <h2 className="my-[24px] text-2xl ml-[1em] font-bold">Upcoming Events</h2>
        <div className="flex w-full flex-wrap items-start justify-start min-h-[50vh] mb-[3em]">
          {events?.map((event: EventDataType) => (
            <EventCard key={event?.eventId} event={event} />
          ))}
        </div>
      </div>
      <SellOutEventBanner />
    </DefaultLayout>
  )
}

export default Home
