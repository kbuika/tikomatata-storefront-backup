import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { toast } from "react-toastify"
import { EventDataType } from "@/types/event"
import { TicketDataType } from "@/types/ticket"

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

export const removePlusInPhone = (phone: string): string => {
  return phone.replace(/\+/g, '');
}

export const getPastEvents = (events: EventDataType[]): EventDataType[] => {
  const currentDate = new Date()
  return events?.filter((event: EventDataType) => {
    const eventEndDate = new Date(`${event.endDate}T${event?.endTime}:00Z`);

    return eventEndDate < currentDate
  })
}

export function sortTickets(tickets: TicketDataType[] | null | undefined): TicketDataType[] {
  if(!tickets) return []
  return tickets.sort((a, b) => {
    const quantityA = Number(a.quantity);
    const quantityB = Number(b.quantity);
    
    if (quantityA === 0 && quantityB !== 0) return 1;
    if (quantityB === 0 && quantityA !== 0) return -1;
    return 0;
  });
}
