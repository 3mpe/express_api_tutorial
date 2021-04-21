import { Router, Request, Response } from "express";
import { sign } from 'jsonwebtoken';
import {oneOf, check, validationResult, body} from 'express-validator';

import { SECRET } from "./../config"
const authRouter: Router = Router();

import User from "./../Models/User";
import StatusCode from "../helpers/StatusCode";


authRouter.post(
    '/register',
    oneOf([check('name').exists(), check('password').exists()]),
    async (request: Request, response: Response) => {
        try {
            validationResult(request.body).throw();

            const data = request.body;
            new User({ name: data.name,  password: data.password })
                .save()
                .then(() => {
                    const token = sign(data, SECRET, { expiresIn: '7d' });
                    return response.status(StatusCode.Success).json({ result: data, token });
                })
                .catch((e: any) => { response.status(StatusCode.BadRequest).json()  });

        } catch (e) {
            return response.json(e);
        }
    });


authRouter.post(
    '/login',
    oneOf([check('username').notEmpty(), check('password').exists()]),
    (request: Request, response: Response) => {
        try {
            validationResult(request.body).throw();

            const data = request.body;
            User
                .where('name', data.name)
                .where('password', data.password)
                .exec((err: any, result: any) => {
                    if (err) {
                        return response.status(StatusCode.BadRequest).json(err);
                    }

                    if (result === null) { return response.status(StatusCode.NoContent).json(err); }
                    else {
                        const token = sign({ name: result.name, password: result.password  }, SECRET, { expiresIn: '7d' });
                        return response.status(StatusCode.Success).json({ result, token });
                    }
                });

        } catch (e) {
            return response.json(e);
        }
    });


export default authRouter;