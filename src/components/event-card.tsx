"use client"
import { truncateText } from "@/lib/utils"
import { useEventsStore } from "@/stores/events-store"
import { EventDataType } from "@/types/event"
import { Clock4, MapPin } from "lucide-react"
import moment from "moment"
import Image from "next/image"
import { useRouter } from "next/router"

type Props = {
  event: EventDataType
  past?: boolean
}

const EventCard: React.FC<Props> = ({ event }) => {
  const startDateTime = `${event?.startDate} ${event?.startTime}`
  // const endDateTime = `${event?.endDate} ${event?.endTime}`
  const setSelectedEvent = useEventsStore((state) => state.setSelectedEvent)
  const router = useRouter()
  const goToEvent = () => {
    setSelectedEvent(event)
    router.push(`/event/${event?.slug}`)
  }
  return (
    <div
      className="flex flex-col w-[326px] h-[30em] border-none rounded-[16px] mb-4 text-white  hover:cursor-pointer"
      onClick={goToEvent}
    >
      {/* md:h-[28em] sm:w-[18em] md:w-[20em] lg:w-[20em] xl:w-[20em] */}
      <div className="w-full h-[70%] rounded-[8px] relative">
        <div className="flex overflow-hidden items-center justify-center h-full w-full relative rounded-[8px] border-2 border-[#105858]">
          <Image src={event?.posterUrl!} alt={event?.name!} fill className="rounded"/>
        </div>
      </div>
      <div className="flex flex-row w-full min-h-[30%] h-auto pb-2">
        <div className=" pr-4 pt-4 pb-2 font-normal text-white">
          <h1 className="mb-2 text-lg font-semibold leading-none tracking-tight md:text-[24px]">
            {truncateText(event?.name, 20)}
          </h1>
          <p className=""></p>
          <div className="flex flex-col items-start mt-[2px] text-white">
            <div className="text-sm flex flex-row items-start text-rsecdark">
              {/* <MapPin size={20} className="mr-2" color="#555455" /> */}
              {truncateText(event?.location, 25)}{" "}
            </div>
            <div className="text-base flex flex-row items-center mt-[2px] text-rsecdark">
              {/* <Clock4 size={18} className="mr-2" color="#555455" /> */}
              {moment(startDateTime).format("ddd")}, {moment(startDateTime).format("MMM")} {moment(startDateTime).format("Do")}, {moment(startDateTime).format("LT")}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EventCard
