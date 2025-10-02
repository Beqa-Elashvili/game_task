const express = require("express");
const router = express.Router();
const collectionsController = require("../controllers/collectionController");

router.get("/", collectionsController.getCollections);

module.exports = router;
