import Image from "next/image"
import Link from "next/link"

const EventCard = () => {
  return (
    <Link
      href={{
        pathname: "/events/eventName",
        query: { eventName: "2020-national-championship", id: "1" },
      }}
    >
      <div className="flex flex-col w-[24em] h-[30em] bg-white rounded shadow-lg mb-4 md:h-[25em] md:w-[21em] hover:cursor-pointer">
        <div
          className="w-full h-[70%] bg-top bg-cover rounded-t"
          style={{
            backgroundImage:
              "url(https://www.si.com/.image/t_share/MTY4MTkyMjczODM4OTc0ODQ5/cfp-trophy-deitschjpg.jpg)",
          }}
        ></div>
        <div className="flex flex-row w-full h-[30%]">
          <div className="flex flex-col items-center justify-center w-1/4 font-bold leading-none text-gray-800 uppercase text-mainPrimary border-r-2">
            <div className="md:text-md">Jan</div>
            <div className="md:text-md mb-4">13</div>
            <div className="md:text-md">7 pm</div>
          </div>
          <div className="pl-4 pr-4 pt-2 pb-4 font-normal text-gray-800">
            <h1 className="mb-2 text-lg font-bold leading-none tracking-tight text-gray-800 md:text-base">
              2020 National Championship
            </h1>
            <div className="flex flex-col items-start mt-2 text-gray-700">
              <div className="">United States International University</div>
              <div className="">2:00 PM - 11:00 PM</div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default EventCard
