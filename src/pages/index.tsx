"use client"
import Nav from "@/components/Nav"
import SellOutEventBanner from "@/components/sell-out-event-banner"
import DefaultLayout from "@/layouts/default-layout"
import { useAllEvents } from "@/services/queries"
import { useEventsStore } from "@/stores/events-store"
import { useOrderStore } from "@/stores/order-store"
import { useTicketsStore } from "@/stores/tickets-store"
import { EventDataType } from "@/types/event"
import {
  ChevronLeft,
  ChevronRight,
  Loader2
} from "lucide-react"
import Image from "next/image"
import { useEffect } from "react"
import EventCard from "../components/event-card"
import SEO from "../components/seo"

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
    <DefaultLayout noHeader={true}>
      <div className="min-h-screen">
        <SEO title="Tikomatata" />
        <div className="home h-[414px] md:h-[100vh] relative">
          <Nav />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-rbackground from-30% blur-lg" />
        <div className="-mt-36 sm:-mt-80 relative w-full h-auto">
          <div className="text-white mx-8 md:mx-0 sm:px-[10px] md:px-[30px] lg:px-[50px] xl:px-[80px]">
            <div className="grid justify-center items-center grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 mx-auto">
              <h2 className="my-[24px] text-2xl sm:text-3xl font-[700] leading-[60px]">
                Upcoming Events
              </h2>
            </div>{" "}
            {isLoading ? (
              <div>
                <Loader2 size={20} />
              </div>
            ) : (
              <div className="flex flex-wrap items-start grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
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
          <div className="text-white mt-16 relative sell-out-section">
            <div className="max-w-7xl mx-auto px-4 py-12 h-auto md:h-[580px]">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h2 className="text-5xl sm:text-7xl font-bold mb-4 text-center md:text-left">
                    Discover our past events
                  </h2>
                  <p className="mb-6 text-lg text-center md:text-left">
                    Here are the events we have been part of. We have really enjoyed working with
                    our partners.
                  </p>
                  <div className="flex justify-center md:justify-start space-x-8 mt-16">
                    <button className="bg-[#00A99D] flex items-center justify-center h-[50px] w-[50px] sm:h-[70px] sm:w-[70px] border-none rounded-[50%] cursor-pointer">
                      <ChevronLeft size={30} className="w-6 h-6" color="#040E0E" />
                    </button>
                    <button className="bg-[#00A99D] flex items-center justify-center h-[50px] w-[50px] sm:h-[70px] sm:w-[70px] border-none rounded-[50%] cursor-pointer hover:none">
                      <ChevronRight
                        size={30}
                        className="w-6 h-6 hover:text-white"
                        color="#040E0E"
                      />
                    </button>
                  </div>
                </div>
                <div className="p-6 rounded-lg flex items-center justify-center">
                  <div className="flex overflow-hidden items-center justify-center h-[20em] w-[18em] sm:h-[29em] sm:w-[25em] relative rounded-[8px] border-none">
                    <Image
                      src={
                        "https://tikomatata.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fechoes.372f2b27.png&w=3840&q=75"
                      }
                      alt=""
                      fill
                      className="rounded object-contain"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <SellOutEventBanner />
        </div>
      </div>
    </DefaultLayout>
  )
}

export default Home
