import db from "./maindbConnection.js";

import sendVerificationgmail from "./emailVerification/sendVerificationEmail.js";

const validateAndRegister = (userData, res) => {
  console.log("req came");

  const username = userData.username;
  const password = userData.password;
  const gmail = userData.gmail;

  //const username = undefined;

  console.log(username, password, gmail);
  // validators ....................................
  const usernameRegex = /^(?=.*\d)(?=.*[a-z])[a-zA-Z\d]{6,20}$/;

  if (!usernameRegex.test(username)) {
    res.send("username_invalid");
    return;
  }

  const pwdRegex = /^(?=.*[a-z])(?=.*\d)[A-Za-z\d]{6,25}$/;

  if (!pwdRegex.test(password)) {
    res.send("pwd_invalid");
    return;
  }

  const gmailRegex =
    /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;

  if (!gmailRegex.test(gmail)) {
    res.send("gmail_invalid");
    return;
  }
  // validators ....................................

  db.query(
    "INSERT INTO user_data (username, password, gmail, verified) VALUES (?, ?, ?, ?);",
    [username, password, gmail, "n"],
    (err, result) => {
      if (err) {
        console.log(err, "by sql");
        if (err.code === "ER_DUP_ENTRY") {
          if (err.sqlMessage.includes("username", 32)) {
            res.status(406).send("duplicate_username");
          } else if (err.sqlMessage.includes("gmail", 32)) {
            res.status(406).send("duplicate_gmail");
          } else {
            res.status(500).send("unknown_error");
          }
        } else {
          res.ststus(500).send("unknown_error");
        }
      } else {
        console.log("registered");
        try {
          sendVerificationgmail(gmail);
          res.status(200).send("registered_verification_gmail_sent");
        } catch (err) {
          console.error(err);
          res.status(500).send("unknown error encountered");
        }
        return;
      }
      //else {
      //res.status(400).send("something_went_wrong");
      //}
    }
  );
};

export default validateAndRegister;
