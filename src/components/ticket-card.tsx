"use client"
import React from "react"
import { Minus, Plus } from "lucide-react"
import { Button } from "./ui/button"

interface EventTicketProps {
  title: string
  date: string
  location: string
}

const TicketCard: React.FC<EventTicketProps> = ({ title, date, location }) => {
  return (
    <>
      <div className="flex flex-col items-center justify-center bg-center bg-cover h-full w-[90%] sm:w-[45%] m-2 max-[640px]:w-[80%]">
        <div className="w-full mx-auto z-10 rounded">
          <div className="flex flex-col">
            <div className="bg-white relative border-2 shadow-sm rounded p-4 m-2 w-full">
              <div className="flex-none sm:flex">
                <div className="flex-auto justify-evenly">
                  <div className="flex items-center justify-center sm:justify-between">
                    <div className="flex items-center">
                      <h2 className="font-medium">Early Bird Ticket</h2>
                    </div>
                  </div>

                  <div className="border-b border-dashed border-b-2 my-3"></div>
                  <div className="flex flex-col items-center justify-center text-sm sm:items-start">
                    <div className="flex flex-col items-start">
                      <p className="font-bold text-center text-xl mt-2 text-mainSecondary">
                        <span className="text-gray-600">KES </span>2000
                      </p>
                      <div className="flex flex-row mt-4 items-center justify-center">
                        <Button className="border rounded">
                          <Minus className="cursor-pointer" size={13} />
                        </Button>
                        <p className="flex items-center justify-center w-[2em] text-base">0</p>{" "}
                        <Button className="bg-neutralDark rounded focus-visible:bg-neutralDark">
                          <Plus className="cursor-pointer" size={13} color="white" />
                        </Button>
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
