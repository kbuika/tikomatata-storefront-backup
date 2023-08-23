import Image from "next/image"
import Link from "next/link"
import testImg from "../../../images/Chapo.jpg"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../components/ui/tabs"
import TicketCard from "../../../components/ticket-card"
import CustomButton from "../../../components/ui/custom-button"
import { Calendar, Clock2, Map } from "lucide-react"
import DefaultLayout from "@/layouts/default-layout"
import { useEventsStore } from "@/stores/events-store"
import moment from "moment"

export default function Events() {
  const selectedEvent = useEventsStore((state) => state.selectedEvent)
  const startDateTime = `${selectedEvent?.startDate} ${selectedEvent?.startTime}`
  const endDateTime = `${selectedEvent?.endDate} ${selectedEvent?.endTime}`
  console.log(selectedEvent)
  return (
    <DefaultLayout>
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
              ></div>
            </div>
          </div>
          <div className="w-full p-8 border-t-2 sm:min-h-screen sm:w-[55%] sm:border-l-2 sm:border-t-0 sm:p-12">
            <div className="flex flex-col">
              <h2 className="text-2xl font-semibold text-testPrimary sm:text-4xl">
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
                    className="w-[50%] flex justify-start text-lg data-[state=active]:border-b-2 data-[state=active]:border-b-testPrimary"
                  >
                    Tickets
                  </TabsTrigger>
                  <TabsTrigger
                    value="description"
                    className="w-[50%] flex justify-start text-lg data-[state=active]:border-b-2 data-[state=active]:border-b-testPrimary"
                  >
                    Description
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="tickets">
                  <div className="flex flex-row flex-wrap items-center justify-between">
                    <TicketCard title="title" date="date" location="lo" />
                    <TicketCard title="title" date="date" location="lo" />
                    <TicketCard title="title" date="date" location="lo" />
                    <TicketCard title="title" date="date" location="lo" />
                  </div>
                  <div className="mt-8 flex flex-col sm:flex-row items-start justify-between w-full">
                    <div className="w-full bg-gray-100 p-2 h-10 rounded flex items-center justify-between text-lg mb-4 sm:mb-0 sm:w-[45%]">
                      TOTAL{" "}
                      <span className="text-stone-900 font-medium">
                        KES <span className="font-semibold">0</span>
                      </span>
                    </div>
                    <Link
                      href={{
                        pathname: "/checkout",
                        query: { event: "2020-national-championship", id: "8932udkds", total: "1" },
                      }}
                      className="w-full sm:w-[45%]"
                    >
                      <CustomButton className="w-full">Complete Order</CustomButton>
                    </Link>
                  </div>
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
    </DefaultLayout>
  )
}
