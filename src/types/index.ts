import { PaystackProps } from "react-paystack/dist/types";
export type callback = (response?: any) => void;
type PaymentChannels = 'card'| 'mobile_money';


export interface PaystackHookType {
    onSuccess: callback;
    onClose: () => void;
    config: PaystackProps;
    payForTickets?: () => void;
    validateForm: () => true | false;
    paymentMethod: PaymentChannels;
    paymentReference: string;
    handleSubmit: (e: any) => void;
    initialized: boolean;
    setInitialized: (value: boolean) => void;

}