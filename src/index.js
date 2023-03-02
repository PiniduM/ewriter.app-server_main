import express,{json} from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

import clearExpiredVerifications from "./controllers/emailVerification/clearExpiredVerifications.js";
import authRouter from "./routes/AuthRoutes/AuthRouter.js";
import s5002Router from "./routes/s5002routes/s5002router.js";

//import validateAndRegister from "./routes/AuthRoutes/register/validateAndRegister.js";
//import validateAndLogin from "./routes/AuthRoutes/login/validateAndLogin.js";
//import verifyGmail from "./routes/AuthRoutes/verifyGmail/verifyGmail.js";




const app = express();

app.use(cors());
app.use(json());

app.use("/ewriter",authRouter);

app.use("/s5002",s5002Router);


app.listen(5001, () => {
    console.log("listening to port 5001");
    clearExpiredVerifications(300000);
});