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
exports.deleteUser = exports.getUsers = void 0;
const user_model_1 = require("../models/user.model");
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield user_model_1.UsersModels.find({});
        res.status(200).json(users);
    }
    catch (error) {
        res.status(500).json({ message: "something went wrong" });
    }
});
exports.getUsers = getUsers;
// DELETE A USER
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // console.log(id);
        yield user_model_1.UsersModels.deleteMany({});
        return res.status(200).json({ message: "item deleted succussfully" });
    }
    catch (error) {
        return res.status(404).json({ message: "item not found" });
    }
});
exports.deleteUser = deleteUser;
