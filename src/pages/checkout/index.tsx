"use client"
import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs"
import TicketCard from "../../components/ticket-card"
import CustomButton from "../../components/ui/custom-button"
import testImage from "../../images/Chapo.jpg"
import KenyaIcon from "../../images/kenya.png"
import { Loader2, BadgeCheck } from "lucide-react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../../components/ui/alert-dialog"
import { Button } from "../../components/ui/button"
import PaymentSuccess from "../../components/payment-success"
import PaymentFailure from "../../components/payment-failure"
import DefaultLayout from "@/layouts/default-layout"

export default function Checkout() {
  const [paymentState, setPaymentState] = useState("none")
  return (
    <DefaultLayout>
      <main className="flex min-h-screen flex-col items-center justify-center w-full sm:flex-row sm:items-start">
        <div className="w-[40%] p-8 flex flex-col items-center justify-start sm:border-l-2 sm:min-h-[50em]">
          <div className="h-[10em] w-[20em]">
            <Image src={testImage} alt="" className="w-full h-full object-cover rounded-xl" />
          </div>
          <div className="mt-4 items-start w-[20em]">
            <h2 className="text-xl font-semibold">Event Name</h2>
            <p className="text-base mt-2 flex flex-row items-center">Sat July 6 at 12:00 PM</p>
            <p className="text-base mt-2 flex flex-row items-center">Anzana Gardens</p>
          </div>
          <div className="w-[20em]">
            <h2 className="text-xl font-semibold mt-6">Tickets</h2>
            <div className="flex flex-row w-full items-center justify-between mt-2 mb-2">
              <p>
                <span className="text-gray-500">2 x </span>Early Bird
              </p>
              <p>KES 2000</p>
            </div>
            <hr className="my-4" />
            <div className="flex flex-row w-full items-center justify-between mt-2 mb-2">
              <p>TOTAL</p>
              <p>KES 2000</p>
            </div>
          </div>
        </div>
        <div className="w-full px-12 min-h-[50em] border-t-2 sm:border-t-0 sm:border-l-2 sm:w-[50%] sm:p-8 sm:pl-36 sm:px-0">
          <h2 className="text-lg font-medium mt-6 sm:mt-0">Where do we send your tickets?</h2>
          <div className="h-auto w-full flex flex-col items-center">
            <div className="w-full mt-[4px] text-neutralDark sm:mt-[16px]">
              <div>
                <input
                  id="name"
                  type="text"
                  required
                  className="h-[50px] bg-white appearance-none rounded-sm block w-full px-3 py-2 border border-gray-600 placeholder-gray-500 text-gray-900 focus:border-none focus:outline-none focus:ring-2 focus:z-10 sm:text-sm"
                  placeholder="Name"
                ></input>
              </div>
            </div>
            <div className="w-full mt-[16px] text-neutralDark">
              <div>
                <input
                  id="email"
                  type="email"
                  required
                  className="h-[50px] bg-white appearance-none rounded-sm block w-full px-3 py-2 border border-gray-600 placeholder-gray-500 text-gray-900 focus:border-none focus:outline-none focus:ring-2 focus:z-10 sm:text-sm"
                  placeholder="Email Address"
                ></input>
              </div>
            </div>
            <div className="w-full mt-[16px]">
              <div>
                <div className="flex items-center">
                  <span className="w-[35%] text-neutralDark lg:w-1/4 bg-white h-[50px] flex items-center justify-center rounded-l-sm border border-hidden-left border-gray-600">
                    <Image src={KenyaIcon} alt="Kenyan Flag" className="mr-2" />
                    +254
                  </span>
                  <input
                    id="phone"
                    type="text"
                    required
                    className="w-3/4 h-[50px] bg-white appearance-none rounded-r-sm block w-full px-3 py-2 border border-r-none border-gray-600 placeholder-gray-500 text-gray-900 focus:border-none focus:outline-none focus:ring-2 focus:z-10 sm:text-sm"
                    placeholder="7XXXXXXXX"
                    autoComplete="nope"
                  ></input>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-6">
            <h2 className="mb-4 text-lg">Payment Details</h2>
            <Tabs defaultValue="mpesa" className="w-full">
              <TabsList className="bg-none w-full flex justify-start">
                <TabsTrigger
                  value="mpesa"
                  className="w-[50%] flex justify-start text-lg data-[state=active]:border-b-2 data-[state=active]:border-b-testPrimary"
                >
                  Mpesa
                </TabsTrigger>
                <TabsTrigger
                  value="card"
                  className="w-[50%] flex justify-start text-lg data-[state=active]:border-b-2 data-[state=active]:border-b-testPrimary"
                >
                  Card
                </TabsTrigger>
              </TabsList>
              <TabsContent value="mpesa">
                <div className="h-auto w-full flex flex-col items-center">
                  {paymentState === "none" && (
                    <>
                      <div className="w-full mt-[16px]">
                        <div>
                          <div className="flex items-center">
                            <span className="w-[35%] text-neutralDark lg:w-1/4 bg-white h-[50px] flex items-center justify-center rounded-l-sm border border-hidden-left border-gray-600">
                              <Image src={KenyaIcon} alt="Kenyan Flag" className="mr-2" />
                              +254
                            </span>
                            <input
                              id="phone"
                              type="text"
                              required
                              className="w-3/4 h-[50px] bg-white appearance-none rounded-r-sm relative block w-full px-3 py-2 border border-r-none border-gray-600 placeholder-gray-500 text-gray-900 focus:border-none focus:outline-none focus:ring-2 focus:z-10 sm:text-sm"
                              placeholder="7XXXXXXXX"
                              autoComplete="nope"
                            ></input>
                          </div>
                        </div>
                      </div>
                      <p className="mt-[20px] text-gray-500">
                        Please ensure you have your phone near you. You will receive a prompt on the
                        phone number you have provided above.
                      </p>
                      <div className="w-full mt-[20px]">
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <CustomButton
                              type="submit"
                              className="h-[50px] group relative w-full flex justify-center items-center py-2 px-4 border border-gray-600 text-base font-medium rounded-sm text-black focus:outline-none focus:ring-2 focus:ring-offset-2"
                            >
                              {false ? (
                                <>
                                  Processing <Loader2 size={22} className="animate-spin ml-4" />
                                </>
                              ) : (
                                "Pay KES 2000"
                              )}
                            </CustomButton>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Confirm Email and Phone</AlertDialogTitle>
                              <AlertDialogDescription>
                                Confirm that the email and phone number are correct before
                                proceeding.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <div className="h-auto w-full flex flex-col items-center">
                              <div className="w-full mt-[4px] text-neutralDark">
                                <div>
                                  <input
                                    id="email"
                                    type="email"
                                    required
                                    className="h-[50px] bg-white appearance-none rounded-sm relative block w-full px-3 py-2 border border-gray-600 placeholder-gray-500 text-gray-900 focus:border-none focus:outline-none focus:ring-2 focus:z-10 sm:text-sm"
                                    placeholder="Email Address"
                                  ></input>
                                </div>
                              </div>
                              <div className="w-full mt-[16px]">
                                <div>
                                  <div className="flex items-center">
                                    <span className="w-[35%] text-neutralDark lg:w-1/4 bg-white h-[50px] flex items-center justify-center rounded-l-sm border border-hidden-left border-gray-600">
                                      <Image src={KenyaIcon} alt="Kenyan Flag" className="mr-2" />
                                      +254
                                    </span>
                                    <input
                                      id="phone"
                                      type="text"
                                      required
                                      className="w-3/4 h-[50px] bg-white appearance-none rounded-r-sm relative block w-full px-3 py-2 border border-r-none border-gray-600 placeholder-gray-500 text-gray-900 focus:border-none focus:outline-none focus:ring-2 focus:z-10 sm:text-sm"
                                      placeholder="7XXXXXXXX"
                                      autoComplete="nope"
                                    ></input>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <CustomButton
                                type="submit"
                                className="h-[40px] group relative w-[7em] flex justify-center items-center text-base font-medium rounded-sm focus:outline-none focus:ring-2 focus:ring-offset-2"
                              >
                                <AlertDialogAction className="bg-transparent w-full hover:bg-transparent">
                                  Confirm
                                </AlertDialogAction>
                              </CustomButton>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </>
                  )}
                  {paymentState === "success" && <PaymentSuccess email="kibuika@tikomatata.com" />}
                  {paymentState === "failure" && <PaymentFailure />}
                </div>
              </TabsContent>
              <TabsContent value="card">
                <div className="pt-4">
                  <p></p>
                  <div className="w-full mt-[20px]">
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <CustomButton
                          type="submit"
                          className="h-[50px] group relative w-full flex justify-center items-center py-2 px-4 border border-gray-600 text-base font-medium rounded-sm text-black focus:outline-none focus:ring-2 focus:ring-offset-2"
                        >
                          {false ? (
                            <>
                              Processing <Loader2 size={22} className="animate-spin ml-4" />
                            </>
                          ) : (
                            "Pay KES 2000"
                          )}
                        </CustomButton>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Confirm Email and Phone</AlertDialogTitle>
                          <AlertDialogDescription>
                            Confirm that the email and phone number are correct before proceeding.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <div className="h-auto w-full flex flex-col items-center">
                          <div className="w-full mt-[4px] text-neutralDark">
                            <div>
                              <input
                                id="email"
                                type="email"
                                required
                                className="h-[50px] bg-white appearance-none rounded-sm relative block w-full px-3 py-2 border border-gray-600 placeholder-gray-500 text-gray-900 focus:border-none focus:outline-none focus:ring-2 focus:z-10 sm:text-sm"
                                placeholder="Email Address"
                              ></input>
                            </div>
                          </div>
                          <div className="w-full mt-[16px]">
                            <div>
                              <div className="flex items-center">
                                <span className="w-[35%] text-neutralDark lg:w-1/4 bg-white h-[50px] flex items-center justify-center rounded-l-sm border border-hidden-left border-gray-600">
                                  <Image src={KenyaIcon} alt="Kenyan Flag" className="mr-2" />
                                  +254
                                </span>
                                <input
                                  id="phone"
                                  type="text"
                                  required
                                  className="w-3/4 h-[50px] bg-white appearance-none rounded-r-sm relative block w-full px-3 py-2 border border-r-none border-gray-600 placeholder-gray-500 text-gray-900 focus:border-none focus:outline-none focus:ring-2 focus:z-10 sm:text-sm"
                                  placeholder="Phone number"
                                  autoComplete="nope"
                                ></input>
                              </div>
                            </div>
                          </div>
                        </div>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <CustomButton
                            type="submit"
                            className="h-[40px] group relative w-[7em] flex justify-center items-center text-base font-medium rounded-sm text-black bg-mainPrimary focus:outline-none focus:ring-2 focus:ring-offset-2"
                          >
                            <AlertDialogAction className="bg-transparent w-full hover:bg-transparent">
                              Confirm
                            </AlertDialogAction>
                          </CustomButton>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </DefaultLayout>
  )
}
