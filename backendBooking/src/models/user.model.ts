import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { hotelFormType } from "../shares/types";

export type userType = {
  _id: string;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
};

const UserSchema: mongoose.Schema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

UserSchema.pre("save", async function EncrypPass(next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password as string, 10);
  }
  next();
});

const hotelSchema = new mongoose.Schema<hotelFormType>({
  userId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  adultCount: {
    type: Number,
    required: true,
  },
  childCount: {
    type: Number
  },
  facilities: [
    {
      type: String,
      required: true,
    },
  ],
  pricePerNight: {
    type: Number,
    required: true,
  },
  starRating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  imageUrls: [
    {
      type: String,
      required: true,
    },
  ],
  lastUpdated: {
    type: Date,
    required: true,
  },
});

export const Hotel = mongoose.model<hotelFormType>("Hotel", hotelSchema);

export const UsersModels = mongoose.model<userType>("UsersModels", UserSchema);
