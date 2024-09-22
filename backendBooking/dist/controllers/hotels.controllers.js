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
exports.getHotels = void 0;
const user_model_1 = require("../models/user.model");
const getHotels = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pageSize = 6;
        const pageNumber = parseInt(req.query.page ? req.query.page.toString() : "1");
        const skip = (pageNumber - 1) * pageSize;
        const hotels = yield user_model_1.Hotel.find().skip(skip).limit(pageSize);
        const total = yield user_model_1.Hotel.countDocuments();
        const pages = Math.ceil(total / pageSize);
        const response = {
            data: hotels,
            pagination: {
                page: pageNumber,
                pages,
                total,
            },
        };
        res.json(response);
    }
    catch (error) {
        console.log("error from hotel controllers : ", error);
        res.status(500).json({ message: "Unable To Get Hotels" });
    }
});
exports.getHotels = getHotels;
