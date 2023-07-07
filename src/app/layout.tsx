"use client"
import "./globals.css"
import { Inter } from "next/font/google"
import Head from "./head"
import Nav from "./components/Nav"
import { usePathname, useRouter } from "next/navigation"

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
        <footer className="bottom-0 h-[10vh] bg-black w-full text-white">Footer</footer>
      </body>
    </html>
  )
}
