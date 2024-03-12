"use client"
import { ReportView } from "@/components/report-view"
import SEO from "@/components/seo"
import TicketCardList from "@/components/ticket-card-list"
import DefaultLayout from "@/layouts/default-layout"
import { truncateText, warningToast } from "@/lib/utils"
import { useEventBySlug } from "@/services/queries"
import { useEventsStore } from "@/stores/events-store"
import { useTicketsStore } from "@/stores/tickets-store"
import { ArrowLeft, Calendar, Clock2, Loader2, Map, MapPin } from "lucide-react"
import moment from "moment"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect } from "react"
import CustomButton from "../../components/ui/custom-button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs"

export default function Events() {
  const router = useRouter()
  const { slug } = router?.query
  const {data: selectedEvent, error: eventError, isLoading: loading} = useEventBySlug(slug! as string)
  // const [totalPrice, setTotalPrice] = useState<number>(0)
  const startDateTime = `${selectedEvent?.startDate} ${selectedEvent?.startTime}`
  const endDateTime = `${selectedEvent?.endDate} ${selectedEvent?.endTime}`
  const selectedTickets = useTicketsStore((state) => state.selectedTickets)
  const setSelectedEventInCache = useEventsStore((state) => state.setSelectedEvent)
  const totalTicketsPrice = useTicketsStore((state) => state.totalTicketsPrice)
  
  useEffect(() => {
    if (selectedEvent) {
      setSelectedEventInCache(selectedEvent)
    }
  },[setSelectedEventInCache, selectedEvent])
  
  const completeOrder = () => {
    if (selectedTickets.length === 0) {
      warningToast("Please select at least one ticket")
      return
    }
    router.push("/checkout")
  }

  return (
    <DefaultLayout noFooter={true}>
      <SEO title={selectedEvent?.name || ""} description={`${truncateText(selectedEvent?.description || "", 15)}...`} image={selectedEvent?.posterUrl}/>
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
              {process.env.NODE_ENV == "production" && <ReportView eventId={selectedEvent?.eventId?.toString() || ""}/>}
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
                  <div className="flex overflow-hidden items-center justify-center h-[400px] w-[450px] sm:h-[550px] sm:w-[450px] bg-mainPrimary/30 relative rounded object-scale-down">
                    <Image src={selectedEvent?.posterUrl!} alt={selectedEvent?.name!} fill={true} />
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
                  <div className="mt-6 pt-4 px-8 pb-28 bg-beigeLight sm:px-1 sm:pr-8 sm:pt-2">
                    <Tabs
                      defaultValue="tickets"
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
                                <TicketCardList
                                  tickets={selectedEvent?.tickets!}
                                  event={selectedEvent!}
                                />
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
                      className="fixed inset-x-0 bottom-0 z-10 bg-white shadow h-20 flex flex-row flex-wrap items-center justify-between"
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
