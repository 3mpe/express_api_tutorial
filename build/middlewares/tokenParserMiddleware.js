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
const express_validator_1 = require("express-validator");
const jsonwebtoken_1 = require("jsonwebtoken");
const StatusCode_1 = __importDefault(require("../helpers/StatusCode"));
exports.default = (req, resp, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const isAuthUrl = req.url.indexOf('/auth/') > -1;
        if (isAuthUrl) {
            return next();
        }
        express_validator_1.validationResult(req).throw();
        let access_token = req.headers.access_token;
        if (typeof access_token === "string") {
            const user = yield jsonwebtoken_1.decode(access_token, { json: true });
            if (user !== null)
                req.body.user = user;
            else
                return resp.status(StatusCode_1.default.Forbidden).json();
        }
        next();
    }
    catch (e) {
        return resp.status(StatusCode_1.default.Unauthorized).json(e);
    }
});
