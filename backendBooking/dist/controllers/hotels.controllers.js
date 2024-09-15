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
exports.editHotelById = exports.getHotelById = exports.getHotels = exports.deletAll = exports.postHotels = void 0;
const cloudinary_1 = __importDefault(require("cloudinary"));
const user_model_1 = require("../models/user.model");
function toImgUrls(imageFiles) {
    return imageFiles.map((image) => new Promise((resolve, reject) => {
        cloudinary_1.default.v2.uploader
            .upload_stream({ resource_type: "image" }, (error, result) => {
            if (error) {
                reject(error);
            }
            else {
                resolve(result.url);
            }
        })
            .end(image.buffer);
    }));
}
const postHotels = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const imageFiles = req.files;
        const newHotel = req.body;
        // UPLOAD THE IMAGES TO CLOUDINARY
        const uploadPromises = toImgUrls(imageFiles);
        const imageURLS = yield Promise.all(uploadPromises);
        newHotel.imageUrls = imageURLS;
        newHotel.lastUpdated = new Date();
        newHotel.userId = req.userId;
        const hotel = new user_model_1.Hotel(newHotel);
        hotel.save();
        res.status(200).json({ message: "form submitted successfully " });
    }
    catch (error) {
        res.status(500).json({ message: error });
    }
});
exports.postHotels = postHotels;
const getHotels = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const hotels = yield user_model_1.Hotel.find({ userId: req.userId });
        res.send(hotels);
        // console.log(hotels);
    }
    catch (error) {
        res.status(400).json({ message: "UNABLE to get hotels" });
    }
});
exports.getHotels = getHotels;
const getHotelById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const hotel_Id = req.params.id.toString();
    try {
        const hotel = yield user_model_1.Hotel.findOne({ _id: hotel_Id, userId: req.userId });
        res.json(hotel);
    }
    catch (error) {
        res.status(500).json({ massage: "hotel not found" });
    }
});
exports.getHotelById = getHotelById;
const editHotelById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const hotel_Id = req.params.id.toString();
        const editedHotel = req.body;
        editedHotel.lastUpdated = new Date();
        const hotel = yield user_model_1.Hotel.findOneAndUpdate({ _id: hotel_Id, userId: req.userId }, editedHotel, { new: true });
        if (!hotel) {
            return res.status(500).json({ message: "Can't find Hotel" });
        }
        // UPLOAD THE IMAGES TO CLOUDINARY
        const imageFiles = req.files;
        const uploadPromises = toImgUrls(imageFiles);
        const promiseURLS = yield Promise.all(uploadPromises);
        console.log(req.body.imageUrls);
        hotel.imageUrls = [...promiseURLS, ...(editedHotel.imageUrls || [])];
        hotel.save();
        res.status(200).json({ message: "Hotel Updated Successfully " });
    }
    catch (error) {
        res.status(500).json({ message: "Can't update Hotel" });
    }
});
exports.editHotelById = editHotelById;
const deletAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield user_model_1.Hotel.deleteMany({});
        res.status(200).json({ message: "hotels deleted successfully" });
    }
    catch (error) {
        res.status(400).json({ message: "UNABLE to delete hotels" });
    }
});
exports.deletAll = deletAll;
