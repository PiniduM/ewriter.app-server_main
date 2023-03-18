import queryOnMainDB from "../../../controllers/queryOnMainDB.js";

const verifyGmail = (data, res) => {
  const gmail = data.gmail;

  const gmailRegex =
    /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;

  if (!gmailRegex.test(gmail)) {
    res.status(406).send("gmail_invalid");
    return;
  }

  const verificationCode = data.verificationCode;

  const verificatioCodeRegex = /^\d{6}$/;

  if (!verificatioCodeRegex.test(verificationCode)) {
    res.status(406).send("code_malformed");
    return;
  }

  const sqlQ1 = `DELETE FROM verifing_users WHERE gmail = ? AND verification_code = ? LIMIT 1`;
  const valuesQ1 = [gmail, verificationCode];
  queryOnMainDB(sqlQ1, valuesQ1)
    .then((result) => {
      if (result[0].affectedRows === 1) {
        //update user table
        const sqlQ2 =
          "UPDATE users SET verified = 'y' WHERE gmail = ? LIMIT 1;";
        const valuesQ2 = [gmail];
        queryOnMainDB(sqlQ2, valuesQ2)
          .then((result) => {
            if (result[0].affectedRows === 1) {
              res.status(200).send("verified");
            } else {
              res.status(500).send("not_a_user");
              //not necessary 
            }
          })
          .catch(() => {
            res.status(500).send("unknown_err");
            return;
          });
      } else {
        res.status(406).send("not_matching");
      }
    })
    .catch(() => {
      res.status(500).send("unknown_error");
      return;
    });
};

export default verifyGmail;
