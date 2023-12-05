"use client"
import DefaultLayout from "@/layouts/default-layout"
import { errorToast, truncateText, warningToast } from "@/lib/utils"
import { useTicketsStore } from "@/stores/tickets-store"
import { TicketDataTypeTest } from "@/types/ticket"
import axios from "axios"
import { ArrowLeft, Calendar, Clock2, Loader2, Map, MapPin } from "lucide-react"
import moment from "moment"
import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import TicketCard from "../../../components/ticket-card"
import CustomButton from "../../../components/ui/custom-button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../components/ui/tabs"
import Head from "next/head"
import * as Sentry from "@sentry/nextjs"
import { useEventsStore } from "@/stores/events-store"

export default function Events() {
  const [totalPrice, setTotalPrice] = useState<number>(0)
  const [selectedEvent, setSelectedEvent] = useState<any>(null)
  const [eventError, setEventError] = useState<any>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const startDateTime = `${selectedEvent?.startDate} ${selectedEvent?.startTime}`
  const endDateTime = `${selectedEvent?.endDate} ${selectedEvent?.endTime}`
  const selectedTickets = useTicketsStore((state) => state.selectedTickets)
  const setSelectedEventInCache = useEventsStore((state) => state.setSelectedEvent)
  const totalTicketsPrice = useTicketsStore((state) => state.totalTicketsPrice)
  const router = useRouter()
  const { id: eventId } = router?.query
  useEffect(() => {
    const fetchSelectedEventFn = async () => {
      if (!eventId) return
      setLoading(true)
      const config = {
        method: "get",
        url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/ticket/event?id=${eventId}`,
      }

      try {
        const response = await axios.request(config)
        if (response.data.status === 200) {
          let event = response.data.data
          if(event?.eventId?.toString() === "6") {
            event = {...event, startTime: "16:00"}
          }
          setSelectedEvent(event)
          setSelectedEventInCache(event)
        } else {
          Sentry.captureException(response.data)
          setEventError(response.data.message)
        }
      } catch (error) {
        Sentry.captureException(error)
        setEventError(error)
      } finally {
        setLoading(false)
      }
    }
    fetchSelectedEventFn()
    // return () => {}
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eventId])

  const completeOrder = () => {
    if (selectedTickets.length === 0) {
      warningToast("Please select at least one ticket")
      return
    }
    router.push("/checkout")
  }

  return (
    <DefaultLayout noFooter={true}>
      {selectedEvent !== null && (
        <Head>
          <title>{selectedEvent?.name} | Tikomatata | touch grass!</title>
          <meta name="description" content={`${truncateText(selectedEvent?.description, 15)}...`} />
          <link rel="icon" href="/favicon.ico" />
          <meta
            property="og:title"
            content={`${selectedEvent?.name} | Tikomatata | touch grass!`}
          />
          <meta
            property="og:description"
            content={`${truncateText(selectedEvent?.description, 15)}...`}
          />
          {selectedEvent?.posterUrl && (
            <meta
              property="og:image"
              content="https://dev.tikomatata.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ftikomatata-round.fcf8ea3e.png&w=3840&q=75"
            />
          )}

          <meta
            property="twitter:title"
            content={`${selectedEvent?.name} | Tikomatata | touch grass!`}
          />
          <meta
            property="twitter:description"
            content={`${truncateText(selectedEvent?.description, 15)}...`}
          />
          {selectedEvent?.posterUrl && (
            <meta property="twitter:image" content={selectedEvent?.posterUrl} />
          )}
        </Head>
      )}

      {loading ? (
        <main className="min-h-screen flex items-center justify-center">
          <Loader2 className="mx-auto animate-spin" size={64} color="#3C0862" />
        </main>
      ) : (
        <>
          {eventError ? (
            <main className="flex min-h-screen flex-col items-center justify-center">
              <p>Error. Could not fetch the selected event.</p>
              <CustomButton className="mt-4">
                <Link href="/">Go Back</Link>
              </CustomButton>
            </main>
          ) : (
            <main className="flex sm:min-h-screen flex-col items-start justify-start bg-white sm:bg-beigeLight">
              <div className="flex w-full flex-col items-center justify-between h-full sm:flex-row sm:items-start">
                <div className="flex items-start justify-start w-full px-6 pb-6 pt-6 sm:hidden">
                  <h2
                    className="text-dark text-xl leading-7 flex flex-row"
                    onClick={() => router.back()}
                  >
                    <span className="mr-4">
                      <ArrowLeft />
                    </span>
                    {selectedEvent?.name}
                  </h2>
                </div>
                <div></div>
                <div className="w-full h-[auto] px-6 flex items-start justify-center sm:w-[45%] sm:px-16 sm:pb-16 sm:pt-8 sm:min-h-screen">
                  <div className="h-[300px] w-[366px] sm:h-[40em] sm:w-[35em]">
                    <div
                      className="w-full h-[100%] bg-contain bg-no-repeat rounded"
                      style={{
                        backgroundImage: `url(${selectedEvent?.posterUrl})`,
                        border: "0.25rem",
                      }}
                    ></div>
                  </div>
                </div>
                {/* the mobile view content section  */}
                <div className="w-full px-8 py-2 bg-white sm:min-h-screen sm:hidden">
                  <div className="flex flex-col">
                    <h2 className="text-dark text-xl leading-7 hidden sm:flex">
                      {selectedEvent?.name}
                    </h2>
                    <p className="text-lg mt-1 flex flex-row items-center text-neutralDark sm:mt-4">
                      <Calendar size={18} className="mr-2" color="grey" />
                      {moment(selectedEvent?.startDate).format("ddd Do MMM")}
                      {eventId == "6" && (
                        <>
                          {" , "}
                          {moment("2023-12-31").format("ddd Do MMM")}
                        </>
                      )}
                    </p>
                    <p className="text-lg mt-2 flex flex-row items-center text-neutralDark">
                      <Clock2 size={18} className="mr-2" color="grey" />{" "}
                      {moment(startDateTime).format("LT")} - {moment(endDateTime).format("LT")}
                    </p>
                    <p className="text-lg mt-2 flex flex-row items-center text-neutralDark">
                      <Map size={18} className="mr-2" color="grey" /> {selectedEvent?.location}
                    </p>
                  </div>
                </div>
                <div className="w-full bg-white sm:min-h-screen sm:w-[55%] sm:pr-2 sm:pt-6 sm:bg-beigeLight">
                  {/* the desktop view details section  */}
                  <div className="hidden sm:block w-full px-8 py-2 bg-white sm:pb-2 sm:px-1 sm:pr-8 sm:bg-beigeLight">
                    <div className="flex flex-col">
                      <h2 className="text-dark text-2xl leading-7 hidden sm:flex font-bold">
                        {selectedEvent?.name}
                      </h2>
                      <p className="text-lg mt-1 flex flex-row items-center text-mainPrimary sm:mt-4">
                        <Calendar size={18} className="mr-2" color="grey" />
                        {moment(selectedEvent?.startDate).format("ddd Do MMM")}
                        {eventId == "6" && (
                          <>
                            {" , "}
                            {moment("2023-12-31").format("ddd Do MMM")}
                          </>
                        )}
                      </p>
                      <p className="text-lg mt-2 flex flex-row items-center text-neutralDark">
                        <Clock2 size={18} className="mr-2" color="grey" />{" "}
                        {moment(startDateTime).format("LT")} - {moment(endDateTime).format("LT")}
                      </p>
                      <p className="text-lg mt-2 flex flex-row items-center text-neutralDark">
                        <MapPin size={18} className="mr-2" color="grey" /> {selectedEvent?.location}
                      </p>
                    </div>
                  </div>
                  <div className="mt-6 pt-4 px-8 pb-16 bg-beigeLight sm:px-1 sm:pr-8 sm:pt-2">
                    <Tabs
                      defaultValue={
                        process.env.NODE_ENV === "production" && eventId == "6"
                          ? "description"
                          : "tickets"
                      }
                      className="w-full"
                    >
                      <TabsList className="bg-none w-full flex justify-start">
                        <TabsTrigger
                          value="tickets"
                          className="w-[50%] flex justify-start text-lg data-[state=active]:border-b-2 data-[state=active]:border-b-secondaryBrown"
                        >
                          Tickets
                        </TabsTrigger>
                        <TabsTrigger
                          value="description"
                          className="w-[50%] flex justify-start text-lg data-[state=active]:border-b-2 data-[state=active]:border-b-secondaryBrown"
                        >
                          Description
                        </TabsTrigger>
                      </TabsList>
                      <TabsContent value="tickets">
                        <div className="flex flex-row flex-wrap items-center justify-between">
                          {selectedEvent?.tickets?.length === 0 ? (
                            <p className="mt-2">No tickets available for this event.</p>
                          ) : (
                            <>
                              {selectedEvent?.tickets?.map((ticket: TicketDataTypeTest) => (
                                <TicketCard
                                  key={ticket?.ticketId}
                                  ticket={ticket}
                                  event={selectedEvent}
                                />
                              ))}
                            </>
                          )}
                        </div>
                        {selectedEvent?.tickets?.length !== 0 && (
                          <div className="mt-8 flex flex-col sm:flex-row items-start justify-between w-full">
                            <div className="w-full bg-gray-100 p-2 h-10 rounded flex items-center justify-between text-lg mb-4 sm:mb-0 sm:w-[45%]">
                              TOTAL{" "}
                              <span className="text-stone-900 font-medium">
                                KES <span className="font-semibold">{totalTicketsPrice}</span>
                              </span>
                            </div>

                            <CustomButton className="w-full sm:w-[45%]" onClick={completeOrder}>
                              Complete Order
                            </CustomButton>
                          </div>
                        )}
                      </TabsContent>
                      <TabsContent value="description">
                        <div className="pt-4 min-h-[40vh] sm:min-h-none">
                          <p style={{ whiteSpace: "pre-wrap" }}>{selectedEvent?.description}</p>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </div>
                </div>
                {/* the sticky checkout button  */}
                {selectedTickets?.length !== 0 && (
                  <div className="w-full sm:hidden">
                    <section
                      id="bottom-navigation"
                      className=" block fixed inset-x-0 bottom-0 z-10 bg-white shadow h-20 flex flex-row flex-wrap items-center justify-between"
                    >
                      <div className="p-4 flex flex-row flex-wrap items-center justify-between w-full">
                        <div className="w-[45%] p-2 h-10 rounded flex flex-wrap items-center justify-between text-lg">
                          TOTAL{" "}
                          <span className="text-stone-900 font-medium">
                            KES <span className="font-semibold">{totalTicketsPrice}</span>
                          </span>
                        </div>

                        <CustomButton className="w-[40%]" onClick={completeOrder}>
                          Complete Order
                        </CustomButton>
                      </div>
                    </section>
                  </div>
                )}
              </div>
            </main>
          )}
        </>
      )}
    </DefaultLayout>
  )
}
