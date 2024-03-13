import { useMutation, useQueryClient } from "@tanstack/react-query"
import * as Sentry from "@sentry/nextjs"
import { PayForTicketParams, payViaMpesa } from "./api"
import { errorToast } from "@/lib/utils"

export const usePayViaMpesa = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ["payViaMpesa"],
    mutationFn: (payData: PayForTicketParams) => payViaMpesa(payData),
    onSettled: async (_, error) => {
      if (error) {
        errorToast("Could not complete payment. Please try again")
      }
    },
    onError: (error) => {
      errorToast("Could not complete payment. Please try again")
      if (process.env.NODE_ENV === "production") {
        Sentry.captureException(error)
        Sentry.captureMessage("Reserve ticket error")
      }
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["events"] })
    },
  })
}
