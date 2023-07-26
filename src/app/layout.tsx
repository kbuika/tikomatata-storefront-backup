"use client"
import "./globals.css"
import { Inter, Rubik } from "next/font/google"
import Head from "./head"
import Nav from "./../components/Nav"
import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"
import { Copyright } from "lucide-react"
import StackedLogo from "./../images/logos/tikomatata-stacked.svg"

const inter = Inter({ subsets: ["latin"] })
const rubik = Rubik({ subsets: ["latin"], display: "swap" })

// TODO: Change the pathname before launch
export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  console.log(pathname)
  return (
    <html lang="en" className={inter.className}>
      <Head />
      <body>
        {pathname !== "/main" && <Nav />}
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
      </body>
    </html>
  )
}
