"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var middleware = function (req, res, next) {
  console.log(req.url, " was visited");
  next();
};
exports.default = middleware;
