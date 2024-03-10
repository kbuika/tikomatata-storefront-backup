import axios, { AxiosInstance, AxiosError } from "axios"
import * as Sentry from "@sentry/nextjs"

const axiosInstance: AxiosInstance = axios.create({
  // Add other default configurations here if needed
})

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    // Handle successful responses
    return response
  },
  (error: AxiosError) => {
    Sentry.captureException(error) // Capture the error using Sentry
    return Promise.reject(error?.response?.data)
  },
)

export default axiosInstance
