import React from "react"
import Link from "next/link"
import CustomButton from "./ui/custom-button"
import { usePathname } from "next/navigation"
import MainLogo from "../images/logos/tikomatata.svg"
import BrightLogo from "../images/logos/tikomatata-bright.svg"
import Image from "next/image"

const Nav = () => {
  const pathname = usePathname()
  const isMain = pathname === "/"
  const titleVariants = {
    isNotMain: "text-black",
    isMain: "text-gray-300",
  }
  const mainVariants = {
    isMain: "border-none",
    isNotMain: "border-b-2 bg-white",
  }
  return (
    <div
      className={`h-[10vh] flex items-center justify-between px-[24px] py-[13px] sticky top-0 bg-white opacity-80 md:px-[40px] ${
        mainVariants[isMain ? "isMain" : "isNotMain"]
      }`}
    >
      <Link href="/">
        {isMain ? (
          <Image src={MainLogo} alt="logo" height={35} width={105} />
        ) : (
          <Image src={MainLogo} alt="logo" height={35} width={105} />
        )}
      </Link>
      <div className="flex items-center justify-between space-x-8">
        <Link href={process.env.NODE_ENV == "production" ? "https://app.tikomatata.com" : "https://dev-app.tikomatata.com"} target="_blank" rel="noopener noreferrer" className=" text-gray-400 hover:text-white">
          <CustomButton>Create Your Event</CustomButton>
        </Link>
      </div>
    </div>
  )
}

export default Nav
