import express from "express";
import path from "path";
import resizeImage from "../utilities/resizeImage";

const resize = async (
  req: express.Request,
  res: express.Response
): Promise<void> => {
  const filename = req.query.filename as string;
  const width = parseInt(req.query.width as string);
  const height = parseInt(req.query.height as string);

  // resize the image
  try {
    await resizeImage(filename, width, height);
    const imagePath = path.join(
      __dirname,
      `../../../assets/thumb/${filename}_${width}_${height}.jpg`
    );
    // send the image as response
    res.setHeader("Content-Type", "image/jpeg");
    res.status(200).sendFile(imagePath);
  } catch (err) {
    res.status(500).send(`Error processing image: ${(err as Error).message}`);
  }
};

export default resize;
