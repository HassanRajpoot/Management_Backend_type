import express from "express";
import { login, logout, register } from "../controllers/user";

export default (router: express.Router) => {
    router.post("/new", register);
    router.post("/login", login);
    router.get("/logout", logout);
}