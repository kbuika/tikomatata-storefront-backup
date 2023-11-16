/* eslint-disable @next/next/no-img-element */
import { errorToast, successToast } from "@/lib/utils"
import { DownloadIcon, Loader2 } from "lucide-react"
import Image from "next/image"
import { useState } from "react"
import CustomButton from "./ui/custom-button"

export const TicketToDownload = ({ ticket, event }: any) => {
  const [downloading, setDownloading] = useState<boolean>(false)

  const downloadticketFromAPI = async () => {
    setDownloading(true)
    try {
      const request = new Request("https://elec-shop.onrender.com/api/v1/sales/test", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ticket: ticket,
          event: event,
        }),
      })

      const response = await fetch(request, {cache: "no-cache"})
      console.log(response, "response from download ticket")

      if (response.status === 200) {
        const blob = await response.blob()
        const url = window.URL.createObjectURL(blob)
        const link = document.createElement("a")
        link.href = url
        link.download = `${ticket?.name || ticket?.ticketType}-${event?.eventName}.png`
        link.click()
        window.URL.revokeObjectURL(url)
        successToast("Ticket downloaded successfully")
      } else {
        errorToast(
          "An error occured while downloading your ticket. If the issue persists, please contact us.",
        )
      }
    } catch (error) {
      errorToast(
        "An error occured while downloading your ticket. If the issue persists, please contact us.",
      )
    } finally {
      setDownloading(false)
    }
  }

  return (
    <div className="flex flex-row w-auto">
      <div className="w-full">
        <div className="h-auto w-full m-2 flex flex-row items-start justify-center">
          <a className="delay-50 duration-100 bg-successBg p-5 rounded-lg w-60 group" href="">
            <Image
              src={ticket?.ticketUrl}
              className="w-full rounded shadow"
              alt=""
              width={250}
              height={250}
            />

            <h3 className="text-dark-200 font-bold mt-5">
              {ticket?.name || ticket?.ticketType}-{event?.eventName}
            </h3>
          </a>
        </div>
        <CustomButton
          onClick={() => {
            downloadticketFromAPI()
          }}
          className="flex flex-row items-center justify-center mt-2 ml-4 cursor-pointer"
        >
          {downloading ? (
            <Loader2 className="animate-spin mr-2" size={15} />
          ) : (
            <DownloadIcon className="mr-2" size={15} />
          )}
          {downloading ? "Downloading..." : "Download"}
        </CustomButton>
      </div>
    </div>
  )
}

export default TicketToDownload
