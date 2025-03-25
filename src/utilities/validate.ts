import express from "express";
import { promises as fs } from "fs";
import path from "path";

// to store previous requests
const requestCache = new Map();

/**
 * to validate the request and check if the image is already processed
 * @param req
 * @param res
 * @param next
 * @returns  {void}
 */
const validate = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const filename = req.query.filename as string;
  const width = parseInt(req.query.width as string);
  const height = parseInt(req.query.height as string);

  // check if filename is provided
  if (!filename) {
    res.status(400).send("filename is required");
    return;
  }

  // check if file exists
  try {
    const image = await fs.readFile(
      path.join(__dirname, `../../assets/full/${filename}.jpg`)
    );
    // if width and height are not provided, serve the original image
    if (!width && !height) {
      res.setHeader("Content-Type", "image/jpeg");
      res.status(200).send(image);
      return;
    }
  } catch (err) {
    res.status(404).send("no such file or directory");
    return;
  }

  // check if width and height are valid
  if (!width || isNaN(width) || width <= 0) {
    res.status(400).send("please enter a valid width");
    return;
  }
  if (!height || isNaN(height) || height <= 0) {
    res.status(400).send("please enter a valid height");
    return;
  }

  // check if image is already processed and stored in cache
  const key = `${filename}_${width}_${height}`;
  if (requestCache.has(key)) {
    res.status(200).send(requestCache.get(key));
    return;
  }

  next();
};

export { validate, requestCache };
