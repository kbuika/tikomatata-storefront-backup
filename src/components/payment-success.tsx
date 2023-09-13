import { BadgeCheck } from "lucide-react"

interface PaymentSuccessProps {
  email: string
}
const PaymentSuccess = ({ email }: PaymentSuccessProps) => {
  return (
    <div className="flex flex-col items-center justify-center w-[70%] mt-4">
      <div>
        <BadgeCheck size={40} color="green" />
      </div>
      <p className="text-neutralGrey mt-4 text-lg text-center">
        Yohoo! Check your email {email} for the tickets and see you at the event!
      </p>
    </div>
  )
}

export default PaymentSuccess
