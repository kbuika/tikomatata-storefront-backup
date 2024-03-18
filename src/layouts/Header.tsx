import { Dialog, Popover } from '@headlessui/react'
import {
    Bars3Icon, XMarkIcon
} from '@heroicons/react/24/outline'
import { Menu } from "lucide-react"
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import KubeLogo from '../images/logos/tikomatata-stacked.svg'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="bg-successBg h-20 z-100">
      <nav
        className="mx-auto h-20 flex max-w-7xl items-center justify-between p-6 lg:px-8 z-100"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Kube Real Estate</span>
            <Image
              className=""
              src={KubeLogo}
              alt=""
              height={30}
              width={50}
            />
          </Link>
        </div>
        <div className="flex lg:hidden z-100">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-dark z-100"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Menu size={24} className="h-6 w-6" aria-hidden="true" />
            {/* <Bars3Icon className="h-6 w-6" aria-hidden="true" /> */}
          </button>
        </div>
        <Popover.Group className="hidden lg:flex lg:gap-x-16 mr-[300px]">
          <Link
            href="/"
            className="text-l leading-6 text-gray-900 font-sans tracking-wider"
          >
            Home
          </Link>
          <Link
            href="/landListings"
            className="text-l leading-6 text-gray-900 font-sans tracking-wider"
          >
            Land Listings
          </Link>
          <Link
            href="/listings"
            className="text-l leading-6 text-gray-900 font-sans tracking-wider"
          >
            House Listings
          </Link>
          <Link
            href="/bookSurvey"
            className="text-l leading-6 text-gray-900 font-sans tracking-wider"
          >
            Book Survey
          </Link>
          <Link
            href="/company"
            className="text-l leading-6 text-gray-900 font-sans tracking-wider"
          >
            About Us
          </Link>
        </Popover.Group>
        {/* <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <a href="/contact" className="text-sm font-semibold leading-6 text-gray-900">
            Contact Us <span aria-hidden="true">&rarr;</span>
          </a>
        </div> */}
      </nav>
      <Dialog
        as="div"
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className="fixed inset-0 z-10" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between h-12">
            <Link href="/" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <Image
                className="h-8 w-auto"
                src={KubeLogo}
                alt=""
                height={60}
                width={110}
              />
            </Link>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                <Link
                  href="/"
                  className="-mx-3 block rounded-lg py-2 px-3 text-base font-semibold leading-7 text-gray-900 font-sans tracking-wider hover:bg-gray-50"
                >
                  Home
                </Link>
                <a
                  href="/landListings"
                  className="-mx-3 block rounded-lg py-2 px-3 text-base font-semibold leading-7 text-gray-900 font-sans tracking-wider hover:bg-gray-50"
                >
                  Land Listings
                </a>
                <a
                  href="/listings"
                  className="-mx-3 block rounded-lg py-2 px-3 text-base font-semibold leading-7 text-gray-900 font-sans tracking-wider hover:bg-gray-50"
                >
                  House Listings
                </a>
                <a
                  href="/bookSurvey"
                  className="-mx-3 block rounded-lg py-2 px-3 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Book Survey
                </a>
                <a
                  href="/company"
                  className="-mx-3 block rounded-lg py-2 px-3 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  About Us
                </a>
              </div>
              {/* <div className="py-6">
                <Link
                  href="/contact"
                  className="-mx-3 block rounded-lg py-2.5 px-3 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Contact Us
                </Link>
              </div> */}
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
}