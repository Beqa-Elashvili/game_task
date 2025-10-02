const express = require("express");
const router = express.Router();
const providerController = require("../controllers/providerController");

router.get("/", providerController.getProviders);
router.post("/add", providerController.createProviders);
router.delete("/delete", providerController.deleteAllProviders);

module.exports = router;
