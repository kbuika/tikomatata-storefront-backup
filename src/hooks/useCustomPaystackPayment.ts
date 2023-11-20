import { useEffect, useState } from 'react';
import { usePaystackPayment } from 'react-paystack';
import { errorToast } from '@/lib/utils';
import { PaystackProps } from "react-paystack/dist/types";
import { callback } from '@/types';

interface CustomPaymentProps {
    config: PaystackProps,
    onSuccess: callback,
    onClose: () => void
}

// TODO: Post-mortem this solution
const useCustomPaystackPayment = ({config, onSuccess, onClose}: CustomPaymentProps) => {
  const [paymentReference, setPaymentReference] = useState(config.reference);

  const initializePayment = usePaystackPayment({
    ...config,
    reference: paymentReference,
  });

  useEffect(() => {
    if (paymentReference) {
      initializePayment(onSuccess, onClose);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paymentReference]);

  const handlePayment = (newReference: string) => {
    if (newReference) {
      setPaymentReference(newReference);
    } else {
      errorToast('Invalid payment reference.');
    }
  };

  return {
    handlePayment,
  };
};

export default useCustomPaystackPayment;
