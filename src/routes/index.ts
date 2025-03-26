import express, { Request, Response } from "express";
import imgRouter from "./api/images";
import path from "path";

const apiRouter = express.Router();

apiRouter.get("/", (req: Request, res: Response) => {
  res.setHeader("Content-Type", "text/html");
  res.sendFile(path.join(__dirname, "../../index.html"));
});

apiRouter.use("/images", imgRouter);

export default apiRouter;
