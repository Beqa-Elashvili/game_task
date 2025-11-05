require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const config = require("./config");
const helmet = require("helmet");
const app = express();
const logger = require("./middleware/logger");
const gameRouter = require("./routes/gameRoute");
const categoriesController = require("./routes/categoryRoute");
const providerController = require("./routes/providerRoute");
const usersController = require("./routes/userRoute");
const newsController = require("./routes/newsRoute");

const URL = process.env.DOMAIN_URL;

app.use(
  cors({
    origin: URL,
    credentials: true,
  })
);

app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger);

app.use("/games", gameRouter);
app.use("/categories", categoriesController);
app.use("/providers", providerController);
app.use("/news", newsController);
app.use("/auth", usersController);

app.get("/", (req, res) => {
  res.send("Express app connected to MongoDB!");
});

const PORT = config.PORT;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
