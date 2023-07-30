import React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
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
        className={`h-[10vh] flex items-center justify-between px-[60px] sticky top-0 border-b-2 bg-white
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
      <footer className="bottom-0 h-[15vh] border-t-2 w-full py-4 px-2 md:px-36">
        <div className="flex flex-row items-center justify-between h-full w-full max-[1300px]:flex-col max-[1300px]:justify-center">
          <div className="flex flex-row w-full items-center justify-between text-neutralGrey max-[1300px]:w-[50%] md:w-[30%]">
            <div className="cursor-pointer text-stone-800 mr-4 hidden sm:flex">
              <Image src={StackedLogo} alt="tikomatata" width={40} height={30} />
            </div>
            <p className="cursor-pointer underline underline-offset-4">Terms</p>
            <p className="cursor-pointer underline underline-offset-4">Privacy</p>
            <p className="cursor-pointer underline underline-offset-4">Talk to us</p>
          </div>
          <div className="flex flex-row items-center justify-center w-full text-neutralGrey font-medium tracking-wide max-[1300px]:mt-4">
            <Copyright className="mr-2" size={18} /> {new Date().getFullYear()} Tikomatata. All
            rights reserved.
          </div>
        </div>
      </footer>
    </>
  )
}

export default DefaultLayout
