import express from "express";
import validate from "../../middlewares/validateRequest";
import caching from "../../middlewares/caching";
import resize from "../../middlewares/resize";

const imgRouter = express.Router();

imgRouter.get("/", validate, caching, resize);

export default imgRouter;
