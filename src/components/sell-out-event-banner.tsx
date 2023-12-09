import CustomButton from "./ui/custom-button"
import Link from "next/link"

const SellOutEventBanner = ({ setPaymentState, fullWidth = false }: any) => {
  const env = process.env.NODE_ENV
  return (
    <div
      className={`flex flex-col items-center justify-center w-[100%] py-8 bg-[#F5F1F9] w-full`}
    >
      <h2 className="text-2xl font-bold">Ready to sell out your event?</h2>
      <p className="text-neutralGrey mt-[16px] w-[60%] text-xl text-center">
        Click &rsquo;Create Your Event&rsquo; to Begin and Watch Your Ticket Sales Soar
        <span className="text-2xl ml-2">🚀</span><span className="text-2xl ml-2">🎫</span><span className="text-3xl">✨</span>
      </p>
      <Link href="https://agency.tikomatata.com" target="_blank" rel="noopener noreferrer" className="w-[30%] mt-[24px] min-[780px]:w-[20%]"><CustomButton className="w-full">Create Your Event</CustomButton></Link>
    </div>
  )
}

export default SellOutEventBanner
