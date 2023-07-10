"use client"
import React from "react"
import { Minus, Plus } from "lucide-react"

interface EventTicketProps {
  title: string
  date: string
  location: string
}

const TicketCard: React.FC<EventTicketProps> = ({ title, date, location }) => {
  return (
    <>
      <div className="flex flex-col items-center justify-center bg-center bg-cover h-full w-[45%] m-2 max-[580px]:w-[80%]">
        <div className="w-full mx-auto z-10 rounded-3xl">
          <div className="flex flex-col">
            <div className="bg-white relative border-2 shadow-sm rounded-xl p-4 m-2">
              <div className="flex-none sm:flex">
                <div className="flex-auto justify-evenly">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <h2 className="font-medium">Early Bird Ticket</h2>
                    </div>
                  </div>

                  <div className="border-b border-dashed border-b-2 my-3"></div>
                  <div className="flex flex-col items-start justify-center text-sm ">
                    <div className="flex flex-col items-start">
                      <p className="font-bold text-center text-xl mt-2 text-mainSecondary">
                        <span className="text-gray-600">KES </span>2000
                      </p>
                      <div className="flex flex-row mt-4 items-center justify-center">
                        <Minus className="mr-2 cursor-pointer" size={17} />{" "}
                        <p className="flex items-center justify-center w-[2em] text-base">0</p>{" "}
                        <Plus className="ml-2 cursor-pointer" size={17} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default TicketCard
