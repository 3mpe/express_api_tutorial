"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const compression_1 = __importDefault(require("compression"));
const body_parser_1 = require("body-parser");
const MongoDB_1 = __importDefault(require("./helpers/MongoDB"));
const app = express_1.default();
const config_1 = require("./config");
const services_1 = require("./services");
const middlewares_1 = require("./middlewares");
const express_validator_1 = require("express-validator");
MongoDB_1.default.init(); // mongoose init
// middleware
app.use(body_parser_1.json());
app.use(cors_1.default());
app.use(compression_1.default());
app.use(middlewares_1.errorHandlerMiddleware);
app.use(express_validator_1.oneOf([
    express_validator_1.check('access_token').exists()
]), (req, resp, next) => middlewares_1.tokenParserMiddleware(req, resp, next));
// api
app.use('/api/user', services_1.UserService);
app.use('/api/auth', services_1.AuthService);
app.listen(config_1.PORT, () => console.log(`[server] http://localhost:${config_1.PORT}`));
