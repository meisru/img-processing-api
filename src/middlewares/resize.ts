import express from "express";
import path from "path";
import resizeImage from "../utilities/resizeImage";
import { cache } from "sharp";

const resize = async (
  req: express.Request,
  res: express.Response
): Promise<void> => {
  const filename = req.query.filename as string;
  const width = parseInt(req.query.width as string);
  const height = parseInt(req.query.height as string);

  try {
    // Wait for the image to be resized and get the file path
    const imagePath = await resizeImage(filename, width, height);
    const cachePath = path.join(__dirname, "..", "..", imagePath);

    // Now that the image exists, send it
    res.setHeader("Content-Type", "image/jpeg");
    res.status(200).sendFile(cachePath);
  } catch (err) {
    res.status(500).send(`Error processing image: ${(err as Error).message}`);
  }
};

export default resize;
