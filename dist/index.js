"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var index_1 = __importDefault(require("./routes/index"));
var app = (0, express_1.default)();
var port = 3000;
app.listen(port, function () {
    console.log("Server listening at http://localhost:".concat(port));
});
app.get("/", function (req, res) {
    res.send("main");
});
app.use("/api", index_1.default);
exports.default = app;
