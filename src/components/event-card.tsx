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

const EventCard: React.FC<Props> = ({ event, past = false }) => {
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
      className="flex flex-col w-full h-[30em] border rounded-[16px] mb-4 shadow-xl  md:h-[28em] sm:w-[18em] md:w-[20em] lg:w-[20em] xl:w-[20em] hover:cursor-pointer"
      onClick={past ? undefined : goToEvent}
    >
      <div className="w-full h-[70%] rounded-[8px] pt-[8px] px-[8px] relative">
        {past && (
          <div className="absolute top-2 z-10 left-2 bg-mainPrimary text-white rounded-tl-[8px] px-2 py-1">
            Past Event
          </div>
        )}
        <div className="flex overflow-hidden items-center justify-center h-full w-full relative rounded-t-[8px]">
          <Image src={event?.posterUrl!} alt={event?.name!} fill={true} className="rounded"/>
        </div>
      </div>
      <div className="flex flex-row w-full min-h-[30%] h-auto pb-2">
        <div className="flex flex-col bg-secondaryBrown items-center justify-start pt-3 mb-[16px] ml-[8px] w-1/4 rounded-b-[8px] font-bold uppercase text-dark border-r z-10 tracking-wide leading-6">
          <div className="text-base">{moment(event?.startDate).format("ddd")}</div>
          <div className="text-base mt-1">{moment(event?.startDate).format("Do")}</div>

          <div className="text-base mt-1">{moment(event?.startDate).format("MMM")}</div>
        </div>
        <div className="pl-4 pr-4 pt-4 pb-2 font-normal text-gray-800">
          <h1 className="mb-2 text-lg font-semibold leading-none tracking-tight text-dark md:text-lg">
            {truncateText(event?.name, 20)}
          </h1>
          <div className="flex flex-col items-start mt-[5px] text-gray-700">
            <div className="text-sm flex flex-row items-start">
              <MapPin size={20} className="mr-2" color="#555455" />
              {truncateText(event?.location, 25)}{" "}
            </div>
            <div className="text-base flex flex-row items-center mt-[5px]">
              <Clock4 size={18} className="mr-2" color="#555455" />
              {moment(startDateTime).format("LT")}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EventCard
