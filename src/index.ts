import express from "express";
import cors from "cors";
import compression from 'compression';
import { json } from "body-parser";
import MongoDB from "./helpers/MongoDB"

const app = express();

import { PORT } from "./config";
import { UserService, AuthService } from './services';
import { errorHandlerMiddleware, tokenParserMiddleware } from './middlewares';
import { check, oneOf } from "express-validator";

MongoDB.init() // mongoose init

// middleware
app.use(json());
app.use(cors());
app.use(compression());
app.use(errorHandlerMiddleware);
// app.use(
//     oneOf([
//         check('access_token').exists()
//     ]),
//     (req, resp, next) => tokenParserMiddleware(req, resp, next)
// );

// api
app.use('/api/user', UserService);
app.use('/api/auth', AuthService);



app.listen(PORT, () => console.log(`[server] http://localhost:${PORT}`));