import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"

interface OrderState {
  customerDetails: any
  orderDetails: any
  referenceObject: any
  setReferenceObject: (referenceObject: any) => void
  setCustomerDetails: (customerDetails: any) => void
  setOrderDetails: (orderDetails: any) => void
  resetOrderDetails: () => void
}

export const useOrderStore = create<OrderState>()(
  persist(
    (set) => ({
      customerDetails: {},
      orderDetails: {},
      referenceObject: {},
      setReferenceObject: (referenceObject) => set(() => ({ referenceObject: referenceObject })),
      setCustomerDetails: (customerDetails) => set(() => ({ customerDetails: customerDetails })),
      setOrderDetails: (orderDetails) => set(() => ({ orderDetails: orderDetails })),
      resetOrderDetails: () => set(() => ({ referenceObject: {}, customerDetails: {} })),
    }),
    {
      name: "order-storage", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
    },
  ),
)
