import React from "react"
import Link from "next/link"
import CustomButton from "./ui/CustomButton"
import { usePathname } from "next/navigation"

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
        <h1 className={`text-xl font-bold ${titleVariants[isMain ? "isMain" : "isNotMain"]}`}>
          Tikomatata
        </h1>
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
