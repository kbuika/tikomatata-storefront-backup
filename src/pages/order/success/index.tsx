"use client"
import Image from "next/image"
import CustomButton from "../../../components/ui/custom-button"
import defaultImage from "../../../images/default.jpg"
import tickImage from "../../../images/success-tick.svg"
import DefaultLayout from "@/layouts/default-layout"
import { useTicketsStore } from "@/stores/tickets-store"
import { TicketPurchaseType } from "@/types/ticket"
import { useEventsStore } from "@/stores/events-store"
import moment from "moment"
import Link from "next/link"
import { useOrderStore } from "@/stores/order-store"
import { maskEmail } from "@/lib/utils"
import { useRouter } from "next/router"
import { ArrowLeft } from "lucide-react"

export default function SuccessOrder() {
  const selectedTickets = useTicketsStore((state) => state.selectedTickets)
  const totalTicketsPrice = useTicketsStore((state) => state.totalTicketsPrice)
  const orderDetails = useOrderStore((state) => state.orderDetails)
  const selectedEvent = useEventsStore((state) => state.selectedEvent)
  const startDateTime = `${selectedEvent?.startDate} ${selectedEvent?.startTime}`

  const router = useRouter()

  return (
    <DefaultLayout>
      <main className="flex flex-col w-full min-h-screen bg-rbackground pt-[50px] text-white md:flex-row">
        {/* <div
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

        <div className="-mt-20 h-[149px] w-[100vw] inset-0 bg-gradient-to-t from-rbackground from-85% blur-lg md:hidden" /> */}

        <div className="relative flex items-center justify-center p-8 w-full min-h-screen md:w-1/2 md:mt-0 md:flex-col">
          {/* <div className="flex items-start jusify-center w-full px-12 min-h-[28em] md:min-h-[100vh] md:border-b-0 md:border-l-2 md:w-[50%] md:p-8 md:pl-36 md:px-0 max-[600px]:px-6"> */}
            <div className="h-auto w-full flex flex-col items-center justify-center max-[600px]:mt-2 p-4 ">
              <div className="h-[120px] w-[120px]">
                <Image
                  src={tickImage}
                  alt=""
                  width={100}
                  height={100}
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>
              <p className="mt-[40px] text-rprimary text-2xl font-bold leading-8 text-center">
                Ticket Payment Successful
              </p>
              <p className="mt-[16px] text-white text-[17px] leading-8 tricking-wide">
                Your payment has been processed!
              </p>
              <p className="mt-[24px] text-white text-[17px] leading-8 tricking-wide text-center">
                Your ticket for {selectedEvent?.name} has been sent to your email
                <span className="text-[16px] font-bold"> {orderDetails?.customerEmail}</span>!
              </p>
              <p className="mt-[32px] text-white text-[16px] font-bold leading-8 tricking-wide">
                Transaction ID: {orderDetails?.orderReference}
              </p>
              <Link href="/" className="flex">
                <CustomButton className="mt-[40px] px-[100px] py-[14px] sm:px-[120px]">
                  Go Back Home
                </CustomButton>
              </Link>
            </div>
          </div>
        {/* </div> */}
        <div className="hidden w-1/2 px-20 pt-20 bg-black fixed top-0 right-0 overflow-auto h-full md:block">
          <div
            className="w-full h-full bg-contain bg-no-repeat bg-center flex items-center justify-center"
            style={{
              backgroundImage: `url('${selectedEvent?.posterUrl}')`,
            }}
          />
        </div>
      </main>
    </DefaultLayout>
  )
}
