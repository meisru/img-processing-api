import express from "express";
import fs from "fs";
import path from "path";
import resizeImage from "../utilities/resizeImage";

const resize = async (
  req: express.Request,
  res: express.Response
): Promise<void> => {
  const filename = req.query.filename as string;
  const width = parseInt(req.query.width as string);
  const height = parseInt(req.query.height as string);

  const thumbPath = path.join(__dirname, "../../assets/thumb");

  // Check if thumb directory exists, create if not
  if (!fs.existsSync(thumbPath)) {
    fs.mkdirSync(thumbPath);
  }

  try {
    const imagePath = await resizeImage(filename, width, height);
    const cachePath = path.join(__dirname, "..", "..", imagePath);

    res.setHeader("Content-Type", "image/jpeg");
    res.status(200).sendFile(cachePath);
  } catch (err) {
    res.status(500).send(`Error processing image: ${(err as Error).message}`);
  }
};

export default resize;
