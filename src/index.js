import express,{json} from "express";
import cors from "cors";
import dotenv from "dotenv"


import clearExpiredVerifications from "./controllers/emailVerification/clearExpiredVerifications.js";

import validateAndRegister from "./controllers/validateAndRegister.js";
//import sendVerificationEmail from "./controllers/emailVerification/sendVerificationEmail.js";

dotenv.config();

clearExpiredVerifications(300000);

const app = express();

app.use(cors());
app.use(json());


app.post("/ewriter/register",(req, res) => {validateAndRegister(req.body, res)})

//app.post("/ewriter/sendverification",(req, res) => {sendVerificationEmail(req.body, res)})........................verification emails are send only in  register and loging (most efficent and secure way)
//app.post("/ewriter/sendverifyemail",(req, res) => {verifyEmail(req.body, res)}) ..................... seems to be a unnecessary route delete if no errors encounter


app.listen(5001, () => {console.log("listening to port 5001")});