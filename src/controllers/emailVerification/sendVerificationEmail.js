import db from "../maindbConnection.js";

import transporter from "./nodemailerTransporter.js";
import createMail from "./createMailOptions.js";

const sendVerificationEmail = (gmailAddress, res) => {
  const verificationCode = Math.floor(100000 + Math.random() * 900000);

  const sql =
    "INSERT INTO verifing_users (gmail, verification_code, expiration_date) VALUES (?, ?, DEFAULT);";
  const values = [gmailAddress, verificationCode];
  db.query(sql, values)
    .then((result) => {
      console.log(result);
      console.log("added_to_verifing_email_list");
      const mail = createMail(gmailAddress, verificationCode);
      transporter.sendMail(mail, (error, info) => {
        if (error) {
          console.log(error);
          console.log("unhandled error");
          res.status(500).send("unknown_error");
        } else {
          console.log(info);
          console.log("verification_gmail_sent");
          res.status(200).json({gmail :gmailAddress});
        }
      });
    })
    .catch((err) => {
      console.log(err);
      if(err.code === "ER_DUP_ENTRY") {
      res.status(406).send("VC_alredy_sent");
      //if occured in register route crucial
      }else {
      res.status(500).send("unknown_error")
      }
    });
};

export default sendVerificationEmail;
