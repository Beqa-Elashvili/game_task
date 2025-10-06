const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");
const { authenticateToken } = require("../middleware/auth");

router.post("/register", usersController.register);
router.post("/login", usersController.login);

router.get("/", authenticateToken, usersController.getCurrentUser);

module.exports = router;
