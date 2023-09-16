import Hero from "@/components/Hero"
import EventCard from "../components/event-card"
import Nav from "@/components/Nav"
import DefaultLayout from "@/layouts/default-layout"
import { EventDataType } from "@/types/event"
import { useEventsStore } from "@/stores/events-store"
import { API_BASE_URL } from "@/constants"
import { useTicketsStore } from "@/stores/tickets-store"
import axios from "axios"
import { useEffect, useState } from "react"
import Link from "next/link"

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
  useEffect(() => {
    const fetchAllEvents = async () => {
      setLoading(true)
      const config = {
        method: "get",
        url: `https://api.tikomatata.co.ke/api/v1/event/all?size=40&page=0`,
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
  return (
    <DefaultLayout noHeader={true} isMain={true}>
      <main className="home h-[60vh]">
        <Nav />
        <Hero />
      </main>
      <div className="mx-12 my-[3em]">
        <h2 className="mt-2 text-2xl ml-[1em] font-medium">Upcoming Events</h2>
        <div className="flex flex-wrap items-start justify-start min-h-[50vh] my-[3em]">
        <div className="ml-2">
          <p className="text-lg">Have an issue? <Link href="/contact" className="underline">Contact Us</Link></p>
        </div>
          {events?.map((event: EventDataType) => (
            <EventCard key={event?.eventId} event={event} />
          ))}
        </div>
      </div>
    </DefaultLayout>
  )
}

export default Home


