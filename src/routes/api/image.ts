import express from "express";
import { promises as fs } from "fs";
import path from "path";
import resizeImage from "../../utilities/resizeImage";
import validate from "../../middlewares/validateRequest";
import caching from "../../middlewares/caching";

const imgRouter = express.Router();

// imgRouter.get('/', validate, caching, resize);

// Process the image
imgRouter.get("/", validate, caching, async (req, res) => {
  const filename = req.query.filename as string;
  const width = parseInt(req.query.width as string);
  const height = parseInt(req.query.height as string);

  // resize the image
  try {
    await resizeImage(filename, width, height);
    const image = await fs.readFile(
      path.join(__dirname, `../../../assets/thumb/${filename}_thumb.jpg`)
    );

    // send the image as response
    res.setHeader("Content-Type", "image/jpeg");
    res.status(200).send(image);
  } catch (err) {
    res.status(500).send(`Error processing image: ${(err as Error).message}`);
  }
});

export default imgRouter;
