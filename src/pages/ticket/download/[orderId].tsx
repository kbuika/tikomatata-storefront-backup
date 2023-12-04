"use client"
import TicketToDownload from "@/components/ticket-to-download"
import DefaultLayout from "@/layouts/default-layout"
import axios from "axios"
import { Loader2 } from "lucide-react"
import { useRouter } from "next/router"
import { useEffect, useState, useRef } from "react"
import Link from "next/link"
import { errorToast } from "@/lib/utils"
import * as Sentry from "@sentry/nextjs"
import TicketToDownloadTest from "@/components/ticket-download-test"

export default function TicketsOrder() {
  const [orderData, setOrderData] = useState<any>({})
  const [orderError, setOrderError] = useState<any>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const router = useRouter()
  const ticketRef = useRef<any>(null)
  const { orderId } = router?.query
  useEffect(() => {
    const fetchSelectedOrder = async () => {
      if (!orderId) return
      setLoading(true)
      const config = {
        method: "get",
        url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/ticket/download/${orderId}`,
      }
      try {
        const response = await axios.request(config)
        if (response.status === 200) {
          setOrderData(response.data.data)
        } else {
          setOrderError(response.data)
          errorToast("Could not fetch purchased ticket! If this persists, please contact support")
          Sentry.captureException(response.data)
          Sentry.captureMessage("View tickets error")
        }
      } catch (error) {
        setOrderError(error)
        errorToast("Could not fetch purchased ticket! If this persists, please contact support")
        Sentry.captureException(error)
        Sentry.captureMessage("View tickets error")
      } finally {
        setLoading(false)
      }
    }
    fetchSelectedOrder()
  }, [orderId])

  return (
    <DefaultLayout noFooter={true}>
      {loading ? (
        <main className="min-h-screen flex items-center justify-center">
          <Loader2 className="mx-auto animate-spin" size={64} color="#3C0862" />
        </main>
      ) : (
        <>
          {orderError ? (
            <main className="flex min-h-screen flex-col items-start justify-start">
              <p>Error. Could not fetch the selected order.</p>
            </main>
          ) : (
            <main className="flex sm:h-auto flex-col items-start justify-start">
              <div className="flex w-full flex-col items-center justify-between h-full sm:flex-row sm:items-start">
                <div className="w-full h-auto px-6 pb-6 pt-8 flex flex-col items-start justify-start sm:w-[80%] sm:px-16 sm:pb-16 sm:pt-8 sm:min-h-screen sm:h-auto">
                  <div className="mb-4 border-b-2 pb-2 w-full flex flex-row flex-wrap items-center justify-between">
                    <h3 className="text-lg font-bold">Your Tickets</h3>
                    <p className="text-sm font-light">
                      issue?{" "}
                      <Link href="/contact" className="underline">
                        Contact
                      </Link>
                    </p>
                  </div>
                  <div className="flex flex-row flex-wrap items-start justify-start">
                    {orderData?.tickets?.map((ticket: any) => (
                      <>
                        {process.env.NODE_ENV == "production" ? (
                          <TicketToDownload
                            key={ticket.ticketId}
                            ticket={ticket}
                            event={orderData}
                            ticketRef={ticketRef}
                          />
                        ) : (
                          <TicketToDownloadTest
                            key={ticket.ticketId}
                            ticket={ticket}
                            event={orderData}
                            ticketRef={ticketRef}
                          />
                        )}
                      </>
                    ))}
                  </div>
                </div>
                <div className="w-full p-8 border-t-2 sm:h-auto sm:min-h-screen sm:w-[20%] sm:border-l-2 sm:border-t-0 sm:p-12 flex flex-col items-center justify-start max-[1167px]:hidden">
                  <div className="w-full h-full ">
                    <h2>Hey human,</h2>
                    <p className="mt-2">
                      Woot woot! 🎉 We&apos;re jumping with joy to thank you for snagging those
                      awesome tickets through our platform! 🎟️✨ You&apos;re officially on board for
                      some epic fun, and we couldn&apos;t be more excited!
                    </p>
                    <p className="mt-4">
                      If you have any questions or concerns, please feel free to reach out to us at{" "}
                    </p>

                    <ul className="mt-2">
                      <li>
                        <a href="mailto:info@tikomatata.com">info@tikomatata.com</a>
                      </li>
                      <li>0740459940</li>
                    </ul>
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
