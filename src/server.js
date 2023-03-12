import express, { json } from "express";
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

// const corsOptions = {
//   origin: process.env.ALLOWED_ORIGIN,
//   methods: ["POST"],
// };
//sent with response.headers
app.use(cors());

const ALLOWED_ORIGINS = process.env.ALLOWED_ORIGINS.split(",");
app.use((req, res, next) => {
  console.log(req.headers.origin);
  if (ALLOWED_ORIGINS.includes(req.headers.origin)) next();
  else res.status(500).send("unexpected_error");
});

app.use(json());

app.use("/auth", authRouter);

app.use("/s5002", s5002Router);

app.listen(5001, () => {
  console.log("listening to port 5001");
  //clearExpiredVerifications(300000);
});
