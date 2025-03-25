import express from "express";
import imgRouter from "./api/image";
import path from "path";

const apiRouter = express.Router();

apiRouter.get("/", (req, res) => {
  res.setHeader("Content-Type", "text/html");
  res.sendFile(path.join(__dirname, "../../index.html"));
});

apiRouter.use("/image", imgRouter);

export default apiRouter;
