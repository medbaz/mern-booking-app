import express, { Request, Response } from "express";
import cloudinary from "cloudinary";
import Hotel from "../models/hotel";
import { hotelFormType } from "../models/hotel";

const postHotels = async (req: Request, res: Response) => {
  try {
    const imageFiles = req.files as Express.Multer.File[];
    const newHotel: hotelFormType = req.body;

    // UPLOAD THE IMAGES TO CLOUDINARY
    const uploadPromises = imageFiles.map(
      (image) =>
        new Promise<string>((resolve, reject) => {
          cloudinary.v2.uploader
            .upload_stream({ resource_type: "image" }, (error, result) => {
              if (error) {
                reject(error);
              } else {
                resolve(result!.url);
              }
            })
            .end(image.buffer);
        })
    );

    const imageURLS = await Promise.all(uploadPromises);
    newHotel.imageUrls = imageURLS;
    newHotel.lastUpdated = new Date();
    newHotel.userId = req.userId;

    const hotel = new Hotel(newHotel);
    hotel.save();
    res.status(200).json({ message: "form submitted successfully " });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const getHotels = async (req: Request, res: Response) => {
  try {
    const hotels = await Hotel.find({ userId: req.userId });

    res.send(hotels);
    // console.log(hotels);
  } catch (error) {
    res.status(400).json({ message: "UNABLE to get hotels" });
  }
};

const deletAll = async (req: Request, res: Response) => {
  try {
    await Hotel.deleteMany({});
    res.status(200).json({ message: "hotels deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: "UNABLE to delete hotels" });
  }
};

export { postHotels, deletAll, getHotels };
