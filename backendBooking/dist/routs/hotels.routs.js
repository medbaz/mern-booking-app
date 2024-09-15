"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const hotels_controllers_1 = require("../controllers/hotels.controllers");
const express_1 = __importDefault(require("express"));
const auth_validation_1 = __importDefault(require("../middlewares/auth_validation"));
const express_validator_1 = require("express-validator");
const router = express_1.default.Router();
const Storage = multer_1.default.memoryStorage();
const upload = (0, multer_1.default)({
    storage: Storage,
    limits: {
        fileSize: 5 * 1024 * 1024,
    },
});
router.post("/", [
    (0, express_validator_1.body)("name").notEmpty().withMessage("Name is required"),
    (0, express_validator_1.body)("city").notEmpty().withMessage("City is required"),
    (0, express_validator_1.body)("country").notEmpty().withMessage("Country is required"),
    (0, express_validator_1.body)("description").isString().withMessage("Description must be a string"),
    (0, express_validator_1.body)("type").notEmpty().withMessage("Type is required"),
    (0, express_validator_1.body)("pricePerNight")
        .notEmpty()
        .isNumeric()
        .withMessage("Price per night is required"),
    (0, express_validator_1.body)("facilities")
        .notEmpty()
        .isArray()
        .withMessage("Facilities must be an array"),
], auth_validation_1.default, upload.array("imageFiles", 6), hotels_controllers_1.postHotels);
// GET HOTELS
router.get('/', auth_validation_1.default, hotels_controllers_1.getHotels);
// GET HOTEL BY ID
router.get('/:id', auth_validation_1.default, hotels_controllers_1.getHotelById);
// EDIT HOTEL BY ID
router.put('/:id', auth_validation_1.default, upload.array('imageFiles', 6), hotels_controllers_1.editHotelById);
router.post("/deleteAll", hotels_controllers_1.deletAll);
exports.default = router;
