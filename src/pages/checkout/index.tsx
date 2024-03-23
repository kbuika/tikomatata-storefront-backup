"use client"
import { PurchaseTicketsByCardFn } from "@/api-calls"
import useCustomPaystackPayment from "@/hooks/useCustomPaystackPayment"
import DefaultLayout from "@/layouts/default-layout"
import { errorToast, generateReferenceCode, removePlusInPhone, warningToast } from "@/lib/utils"
import { usePayViaMpesa } from "@/services/mutations"
import { useEventsStore } from "@/stores/events-store"
import { useOrderStore } from "@/stores/order-store"
import { useTicketsStore } from "@/stores/tickets-store"
import { PaystackHookType } from "@/types"
import { TicketPurchaseType } from "@/types/ticket"
import { yupResolver } from "@hookform/resolvers/yup"
import * as Sentry from "@sentry/nextjs"
import moment from "moment"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { PaystackProps } from "react-paystack/dist/types"
import PhoneInputWithCountry from "react-phone-number-input/react-hook-form"
import "react-phone-number-input/style.css"
import * as yup from "yup"
import CustomButton from "../../components/ui/custom-button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs"
import defaultImage from "../../images/default.jpg"

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
  const { mutateAsync: payTicketViaMpesa, isPending: initializedMpesa } = usePayViaMpesa()
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
    control,
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

  const PayForTicketsViaMpesa: SubmitHandler<any> = async (data) => {
    const purchasedTickets = selectedTickets.map((ticket: TicketPurchaseType) => {
      return {
        ticketId: ticket.ticketId,
        quantity: ticket.totalQuantitySelected,
      }
    })
    const orderData = {
      tickets: purchasedTickets,
      email: data?.customerEmail,
      name: data?.customerName,
      phoneNumber: data?.customerPhone ? removePlusInPhone(data?.customerPhone) : "",
      reference: paymentReference,
    }

    payTicketViaMpesa(orderData)
      .then((res) => {
        if (res.status === 200) {
          router.push("/order/success")
        }else {
          errorToast(res.message)
        }
      })
      .catch((error) => {
        errorToast("Something went wrong while processing your order, please try again.")
        if (process.env.NODE_ENV === "production") {
          Sentry.captureException(error)
          Sentry.captureMessage("Initiate payment error!!")
        }
      })
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
    phone: customerPhone !== undefined ? (customerPhone as phone) : "",
    channels: ["mobile_money", "card"],
  } as PaystackProps

  return (
    <DefaultLayout noFooter>
      <main className="flex min-h-screen flex-col items-center justify-center w-full md:flex-row-reverse md:items-start">
        <div className="w-full px-8 py-2 flex flex-col items-start justify-start md:p-8 md:border-l-2 md:border-rborder md:min-h-[50em] md:w-[480px]">
          {/* <button className="md:hidden mb-2 -mt-2"><ArrowLeft color="white"/></button> */}
          <div className="h-[10em] w-full rounded-[4px] md:h-[208px] md:w-full">
            <div
              className="h-full w-full bg-cover bg-no-repeat bg-blend-multiply bg-center rounded-[4px]"
              style={{
                backgroundImage: `url('${selectedEvent?.posterUrl || defaultImage}')`,
              }}
            />
          </div>
          <div className="mt-4 items-start w-[20em] text-white">
            <h2 className="text-xl sm:text-2xl font-semibold">Order Summary</h2>
          </div>
          <div className="w-full text-white">
            <h2 className="text-lg md:text-xl font-semibold mt-4 text-rprimary">{selectedEvent?.name} Tickets</h2>
            {selectedTickets?.map((ticket: TicketPurchaseType) => (
              <div
                key={ticket?.ticketId}
                className="flex flex-row w-full items-center justify-between mt-2 mb-2 text-lg"
              >
                <p>
                  <span className="text-white text-base md:text-lg">{ticket?.totalQuantitySelected} x </span>
                  {ticket?.name}
                </p>
                <p className="text-base md:text-lg">KES {ticket?.price}</p>
              </div>
            ))}
            <hr className="my-4" />
            <div>
              <h2 className="text-lg sm:text-xl font-semibold">Discounts and Fees</h2>
              <div className="flex flex-row w-full items-center justify-between mt-2 mb-2 text-base sm:text-lg">
                <p>
                  <span className="text-white">Applied Discount</span>
                </p>
                <p>KES 0</p>
              </div>
            </div>
            <hr className="my-4" />
            <div className="flex flex-row w-full items-center justify-between mt-1 mb-2 text-lg md:text-xl">
              <p>TOTAL</p>
              <p>KES {totalTicketsPrice}</p>
            </div>
          </div>
        </div>
        <div className="w-full px-12 min-h-[50em] md:border-t-0 md:w-[50%] md:p-8 md:px-10 max-[600px]:px-6 text-white">
          <h2 className="text-xl font-semibold sm:text-2xl mt-6 md:mt-0">Where do we send your tickets?</h2>
          <p className="text-sm mt-2 text-gray-400">
            Tickets will be sent to the email provided below.
          </p>
          <div className="h-auto w-full flex flex-col items-center max-[600px]:mt-2">
            <div className="w-full mt-[4px] text-neutralDark sm:mt-[16px]">
              <div>
                <input
                  id="name"
                  type="text"
                  required
                  className="h-[50px] bg-transparent appearance-none rounded block w-full px-3 py-2 border border-[#EAEAEA] placeholder-gray-500 text-white focus:border-none focus:outline-none focus:ring-2 focus:ring-rprimary focus:z-10 sm:text-sm"
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
                  className="h-[50px] bg-transparent appearance-none rounded block w-full px-3 py-2 border border-[#EAEAEA] placeholder-gray-500 text-white focus:border-none focus:outline-none focus:ring-2 focus:ring-rprimary focus:z-10 sm:text-sm"
                  placeholder="Email Address"
                  {...register("customerEmail", { required: true })}
                ></input>
              </div>
              {errors.customerEmail && (
                <span className="text-criticalRed">{errors.customerEmail?.message}</span>
              )}
            </div>
            <div className="w-full mt-[16px] text-neutralDark">
              <div>
                <PhoneInputWithCountry
                  defaultCountry="KE"
                  name="customerPhone"
                  id="customerPhone"
                  control={control}
                  rules={{ required: true }}
                  placeholder="Enter phone number"
                  onChange={(e: string) => setValue("customerPhone", e)}
                  className="h-[50px] bg-transparent appearance-none rounded block w-full pl-5 border border-[#EAEAEA] placeholder-gray-500 text-white focus:border-none focus:outline-none focus:ring-2 focus:ring-rprimary focus:z-10 sm:text-sm"
                />
              </div>
              {errors.customerPhone && (
                <span className="text-criticalRed">{errors.customerPhone?.message}</span>
              )}
            </div>
          </div>
          <div className="mt-6">
            <h2 className="text-xl">Checkout</h2>
            <p className="mt-2 text-sm mb-4 text-gray-400">
              Please complete the purchase by providing payment details.
            </p>
            <Tabs defaultValue="mpesa" className="w-full">
              <TabsList className="bg-none w-full flex justify-start">
                <TabsTrigger
                  value="mpesa"
                  className="w-[50%] flex justify-start text-lg data-[state=active]:border-b-2 data-[state=active]:border-b-rprimary"
                >
                  Mpesa
                </TabsTrigger>
                <TabsTrigger
                  value="card"
                  className="w-[50%] flex justify-start text-lg data-[state=active]:border-b-2 data-[state=active]:border-b-rprimary"
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
                  <PaystackHook
                      onSuccess={handlePaystackSuccess}
                      onClose={handlePaystackClose}
                      config={{ ...componentProps, channels: ["mobile_money"] }}
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
                    <PaystackHook
                      onSuccess={handlePaystackSuccess}
                      onClose={handlePaystackClose}
                      config={{ ...componentProps, channels: ["card"] }}
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

const PaystackHook = ({
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
      const res = await PurchaseTicketsByCardFn(data)
      if (res.status === 200) {
        setOrderDetails({
          ...data,
          orderReference: res.data.reference,
          datePaid: `${moment().format("Do MMM YY")}`,
        })
        handlePayment(res.data.reference)
      } else {
        warningToast(res.message, 6000)
        if (process.env.NODE_ENV === "production") {
          Sentry.captureException(res.data)
          Sentry.captureMessage("Reserve ticket error")
        }
        setInitialized(false)
      }
    } catch (error) {
      setInitialized(false)
      errorToast("Something went wrong while processing your order, please try again.")
      if (process.env.NODE_ENV === "production") {
        Sentry.captureException(error)
        Sentry.captureMessage("Initiate payment error!!")
      }
    }
  }

  return (
    <div className="border border-[#EAEAEA] rounded-[5px]">
      <CustomButton
        type="submit"
        className="h-[50px] group relative w-full p-1 flex justify-center items-center py-2 px-4 border border-gray-600 text-base font-medium rounded text-black focus:outline-none focus:ring-2 focus:ring-offset-2"
        onClick={handleSubmit(PayForTickets)}
      >
        {initialized ? (
          `${checkoutProgressText ? checkoutProgressText : `Reserving your ticket`}...`
        ) : (
          <>Confirm and Pay KES {config.amount / 100} with {paymentMethod == "mobile_money" ? "Mpesa" : "Card"}</>
        )}
      </CustomButton>
    </div>
  )
}
