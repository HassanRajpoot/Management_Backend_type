"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendCookie = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const __1 = require("..");
const sendCookie = (user, res, message, statusCode = 200) => {
    const token = jsonwebtoken_1.default.sign({ _id: user._id }, __1.SECRET_KEY);
    res
        .status(statusCode)
        .cookie("token", token, {
        httpOnly: true,
        maxAge: 15 * 60 * 1000,
    })
        .json({
        success: true,
        message,
    });
};
exports.sendCookie = sendCookie;
//# sourceMappingURL=features.js.map