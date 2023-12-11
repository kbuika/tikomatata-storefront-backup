import { Redis } from "@upstash/redis";
import { NextRequest, NextResponse } from "next/server";

const redis = Redis.fromEnv()
export const runtime ="edge";

export default async function views(req: NextRequest): Promise<NextResponse> {
    if(req.method !== "POST"){
        return new NextResponse("Request should be POST", { status: 405 })
    }
    if(req.headers.get("Content-Type") !== "application/json") {
        return new NextResponse("content must be JSON", { status: 400 })
    }
    if(process.env.NODE_ENV !== "production"){
        return new NextResponse("Page views count paused in development", { status: 201 })
    }

    const body = await req.json();
    let eventId: string | undefined = undefined;
    let date: string | undefined = undefined;
    if("eventId" in body){
        eventId = body.eventId;
    }
    if ("date" in body) {
        date = body.date;
    } else {
        date = new Date().toISOString().split("T")[0]; // Use the current date if not provided
    }
    
    if(!eventId) {
        return new NextResponse("eventId not found", { status: 400 })
    }
    const ip = req.ip
    if(ip) {
        // hash the IP
        const buf = await crypto.subtle.digest(
            "SHA-256",
            new TextEncoder().encode(ip)
        )
        const hash = Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, "0")).join("")

        const isNew = await redis.set(["deduplicate", hash, `event-${eventId}`, date].join(":"), true, {
            nx: true,
            ex: 24 * 60 * 60
        });
        if(!isNew) {
            new NextResponse(null, { status: 200 })
        }
    }
    await redis.incr(["pageviews", "page", `event-${eventId}`, date].join(":"))

    return new NextResponse(null, { status: 200 })
}