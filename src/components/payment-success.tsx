import { BadgeCheck } from "lucide-react"

interface PaymentSuccessProps {
  email: string
  callbackData: any
}
const PaymentSuccess = ({ email, callbackData }: PaymentSuccessProps) => {
  return (
    <div className="flex flex-col items-center justify-center w-[70%] mt-4">
      <div>
        <BadgeCheck size={40} color="green" />
      </div>
      <p className="text-neutralGrey mt-4 text-lg text-center">
        Yohoo! Check your email <strong>{callbackData?.recipientEmail}</strong> and phone number <strong>{callbackData?.recipientPhoneNumber}</strong> for the tickets and see you at the event!
      </p>
    </div>
  )
}

export default PaymentSuccess
