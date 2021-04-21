import express from "express";
import cors from "cors";
import compression from 'compression';
import { json } from "body-parser";

const app = express();


import { PORT } from "./config";
import { UserService } from './services';
import { errorHandlerMiddleware } from './middlewares';


// middleware
app.use(json());
app.use(cors());
app.use(compression());
app.use(errorHandlerMiddleware);

// api
app.use('/api/user', UserService);



app.listen(PORT, () => console.log(`[server] http://localhost:${PORT}`));