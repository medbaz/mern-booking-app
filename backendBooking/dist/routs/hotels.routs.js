"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_validation_1 = __importDefault(require("../middlewares/auth_validation"));
const hotels_controllers_1 = require("../controllers/hotels.controllers");
const router = (0, express_1.Router)();
router.get("/search", auth_validation_1.default, hotels_controllers_1.getHotels);
exports.default = router;
