"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var image_1 = __importDefault(require("./api/image"));
var apiRouter = express_1.default.Router();
apiRouter.get("/", function (req, res) {
    res.send("api route");
});
apiRouter.use("/image", image_1.default);
exports.default = apiRouter;
