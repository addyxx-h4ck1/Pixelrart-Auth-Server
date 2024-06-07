require('dotenv').config()
const { google } = require('googleapis')
const nodemailer = require('nodemailer')

const sendResetLink = async (token, email) => {
  //google auth
  const oAuth2Client = new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    process.env.REDIRECT_URI
  )
  oAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN })

  try {
    const accessToken = await oAuth2Client.getAccessToken()
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        //change the user with the one you've permitted to use thus API on the google console
        user: 'business.briann@gmail.com',
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN,
        accessToken: accessToken,
      },
    })

    const mailOptions = {
      from: `PixelRart Team <no-reply@gmail.com>`,
      to: `${email}`,
      subject: `Reset Password Request`,
      text: `Ooops! This service only supports html email. Cannot change your password, please contact support for assistance. Best regards, PixelRart`,
      html: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Pixelrart | Email Reset</title>
  </head>
  <body
    style="
      font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
      display: flex;
      flex-direction: column;
      align-items: center;
      line-height: 1.7rem;
    "
  >
    <section
      style="
        padding: 1rem;
        max-width: 500px;

        border-radius: 10px;
        display: flex;
        flex-wrap: wrap;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      "
    >
      <div>
        <h1
          style="
            padding-bottom: 1rem;
            width: 100%;
            border-bottom: 0.2px solid #00000057;
          "
        >
          Reset Password
        </h1>
        <p style="font-weight: 800">Dear User,</p>
        <p>
          We received a request to change your password. If this was you, please
          follow the instructions provided by clicking the link below: Please note the the link will expire after 3 minutes.
        </p>
        <p>
          <a href="https://auth-copiq6djm4es73a4js7g.onrender.com/api/reset-password/${token}"
            ><button
              style="
                padding: 20px 20px;
                width: 100%;
                border-radius: 5px;
                border: 0;
                outline: 0;
                background-color: #3666f6;
                font-weight: 600;
                color: white;
              "
            >
              Reset Password
            </button></a
          >
        </p>
        <p>
          If you did not request to change your password, please ignore this
          email. Your account security is important to us.
        </p>
        <p>Best regards,</p>
        <p style="color: rgb(5, 203, 203)">&copy; PixelRart.&trade;</p>
      </div>
    </section>
  </body>
  <style>
    body {
      font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;

      display: flex;
      flex-direction: column;
      align-items: center;

      line-height: 2rem;
      font-size: 17px;
    }
    section {
      padding: 2rem;
      max-width: 500px;

      border-radius: 10px;
      display: flex;
      flex-wrap: wrap;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }

    section div {
      width: 100%;
    }
    section img {
      width: 100%;
      height: 70px;
      object-fit: contain;
      display: block;
    }
  </style>
</html>
`,
    }

    return (success = await transporter.sendMail(mailOptions))
  } catch (error) {
    throw new Error(error)
  }
}

module.exports = { sendResetLink }
