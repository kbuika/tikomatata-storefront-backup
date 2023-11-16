// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { generateReferenceCode } from "@/lib/utils"
import type { NextApiRequest, NextApiResponse } from "next"
import nodeHtmlToImage from "node-html-to-image"
import fs from "fs"
import moment from "moment"
import path from "path"

type Data = {
  name?: string
  message?: string
  image?: Buffer
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  console.log("req.method", req.method)
  if (req.method === "POST") {
    const { ticket, event } = req.body
    const ticketTemplate = `<html lang="en">
  <head>
    <style>
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
  
      body,
      html {
        height: auto;
        display: grid;
        font-family: "Nunito", sans-serif;
        color: black;
        font-size: 14px;
        letter-spacing: 0.1em;
        background-color: #150620;
      }
  
      .ticket {
        color: black;
        font-size: 14px;
        letter-spacing: 0.03px;
        margin: auto;
        display: flex;
        flex-direction: column;
        background: white
      }
  
      .top-div {
        background-color: #f7edff;
        position: relative;
        height: 250px;
        padding: 0 50px;
      }
  
      .center-content {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }
  
      .top-logo {
        margin-top: 1.5em;
      }
  
      .title {
        color: #150620;
        font-size: 20px;
        font-family: Nunito;
        font-weight: 600;
        margin-top: 1em;
        width: 100%;
        text-align: center;
      }
  
      .title-desc {
        margin-top: 10px;
        width: 100%;
        text-align: center;
        font-size: 0.7em;
      }
  
      .qr-code-main-div {
        width: 100%;
        background-color: transparent;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 1em;
      }
  
      .qr-code-div {
        width: 190px;
        height: 190px;
        margin-top: 10px;
        position: absolute;
        top: 130px;
      }
      .qr-code-image {
        width: 100%;
        height: 100%;
      }
  
      .details-div {
        margin-top: 7em;
        padding: 0 50px;
      }
  
      .details-div h4 {
        font-weight: 400;
        font-size: 0.9em;
      }
      .details-div p {
        font-weight: 700;
        margin-top: 4px;
        margin-bottom: 5px;
        font-size: 0.9em;
      }
  
      .detail {
        font-weight: 700;
        margin-top: 4px;
        margin-bottom: 4px;
        font-size: 0.9em;
      }
  
      .date-time-div {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
      }
  
      .date-time-div div {
        width: 50%;
      }
  
      .footer {
        margin-top: 2em;
        height: 8vh;
        background-color: #f7edff;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    </style>
  </head>
  <body>
    </div>
    <div class="ticket" id="ticket">
      <div class="top-div">
        <div class="center-content top-logo" style="width:100%;display:flex;align-items: center;justify-content: center;">
          <img
            src="https://dev.tikomatata.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ftikomatata.953bdde3.png&w=1200&q=75"
            alt="tikomatata logo"
            width="79"
            height="17"
          />
        </div>
        <div class="center-content">
          <h1 class="title">Ticket to #EVENTNAME</h1>
        </div>
        <div class="center-content">
          <p class="title-desc">
            Share the QR code below at the gate and you'll be good to go!
          </p>
        </div>
        <div class="center-content qr-code-main-div">
          <div class="center-content qr-code-div">
            #IMAGE
          </div>
        </div>
      </div>
    
      <div class="details-div">
        <div>
          <h4>Name</h4>
          <p class="detail">#PERSONNAME</p>
        </div>
        <div>
          <h4>Phone Number</h4>
          <p>#PHONE</p>
        </div>
        <div>
          <h4>Ticket Name</h4>
          <p>#TICKETNAME</p>
        </div>
        <div>
          <h4>Location</h4>
          <p>#LOCATION</p>
        </div>
        <div class="date-time-div">
          <div>
            <h4>Date</h4>
            <p>#DATE</p>
          </div>
          <div>
            <h4>Time</h4>
            <p>#TIME</p>
          </div>
        </div>
      </div>
      <div class="footer" style="width:100%;display:flex;align-items: center;justify-content: center;">
        <img
          src="https://dev.tikomatata.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ftikomatata.953bdde3.png&w=1200&q=75"
          alt="tikomatata logo"
          width="79"
          height="17"
        />
      </div>
    </div>
    
  </body>
  </html>
  
  `
    const startDateTime = `${event?.eventStartDate} ${event?.eventStartTime}`

    let template = ticketTemplate.replaceAll(
      "#IMAGE",
      `<img alt="qr-code" class="qr-code-image" id="qr_code_image" src="${ticket?.ticketUrl}"/>`,
    )
    template = template.replace("#EVENTNAME", event?.eventName)
    template = template.replace("#TICKETNAME", ticket?.name || ticket?.ticketType)
    template = template.replace("#PERSONNAME", event?.recipientName)
    template = template.replace("#PHONE", event?.recipientPhoneNumber)
    template = template.replace("#LOCATION", event?.location)
    template = template.replace("#DATE", `${moment(startDateTime).format("DD MMM YYYY")}`)
    template = template.replace("#TIME", `${moment(startDateTime).format("HH:mm")}`)

    try {
      const image = await nodeHtmlToImage({
        html: template,
        quality: 100,
      })
      res.setHeader("Content-Type", "image/png")
      res.setHeader("Content-Disposition", "attachment; filename=image.png")
      res.status(200).send(image)
      return
    } catch (e) {
      console.log("e", e)
      res.status(500).send(e)
      return
    }
  } else {
    res.status(405)
    return
  }
}
