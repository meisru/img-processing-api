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
    res.status(400).send("<h1>Filename is required</h1>");
    return;
  }

  // check if file exists
  try {
    const image = await fs.readFile(
      path.join(__dirname, `../../assets/full/${filename}.jpg`)
    );
    // if width and height are not provided, serve the original image
    if (!width && !height) {
      res.contentType("image/jpg");
      res.status(200).send(image);
      return;
    }
  } catch (err) {
    res
      .status(404)
      .send(`<h1>No such file or directory</h1>${(err as Error).message}`);
    return;
  }

  // check if width and height are valid
  if (!width || isNaN(width) || width <= 0) {
    res.status(400).send("<h1>Please enter a valid width</h1>");
    return;
  }
  if (!height || isNaN(height) || height <= 0) {
    res.status(400).send("<h1>Please enter a valid height</h1>");
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
