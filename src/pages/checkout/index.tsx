"use client"
import { PurchaseTicketsFn } from "@/api-calls"
import DefaultLayout from "@/layouts/default-layout"
import { errorToast, generateReferenceCode, warningToast } from "@/lib/utils"
import { useEventsStore } from "@/stores/events-store"
import { useOrderStore } from "@/stores/order-store"
import { useTicketsStore } from "@/stores/tickets-store"
import { PaystackHookType } from "@/types"
import { TicketPurchaseType } from "@/types/ticket"
import { yupResolver } from "@hookform/resolvers/yup"
import moment from "moment"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import * as yup from "yup"
import CustomButton from "../../components/ui/custom-button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs"
import defaultImage from "../../images/default.jpg"
import KenyaIcon from "../../images/kenya.png"
import { PaystackProps } from "react-paystack/dist/types"
import useCustomPaystackPayment from "@/hooks/useCustomPaystackPayment"
import * as Sentry from "@sentry/nextjs"

const schema = yup.object({
  customerName: yup.string().required("Please enter your name"),
  customerEmail: yup
    .string()
    .email("Please enter a valid email address")
    .matches(
      /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/,
      "Please enter a valid email address",
    )
    .required("Please enter your email address"),
  customerPhone: yup.string().notRequired(),
})

type Currency = "KES"
type phone = number | string

