/* eslint-disable @next/next/no-img-element */
import { successToast } from "@/lib/utils"
import { toPng } from "html-to-image"
import { DownloadIcon, Loader2 } from "lucide-react"
import moment from "moment"
import Image from "next/image"
import { useEffect, useLayoutEffect, useRef, useState } from "react"
import { AlertDialog, AlertDialogContent, AlertDialogTrigger } from "./ui/alert-dialog"
import CustomButton from "./ui/custom-button"

export const TicketToDownload = ({ ticket, event }: any) => {
  const [ticketImageUrl, setTicketImageUrl] = useState<string>("")
  const [open, setOpen] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const myTicket = useRef<any>(null)
  const startDateTime = `${event?.eventStartDate} ${event?.eventStartTime}`
  const endDateTime = `${event?.eventEndDate} ${event?.evenEndTime}`

  const DownloadTicket = () => {
    //set a delay
    setTimeout(() => {
      console.log(myTicket.current, "myTicket")
      toPng(myTicket.current, { cacheBust: false })
        .then((dataUrl) => {
          const link = document.createElement("a")
          link.download = `${ticket?.name}-${event?.eventName}.png`
          link.href = dataUrl
          link.click()
          setTicketImageUrl(dataUrl)
        })
        .catch((err) => {
          console.log(err)
        })
        .finally(() => {
          setOpen(false)
        })
    }, 10)
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
              <div className="ticketDoc my-2" ref={myTicket}>
                <div className="ticket-image-card">
                  <div className="ticket-image-left">
                    <div className="ticket-card-image bg-[url('https://images.unsplash.com/photo-1545264835-3e14e4dae383?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cG9zdGVyfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60')]">
                      {/* <p className="ticket-card-admit-one">
                            <span>ADMIT ONE</span>
                            <span>ADMIT ONE</span>
                            <span>ADMIT ONE</span>
                          </p> */}
                      <div className="ticket-number">
                        <p>#{event?.referenceId}</p>
                      </div>
                    </div>
                    <div className="ticket-info">
                      <p className="ticket-card-date">
                        <span>{moment(event?.eventStartDate).format("dddd")}</span>
                        <span className="june-29">
                          {moment(event?.eventStartDate).format("Do")}{" "}
                          {moment(event?.startDate).format("MMM")}
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
                        <span>#LOCATION</span>
                      </p>
                    </div>
                  </div>
                  <div className="ticket-card-right">
                    <div className="right-info-container">
                      <p className="ticket-number">{ticket?.name}</p>
                      <div className="barcode">
                        <Image
                          src={ticket?.ticketUrl}
                          alt="QR code"
                          width={100}
                          height={100}
                          className="barcode-image object-contain bg-no-repeat"
                        ></Image>
                      </div>
                      <p className="ticket-number text-[.8em]">sold by tikomatata.com</p>
                    </div>
                  </div>
                </div>
              </div>
            </AlertDialogContent>
            <div className="w-full">
              <div className="h-auto w-full m-2 flex flex-row items-start justify-center">
                {/* <div> */}
                  <a
                    className="delay-50 duration-100 bg-successBg p-5 rounded-lg w-60 group"
                    href=""
                  >
                    <Image
                      src="https://images.unsplash.com/photo-1545264835-3e14e4dae383?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cG9zdGVyfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60"
                      className="w-full rounded shadow"
                      alt=""
                      width={250}
                      height={250}
                    />

                    <h3 className="text-dark-200 font-bold mt-5">{ticket?.name}-{event?.eventName}</h3>

                    {/* <p className="text-gray-400 font-light mt-2 text-xs">
                      {" "}
                      Your daily update of the most played track from around the world...
                    </p> */}
                    <CustomButton
                    onClick={() => {
                      setOpen(true)
                      DownloadTicket()
                    }}
                    className="flex flex-row items-center justify-center mt-2 cursor-pointer"
                  >
                    <DownloadIcon className="mr-2" size={15}/>
                    Download
                  </CustomButton>
                  </a>
                {/* </div> */}

                {/* <div>
                  <button
                    onClick={() => {
                      setOpen(true)
                      DownloadTicket()
                    }}
                    className="flex flex-col items-center justify-center ml-2 cursor-pointer"
                  >
                    <DownloadIcon />
                    Download
                  </button>
                </div> */}
              </div>
            </div>
          </AlertDialog>
        </>
      )}
    </div>
  )
}

export default TicketToDownload
