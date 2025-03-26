import express from "express";
import fs from "fs";
import path from "path";
import fileExist from "../utilities/fileExist";

/**
 * to validate the request and check if the image is already processed
 * @param req
 * @param res
 * @param next
 * @returns  {void}
 */
const validate = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): void => {
  const filename = req.query.filename as string;
  const width = parseInt(req.query.width as string);
  const height = parseInt(req.query.height as string);

  // check if filename is provided
  if (!filename) {
    res.status(400).send("<h1>Filename is required</h1>");
    return;
  }

  const imagePath = path.join(__dirname, `../../assets/full/${filename}.jpg`);

  // check if file exists
  if (!fileExist(imagePath)) {
    res.status(404).send("<h1>No such file or directory</h1>");
    return;
  } else {
    if (!width && !height) {
      res.contentType("image/jpg");
      res.status(200).sendFile(imagePath);
      return;
    }
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

  next();
};

export default validate;
