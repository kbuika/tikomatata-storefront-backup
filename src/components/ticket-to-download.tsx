/* eslint-disable @next/next/no-img-element */
import { errorToast, successToast } from "@/lib/utils"
import { toPng } from "html-to-image"
import { DownloadIcon, Loader2 } from "lucide-react"
import moment from "moment"
import Image from "next/image"
import { useEffect, useLayoutEffect, useRef, useState } from "react"
import { AlertDialog, AlertDialogContent, AlertDialogTrigger } from "./ui/alert-dialog"
import { Avatar, AvatarImage } from "./ui/avatar"
import CustomButton from "./ui/custom-button"

export const TicketToDownload = ({ ticket, event, ticketRef }: any) => {
  const [ticketImageUrl, setTicketImageUrl] = useState<string>("")
  const [open, setOpen] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  //   const myTicket = useRef<any>(null)
  const startDateTime = `${event?.eventStartDate} ${event?.eventStartTime}`
  const endDateTime = `${event?.eventEndDate} ${event?.evenEndTime}`

  const downloadTicket = () => {
    setTimeout(() => {
      toPng(ticketRef.current, { cacheBust: false })
        .then((dataUrl) => {
          const link = document.createElement("a")
          link.download = `${ticket?.name || ticket?.ticketType}-${event?.eventName}.png`
          link.href = dataUrl
          link.click()
        })
        .catch((err) => {
          console.log(err)
          errorToast(
            "An error occured while downloading your ticket. If the issue persists, please contact us.",
          )
        })
        .finally(() => {
          setOpen(false)
        })
    }, 100)
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
            <AlertDialogContent className="w-auto">
              <div className="ticketDoc my-2" ref={ticketRef}>
                <div className="ticket-image-card">
                  <div className="ticket-image-left">
                    <div
                      style={{
                        padding: "2em",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <div className="">
                        <p style={{ fontWeight: "bold" }}>{event?.recipientName}</p>
                        {ticket?.ticketType === "COMPLIMENTARY" ? (
                          <p>{ticket?.ticketType}</p>
                        ) : (
                          <p style={{ marginTop: "2em" }}>{event?.recipientPhoneNumber}</p>
                        )}
                      </div>
                    </div>
                    <div className="ticket-info">
                      <p className="ticket-card-date">
                        <span>{moment(event?.eventStartDate).format("dddd")}</span>
                        <span className="june-29">
                          {moment(event?.eventStartDate).format("Do")}{" "}
                          {moment(event?.eventStartDate).format("MMM")}
                        </span>
                        <span>{moment(event?.startDate).format("YYYY")}</span>
                      </p>
                      <div className="ticket-card-show-name">
                        <h1>{event?.eventName}</h1>
                      </div>
                      <div className="ticket-card-time">
                        <p>
                          {moment(startDateTime).format("LT")} <span>TO</span>{" "}
                          {moment(endDateTime).format("LT")}
                        </p>
                      </div>
                      <p className="ticket-card-location">
                        <span>{event?.location}</span>
                      </p>
                    </div>
                  </div>
                  <div className="ticket-card-right">
                    <div className="right-info-container">
                      <p className="ticket-number">{ticket?.name}</p>
                      <div className="barcode">
                        {/* <img
                          src={ticket?.ticketUrl}
                          alt="QR code"
                          width={100}
                          height={100}
                          className="barcode-image object-contain bg-no-repeat"
                          crossOrigin="anonymous"
                          
                        /> */}
                        <picture>
                          <source srcSet={ticket?.ticketUrl} media="(orientation: portrait)" />
                          <img src={ticket?.ticketUrl} alt="A beautiful labrador" loading="lazy" />
                        </picture>
                      </div>
                      <p className="ticket-number text-[.8em]">sold by tikomatata.com</p>
                    </div>
                  </div>
                </div>
              </div>
            </AlertDialogContent>
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

                  {/* <p className="text-gray-400 font-light mt-2 text-xs">
                      {" "}
                      Your daily update of the most played track from around the world...
                    </p> */}
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
