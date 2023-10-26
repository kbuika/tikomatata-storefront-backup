import Link from "next/link"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../components/ui/tabs"
import TicketCard from "../../../components/ticket-card"
import CustomButton from "../../../components/ui/custom-button"
import { Calendar, Clock2, Loader2, Map } from "lucide-react"
import DefaultLayout from "@/layouts/default-layout"
import moment from "moment"
import { useEffect, useState } from "react"
import axios from "axios"
import { TicketDataType, TicketDataTypeTest, TicketPurchaseType } from "@/types/ticket"
import { useRouter } from "next/router"
import { useTicketsStore } from "@/stores/tickets-store"
import { errorToast } from "@/lib/utils"
import { API_BASE_URL } from "@/constants"
import Image from "next/image"

export default function Events() {
  const [totalPrice, setTotalPrice] = useState<number>(0)
  const [selectedEvent, setSelectedEvent] = useState<any>(null)
  const [eventError, setEventError] = useState<any>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const startDateTime = `${selectedEvent?.startDate} ${selectedEvent?.startTime}`
  const endDateTime = `${selectedEvent?.endDate} ${selectedEvent?.endTime}`
  const selectedTickets = useTicketsStore((state) => state.selectedTickets)
  const totalTicketsPrice = useTicketsStore((state) => state.totalTicketsPrice)
  const router = useRouter()
  useEffect(() => {
    const fetchSelectedEventFn = async () => {
      setLoading(true)
      const config = {
        method: "get",
        url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/ticket/event?id=${router?.query?.id}`,
      }
  
      try {
        const response = await axios.request(config)
        if (response.status === 200) {
          setSelectedEvent(response.data.data)
        } else {
          setEventError(response.data.message)
        }
      } catch (error) {
        setEventError(error)
      } finally {
        setLoading(false)
      }
    }
    fetchSelectedEventFn()
    // return () => {}
  }, [router?.query?.id])

  const completeOrder = () => {
    if(selectedTickets.length === 0) {
      errorToast("Please select at least one ticket")
      return;
    }
    router.push("/checkout")
  }
  
  return (
    <DefaultLayout>
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
            <main className="flex min-h-screen flex-col items-start justify-start">
              <div className="flex w-full flex-col items-center justify-between h-full sm:flex-row sm:items-start">
                <div className="w-full h-[50vh] px-6 pb-6 pt-8 flex items-start justify-center sm:w-[45%] sm:px-16 sm:pb-16 sm:pt-8 sm:min-h-screen">
                  <div className="h-[22em] w-[25em] sm:h-[40em] sm:w-[35em]">
                  <div
                      className="w-full h-[100%] bg-top bg-cover rounded"
                      style={{
                        backgroundImage: `url(${selectedEvent?.posterUrl})`,
                        border: "0.25rem",
                      }}
                    >
                  </div>
                  </div>
                </div>
                <div className="w-full p-8 border-t-2 sm:min-h-screen sm:w-[55%] sm:border-l-2 sm:border-t-0 sm:p-12">
                  <div className="flex flex-col">
                    <h2 className="text-2xl font-semibold text-mainPrimary sm:text-4xl">
                      {selectedEvent?.name}
                    </h2>
                    <p className="text-lg mt-4 flex flex-row items-center text-neutralDark">
                      <Calendar size={18} className="mr-2" color="grey" />
                      {moment(selectedEvent?.startDate).format("dddd Do MMMM")}{" "}
                    </p>
                    <p className="text-lg mt-2 flex flex-row items-center text-neutralDark">
                      <Clock2 size={18} className="mr-2" color="grey" />{" "}
                      {moment(startDateTime).format("LT")} - {moment(endDateTime).format("LT")}
                    </p>
                    <p className="text-lg mt-2 flex flex-row items-center text-neutralDark">
                      <Map size={18} className="mr-2" color="grey" /> {selectedEvent?.location}
                    </p>
                  </div>
                  <div className="mt-6">
                    <Tabs defaultValue="tickets" className="w-full">
                      <TabsList className="bg-none w-full flex justify-start">
                        <TabsTrigger
                          value="tickets"
                          className="w-[50%] flex justify-start text-lg data-[state=active]:border-b-2 data-[state=active]:border-b-mainPrimary"
                        >
                          Tickets
                        </TabsTrigger>
                        <TabsTrigger
                          value="description"
                          className="w-[50%] flex justify-start text-lg data-[state=active]:border-b-2 data-[state=active]:border-b-mainPrimary"
                        >
                          Description
                        </TabsTrigger>
                      </TabsList>
                      <TabsContent value="tickets">
                        <div className="flex flex-row flex-wrap items-center justify-between">
                          {selectedEvent?.tickets?.length === 0 ? (
                            <p className="mt-2">No tickets available for this event.</p>
                          ) : (<>
                          {selectedEvent?.tickets?.map((ticket: TicketDataTypeTest) => (
                            <TicketCard key={ticket?.ticketId} ticket={ticket} />
                          ))}
                          </>)}
                        </div>
                        {selectedEvent?.tickets?.length !== 0 && (
                          <div className="mt-8 flex flex-col sm:flex-row items-start justify-between w-full">
                          <div className="w-full bg-gray-100 p-2 h-10 rounded flex items-center justify-between text-lg mb-4 sm:mb-0 sm:w-[45%]">
                            TOTAL{" "}
                            <span className="text-stone-900 font-medium">
                              KES <span className="font-semibold">{totalTicketsPrice}</span>
                            </span>
                          </div>
                          
                            <CustomButton className="w-full sm:w-[45%]" onClick={completeOrder}>Complete Order</CustomButton>
                        </div>
                        )}
                      </TabsContent>
                      <TabsContent value="description">
                        <div className="pt-4">
                          <p>{selectedEvent?.description}</p>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </div>
                </div>
              </div>
            </main>
          )}
        </>
      )}
    </DefaultLayout>
  )
}
