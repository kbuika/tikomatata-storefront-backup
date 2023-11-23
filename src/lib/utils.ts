import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { toast } from "react-toastify"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const truncateText = (text: string, length: number) => {
  if (text?.length <= length) return text
  return text?.slice(0, length) + "..."
}

export const errorToast = (message: string | unknown, duration=4000) => {
  toast.error(`Error: ${message}`, {
    autoClose: duration,
    pauseOnHover: true,
    position: toast.POSITION.TOP_RIGHT,
  })
}

export const warningToast = (message: string | unknown, duration=4000) => {
  toast.warning(`Alert: ${message}`, {
    autoClose: duration,
    pauseOnHover: true,
    position: toast.POSITION.TOP_RIGHT,
  })
}

export const successToast = (message: string) => {
  toast.success(`Yoohoo: ${message}`, {
    autoClose: 4000,
    pauseOnHover: true,
    position: toast.POSITION.TOP_RIGHT,
  })
}

export const generateReferenceCode = (length=12) => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let referenceCode = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    referenceCode += characters[randomIndex];
  }

  return referenceCode;
}

export const maskEmail = (email: string): string  => {
  if(!email) return ""
  const [localPart, domain] = email?.split('@');

  const maskedLocalPart =
    localPart.length > 2
      ? localPart.substring(0, 2) + '*'.repeat(localPart.length - 2)
      : '*'.repeat(localPart.length);

  const maskedEmail = `${maskedLocalPart}@${domain}`;

  return maskedEmail;
}
