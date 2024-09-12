"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
// import { postHotels ,deletAll,getHotels } from "../controllers/hotels.controllers";
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const Storage = multer_1.default.memoryStorage();
const upload = (0, multer_1.default)({
    storage: Storage,
    limits: {
        fileSize: 5 * 1024 * 1024,
    },
});
// router.post(
//   "/",
//   [
//     body("name").notEmpty().withMessage("Name is required"),
//     body("city").notEmpty().withMessage("City is required"),
//     body("country").notEmpty().withMessage("Country is required"),
//     body("description").isString().withMessage("Description must be a string"),
//     body("type").notEmpty().withMessage("Type is required"),
//     body("pricePerNight")
//       .notEmpty()
//       .isNumeric()
//       .withMessage("Price per night is required"),
//     body("facilities")
//       .notEmpty()
//       .isArray()
//       .withMessage("Facilities must be an array"),
//   ],
//   auth_validation,
//   upload.array("imageFiles", 6),
//   postHotels
// );
// router.get('/', auth_validation,getHotels)
// router.post(
//   "/deleteAll",
//   deletAll
// );
exports.default = router;
