import Jwt from "jsonwebtoken";
import queryOnMainDB from "../../../controllers/queryOnMainDB.js";

import sendVerificationgmail from "../../../controllers/emailVerification/sendVerificationEmail.js";

const validateAndLogin = (userData, res) => {
  const identifier = userData.identifier;

  //expecting a username if email sends logics changes dynamically
  let userameIdentifier = true;

  const usernameRegex = /^(?=.*\d)(?=.*[a-z])[a-zA-Z\d]{6,20}$/;
  const gmailRegex = /^[a-zA-Z0-9._%+-]+@(gmail|googlemail)\.com$/i;

  if (usernameRegex.test(identifier)) {
    //do nothing
  } else if (gmailRegex.test(identifier)) {
    userameIdentifier = false;
  } else {
    res.status(406).send("invalid_identifier");
    return;
  }

  const password = userData.password;

  const pwdRegex = /^(?=.*[a-z])(?=.*\d)[A-Za-z\d]{6,25}$/;

  if (!pwdRegex.test(password)) {
    res.status(406).send("pwd_invalid");
    return;
  }

  const sql = `SELECT ${
    userameIdentifier ? "gmail" : "username"
  },id,verified,profile_created FROM users WHERE ${
    userameIdentifier ? "username" : "gmail"
  } = ? AND password = ? LIMIT 1;`;
  const values = [identifier, password];
  queryOnMainDB(sql, values)
    .then((result) => {
      const users = result[0];
      if (users.length !== 1) {
        res.status(406).send("username_pwd_incorrect");
        return;
      } else {
        const user = users[0];
        const id = user.id;
        const username = userameIdentifier ? identifier : user.username;
        const gmail = userameIdentifier ? user.gmail : identifier;
        const verified = user.verified;
        const profileCreated = user.profile_created;

        if (verified !== "y") {
          sendVerificationgmail(gmail)
            .then((gmail) => res.status(200).json({ gmail }))
            .catch((err) => {
              console.log(err);
              res.status(500).send("gmail_error");
            });
          return;
        } else {
          const secret_key = process.env.JWTSECRET;

          const payload = {
            username,
            gmail,
            id,
          };
          const options = {
            expiresIn: "3h",
          };

          // add 1h to cookie time
          const token = Jwt.sign(payload, secret_key, options);

          res.status(200).json({
            username,
            token,
            profileCreated,
          });
          return;
        }
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("db_error");
      return;
    });
};

// use callbacks method in mysql if performance issues came db.query in mysql2/promise returns columns definitions
export default validateAndLogin;
