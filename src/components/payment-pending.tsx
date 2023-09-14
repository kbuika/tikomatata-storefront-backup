import { Loader2, XCircle } from "lucide-react"
import CustomButton from "./ui/custom-button"

const PaymentPending = ({setPaymentState, paymentUrl}: any) => {

    const redirectForPayment = () => {
        window.open(paymentUrl)
        setPaymentState("pending")
    }
  return (
    <div className="flex flex-col items-center justify-center w-[70%] mt-4">
      <div>
        <Loader2 size={40} color="green" className="animate-spin" />
      </div>
      <p className="text-neutralGrey mt-4 text-lg text-center">
        Processing your payment...You will be redirected to the payment page shortly. If you are not redirected, please click the button below.
      </p>
      <CustomButton className="mt-4 w-[40%]" onClick={redirectForPayment}>Complete order</CustomButton>

    </div>
  )
}

export default PaymentPending
