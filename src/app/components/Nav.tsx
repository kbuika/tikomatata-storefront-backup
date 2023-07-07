import React from "react"
import Link from "next/link"
import CustomButton from "./ui/CustomButton"

const Nav = () => {
  return (
    <div className="h-[10vh] flex items-center justify-between px-[20px] sticky top-0">
      <Link href="/">
        <h1 className="text-xl font-bold text-gray-300">Tikomatata</h1>
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
