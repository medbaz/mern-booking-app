import express, { Request, Response } from "express";
import cloudinary from "cloudinary";
import { Hotel } from "../models/user.model";
import { hotelFormType } from "../models/hotel";



function toImgUrls(imageFiles: Express.Multer.File[]) {
  return imageFiles.map(
    (image) => new Promise<string>((resolve, reject) => {
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
}


const postHotels = async (req: Request, res: Response) => {
  try {
    const imageFiles = req.files as Express.Multer.File[];
    const newHotel: hotelFormType = req.body;


    // UPLOAD THE IMAGES TO CLOUDINARY
    const uploadPromises = toImgUrls(imageFiles);
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


const getHotelById = async (req:Request,res:Response) => {

  const hotel_Id = req.params.id.toString()
  try {
    const hotel = await Hotel.findOne({_id :hotel_Id , userId : req.userId})
    res.json(hotel)
  } catch (error) {
    res.status(500).json({massage:"hotel not found"})
  }

}



const editHotelById = async (req:Request,res:Response) => {

  try {
    const hotel_Id = req.params.id.toString();
    const editedHotel: hotelFormType = req.body;
    editedHotel.lastUpdated = new Date();
    const hotel = await Hotel.findOneAndUpdate(
      { _id: hotel_Id, userId: req.userId },
      editedHotel,
      { new: true }
    );

    if (!hotel) {
      return res.status(500).json({ message: "Can't find Hotel" });
    }
    // UPLOAD THE IMAGES TO CLOUDINARY
    const imageFiles = req.files as Express.Multer.File[];

    const uploadPromises = toImgUrls(imageFiles);
    
    const promiseURLS = await Promise.all(uploadPromises);

    console.log(req.body.imageUrls);

    hotel.imageUrls = [...promiseURLS, ...(editedHotel.imageUrls || [])];
    hotel.save();
    res.status(200).json({ message: "Hotel Updated Successfully " });
  } catch (error) {
    res.status(500).json({ message: "Can't update Hotel" });
  }
  
}



const deletAll = async (req: Request, res: Response) => {
  try {
    await Hotel.deleteMany({});
    res.status(200).json({ message: "hotels deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: "UNABLE to delete hotels" });
  }
};



export { postHotels, deletAll, getHotels ,getHotelById ,editHotelById };
