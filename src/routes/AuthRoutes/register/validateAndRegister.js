import db from "../../../controllers/maindbConnection.js";

import sendVerificationgmail from "../../../controllers/emailVerification/sendVerificationEmail.js";

const validateAndRegister = async (userData, res) => {

  const username = userData.username;
  const password = userData.password;
  const gmail = userData.gmail;

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

  const sql = "INSERT INTO users (username, gmail, password) VALUES (?, ?, ?);";
  const values = [username, gmail, password];

  db.query(sql, values)
    .then(() => {
      sendVerificationgmail(gmail)
        .then((gmail) => res.status(200).json({ gmail }))
        .catch(() => res.status(500).send("unknown_error"));
    })
    .catch((err) => {
      if (err.code === "ER_DUP_ENTRY") {
        if (err.sqlMessage.includes("gmail", 32)) {
          res.status(406).send("duplicate_gmail");
        } else if (err.sqlMessage.includes("username", 32)) {
          res.status(406).send("duplicate_username");
        } else {
          res.status(500).send("unknown_error");
        }
      } else {
        res.status(500).send(err);
      }
    });
};

export default validateAndRegister;
