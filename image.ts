import { Schema, model } from "mongoose";
import { MAX_FILE_SIZE } from "./config.js";
import { Image as ImageType } from "./types/gql.js";

const ImageSchema = new Schema(
  {
    createdAt: String,
    mimetype: {
      type: String,
      required: true,
    },
    filename: {
      type: String,
      required: true,
      min: 5,
    },
    size: {
      type: Number,
      required: true,
      max: MAX_FILE_SIZE,
    },
    data: {
      type: Buffer,
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

export const Image = model<ImageType & { data: Buffer }>("images", ImageSchema);
