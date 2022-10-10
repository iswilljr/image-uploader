import { Image } from "../model/image.js";
import { MAX_FILES, MAX_FILE_SIZE } from "../config.js";
import { Router } from "express";
import multer from "multer";

const uploadRouter = Router();

const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: {
    files: MAX_FILES,
    fileSize: MAX_FILE_SIZE,
  },
});

uploadRouter.post("/", upload.single("file"), async (req, res, next) => {
  const { file } = req;
  try {
    if (!file) throw new Error("You must provied at least 1 image");

    const image = new Image({
      filename: file.originalname,
      data: file.buffer,
      size: file.size,
      mimetype: file.mimetype,
    });

    await image.save();

    return res.json(image._id.toString());
  } catch (err) {
    next(err);
  }
});

export { uploadRouter };
