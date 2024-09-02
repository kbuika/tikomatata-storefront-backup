/* eslint-disable @next/next/no-img-element */
import { errorToast } from "@/lib/utils"
import * as Sentry from "@sentry/nextjs"
import { toPng } from "html-to-image"
import { DownloadIcon, Loader2 } from "lucide-react"
import moment from "moment"
import Image from "next/image"
import { useState } from "react"
import { AlertDialog, AlertDialogContent } from "./ui/alert-dialog"
import CustomButton from "./ui/custom-button"

export const TicketToDownload = ({ ticket, event, ticketRef }: any) => {
  const [open, setOpen] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const startDateTime = `${event?.eventStartDate} ${event?.eventStartTime}`

  const downloadTicket = () => {
    setTimeout(() => {
      toPng(ticketRef.current, { cacheBust: false, includeQueryParams: true })
        .then((dataUrl) => {
          const regex = /\/posters\/([a-zA-Z0-9-]+)\.png/;
          const match = ticket?.ticketUrl.match(regex);
          // extract qrcode id
          const extractedQRId = match && match[1];
          const link = document.createElement("a")
          link.download = `${ticket?.name || ticket?.ticketType}-${event?.eventName}-${extractedQRId}.png`
          link.href = dataUrl
          link.click()
        })
        .catch((err) => {
          errorToast(
            "An error occured while downloading your ticket. If the issue persists, please contact us.",
          )
          Sentry.captureException(err)
          Sentry.captureMessage("Download tickets error!!!")
        })
        .finally(() => {
          setOpen(false)
        })
    }, 2000)
  }

  return (
    <div className="flex flex-row w-auto">
      {loading ? (
        <>
          <Loader2 />
        </>
      ) : (
        <>
          <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogContent className="w-[400px]">
              <div
                className="ticket text-dark text-[14px] flex flex-col bg-white"
                id="ticket"
                ref={ticketRef}
              >
                <div className="top-div bg-[#f7edff] relative h-[250px] px-[50px]">
                  <div className="center-content top-logo w-full flex flex-col justify-center items-center mt-[1.5em]">
                    <img
                      src="https://dev.tikomatata.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ftikomatata.953bdde3.png&w=1200&q=75"
                      alt="tikomatata logo"
                      width="79"
                      height="17"
                    />
                  </div>
                  <div className="center-content w-full flex flex-col justify-center items-center">
                    <h1 className="text-[#150620] text-[20px] font-[600] mt-[1em] w-full text-center font-nunito">
                      Ticket to {event?.eventName}
                    </h1>
                  </div>
                  <div className="center-content w-full flex flex-col justify-center items-center">
                    {/* <p className="mt-[10px] w-full text-center text-[0.7em]">
                      Share the QR code below at the gate and you&apos;ll be good to go!
                    </p> */}
                  </div>
                  <div className="center-content qr-code-main-div w-full flex flex-col justify-center items-center">
                    <div className="center-content qr-code-div w-full flex flex-col justify-center items-center absolute top-[130px]">
                      <Image src={ticket?.ticketUrl} alt="" width={210} height={210} className="" />
                    </div>
                  </div>
                </div>

                <div className="details-div mt-[7em] px-[50px]">
                  <div>
                    <h4 className="font-[400] text-[0.9em]">Name</h4>
                    <p className="font-[700] mt-[4px] mb-[4px] text-[0.9em]">
                      {event?.recipientName}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-[400] text-[0.9em]">Phone Number</h4>
                    <p className="font-[700] mt-[4px] mb-[4px] text-[0.9em]">
                      {event?.recipientPhoneNumber}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-[400] text-[0.9em]">Ticket Name</h4>
                    <p className="font-[700] mt-[4px] mb-[4px] text-[0.9em]">
                      {ticket?.name || ticket?.ticketType}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-[400] text-[0.9em]">Location</h4>
                    <p className="font-[700] mt-[4px] mb-[4px] text-[0.9em]">{event?.location}</p>
                  </div>
                  <div className="flex flex-row items-center justify-between">
                    <div className="w-[30%]">
                      <h4 className="font-[400] text-[0.9em]">Date</h4>
                      <p className="font-[700] mt-[4px] mb-[4px] text-[0.9em]">
                        {moment(startDateTime).format("ddd Do MMM")} 
                      </p>
                    </div>
                    <div>
                      <h4 className="font-[400] text-[0.9em]">Gates Open</h4>
                      <p className="font-[700] mt-[4px] mb-[4px] text-[0.9em]">
                        {moment(startDateTime).format("HH:mm")}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-4 h-[8vh] bg-[#f7edff] flex items-center justify-center">
                  <img
                    src="https://dev.tikomatata.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ftikomatata.953bdde3.png&w=1200&q=75"
                    alt="tikomatata logo"
                    width="79"
                    height="17"
                  />
                </div>
              </div>
            </AlertDialogContent>
            <div className="w-full">
              <div className="h-auto w-full m-2 flex flex-row items-start justify-center">
                <a className="delay-50 duration-100 bg-black p-5 rounded-lg w-60 group" href="">
                  <Image
                    src={event?.posterUrl}
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
                  setOpen(true)
                  downloadTicket()
                }}
                className="flex flex-row items-center justify-center mt-2 ml-4 cursor-pointer"
              >
                <DownloadIcon className="mr-2" size={15} />
                Download
              </CustomButton>
            </div>
          </AlertDialog>
        </>
      )}
    </div>
  )
}

export default TicketToDownload
