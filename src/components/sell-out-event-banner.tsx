import CustomButton from "./ui/custom-button"
import { Button } from "./ui/button"
import Link from "next/link"

const SellOutEventBanner = () => {
  return (
    <div
      className={`flex flex-col items-center justify-center py-8 bg-rbackground text-white w-full h-[50vh]`}
    >
      <h2 className="text-3xl font-semibold text-center">Ready to sell out your event?</h2>
      <p className="text-white mt-[16px] w-[60%] text-xl text-center">
        Talk to us and Watch Your Ticket Sales Soar
        <span className="text-2xl ml-2">🚀</span>
        <span className="text-2xl ml-2">🎫</span>
        <span className="text-3xl">✨</span>
      </p>
      <div className="flex flex-row space-x-8">
        <Link
          href="https://agency.tikomatata.com"
          target="_blank"
          rel="noopener noreferrer"
          className="w-auto mt-[24px]"
        >
          <CustomButton className="w-full bg-rprimary text-rbackground px-4 py-4 border border-rprimary gap-[10px]">
            Create Event
          </CustomButton>
        </Link>
        <Link
          href="https://agency.tikomatata.com"
          target="_blank"
          rel="noopener noreferrer"
          className="w-auto mt-[24px]"
        >
          <button className="w-full bg-rbackground text-rprimary px-4 py-4 border border-rprimary rounded-[4px] hover:bg-rprimary hover:text-rbackground hover:border hover:border-rprimary duration-300 ease-in-out">
            Contact us
          </button>
        </Link>
      </div>
    </div>
  )
}

export default SellOutEventBanner
