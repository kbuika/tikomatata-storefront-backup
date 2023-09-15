import { truncateText } from "@/lib/utils"
import { useEventsStore } from "@/stores/events-store"
import { EventDataType } from "@/types/event"
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
      className="flex flex-col w-[21em] h-[25em] border rounded mb-4 md:h-[26em] md:w-[20em] hover:cursor-pointer"
      onClick={goToEvent}
    >
      <div
        className="w-full h-[70%] bg-top bg-cover rounded"
        style={{
          backgroundImage: `url(${event?.posterUrl})`,
          border: "0.25rem",
        }}
      ></div>
      <div className="flex flex-row w-full"> 
        <div className="flex flex-col items-center justify-start pt-4 w-1/4 font-bold leading-none uppercase text-mainSecondary border-r">
          <div className="text-base">{moment(event?.startDate).format("ddd")}</div>
          <div className="text-base mt-1">{moment(event?.startDate).format("Do")}</div>
          <div className="text-base mt-1">{moment(event?.startDate).format("MMM")}</div>
        </div>
        <div className="pl-4 pr-4 pt-4 pb-2 font-normal text-gray-800">
          <h1 className="mb-2 text-lg font-bold leading-none tracking-tight text-mainSecondary md:text-xl">
            {truncateText(event?.name, 20)}
          </h1>
          <div className="flex flex-col items-start mt-2 text-gray-700">
            <div className="text-base">{truncateText(event?.location, 25)} </div>
            <div className="text-base">
              {moment(event?.startDate).format("ddd")}, {moment(event?.startDate).format("MMM")}{" "}
              {moment(event?.startDate).format("Do")}, {moment(startDateTime).format("LT")}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EventCard
