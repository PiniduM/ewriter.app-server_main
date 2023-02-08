import db from "../../../controllers/maindbConnection.js";

const verifyGmail = (data, res) => {
  console.log("req came");
  const gmail = data.gmail;

  const gmailRegex =
    /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;

  if (!gmailRegex.test(gmail)) {
    res.status(406).send("gmail_invalid");
    console.log("gmail_invalid");
    return;
  }

  const verificationCode = data.verificationCode;

  const verificatioCodeRegex = /^\d{6}$/;

  if (!verificatioCodeRegex.test(verificationCode)) {
    res.status(406).send("code_malformed");
    console.log("code_malformed");
    return;
  }

  const sqlQ1 = `DELETE FROM verifing_users WHERE gmail = ? AND verification_code = ? LIMIT 1`;
  const valuesQ1 = [gmail, verificationCode];
  db.query(sqlQ1, valuesQ1)
    .then((result) => {
      console.log(result);
      if (result[0].affectedRows === 1) {
        console.log("row deleated");
        //update user table
        const sqlQ2 =
          "UPDATE users SET verified = 'y' WHERE gmail = ? LIMIT 1;";
        const valuesQ2 = [gmail];
        db.query(sqlQ2, valuesQ2)
          .then((result) => {
            if (result[0].affectedRows === 1) {
              res.status(200).send("verified");
              console.log("verified");
            } else {
              res.status(500).send("not_in_user_table");
              console.log("not in users");
            }
          })
          .catch((err) => {
            console.log(err, "at update");
            res.status(500).send("unknown_err_at_update");
            return;
          });
      } else {
        console.log("not_a_matching_combination");
        res.status(406).send("gmail_Vcode_not_matching");
      }
    })
    .catch((err) => {
      console.log(err, "at delete");
      res.status(500).send("unknown_error_at_delete");
      return;
    });
  // db.query(sql, [gmail, verificationCode], (err, result) => {
  //   if (err) {
  //     console.log(err, "at delete");
  //     res.status(500).send("unknown_error_at_delete");
  //     return;
  //   }
  //   console.log(result);
  //   if (result.affectedRows === 1) {
  //     console.log("row deleted");
  //     // update users table
  //     const updatingSQL = "UPDATE user_data SET verified = 'y' WHERE gmail = ? LIMIT 1;";
  //     db.query(updatingSQL, [gmail], (err, result) => {
  //       if (err) {
  //         console.log(err, "at update");
  //         res.status(500).send("unknown_err_at_update");
  //         return;
  //       }
  //       if (result.affectedRows === 1) {
  //           res.status(200).send("verified");
  //           console.log("verified");
  //       }else {
  //       res.status(500).send("not_in_user_table");
  //       console.log("not in users");
  //       }
  //     });
  //   } else if (result.affectedRows > 1) {
  //     console.log("morethan 1 row deleted");
  //     res.status(500).send("unknown_error");
  //     // crucial situation inform using a email or other method
  //   } else {
  //     console.log("not a matching email-verification code  combination");
  //     res.status(406).send("not_matching");
  //   }
  // });
};

export default verifyGmail;
