import Image from "next/image"
import Link from "next/link"
import testImg from "../../images/Chapo.jpg"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs"
import TicketCard from "../../components/TicketCard"
import CustomButton from "../../components/ui/CustomButton"
import { Calendar, Clock2, Map } from "lucide-react"

export default function Events() {
  return (
    <main className="flex min-h-screen flex-col items-start justify-start">
      <div className="flex w-full flex-row items-start justify-between h-full">
        <div className="w-[55%] p-12">
          <div className="flex flex-col">
            <h2 className="text-4xl font-semibold">Folk Fusion: The Glow Up</h2>
            <p className="text-lg mt-4 flex flex-row items-center">
              <Calendar size={18} className="mr-2" />
              Saturday 6th July
            </p>
            <p className="text-lg mt-2 flex flex-row items-center">
              <Clock2 size={18} className="mr-2" /> 2:00 PM - 11:00 PM
            </p>
            <p className="text-lg mt-2 flex flex-row items-center">
              <Map size={18} className="mr-2" /> Anzana Gardens
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
                  <TicketCard title="title" date="date" location="lo" />
                  <TicketCard title="title" date="date" location="lo" />
                </div>
                <div className="mt-8 flex flex-row items-start justify-between w-full">
                  <div className="w-[45%] bg-gray-300 p-2 rounded flex items-center justify-center text-base">
                    TOTAL <span className="ml-8 text-stone-900">1000</span>
                  </div>
                  <Link
                    href={{
                      pathname: "/checkout",
                      query: { event: "2020-national-championship", id: "8932udkds", total: "1" },
                    }}
                    className="w-[45%]"
                  >
                    <CustomButton className="w-full">Complete Order</CustomButton>
                  </Link>
                </div>
              </TabsContent>
              <TabsContent value="description">
                <div className="pt-4">
                  <p>
                    Description Description Description Description Description Description
                    Description Description Description Description Description Description
                    Description Description Description Description Description Description
                    Description Description Description Description Description Description{" "}
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
        <div className="w-[45%] min-h-screen px-16 pb-16 pt-8">
          <div className="h-[40em] w-[35em]">
            <Image src={testImg} alt="event poster" className="h-[100%] w-[100%] object-cover" />
          </div>
        </div>
      </div>
    </main>
  )
}
