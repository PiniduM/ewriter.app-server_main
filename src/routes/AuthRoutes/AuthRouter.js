import { Router } from "express";

import validateAndRegister from "./register/validateAndRegister.js";
import validateAndLogin from "./login/validateAndLogin.js";
import verifyGmail from "./verifyGmail/verifyGmail.js";

const authRouter = Router();

authRouter.post("/register",(req, res) => {validateAndRegister(req.body, res)});

authRouter.post("/login",(req, res) => {validateAndLogin(req.body, res)});

authRouter.post("/profile",(req, res) => {validateAndLogin(req.body, res)});

authRouter.post("/verifygmail",(req, res) => {verifyGmail(req.body, res)});


export default authRouter;