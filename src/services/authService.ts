import { Router, Request, Response, NextFunction } from "express";
import { randomBytes, pbkdf2 } from 'crypto';
import { sign } from 'jsonwebtoken';
import {oneOf, check, validationResult, body} from 'express-validator';

import { DIGEST, SECRET, LENGTH } from "./../config"
const authRouter: Router = Router();



authRouter.post(
    '/register',
    oneOf([check('username').exists(), check('password').exists()]),
    async (request: Request, response: Response) => {
        try {
            validationResult(request.body).throw();

            const salt = randomBytes(LENGTH).toString('base64');
            pbkdf2(request.body.toString(), salt, 100000, LENGTH, DIGEST, (err: any, hash: Buffer) => {
                if (err) throw err;

                return response.json({
                    hashed: hash.toString('hex'),
                    salt: salt
                });
            });
        } catch (e) {
            return response.json(e);
        }
    });


authRouter.post(
    '/login',
    oneOf([
        [check('username').notEmpty(), check('password').exists()]
    ]),
    (request: Request, response: Response) => {
        try {
           validationResult(request.body).throw();

            const data = request.body;
            pbkdf2(request.body.toString(), data.salt, 10000, length, DIGEST, (err: any, hash: Buffer) => {
                if (err) {
                    console.log(err);
                }

                // check if password is active
                if (hash.toString('hex') === data.hashedPassword) {

                    const token = sign({'user': data.username, permissions: []}, SECRET, { expiresIn: '7d' });
                    response.json({ token });

                } else {
                    response.json({message: 'Wrong password'});
                }

            });
        } catch (e) {
            return response.json(e);
        }
    });


export default authRouter;