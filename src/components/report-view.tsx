import { useEffect } from "react"

export const ReportView: React.FC<{eventId: string}> = ({ eventId }) => {
    useEffect(() => {
        fetch("/api/views", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ eventId })
        })
    }, [eventId])
    return null
}