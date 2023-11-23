import React from "react"
import Link from "next/link"
import MainLogo from "../images/logos/tikomatata.svg"
import BrightLogo from "../images/logos/tikomatata-bright.svg"
import StackedLogo from "../images/logos/tikomatata-stacked.svg"
import Image from "next/image"
import CustomButton from "../components/ui/custom-button"
import { Copyright } from "lucide-react"
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
  return (
    <div className="bg-beigeLight">
      <div
        className={`h-[10vh] flex items-center justify-between w-full px-[24px] sticky top-0 border-b-2 bg-white z-50
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
            href={
              process.env.ENV == "production"
                ? "https://app.tikomatata.com"
                : "https://dev-app.tikomatata.com"
            }
            target="_blank"
            rel="noopener noreferrer"
            className=" text-gray-400 hover:text-white"
          >
            <CustomButton>Create Your Event</CustomButton>
          </Link>
        </div>
      </div>
      <main>{children}</main>
      <footer
        className={`footer-container h-[40vh] w-full flex items-center justify-center min-[768px]:hidden  ${
          noFooter ? "hidden" : ""
        }`}
      >
        <div className="main-footer-div p-8 w-full h-full text-dark flex flex-col items-center justify-center md:w-[50%]">
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
      </footer>
    </div>
  )
}

export default DefaultLayout
