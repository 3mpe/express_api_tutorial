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
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const crypto_1 = require("crypto");
const jsonwebtoken_1 = require("jsonwebtoken");
const express_validator_1 = require("express-validator");
const config_1 = require("./../config");
const authRouter = express_1.Router();
authRouter.post('/register', express_validator_1.oneOf([express_validator_1.check('username').exists(), express_validator_1.check('password').exists()]), (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        express_validator_1.validationResult(request.body).throw();
        const salt = crypto_1.randomBytes(config_1.LENGTH).toString('base64');
        crypto_1.pbkdf2(request.body.toString(), salt, 100000, config_1.LENGTH, config_1.DIGEST, (err, hash) => {
            if (err)
                throw err;
            return response.json({
                hashed: hash.toString('hex'),
                salt: salt
            });
        });
    }
    catch (e) {
        return response.json(e);
    }
}));
authRouter.post('/login', express_validator_1.oneOf([
    [express_validator_1.check('username').notEmpty(), express_validator_1.check('password').exists()]
]), (request, response) => {
    try {
        express_validator_1.validationResult(request.body).throw();
        const data = request.body;
        crypto_1.pbkdf2(request.body.toString(), data.salt, 10000, length, config_1.DIGEST, (err, hash) => {
            if (err) {
                console.log(err);
            }
            // check if password is active
            if (hash.toString('hex') === data.hashedPassword) {
                const token = jsonwebtoken_1.sign({ 'user': data.username, permissions: [] }, config_1.SECRET, { expiresIn: '7d' });
                response.json({ token });
            }
            else {
                response.json({ message: 'Wrong password' });
            }
        });
    }
    catch (e) {
        return response.json(e);
    }
});
exports.default = authRouter;
