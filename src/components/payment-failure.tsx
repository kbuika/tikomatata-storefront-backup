import { XCircle } from "lucide-react"
import CustomButton from "./ui/custom-button"

const PaymentFailure = () => {
  return (
    <div className="flex flex-col items-center justify-center w-[70%] mt-4">
      <div>
        <XCircle size={40} color="red" />
      </div>
      <p className="text-neutralGrey mt-4 text-lg text-center">
        Ooops! Could not complete the purchase. Please try again.
      </p>
      <CustomButton className="mt-4 w-[30%]">Retry</CustomButton>
    </div>
  )
}

export default PaymentFailure
