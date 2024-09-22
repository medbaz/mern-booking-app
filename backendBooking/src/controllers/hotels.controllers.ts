import { Hotel } from "../models/user.model";
import { Request, Response } from "express";
import { searchHotelsType } from "../shares/types";

const getHotels = async (req: Request, res: Response) => {
  try {
    const pageSize = 6;
    const pageNumber =  parseInt(
      req.query.page ? req.query.page.toString() : "1"
    );
    const skip = (pageNumber - 1) * pageSize;
    const hotels = await Hotel.find().skip(skip).limit(pageSize);
    const total = await Hotel.countDocuments();
    const pages = Math.ceil(total / pageSize);

    const response: searchHotelsType = {
      data: hotels,
      pagination: {
        page: pageNumber,
        pages,
        total,
      },
    };

    res.json(response);
  } catch (error) {
    console.log("error from hotel controllers : ", error);
    res.status(500).json({ message: "Unable To Get Hotels" });
  }
};

export { getHotels };
