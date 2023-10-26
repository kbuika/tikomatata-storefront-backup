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

export default function SuccessOrder() {
  const selectedTickets = useTicketsStore((state) => state.selectedTickets)
  const totalTicketsPrice = useTicketsStore((state) => state.totalTicketsPrice)
  const orderDetails = useOrderStore((state) => state.orderDetails)
  const selectedEvent = useEventsStore((state) => state.selectedEvent)
  const startDateTime = `${selectedEvent?.startDate} ${selectedEvent?.startTime}`

  return (
    <DefaultLayout>
      <main className="pt-[44px] sm:pt-0 flex min-h-screen flex-col flex-col-reverse items-center justify-center w-full sm:flex-row sm:items-start">
        <div className="w-[40%] p-8 flex flex-col items-center justify-start sm:border-l-2 sm:min-h-[50em]">
          <div className="h-[10em] w-[20em] hidden sm:flex">
            <Image
              src={selectedEvent?.posterUrl ?? defaultImage}
              alt=""
              width={100}
              height={100}
              className="w-full h-full object-cover rounded-xl"
            />
          </div>
          <div className="mt-4 items-start w-[20em] hidden sm:flex">
            <h2 className="text-xl font-semibold">{selectedEvent?.name}</h2>
            <p className="text-base mt-2 flex flex-row items-center">
              {moment(selectedEvent?.startDate).format("ddd Do MMMM")} at{" "}
              {moment(startDateTime).format("LT")}
            </p>
            <p className="text-base mt-2 flex flex-row items-center">{selectedEvent?.location}</p>
          </div>
          <div className="w-[20em]">
            <h2 className="text-xl font-semibold mt-2">Your Order</h2>
            {selectedTickets?.map((ticket: TicketPurchaseType) => (
              <div
                key={ticket?.ticketId}
                className="flex flex-row w-full items-center justify-between mt-6 mb-2"
              >
                <p>
                  <span className="text-gray-500">{ticket?.totalQuantitySelected} x </span>
                  {ticket?.name}
                </p>
                <p>KES {ticket?.price}</p>
              </div>
            ))}

            <hr className="my-4" />
            <div className="flex flex-row w-full items-center justify-between mt-1 mb-2">
              <p>Total Amount Paid</p>
              <p className="font-bold text-dark">KES {totalTicketsPrice}</p>
            </div>
            <hr className="my-4" />
            <div className="flex flex-row w-full items-center justify-between mt-1 mb-2">
              <p>Date Paid</p>
              <p className="font-bold text-dark">{orderDetails?.datePaid}</p>
            </div>
            <Link href="/" className="block sm:hidden">
              <CustomButton className="mt-[40px] px-[100px] py-[14px] sm:px-[120px]">Go Back Home</CustomButton>
            </Link>
          </div>
        </div>
        <div className="flex items-start jusify-center w-full px-12 min-h-[28em] sm:min-h-[100vh] border-b-2 sm:border-b-0 sm:border-l-2 sm:w-[50%] sm:p-8 sm:pl-36 sm:px-0 max-[600px]:px-6">
          <div className="h-auto w-full flex flex-col items-center max-[600px]:mt-2">
            <div className="h-[120px] w-[120px]">
              <Image
                src={tickImage}
                alt=""
                width={100}
                height={100}
                className="w-full h-full object-cover rounded-xl"
              />
            </div>
            <p className="mt-[40px] text-mainPrimary text-[21px] font-bold leading-8">
              Ticket Payment Successful
            </p>
            <p className="mt-[16px] text-dark text-[17px] leading-8 tricking-wide">
              Your payment has been processed!
            </p>
            <p className="mt-[24px] text-dark text-[17px] leading-8 tricking-wide text-center">
              Your ticket has been sent to your email
              <span className="text-[16px] font-bold">{" "}{orderDetails?.customerEmail}</span>!
            </p>
            <p className="mt-[32px] text-dark text-[16px] font-bold leading-8 tricking-wide">
              Transaction ID: {orderDetails?.orderReference}
            </p>
            <Link href="/" className="hidden sm:flex">
              <CustomButton className="mt-[40px] px-[100px] py-[14px] sm:px-[120px]">Go Back Home</CustomButton>
            </Link>
          </div>
        </div>
      </main>
    </DefaultLayout>
  )
}
