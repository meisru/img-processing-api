import express from "express";
import { promises as fs } from "fs";
import path from "path";
import resizeImage from "./utilities/resizeImage";

const app = express();
const port = 3000;
const requestCache = new Map(); // to store previous requests temporarily

const middleware = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const filename = req.query.filename as string;
  const width = parseInt(req.query.height as string);
  const height = parseInt(req.query.height as string);
  if (!filename) {
    res.status(400).send("filename is required");
    return;
  }
  try {
    const image = await fs.readFile(
      path.join(__dirname, `../assets/full/${filename}.jpg`)
    );
  } catch (err) {
    res.status(404).send("no such file or directory");
    return;
  }
  if (!width || isNaN(width) || width <= 0) {
    res.status(400).send("please enter a valid width");
    return;
  }
  if (!height || isNaN(height) || height <= 0) {
    res.status(400).send("please enter a valid height");
    return;
  }
  const key = `${filename}_${width}_${height}`;
  if (requestCache.has(key)) {
    res.setHeader("Content-Type", "image/jpeg");
    res.status(200).send(requestCache.get(key));
    return;
  }
  next();
};

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

app.get("/", middleware, async (req, res) => {
  const filename = req.query.filename as string;
  const width = parseInt(req.query.width as string);
  const height = parseInt(req.query.height as string);
  try {
    await resizeImage(filename, width, height);
    const image = await fs.readFile(
      path.join(__dirname, `../assets/thumb/${filename}.jpg`)
    );
    requestCache.set(`${filename}_${width}_${height}`, image);
    res.setHeader("Content-Type", "image/jpeg");
    res.status(200).send(image);
  } catch (err) {
    console.error("Error processing image", err);
    res.status(500).send("Error processing image");
  }
});
