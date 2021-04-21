"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const jsonwebtoken_1 = require("jsonwebtoken");
const express_validator_1 = require("express-validator");
const config_1 = require("./../config");
const authRouter = express_1.Router();
const User_1 = __importDefault(require("./../Models/User"));
const StatusCode_1 = __importDefault(require("../helpers/StatusCode"));
authRouter.post('/register', express_validator_1.oneOf([express_validator_1.check('name').exists(), express_validator_1.check('password').exists()]), (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        express_validator_1.validationResult(request.body).throw();
        const data = request.body;
        new User_1.default({ name: data.name, password: data.password })
            .save()
            .then(() => {
            const token = jsonwebtoken_1.sign(data, config_1.SECRET, { expiresIn: '7d' });
            return response.status(StatusCode_1.default.Success).json({ result: data, token });
        })
            .catch((e) => { response.status(StatusCode_1.default.BadRequest).json(); });
    }
    catch (e) {
        return response.json(e);
    }
}));
authRouter.post('/login', express_validator_1.oneOf([express_validator_1.check('username').notEmpty(), express_validator_1.check('password').exists()]), (request, response) => {
    try {
        express_validator_1.validationResult(request.body).throw();
        const data = request.body;
        User_1.default
            .where('name', data.name)
            .where('password', data.password)
            .exec((err, result) => {
            if (err) {
                return response.status(StatusCode_1.default.BadRequest).json(err);
            }
            if (result === null) {
                return response.status(StatusCode_1.default.NoContent).json(err);
            }
            else {
                const token = jsonwebtoken_1.sign({ name: result.name, password: result.password }, config_1.SECRET, { expiresIn: '7d' });
                return response.status(StatusCode_1.default.Success).json({ result, token });
            }
        });
    }
    catch (e) {
        return response.json(e);
    }
});
exports.default = authRouter;
