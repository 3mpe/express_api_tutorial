import { Request, Response, NextFunction, } from "express";
import { validationResult } from "express-validator";
import { decode } from 'jsonwebtoken';
import StatusCode from "../helpers/StatusCode";

export default async (req: Request, resp: Response, next: NextFunction) => {
   try {
       const isAuthUrl = req.url.indexOf('/auth/') > -1;
       if (isAuthUrl) {
           return next();
       }


       validationResult(req).throw();
       let access_token = req.headers.access_token;
       if (typeof access_token === "string") {
           req.body.user = await decode(access_token, { json: true });
       }
       next();
   }
   catch (e) {
       return resp.status(StatusCode.Unauthorized).json(e)
   }
}