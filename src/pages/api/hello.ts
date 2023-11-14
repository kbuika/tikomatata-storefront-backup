// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { generateReferenceCode } from "@/lib/utils"
import type { NextApiRequest, NextApiResponse } from "next"
import nodeHtmlToImage from "node-html-to-image"
import fs from "fs"

type Data = {
  name?: string
  message?: string
  image?: Buffer
}

export default function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  const imgName = generateReferenceCode()
  const path = `./${imgName}.png`
  nodeHtmlToImage({
    output: path,
    html: `
    <!DOCTYPE html>
<html>
<head>
    <style>
        @import url("https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;600;800&display=swap");

        body {
            font-size: 16px;
            font-family: "Nunito", Arial, sans-serif;
            margin: 0 auto;
            background-color: #ddbdf4;
        }

        .container {
            width: 600px;
            height: auto;
            margin: 10px auto;
            border-radius: 4px;
            background-color: #ffffff;
            color: #3c0862;
            box-shadow: 0 8px 16px rgba(35, 51, 64, 0.25);
        }

        .column-1 {
            float: left;
            width: 600px;
            height: auto;
            color: #3c0862;
        }

        .column-2 {
            float: right;
            width: auto;
            height: 400px;
        }

        .text-frame {
            padding: 40px;
            height: auto;
            background-color: #3c0862;
        }

        .qr-holder {
            position: relative;
            width: 160px;
            height: 160px;
            margin: 20px;
            background-color: #fff;
            text-align: center;
            line-height: 30px;
            z-index: 1;
        }

        .qr-holder > img {
            margin-top: 20px;
        }

        .event {
            font-size: 24px;
            color: #fff;
            letter-spacing: 1px;
        }

        .date {
            font-size: 18px;
            line-height: 30px;
            color: #a8bbf8;
        }

        .name,
        .ticket-id {
            font-size: 16px;
            line-height: 22px;
            color: #fff;
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
            font-size: 22px;
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
            width: 250px;
            height: 230px;
            margin-top: 10px;
            position: absolute;
            top: 100px;
        }

        .qr-code-image {
            width: 100%;
            height: 100%;
        }

        #download-button {
            width: 600px;
            background-color: #3c0862;
            color: #fff;
            border: none;
            padding: 10px 20px;
            border-radius: 4px;
            cursor: pointer;
        }
    </style>
</head>
<body>
<div style="text-align: center; margin-top: 15px">
    <button id="download-button">Download ticket</button>
</div>
<div class="container" id="ticket">
    <div class="top-div">
        <div class="center-content">
            <h1 class="title">Ticket to WASH WASH</h1>
        </div>
        <div class="center-content">
            <p class="title-desc">
                Share the QR code below at the gate and you'll be good to go!
            </p>
        </div>
        <div class="center-content qr-code-main-div">
            <div class="center-content qr-code-div">
                <img alt="qr-code" class="qr-code-image" id="qr_code_image" src="https://tm-posters.blr1.cdn.digitaloceanspaces.com/posters/135e96b1-f0b0-45b4-b11e-b944e057c6f2.png"/>
            </div>
        </div>
    </div>
    <div class="column-1">
        <div class="text-frame">
            <br/>
            <div class="name" style="margin-top: 52px">Name</div>
            <div class="ticket-id" style="margin-top: 5px; font-weight: 600">
                WILLY THE DEV
            </div>
            <div class="name" style="margin-top: 12px">Phone</div>
            <div class="ticket-id" style="margin-top: 5px; font-weight: 600">
                254799930965
            </div>
            <div class="name" style="margin-top: 12px">Ticket Name</div>
            <div class="ticket-id" style="margin-top: 5px; font-weight: 600">
                Early Bird
            </div>
            <div class="name" style="margin-top: 12px">Location</div>
            <div class="ticket-id" style="margin-top: 5px; font-weight: 600">
                TEST
            </div>
            <div class="name" style="margin-top: 12px">Date</div>
            <div class="ticket-id" style="margin-top: 5px; font-weight: 600">
                2023-11-18
            </div>
            <div class="name" style="margin-top: 12px">Time</div>
            <div class="ticket-id" style="margin-top: 5px; font-weight: 600">
                12:00:00
            </div>
        </div>
        <div class="center-content" style="background-color: #d7bdea">
            <p>Sold by <a href="https://tikomatata.com" target="_blank" rel="noopener no-referrer">tikomatata.com</a>
            </p>
        </div>
    </div>
</div>
<div style="text-align: center; margin-top: 15px">
    <button id="download-button">Download ticket</button>
</div>
</body>
</html>
    `,
  })
    .then(() => {
      console.log("The image was created successfully!")

      // Read the image file
      const image = fs.readFileSync(path)

      // Set the appropriate content type for the response
      // res.setHeader("Content-Type", "image/png")

      // Send the image as the response

      // res.status(200).send(image)
    })
    .catch((err) => {
      console.log("The image was not created!", err)
      res.status(500).send("Image not created")
    })
    .finally(() => {
      // Delete the image file after sending the response
      // fs.unlinkSync(path)
      // console.log("The image file was deleted.")
      
    })
    res.end()
}
