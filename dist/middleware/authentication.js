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
exports.isAuthenticated = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = require("../db/user"); // Assuming you have the correct import path
const __1 = require("..");
const isAuthenticated = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { token } = req.cookies;
    if (!token)
        return res.status(404).json({
            success: false,
            message: "Login First",
        });
    try {
        const decoded = jsonwebtoken_1.default.verify(token, __1.SECRET_KEY);
        const user = yield user_1.User.findById(decoded._id); // Renamed 'res' to 'user'
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }
        req.user = user;
        next();
    }
    catch (error) {
        return res.status(401).json({
            success: false,
            message: "Invalid Token",
        });
    }
});
exports.isAuthenticated = isAuthenticated;
//# sourceMappingURL=authentication.js.map