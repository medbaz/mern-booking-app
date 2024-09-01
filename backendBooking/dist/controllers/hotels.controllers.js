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
exports.deletAll = exports.getHotels = void 0;
const cloudinary_1 = __importDefault(require("cloudinary"));
const hotel_model_1 = __importDefault(require("../models/hotel.model"));
const getHotels = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const imageFiles = req.files;
        const newHotel = req.body;
        // UPLOAD THE IMAGES TO CLOUDINARY
        const uploadPromises = imageFiles.map((image) => new Promise((resolve, reject) => {
            cloudinary_1.default.v2.uploader.upload_stream({ resource_type: 'image' }, (error, result) => {
                if (error) {
                    reject(error);
                }
                else {
                    resolve(result.url);
                }
            }).end(image.buffer);
        }));
        const imageURLS = yield Promise.all(uploadPromises);
        newHotel.imageUrls = imageURLS;
        newHotel.lastUpdated = new Date();
        newHotel.userId = req.userId;
        const hotel = new hotel_model_1.default(newHotel);
        hotel.save();
        res.status(200).json({ message: "form submitted successfully " });
    }
    catch (error) {
        res.status(500).json({ message: error });
    }
});
exports.getHotels = getHotels;
const deletAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield hotel_model_1.default.deleteMany({});
        res.status(200).json({ message: "hotels deleted successfully" });
    }
    catch (error) {
        res.status(400).json({ message: "UNABLE to delete hotels" });
    }
});
exports.deletAll = deletAll;
