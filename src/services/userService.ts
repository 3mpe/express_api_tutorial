import { Router, Request, Response } from "express";

const userRouter = Router();

userRouter.get("/", (request: Request, response: Response) => {
    response.json({ user: { name: "user name" }})
})

userRouter.post("/", (request: Request, response: Response) => {
    response.status(200)
})

userRouter.put("/", (request: Request, response: Response) => {
    response.status(200)
})

userRouter.delete("/", (request: Request, response: Response) => {
    response.status(200)
})


export default userRouter;