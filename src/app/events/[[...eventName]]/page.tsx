"use client"
import Image from "next/image"
import Link from "next/link"
import testImg from "../../../images/Chapo.jpg"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../components/ui/tabs"
import TicketCard from "../../../components/TicketCard"
import CustomButton from "../../../components/ui/CustomButton"
import { Calendar, Clock2, Map } from "lucide-react"

export default function Events() {
  return (
    <main className="flex min-h-screen flex-col items-start justify-start">
      <div className="flex w-full flex-row items-start justify-between h-full">
        <div className="w-[45%] min-h-screen px-16 pb-16 pt-8 flex items-start justify-center">
          <div className="h-[40em] w-[35em]">
            <Image src={testImg} alt="event poster" className="h-[100%] w-[100%] object-cover" />
          </div>
        </div>
        <div className="w-[55%] p-12 border-l-2 min-h-screen">
          <div className="flex flex-col">
            <h2 className="text-4xl font-semibold text-testPrimary">Folk Fusion: The Glow Up</h2>
            <p className="text-lg mt-4 flex flex-row items-center text-neutralDark">
              <Calendar size={18} className="mr-2" color="grey" />
              Saturday 6th July
            </p>
            <p className="text-lg mt-2 flex flex-row items-center text-neutralDark">
              <Clock2 size={18} className="mr-2" color="grey" /> 2:00 PM - 11:00 PM
            </p>
            <p className="text-lg mt-2 flex flex-row items-center text-neutralDark">
              <Map size={18} className="mr-2" color="grey" /> Anzana Gardens
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
                </div>
                <div className="mt-8 flex flex-row items-start justify-between w-full">
                  <div className="w-[45%] bg-gray-300 p-2 h-10 rounded flex items-center justify-between text-lg">
                    TOTAL{" "}
                    <span className="text-stone-900 font-medium">
                      KES <span className="font-semibold">1000</span>
                    </span>
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
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis porttitor turpis
                    hendrerit, aliquet orci porttitor, eleifend erat. Vestibulum ut leo a nisi
                    condimentum tempor ut sit amet nisl. Praesent lacinia elit sit amet sodales
                    venenatis. Aenean gravida lectus id tortor scelerisque, vel vehicula massa
                    auctor. Vestibulum a ex vitae purus hendrerit facilisis eget in dolor. Fusce
                    interdum augue at purus semper dignissim. Morbi suscipit cursus ultrices. Etiam
                    ex sapien, pulvinar consectetur scelerisque eu, ultrices at sem. Integer
                    venenatis justo eu feugiat blandit.
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </main>
  )
}
