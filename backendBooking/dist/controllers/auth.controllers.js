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
exports.logout = exports.login = exports.addUser = void 0;
const user_model_1 = require("../models/user.model");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const validator = require("validator");
require("dotenv/config");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
// SIGN UP A USER
const addUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, firstname, lastname } = req.body;
    const findUser = yield user_model_1.UsersModels.findOne({ email });
    if (findUser) {
        return res.status(400).json({ message: "user exicte alrealy" });
    }
    // VALIDATE DATA
    if (!email || !password || !firstname || !lastname) {
        return res.status(400).json({ message: "all fields are required" });
    }
    if (!validator.isEmail(email)) {
        return res.status(400).json({ message: "please enter a valide email" });
    }
    const options = {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 0,
        minNumbers: 1,
        minSymbols: 0,
    };
    if (!validator.isStrongPassword(password, options)) {
        return res.status(400).json({ message: "please enter a valide password" });
    }
    try {
        // create user and encrypt pass
        const user = new user_model_1.UsersModels(req.body);
        yield user.save();
        // create a jwt
        const token = jsonwebtoken_1.default.sign({ user_id: user.id }, process.env.ENCYPT_TOKEN_KEY, { expiresIn: "1d" });
        // save the token in the client side
        res.cookie("auth_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 86400000,
        });
        res.status(200).json({ message: "user added succussfully" });
    }
    catch (error) {
        res.status(404).json({ message: "unable to add user" });
    }
});
exports.addUser = addUser;
// LOGIN A USER
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const user = yield user_model_1.UsersModels.findOne({ email });
    if (!user) {
        return res.status(400).json({ message: "Invalide Credenials" });
    }
    // VALIDATE DATA
    if (!email || !password) {
        return res.status(400).json({ message: "all fields are required" });
    }
    const isMatch = yield bcryptjs_1.default.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).json({ message: "Invalide Credenials" });
    }
    try {
        const token = jsonwebtoken_1.default.sign({ user_id: user.id }, process.env.ENCYPT_TOKEN_KEY, { expiresIn: "1d" });
        // save the token in the client side
        res.cookie("auth_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 86400000,
        });
        res.status(200).json({ message: "logged in succussfully" });
    }
    catch (error) {
        res.status(404).json({ message: "unable to login" });
    }
});
exports.login = login;
const logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("logout end point");
    res.cookie("auth_token", "", {
        expires: new Date(0),
    });
    res.status(200).json({ message: "Log out successfully" });
});
exports.logout = logout;
