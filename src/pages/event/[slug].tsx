"use client"
import { ReportView } from "@/components/report-view"
import SEO from "@/components/seo"
import TicketCardList from "@/components/ticket-card-list"
import DefaultLayout from "@/layouts/default-layout"
import { truncateText, warningToast } from "@/lib/utils"
import { useEventBySlug } from "@/services/queries"
import { useEventsStore } from "@/stores/events-store"
import { useTicketsStore } from "@/stores/tickets-store"
import { ArrowLeft, Loader2 } from "lucide-react"
import moment from "moment"
import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect } from "react"
import CustomButton from "../../components/ui/custom-button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function Events() {
  const router = useRouter()
  const { slug } = router?.query
  const {
    data: selectedEvent,
    error: eventError,
    isLoading: loading,
  } = useEventBySlug(slug! as string)
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
  }, [setSelectedEventInCache, selectedEvent])

  const completeOrder = () => {
    if (selectedTickets.length === 0) {
      warningToast("Please select at least one ticket")
      return
    }
    router.push("/checkout")
  }

  return (
    <DefaultLayout noFooter={true} noHeader={false}>
      <SEO
        title={selectedEvent?.name || ""}
        description={`${truncateText(selectedEvent?.description || "", 15)}...`}
        image={selectedEvent?.posterUrl}
      />
      {loading ? (
        <main className="min-h-screen flex items-center justify-center bg-rbackground">
          <Loader2 className="mx-auto animate-spin" size={64} color="#white" />
        </main>
      ) : (
        <>
          {eventError ? (
            <main className="flex min-h-screen flex-col items-center justify-center bg-rbackground text-white overflow-y-auto">
              <p>Error. Could not fetch the selected event.</p>
              <CustomButton className="mt-4">
                <Link href="/">Go Back</Link>
              </CustomButton>
            </main>
          ) : (
            <main className="flex flex-col w-full sm:min-h-screen bg-rbackground text-white md:flex-row">
              {/* {process.env.NODE_ENV == "production" && ( */}
              <ReportView eventId={selectedEvent?.eventId?.toString() || ""} />
              {/* // )} */}
              <div
                className="h-[354px] w-full relative bg-cover bg-no-repeat bg-blend-multiply bg-center md:hidden"
                style={{
                  backgroundImage: `url('${selectedEvent?.posterUrl}')`,
                }}
              >
                <p
                  className="absolute top-10 left-5 z-10 text-white h-10 w-10 bg-black flex items-center justify-center rounded-[50px] cursor-pointer"
                  onClick={() => router.back()}
                >
                  <ArrowLeft />
                </p>
              </div>

              <div className="-mt-20 h-[149px] w-[100vw] inset-0 bg-gradient-to-t from-rbackground from-85% blur-lg md:hidden" />

              <div className="relative md:flex p-8 w-full md:w-1/2 -mt-36 md:mt-0 md:flex-col">
                <h2 className="text-4xl md:text-3xl font-bold mb-4">{selectedEvent?.name}</h2>
                <div className="flex flex-col space-y-2">
                  <p>{selectedEvent?.location}</p>
                  <p>
                    {moment(startDateTime).format("ddd")}, {moment(startDateTime).format("MMMM")}{" "}
                    {moment(startDateTime).format("Do")}
                  </p>
                  <p>
                    {moment(startDateTime).format("LT")} - {moment(endDateTime).format("LT")}
                  </p>
                </div>

                <div className="mb-20 mt-2 pt-4 pb-2 sm:px-1 sm:pr-8 sm:pt-2">
                  <Tabs defaultValue="tickets" className="w-full">
                    <TabsList className="bg-none w-full flex justify-start">
                      <TabsTrigger
                        value="tickets"
                        className="w-[50%] flex justify-start text-lg data-[state=active]:border-b-2 data-[state=active]:border-b-rprimary"
                      >
                        Tickets
                      </TabsTrigger>
                      <TabsTrigger
                        value="description"
                        className="w-[50%] flex justify-start text-lg data-[state=active]:border-b-2 data-[state=active]:border-rprimary"
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
                          <div className="w-full border-2 border-[#105858] p-2 h-12 rounded flex items-center justify-between text-lg mb-4 sm:mb-0 sm:w-[45%]">
                            TOTAL{" "}
                            <span className="text-white font-medium">
                              KES <span className="font-semibold">{totalTicketsPrice}</span>
                            </span>
                          </div>

                          <div className="h-12 w-full sm:w-[45%] border border-[#EAEAEA] rounded-[5px] p-[1px]">
                            <CustomButton className="w-full h-full" onClick={completeOrder}>
                              Complete Order
                            </CustomButton>
                          </div>
                        </div>
                      )}
                    </TabsContent>
                    <TabsContent value="description">
                      <div className="pt-4 min-h-[40vh] sm:min-h-none">
                        <p style={{ whiteSpace: "pre-wrap" }} className="px-4">
                          {selectedEvent?.description}
                        </p>
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
                {selectedTickets?.length !== 0 && (
                  <div className="w-full md:hidden">
                    <section
                      id="bottom-navigation"
                      className="fixed inset-x-0 bottom-0 z-10 bg-rbackground shadow h-20 flex flex-row flex-wrap items-center justify-between"
                    >
                      <div className="p-4 flex flex-row flex-wrap items-center justify-between w-full border-t-2 border-[#105858]">
                        <div className="w-[45%] p-2 h-10 rounded flex flex-wrap items-center justify-between text-lg ">
                          <span className="text-white font-medium text-xl">
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
              <div className="hidden w-1/2 px-20 pt-20 bg-[#001A1A] fixed top-0 right-0 overflow-auto h-full md:block">
                <div
                  className="w-full h-full bg-contain bg-no-repeat bg-center flex items-center justify-center"
                  style={{
                    backgroundImage: `url('${selectedEvent?.posterUrl}')`,
                  }}
                />
              </div>
            </main>
          )}
        </>
      )}
    </DefaultLayout>
  )
}