export default function Checkout() {
  const [paymentReference, setPaymentReference] = useState<string>(generateReferenceCode())
  const selectedTickets = useTicketsStore((state) => state.selectedTickets)
  const totalTicketsPrice = useTicketsStore((state) => state.totalTicketsPrice)
  const selectedEvent = useEventsStore((state) => state.selectedEvent)
  const [initialized, setInitialized] = useState<boolean>(false)
  const startDateTime = `${selectedEvent?.startDate} ${selectedEvent?.startTime}`
  const router = useRouter()

  useEffect(() => {
    const paymentRef = generateReferenceCode()
    setPaymentReference(paymentRef)
  }, [])

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    resolver: yupResolver(schema),
  })
  const customerPhone = watch("customerPhone")
  const customerEmail = watch("customerEmail")

  const validateForm = () => {
    if (customerEmail === "" || customerPhone === "") {
      errorToast("Please fill in your name, email and phone number")
      return false
    }
    return true
  }

  const handlePaystackSuccess = (reference: any) => {
    setInitialized(false)
    if (reference.status === "success") {
      router.push("/order/success")
    }
  }

  const handlePaystackClose = () => {
    setInitialized(false)
    warningToast("Payment not completed! Please try again.")
  }

  const componentProps = {
    publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY,
    reference: undefined,
    text: `Confirm and Pay KES ${totalTicketsPrice}`,
    onSuccess: (reference: any) => handlePaystackSuccess(reference),
    onClose: handlePaystackClose,
    currency: "KES" as Currency,
    amount: totalTicketsPrice * 100,
    email: customerEmail,
    label: `Confirm and Pay KES ${totalTicketsPrice}`,
    phone: customerPhone !== undefined ? `0${customerPhone}` as phone : "",
    channels: ["mobile_money", "card"]
  } as PaystackProps

  return (
    <DefaultLayout noFooter>
      <main className="flex min-h-screen flex-col items-center justify-center w-full sm:flex-row sm:items-start">
        <div className="w-[40%] p-8 flex flex-col items-center justify-start sm:border-l-2 sm:min-h-[50em]">
          <div className="h-[10em] w-[20em]">
            <Image
              src={selectedEvent?.posterUrl ?? defaultImage}
              alt=""
              width={100}
              height={100}
              className="w-full h-full object-cover rounded-xl"
            />
          </div>
          <div className="mt-4 items-start w-[20em]">
            <h2 className="text-xl font-semibold">{selectedEvent?.name}</h2>
            <p className="text-base mt-2 flex flex-row items-center">
              {moment(selectedEvent?.startDate).format("ddd Do MMMM")} at{" "}
              {moment(startDateTime).format("LT")}
            </p>
            <p className="text-base mt-2 flex flex-row items-center">{selectedEvent?.location}</p>
          </div>
          <div className="w-[20em]">
            <h2 className="text-xl font-semibold mt-6">Tickets</h2>
            {selectedTickets?.map((ticket: TicketPurchaseType) => (
              <div
                key={ticket?.ticketId}
                className="flex flex-row w-full items-center justify-between mt-2 mb-2"
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
              <p>TOTAL</p>
              <p>KES {totalTicketsPrice}</p>
            </div>
          </div>
        </div>
        <div className="w-full px-12 min-h-[50em] border-t-2 sm:border-t-0 sm:border-l-2 sm:w-[50%] sm:p-8 sm:pl-36 sm:px-0 max-[600px]:px-6">
          <h2 className="text-lg font-medium mt-6 sm:mt-0">Where do we send your tickets?</h2>
          <div className="h-auto w-full flex flex-col items-center max-[600px]:mt-2">
            <div className="w-full mt-[4px] text-neutralDark sm:mt-[16px]">
              <div>
                <input
                  id="name"
                  type="text"
                  required
                  className="h-[50px] bg-white appearance-none rounded block w-full px-3 py-2 border border-gray-600 placeholder-gray-500 text-gray-900 focus:border-none focus:outline-none focus:ring-2 focus:z-10 sm:text-sm"
                  placeholder="Name"
                  {...register("customerName", { required: true })}
                ></input>
              </div>
              {errors.customerName && (
                <span className="text-criticalRed">{errors.customerName?.message}</span>
              )}
            </div>
            <div className="w-full mt-[16px] text-neutralDark">
              <div>
                <input
                  id="email"
                  type="email"
                  required
                  className="h-[50px] bg-white appearance-none rounded block w-full px-3 py-2 border border-gray-600 placeholder-gray-500 text-gray-900 focus:border-none focus:outline-none focus:ring-2 focus:z-10 sm:text-sm"
                  placeholder="Email Address"
                  {...register("customerEmail", { required: true })}
                ></input>
              </div>
              {errors.customerEmail && (
                <span className="text-criticalRed">{errors.customerEmail?.message}</span>
              )}
            </div>
            <div className="w-full mt-[16px]">
              <div>
                <div className="flex items-center">
                  <span className="w-[35%] text-neutralDark lg:w-1/4 bg-white h-[50px] flex items-center justify-center rounded-l border border-hidden-left border-gray-600">
                    <Image src={KenyaIcon} alt="Kenyan Flag" className="mr-2" />
                    +254
                  </span>
                  <input
                    id="customerPhone"
                    type="text"
                    required
                    className="w-3/4 h-[50px] bg-white appearance-none rounded-r block w-full px-3 py-2 border border-r-none border-gray-600 placeholder-gray-500 text-gray-900 focus:border-none focus:outline-none focus:ring-2 focus:z-10 sm:text-sm"
                    placeholder="7XXXXXXXX"
                    autoComplete="nope"
                    // value={customerPhone}
                    onChange={(e) => setValue("customerPhone", e.target.value)}
                  ></input>
                </div>
                {errors.customerPhone && (
                  <span className="text-criticalRed">{errors.customerPhone?.message}</span>
                )}
              </div>
            </div>
          </div>
          <div className="mt-6">
            <h2 className="mb-4 text-lg">Payment Details</h2>
            <Tabs defaultValue="mpesa" className="w-full">
              <TabsList className="bg-none w-full flex justify-start">
                <TabsTrigger
                  value="mpesa"
                  className="w-[50%] flex justify-start text-lg data-[state=active]:border-b-2 data-[state=active]:border-b-mainPrimary"
                >
                  Mpesa
                </TabsTrigger>
                <TabsTrigger
                  value="card"
                  className="w-[50%] flex justify-start text-lg data-[state=active]:border-b-2 data-[state=active]:border-b-mainPrimary"
                >
                  Card
                </TabsTrigger>
              </TabsList>
              <TabsContent value="mpesa">
                <div className="h-auto w-full flex flex-col items-center">
                  <p className="mt-[20px] text-gray-500">
                    Please ensure you have your phone near you. You will receive a prompt on the
                    phone number you have provided above.
                  </p>
                  <div className="w-full mt-[20px]">
                    <PaystackHookExample
                      onSuccess={handlePaystackSuccess}
                      onClose={handlePaystackClose}
                      config={{...componentProps, channels: ["mobile_money"]}}
                      validateForm={validateForm}
                      paymentMethod="mobile_money"
                      paymentReference={paymentReference}
                      handleSubmit={handleSubmit}
                      initialized={initialized}
                      setInitialized={setInitialized}
                    />
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="card">
                <div className="h-auto w-full flex flex-col items-center">
                  <p className="mt-[20px] text-gray-500">
                    To proceed click the &apos;Confirm and Pay&apos; button. This will prompt a
                    secure card payment process to begin, ensuring your transaction is processed
                    smoothly.
                  </p>
                  <div className="w-full mt-[20px]">
                    <PaystackHookExample
                      onSuccess={handlePaystackSuccess}
                      onClose={handlePaystackClose}
                      config={{...componentProps, channels: ["card"]}}
                      validateForm={validateForm}
                      paymentMethod="card"
                      paymentReference={paymentReference}
                      handleSubmit={handleSubmit}
                      initialized={initialized}
                      setInitialized={setInitialized}
                    />
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </DefaultLayout>
  )
}

const PaystackHookExample = ({
  onSuccess,
  onClose,
  config,
  validateForm,
  paymentMethod,
  paymentReference,
  handleSubmit,
  initialized,
  setInitialized,
}: PaystackHookType) => {
  const [checkoutProgressText, setCheckoutProgressText] = useState<string>("")
  const selectedTickets = useTicketsStore((state) => state.selectedTickets)
  const totalTicketsPrice = useTicketsStore((state) => state.totalTicketsPrice)
  const selectedEvent = useEventsStore((state) => state.selectedEvent)
  const setOrderDetails = useOrderStore((state) => state.setOrderDetails)
  const { handlePayment } = useCustomPaystackPayment({
    config,
    onSuccess,
    onClose,
    setCheckoutProgressText,
  })

  const PayForTickets: SubmitHandler<any> = async (data) => {
    setInitialized(true)
    data = {
      ...data,
      eventId: selectedEvent?.eventId,
      tickets: selectedTickets,
      totalPrice: totalTicketsPrice,
      orderReference: paymentReference,
    }
    try {
      const res = await PurchaseTicketsFn(data)
      if (res.status === 200) {
        setOrderDetails({
          ...data,
          orderReference: res.data.reference,
          datePaid: `${moment().format("Do MMM YY")}`,
        })
        handlePayment(res.data.reference)
      } else {
        warningToast(res.message, 6000)
        Sentry.captureException(res.data)
        Sentry.captureMessage("Reserve ticket error")
        setInitialized(false)
      }
    } catch (error) {
      setInitialized(false)
      errorToast("Something went wrong while processing your order, please try again.")
      Sentry.captureException(error)
      Sentry.captureMessage("Initiate payment error!!")
    }
  }

  return (
    <div>
      <CustomButton
        type="submit"
        className="h-[50px] group relative w-full flex justify-center items-center py-2 px-4 border border-gray-600 text-base font-medium rounded text-black focus:outline-none focus:ring-2 focus:ring-offset-2"
        onClick={handleSubmit(PayForTickets)}
      >
        {initialized ? (
          `${checkoutProgressText ? checkoutProgressText : `Reserving your ticket`}...`
        ) : (
          <>Confirm and Pay KES {config.amount / 100}</>
        )}
      </CustomButton>
    </div>
  )
}
