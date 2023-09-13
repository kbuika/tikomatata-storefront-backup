import React from "react"
import Link from "next/link"
import MailLogo from "../images/logos/tikomatata.svg"
import BrightLogo from "../images/logos/tikomatata-bright.svg"
import StackedLogo from "../images/logos/tikomatata-stacked.svg"
import Image from "next/image"
import CustomButton from "../components/ui/custom-button"
import { Copyright } from "lucide-react"

type Props = {
  children: React.ReactNode
  noHeader?: boolean
  noFooter?: boolean
  left?: JSX.Element
  right?: JSX.Element
  isMain?: boolean
}

const DefaultLayout: React.FC<Props> = ({ children, isMain = false, noHeader = false }) => {
  return (
    <>
      <div
        className={`h-[10vh] flex items-center justify-between px-[60px] sticky top-0 border-b-2 bg-white z-50
         ${noHeader ? "hidden" : "md:flex"}`}
      >
        <Link href="/">
          {isMain ? (
            <Image src={BrightLogo} alt="logo" height={35} width={105} />
          ) : (
            <Image src={MailLogo} alt="logo" height={35} width={105} />
          )}
        </Link>
        <div className="md:flex items-center justify-between hidden space-x-8">
          <Link href="/login" className=" text-gray-400 hover:text-white">
            <CustomButton>Create Your Event</CustomButton>
          </Link>
        </div>
      </div>
      {children}
      <footer className="bottom-0 h-[10vh] w-full border-t-2">
        <div className="h-full flex flex-col items-center justify-between bg-testPrimary text-white px-[60px] md:flex-row">
          <div className="flex flex-row items-center h-full mr-8">
            <div className="cursor-pointer text-stone-800 hidden mr-[20px] sm:flex">
              <Image src={StackedLogo} alt="tikomatata" width={40} height={30} />
            </div>
            <p className="cursor-pointer underline underline-offset-4" style={{marginRight: "20px", marginLeft:"20px"}}>Terms</p>
            <p className="cursor-pointer underline underline-offset-4 " style={{marginRight: "20px", marginLeft:"20px"}}>Privacy</p>
            <p className="cursor-pointer underline underline-offset-4 ml-2">Talk to us</p>
          </div>
          <div className="flex flex-row items-center justify-center text-white font-medium tracking-wide text-center max-[1300px]:mt-4 mb-4">
          © {new Date().getFullYear()} Tikomatata.
          </div>
        </div>
      </footer>
    </>
  )
}

export default DefaultLayout
