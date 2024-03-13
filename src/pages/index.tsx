"use client"
import Hero from "@/components/Hero"
import Nav from "@/components/Nav"
import SellOutEventBanner from "@/components/sell-out-event-banner"
import DefaultLayout from "@/layouts/default-layout"
import { getPastEvents } from "@/lib/utils"
import { useAllEvents } from "@/services/queries"
import { useEventsStore } from "@/stores/events-store"
import { useOrderStore } from "@/stores/order-store"
import { useTicketsStore } from "@/stores/tickets-store"
import { EventDataType } from "@/types/event"
import { Loader2 } from "lucide-react"
import { useEffect } from "react"
import EventCard from "../components/event-card"
import SEO from "../components/seo"
import { pastEvents } from "../data/past-events"
import Image from "next/image"
import HeroImage from "../images/echoes-banner.webp"

type Props = {
  events: Array<EventDataType>
}
// TODO: make the entire app CSR???
const Home: React.FC<Props> = () => {
  const setAllEventsStore = useEventsStore((state) => state.setAllEvents)
  const resetAllTickets = useTicketsStore((state) => state.resetAllTickets)
  const resetOrderDetails = useOrderStore((state) => state.resetOrderDetails)
  const resetSelectedEvent = useEventsStore((state) => state.resetSelectedEvent)
  const { data: events, error, isLoading } = useAllEvents()

  useEffect(() => {
    if (events) setAllEventsStore(events)
  }, [events, setAllEventsStore])

  resetAllTickets()
  resetOrderDetails()
  resetSelectedEvent()

  return (
    <div>
      <SEO title="Tikomatata" />
      <main className="home h-[414px] md:h-[100vh] relative">
        <Nav />
      </main>
      <div className="absolute inset-0 bg-gradient-to-t from-rbackground from-30% blur-lg" />
      <div className="-mt-36 sm:-mt-80 absolute w-full">
        <div className=" text-white mx-8 md:mx-0 sm:px-[10px] md:px-[30px] lg:px-[50px] xl:px-[80px]">
          <div className="grid justify-center items-center grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 max-w-7xl mx-auto">
            <h2 className="my-[24px] text-2xl sm:text-3xl font-[700] leading-[60px]">Upcoming Events</h2>
          </div>{" "}
          {isLoading ? (
            <div>
              <Loader2 size={20} />
            </div>
          ) : (
            <div className="flex flex-wrap items-start grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 max-w-7xl">
              {events && events?.length > 0 ? (
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
          )}
        </div>

        <div className=" mx-8 md:mx-0 sm:px-[10px] md:px-[30px] lg:px-[50px] xl:px-[80px]">
          <div className="grid justify-center items-center grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 max-w-7xl mx-auto">
            <h2 className="my-[24px] text-2xl font-bold text-slate-600">Past Events</h2>
          </div>
          <div className="flex flex-wrap items-start grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 max-w-7xl">
            {getPastEvents(pastEvents)?.map((event: EventDataType) => (
              <EventCard key={event?.eventId} event={event} past={true} />
            ))}
          </div>
        </div>
        <SellOutEventBanner />
      </div>
    </div>
  )
}

export default Home
