import multer from "multer";
import {
  postHotels,
  deletAll,
  getHotels,
  getHotelById,
  editHotelById,
  deletHotel,
} from "../controllers/myhotels.controllers";
import express from "express";
import auth_validation from "../middlewares/auth_validation";
import { body } from "express-validator";

const router = express.Router();

const Storage = multer.memoryStorage();
const upload = multer({
  storage: Storage,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

router.post(
  "/",
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("city").notEmpty().withMessage("City is required"),
    body("country").notEmpty().withMessage("Country is required"),
    body("description").isString().withMessage("Description must be a string"),
    body("type").notEmpty().withMessage("Type is required"),
    body("pricePerNight")
      .notEmpty()
      .isNumeric()
      .withMessage("Price per night is required"),
    body("facilities")
      .notEmpty()
      .isArray()
      .withMessage("Facilities must be an array"),
  ],
  auth_validation,
  upload.array("imageFiles", 6),
  postHotels
);

// GET HOTELS
router.get("/", auth_validation, getHotels);

// GET HOTEL BY ID
router.get("/:id", auth_validation, getHotelById);

// EDIT HOTEL BY ID
router.put(
  "/:id",
  auth_validation,
  upload.array("imageFiles", 6),
  editHotelById
);

// DELETE HOTEL BY ID
router.post("/:id", auth_validation, deletHotel);

router.post("/deleteAll", deletAll);

export default router;
