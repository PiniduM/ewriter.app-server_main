import db from "../../../controllers/maindbConnection.js";

import sendVerificationgmail from "../../../controllers/emailVerification/sendVerificationEmail.js";
import handleFailedResponse from "./controllers/handleFailedResponse.js";

const validateAndRegister = async (userData, res) => {
  console.log("register req came");

  const username = userData.username;
  const password = userData.password;
  const gmail = userData.gmail;

  //testing frontend
 // res.status(200).json({ message: "verification_sent", gmail});
  //return;

  console.log(username, password, gmail);
  // validators ....................................
  const usernameRegex = /^(?=.*\d)(?=.*[a-z])[a-zA-Z\d]{6,20}$/;

  if (!usernameRegex.test(username)) {
    res.status(406).send("username_invalid");
    return;
  }

  const pwdRegex = /^(?=.*[a-z])(?=.*\d)[A-Za-z\d]{6,25}$/;

  if (!pwdRegex.test(password)) {
    res.status(406).send("pwd_invalid");
    return;
  }

  const gmailRegex = /^[a-zA-Z0-9._%+-]+@(gmail|googlemail)\.com$/i;
  //const emailRegex =
    ///^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;

  if (!gmailRegex.test(gmail)) {
    res.status(406).send("gmail_invalid");
    return;
  }
  // validators ....................................

  // db.query(
  //   "INSERT INTO user_data (username, password, gmail, verified) VALUES (?, ?, ?, ?);",
  //   [username, password, gmail, "n"],
  //   (err, result) => {
  //     if (err) {
  //       console.log(err, "by sql");
  //       handleSqlErrors(err, res);
  //     } else {
  //       console.log("registered");
  //       sendVerificationgmail(gmail, res);
  //       // res is send as a argument since the function shows async behaviors but cannot use ther or catch
  //       // modify if possible
  //     }
  //   }
  // );
  const sql = "INSERT INTO users (username, password, gmail) VALUES (?, ?, ?);";
  const values = [username, password, gmail];

  db.query(sql,values)
  .then (result => {
    console.log(result);
    console.log("registered");
    sendVerificationgmail(gmail,res);
  })
  .catch (err => {
    console.log(err, "  at registration");
    handleFailedResponse(err,res);
  });

};

export default validateAndRegister;
