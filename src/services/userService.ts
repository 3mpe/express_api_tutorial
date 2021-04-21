import { Router, Request, Response } from "express";

const userRouter = Router();
import User from "./../Models/User"
import StatusCode from "../helpers/StatusCode";
import {check, oneOf, validationResult} from "express-validator";


userRouter.get(
    "/",
    (request: Request, response: Response) => {
        User
        .find()
        .then((users: any) => {
                response
                    .status(StatusCode.Success)
                    .json({ users });
            })
            .catch((error: any) => {
                response.json(error);
            })
    });

userRouter.post(
    "/",
    oneOf([check('name').exists(), check('password').exists()]),
    (request: Request, response: Response) => {
        try {
            validationResult(request.body).throw();

            const data = request.body;

            new User({ name: data.name,  password: data.password })
                .save()
                .then(() => { response.status(StatusCode.Success).json(); })
                .catch((e: any) => { response.json(e)  });

        } catch (e) {
            return response.json(e);
        }
    });

userRouter.put("/",
    oneOf([check('_id').exists()]),
    (request: Request, response: Response) => {
        try {
            validationResult(request.body).throw();

            const data = request.body;
            User.findByIdAndUpdate({ '_id': data._id }, { name: data.name,  password: data.password })
                .then(() => { response.status(StatusCode.Success).json(); })
                .catch((e: any) => response.json(e) );

        } catch (e) {
            return response.json(e);
        }
    });

userRouter.delete(
    "/",
    oneOf([check('_id').exists()]),
    (request: Request, response: Response) => {
        try {
            validationResult(request.body).throw();

            const data = request.body;
            User.findByIdAndDelete({ '_id': data._id })
                .then(() => { response.status(StatusCode.Success).json(); })
                .catch((e: any) => response.json(e) );

        } catch (e) {
            return response.json(e);
        }
    });


export default userRouter;