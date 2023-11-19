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
import Head from "next/head"

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
          setEvents(response.data.data.events)
          setAllEventsStore(response.data.data.events)
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
      <Head>
        <title>Tikomatata | touch grass!</title>
        <meta
          name="description"
          content="Where Every Event is an Experience, and Every Experience is Extraordinary "
        />
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:title" content="Tikomatata | touch grass!" />
        <meta
          property="og:description"
          content="Where Every Event is an Experience, and Every Experience is Extraordinary"
        />
        <meta
          property="og:image"
          content="https://dev.tikomatata.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ftikomatata-round.fcf8ea3e.png&w=3840&q=75"
        />
        <meta property="twitter:title" content="Tikomatata | touch grass!" />
        <meta property="twitter:description" content="Where Every Event is an Experience, and Every Experience is Extraordinary" />
        <meta
          property="twitter:image"
          content="https://dev.tikomatata.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ftikomatata-round.fcf8ea3e.png&w=3840&q=75"
        />
      </Head>
      <main className="home h-[414px] bg-beigeLight md:h-[65vh]">
        <Nav />
        <Hero />
      </main>
      <div className="mx-8 md:mx-0 md:px-[40px]">
        <h2 className="my-[24px] text-2xl font-bold">Upcoming Events</h2>
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
