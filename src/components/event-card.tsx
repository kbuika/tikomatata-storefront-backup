import { truncateText } from "@/lib/utils"
import { useEventsStore } from "@/stores/events-store"
import { EventDataType } from "@/types/event"
import { Clock4, MapPin } from "lucide-react"
import moment from "moment"
import { useRouter } from "next/router"

type Props = {
  event: EventDataType
}

const EventCard: React.FC<Props> = ({ event }) => {
  const startDateTime = `${event?.startDate} ${event?.startTime}`
  // const endDateTime = `${event?.endDate} ${event?.endTime}`
  const setSelectedEvent = useEventsStore((state) => state.setSelectedEvent)
  const router = useRouter()
  const goToEvent = () => {
    setSelectedEvent(event)
    router.push(`/events/${event?.name}?id=${event?.eventId}`)
  }
  return (
    <div
      className="flex flex-col w-[24em] h-[25em] border rounded-[16px] mb-4 md:h-[26em] md:w-[20em] hover:cursor-pointer"
      onClick={goToEvent}
    >
      <div className="w-full h-[70%] rounded pt-[8px] px-[8px]">
        <div
          className="w-full h-full bg-cover bg-top rounded-[8px]"
          style={{
            backgroundImage: `url(${event?.posterUrl})`,
            border: "0.25rem",
          }}
        ></div>
      </div>
      <div className="flex flex-row w-full h-[30%]">
        <div className="flex flex-col bg-secondaryBrown items-center justify-start pt-3 mb-[16px] ml-[8px] w-1/4 rounded-b-[8px] font-bold leading-none uppercase text-dark border-r z-10 tracking-wide leading-6">
          <div className="text-base">{moment(event?.startDate).format("ddd")}</div>
          <div className="text-base mt-1">{moment(event?.startDate).format("Do")}</div>
          <div className="text-base mt-1">{moment(event?.startDate).format("MMM")}</div>
        </div>
        <div className="pl-4 pr-4 pt-4 pb-2 font-normal text-gray-800">
          <h1 className="mb-2 text-lg font-bold leading-none tracking-tight text-dark md:text-xl">
            {truncateText(event?.name, 20)}
          </h1>
          <div className="flex flex-col items-start mt-[8px] text-gray-700">
            <div className="text-base flex flex-row items-center">
              <MapPin size={20} className="mr-2" color="#555455" />
              {truncateText(event?.location, 25)}{" "}
            </div>
            <div className="text-base flex flex-row items-center mt-[4px]">
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
