"use client"
import "./globals.css"
import { Inter } from "next/font/google"
import Head from "./head"
import Nav from "./components/Nav"
import { usePathname, useRouter } from "next/navigation"
import { Copyright } from "lucide-react"

const inter = Inter({ subsets: ["latin"] })

// TODO: Change the pathname before launch
export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  console.log(pathname)
  return (
    <html lang="en">
      <Head />
      <body>
        {pathname !== "/main" && <Nav />}
        {children}
        <footer className="bottom-0 h-[15vh] border-t-2 w-full py-4 px-48">
          <div className="flex flex-row items-center justify-between h-full w-full">
            <div className="flex flex-row w-[30%] items-center justify-between text-neutralGrey">
              <p className="cursor-pointer text-stone-800">Tikomatata</p>
              <p className="cursor-pointer">Terms</p>
              <p className="cursor-pointer">Privacy</p>
              <p className="cursor-pointer">Talk to Us</p>
            </div>
            <div className="flex flex-row items-center justify-center text-neutralGrey font-medium tracking-wide">
              <Copyright className="mr-2" size={18} /> {new Date().getFullYear()} Tikomatata. All
              rights reserved.
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}
