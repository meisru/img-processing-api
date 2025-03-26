import express from "express";
import path from "path";
import fileExist from "../utilities/fileExist";

const caching = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): void => {
  const filename = req.query.filename as string;
  const width = parseInt(req.query.width as string);
  const height = parseInt(req.query.height as string);

  const imagePath = path.join(
    __dirname,
    `../../assets/thumb/${filename}_${width}_${height}.jpg`
  );
  // check if file exists
  if (!fileExist(imagePath)) {
    next();
    return;
  }
  res.contentType("image/jpg");
  res.status(200).sendFile(imagePath);
};

export default caching;
