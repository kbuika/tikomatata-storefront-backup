"use client"
import Image from "next/image"
import Link from "next/link"
import React, { useState, useEffect } from "react"
import CustomButton from "../components/ui/custom-button"
import BrightLogo from "../images/logos/tikomatata-bright.svg"
import MainLogo from "../images/logos/tikomatata.svg"
import WhiteLogo from "../images/logos/tikomatata-white.png"
import Instagram3 from "../images/instagram-white.png"
import Header from "./Header"

type Props = {
  children: React.ReactNode
  noHeader?: boolean
  noFooter?: boolean
  left?: JSX.Element
  right?: JSX.Element
  isMain?: boolean
}

const DefaultLayout: React.FC<Props> = ({
  children,
  isMain = false,
  noHeader = false,
  noFooter = false,
}) => {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const checkBannerVisibility = () => {
      const now = new Date();
      const maintenanceDate = new Date('2024-09-07T07:30:00+03:00'); 
      setShowBanner(now < maintenanceDate);
    };

    checkBannerVisibility();
    const timer = setInterval(checkBannerVisibility, 600000); 

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col bg-rbackground">
      {showBanner && (
        <div className="bg-rprimary text-black text-center py-2 px-4 font-bold z-50 sticky top-0">
          Scheduled maintenance on September 7th from 5:00 AM to 7:30 AM. Payment processing will be affected.
        </div>
      )}
      <header
        className={`h-[8vh] flex items-center justify-between w-full px-[24px] sticky ${showBanner ? 'top-10' : 'top-0'} backdrop-filter backdrop-blur-lg bg-opacity-30 bg-rbackground z-50 md:border-b-2 md:border-rborder
         ${noHeader ? "hidden" : "md:flex"}`}
      >
        <Link href="/">
          {isMain ? (
            <Image src={WhiteLogo} alt="logo" height={35} width={105} />
          ) : (
            <Image src={WhiteLogo} alt="logo" height={35} width={105} />
          )}
        </Link>
        <div className="md:flex items-center justify-between hidden space-x-8">
          <Link
            href="https://agency.tikomatata.com"
            target="_blank"
            rel="noopener noreferrer"
            className=" text-gray-400 hover:text-white"
          >
            <CustomButton>Create Your Event</CustomButton>
          </Link>
        </div>
      </header>
      <main className={`bg-rbackground`}>{children}</main>
      <footer
        className={` bg-rbackground text-white h-[40vh] py-12 sm:py-8 px-[24px] w-full flex items-center justify-center border-t border-t-rprimary/25 min-[768px]:hidden  ${
          noFooter ? "hidden" : ""
        }`}
      >
          <div className="flex flex-col w-full items-center justify-between px-[24px] sm:flex-row">
            <Image src={WhiteLogo} alt="tikomatata" width={100} height={100} />
            <div className="flex flex-col items-center justify-between space-x-8 sm:flex-row sm:space-y-4">
              <p className=" text-lg mt-4 sm:mt-0">
                <Link
                  href="/contact"
                  className="underline underline-offset-4"
                  target="_blank"
                  rel="noopener"
                >
                  Have an issue? Contact Us
                </Link>
              </p>
              <p className=" text-lg mt-4 sm:mt-0">
                <Link
                  href="https://docs.google.com/document/d/1IyzMAE7d-XDVShFPel1-CuDjXvZ32hEJ8dBPmWqVj58/edit?usp=sharing"
                  className="underline underline-offset-4"
                  target="_blank"
                  rel="noopener"
                >
                  Terms
                </Link>
              </p>
              <p className=" text-lg mt-4 sm:mt-0">
                <Link
                  href="https://www.instagram.com/tikomatata.ke/"
                  className="underline underline-offset-4"
                  target="_blank"
                  rel="noopener"
                >
                  <Image src={Instagram3} alt="tikomatata" width={30} height={40} />
                </Link>
              </p>
            </div>
          </div>
      </footer>
    </div>
  )
}

export default DefaultLayout
