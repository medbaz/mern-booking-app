import multer from "multer";
import { postHotels ,deletAll,getHotels } from "../controllers/hotels.controllers";
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

router.get('/', auth_validation,getHotels)


router.post(
  "/deleteAll",
  deletAll
);


export default router;
