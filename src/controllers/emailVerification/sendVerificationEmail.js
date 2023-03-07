import db from "../maindbConnection.js";

import transporter from "./nodemailerTransporter.js";
import createMail from "./createMailOptions.js";

const sendVerificationEmail = (gmailAddress) => {
  return new Promise((resolve,reject) => {

  const verificationCode = Math.floor(100000 + Math.random() * 900000);

  const sql =
    "REPLACE INTO verifing_users (gmail, verification_code, expiration_date) VALUES (?, ?, DEFAULT);";
  const values = [gmailAddress, verificationCode];
  db.query(sql, values)
    .then(() => {
      const mail = createMail(gmailAddress, verificationCode);
      transporter.sendMail(mail, (error, info) => {
        if (error) {
          reject("unknown_error");
        } else {
          resolve(gmailAddress);
        }
      });
    })
    .catch((err) => {
      reject("unknown_error");
    });
  });
};


export default sendVerificationEmail;
