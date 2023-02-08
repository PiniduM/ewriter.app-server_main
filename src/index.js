import express,{json} from "express";
import cors from "cors";
import dotenv from "dotenv"


import clearExpiredVerifications from "./controllers/emailVerification/clearExpiredVerifications.js";
import authRouter from "./routes/AuthRoutes/AuthRouter.js";
import s5002Router from "./routes/s5002routes/s5002router.js";

//import validateAndRegister from "./routes/AuthRoutes/register/validateAndRegister.js";
//import validateAndLogin from "./routes/AuthRoutes/login/validateAndLogin.js";
//import verifyGmail from "./routes/AuthRoutes/verifyGmail/verifyGmail.js";




dotenv.config();
const app = express();

app.use(cors());
app.use(json());


app.use("/ewriter",authRouter);

app.use("/s5002",s5002Router);
//app.post("/ewriter/register",(req, res) => {validateAndRegister(req.body, res)});

//app.post("/ewriter/login",(req, res) => {validateAndLogin(req.body, res)});

//app.post("/ewriter/profile",(req, res) => {validateAndLogin(req.body, res)});

//app.post("/ewriter/verifygmail",(req, res) => {verifyGmail(req.body, res)});

//app.post("/ewriter/sendverification",(req, res) => {sendVerificationEmail(req.body, res)})........................verification emails are send only in  register and loging (most efficent and secure way)
//app.post("/ewriter/sendverifyemail",(req, res) => {verifyEmail(req.body, res)}) ..................... seems to be a unnecessary route delete if no errors encounter


app.listen(5001, () => {
    console.log("listening to port 5001");
    clearExpiredVerifications(300000);
});