import express from "express";
import apiRouter from "./routes/index";

const app = express();
const port = 3000;

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

app.get("/", (req, res) => {
  res.send('<h1><a href="/api">View the project</a><h1>');
});

app.use("/api", apiRouter);

export default app;
