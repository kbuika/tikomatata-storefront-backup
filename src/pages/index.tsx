import Hero from "@/components/Hero"
import EventCard from "../components/event-card"
import SEO from "../components/seo"
import Nav from "@/components/Nav"
import DefaultLayout from "@/layouts/default-layout"
import { EventDataType } from "@/types/event"
import { useEventsStore } from "@/stores/events-store"
import { useTicketsStore } from "@/stores/tickets-store"
import axios from "axios"
import { useEffect, useState } from "react"
import SellOutEventBanner from "@/components/sell-out-event-banner"
import { useOrderStore } from "@/stores/order-store"
import * as Sentry from "@sentry/nextjs"
import { getPastEvents } from "@/lib/utils"
import {pastEvents} from "../data/past-events"

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
  const resetSelectedEvent = useEventsStore((state) => state.resetSelectedEvent)
  useEffect(() => {
    const fetchAllEvents = async () => {
      setLoading(true)
      const config = {
        method: "get",
        url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/event/all?size=40&page=0`,
      }
      try {
        const response = await axios.request(config)
        if (response.data.status === 200) {
          setEvents(response.data.data.events)
          setAllEventsStore(response.data.data.events)
        } else {
          Sentry.captureException(response.data)
          setEventsError(response.data)
        }
      } catch (error) {
        Sentry.captureException(error)
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
  resetSelectedEvent()

  return (
    <DefaultLayout noHeader={true} isMain={true}>
      <SEO title="Tikomatata" />
      <main className="home h-[414px] bg-beigeLight md:h-[65vh]">
        <Nav />
        <Hero />
        <div className="flex items-center justify-end bottom-0">
          <p className="text-slate-500 text-xs mr-2">Credits | @hornsphere</p>
        </div>
      </main>
      <div className="mx-8 md:mx-0 md:px-[40px]">
        <h2 className="my-[24px] text-2xl font-bold">Upcoming Events</h2>
        <div className="flex w-full flex-wrap items-start justify-start min-h-[10vh]">
          {events?.length > 0 ? (
            <>
              {events?.map((event: EventDataType) => (
                <EventCard key={event?.eventId} event={event} />
              ))}
            </>
          ) : (
            <>
              <p className="text-lg">Sorry 😞! There are no upcoming events at the moment</p>
            </>
          )}
        </div>
      </div>
      <div className="mx-8 md:mx-0 md:px-[40px]">
        <h2 className="my-[24px] text-2xl font-bold">Past Events</h2>
        <div className="flex w-full flex-wrap items-start justify-start min-h-[50vh] mb-[3em]">
          {getPastEvents(pastEvents)?.map((event: EventDataType) => (
            <EventCard key={event?.eventId} event={event} past={true} />
          ))}
        </div>
      </div>
      <SellOutEventBanner />
    </DefaultLayout>
  )
}

export default Home
