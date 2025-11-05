const express = require("express");
const router = express.Router();

const gameController = require("../controllers/newsController");

router.post("/add", gameController.createNews);
router.get("/", gameController.getNews);

module.exports = router;
