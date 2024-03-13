import Image from "next/image"
import Link from "next/link"
import React from "react"
import CustomButton from "../components/ui/custom-button"
import BrightLogo from "../images/logos/tikomatata-bright.svg"
import MainLogo from "../images/logos/tikomatata.svg"

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
  return (
    <div className="flex flex-col bg-rbackground">
      <div
        className={`h-[8vh] flex items-center justify-between w-full px-[24px] sticky top-0 border-b-2 backdrop-filter backdrop-blur-lg bg-opacity-30 bg-white z-50
         ${noHeader ? "hidden" : "md:flex"}`}
      >
        <Link href="/">
          {isMain ? (
            <Image src={BrightLogo} alt="logo" height={35} width={105} />
          ) : (
            <Image src={MainLogo} alt="logo" height={35} width={105} />
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
      </div>
      <main className="bg-rbackground static">{children}</main>
      {/* <footer
        className={` bg-rbackground text-white footer-container h-[40vh] w-full flex items-center justify-center min-[768px]:hidden  ${
          noFooter ? "hidden" : ""
        }`}
      >
        <div className="bg-rbackground main-footer-div p-8 w-full h-full text-white flex flex-col items-center justify-center md:w-[50%]">
          <div className="w-full flex flex-row items-start justify-between mb-4">
            <div>
              <h2 className="font-bold text-xl">Resources</h2>
              <p className="mt-4 text-lg">
                <Link
                  href="https://docs.google.com/document/d/1IyzMAE7d-XDVShFPel1-CuDjXvZ32hEJ8dBPmWqVj58/edit?usp=sharing
"
                  className="hover:underline"
                  target="_blank"
                  rel="noopener"
                >
                  Terms
                </Link>
              </p>
              <p className="mt-4 text-lg">Privacy</p>
              <p className="mt-4 text-lg">
                <Link href="/contact" className="hover:underline">
                  Contact Us
                </Link>
              </p>
            </div>
            <div>
              <h2 className="font-bold text-xl">Socials</h2>
              <p className="mt-4 text-lg">
                <Link
                  href="https://www.instagram.com/tikomatata.ke/"
                  className="hover:underline"
                  target="_blank"
                  rel="noopener"
                >
                  Instagram
                </Link>
              </p>
            </div>
          </div>
          <div className=" mt-8 flex flex-row w-full items-center justify-between">
            <Image src={MainLogo} alt="tikomatata" width={100} height={100} />
            <p className="text-lg">© {new Date().getFullYear()} Tikomatata.</p>
          </div>
        </div>
      </footer> */}
    </div>
  )
}

export default DefaultLayout
