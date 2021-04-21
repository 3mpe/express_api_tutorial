"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userRouter = express_1.Router();
const StatusCode_1 = __importDefault(require("../helpers/StatusCode"));
const express_validator_1 = require("express-validator");
const User_1 = __importDefault(require("./../Models/User"));
userRouter.get("/", (request, response) => {
    User_1.default
        .find()
        .then((users) => {
        response
            .status(StatusCode_1.default.Success)
            .json({ users });
    })
        .catch((error) => {
        response.json(error);
    });
});
userRouter.post("/", express_validator_1.oneOf([express_validator_1.check('name').exists(), express_validator_1.check('password').exists()]), (request, response) => {
    try {
        express_validator_1.validationResult(request.body).throw();
        const data = request.body;
        new User_1.default({ name: data.name, password: data.password })
            .save()
            .then(() => { response.status(StatusCode_1.default.Success).json(); })
            .catch((e) => { response.status(StatusCode_1.default.BadRequest).json(); });
    }
    catch (e) {
        return response.json(e);
    }
});
userRouter.put("/", express_validator_1.oneOf([express_validator_1.check('_id').exists()]), (request, response) => {
    try {
        express_validator_1.validationResult(request.body).throw();
        const data = request.body;
        User_1.default.findByIdAndUpdate({ '_id': data._id }, { name: data.name, password: data.password })
            .then(() => { response.status(StatusCode_1.default.Success).json(); })
            .catch((e) => response.json(e));
    }
    catch (e) {
        return response.json(e);
    }
});
userRouter.delete("/", express_validator_1.oneOf([express_validator_1.check('_id').exists()]), (request, response) => {
    try {
        express_validator_1.validationResult(request.body).throw();
        const data = request.body;
        User_1.default.findByIdAndDelete({ '_id': data._id })
            .then(() => { response.status(StatusCode_1.default.Success).json(); })
            .catch((e) => response.json(e));
    }
    catch (e) {
        return response.json(e);
    }
});
exports.default = userRouter;
