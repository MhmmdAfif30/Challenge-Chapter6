require("dotenv").config();
const express = require("express");
const app = express();
const morgan = require("morgan");
const { PORT } = process.env;

const mediaRouter = require("./routes/media.routes.js");

app.use(express.json());
app.use(morgan("dev"));
app.use("/api/v1", mediaRouter);

app.get('/', (req, res) => {
  return res.json({
      status: true,
      message: 'hello world!',
      error: null,
      data: null
  });
});

app.listen(PORT, () => {
  console.log(`Listening is running on port ${PORT}`);
});
