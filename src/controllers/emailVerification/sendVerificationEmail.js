import nodemailer from "nodemailer";

import db from "../maindbConnection.js";

const sendVerificationEmail = (data, res) => {
  // if (data.gmail) {
  //   const gmail = data.gmail;
  //   const gmailRegex =
  //     /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;

  //   if (!gmailRegex.test(gmail)) {
  //     res.status(406).send("gmail_invalid");
  //     return;
  //   }

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: "pmjuniorcomtec@gmail.com", // generated ethereal user
        pass: "zknjjbuaifidlipl", // generated ethereal password
      },
    });

    // generate verification code
    const verificationCode = Math.floor(100000 + Math.random() * 900000);

    // setup email data with unicode symbols
    let mailOptions = {
      from: '"e Writer" <pmjunior@gmail.com>', // sender address
      to: gmail, // list of receivers
      subject: "Verification Code", // Subject line
      text: `Your verification code is: ${verificationCode}`, // plain text body
      html: `<table style="width: 500px; margin: 0 auto; border-collapse: collapse;">
    <tr>
    <td style="background-color: #FFF5F1; padding: 20px; text-align: center;">
    <h1>e Writer</h1>
    </td>
    </tr>
    <tr>
        <td style="background-color: #f5f5f5; padding: 20px; font-size: 18px; text-align: center;">
            <p>Verification Code</p>
            <p style="font-size: 30px;"><b><span style="letter-spacing: 0.1rem;">${verificationCode}</span></b></p>
        </td>
        </tr>
        <tr>
        <td style="background-color: #f5f5f5; padding: 20px; font-size: 14px; text-align: center;">
        <p>This code will expire in 10 minutes.</p>
        <p>Please use it to verify your account.</p>
        </td>
        </tr>
        <tr>
        <td style="background-color: #FFF5F1; padding: 20px; text-align: center;">
        <p>Copyright © e Writer</p>
        </td>
        </tr>
        </table>`,
      // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      }
      else {
      // add to the database
      db.query(
        "INSERT INTO verifing_users (gmail, code_sent, expiration_date) VALUES (?, ?, DEFAULT);",
        [gmail, verificationCode]
      );
      console.log("done email");
      }
    });
//   } else {
//     res.status(400).send("no_email");
//     return;
//   }
};

sendVerificationEmail({ gmail: "sriyanigamage22@gmail.com" });

export default sendVerificationEmail;
