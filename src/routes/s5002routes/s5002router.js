import { Router } from "express";
import updateProfile_created from "./updateProfile_created/updateProfile_created.js";


const s5002Router = Router();



s5002Router.post("/profilecreated",(req,res) => updateProfile_created(req.body,res));


export default s5002Router;


//manage requests from server 5002