import express, { Router } from "express";
import auth_validation from "../middlewares/auth_validation";
import { getHotels } from "../controllers/hotels.controllers";

const router = Router();
router.get("/search", auth_validation, getHotels);



export default router 
