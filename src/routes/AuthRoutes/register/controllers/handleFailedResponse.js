const handleSqlErrors = (err,res) => {
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
};

export default handleSqlErrors;

// no need of returning sicnce this executes at the end of the code