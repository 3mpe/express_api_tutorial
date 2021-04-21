"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(err, req, res, next) {
    res.status(err.status || 500);
    res.json({
        error: {},
        message: err.message
    });
    next();
}
exports.default = default_1;
