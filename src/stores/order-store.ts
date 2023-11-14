import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"

interface OrderState {
  downloadOrderId: any
  customerDetails: any
  orderDetails: any
  referenceObject: any
  setDownloadOrderId: (downloadOrderId: any) => void
  setReferenceObject: (referenceObject: any) => void
  setCustomerDetails: (customerDetails: any) => void
  setOrderDetails: (orderDetails: any) => void
  resetOrderDetails: () => void
}

export const useOrderStore = create<OrderState>()(
  persist(
    (set) => ({
      downloadOrderId: "",
      customerDetails: {},
      orderDetails: {},
      referenceObject: {},
      setDownloadOrderId: (downloadOrderId) => set(() => ({ downloadOrderId: downloadOrderId })),
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
