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
  return (
    <div
      className={`h-[8vh] flex items-center justify-between px-[24px] py-[13px] sticky top-0 bg-white backdrop-filter backdrop-blur-lg bg-opacity-30 md:px-[40px]`}
    >
      <Link href="/">
        {isMain ? (
          <Image src={MainLogo} alt="logo" height={35} width={105} />
        ) : (
          <Image src={MainLogo} alt="logo" height={35} width={105} />
        )}
      </Link>
      <div className="flex items-center justify-between space-x-8">
        <Link href="https://agency.tikomatata.com" target="_blank" rel="noopener noreferrer" className=" text-gray-400 hover:text-white">
          <CustomButton>Create Your Event</CustomButton>
        </Link>
      </div>
    </div>
  )
}

export default Nav
