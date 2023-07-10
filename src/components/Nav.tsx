import React from "react"
import Link from "next/link"
import CustomButton from "./ui/CustomButton"
import { usePathname } from "next/navigation"
import MailLogo from "../images/logos/tikomatata.svg"
import BrightLogo from "../images/logos/tikomatata-bright.svg"
import Image from "next/image"

const Nav = () => {
  const pathname = usePathname()
  const isMain = pathname === "/main"
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
      className={`h-[10vh] flex items-center justify-between px-[60px] sticky top-0 ${
        mainVariants[isMain ? "isMain" : "isNotMain"]
      }`}
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
  )
}

export default Nav
