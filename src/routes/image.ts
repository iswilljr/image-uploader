import { Image } from "../model/image.js";
import { IMAGES_PATH } from "../config.js";
import { Router } from "express";

const imageRouter = Router();

// eslint-disable-next-line @typescript-eslint/no-misused-promises
imageRouter.get(IMAGES_PATH, async (req, res, next) => {
  try {
    const image = await Image.findOne({ _id: req.params.id });

    if (!image) return next();

    res.set({
      "Content-Type": image.mimetype,
      "Accept-Ranges": "bytes",
      "Cache-Control": "public, max-age=14400, must-revalidate",
      "Content-Disposition": `filename=${image.filename}`,
    });

    res.end(image.data);
  } catch (err) {
    console.log(err);
    next(err);
  }
});

export { imageRouter };
