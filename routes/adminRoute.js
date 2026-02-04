const express = require("express");
const authenticateToken = require("../middleware/authenticateToken");
const authorizeRole = require("../middleware/authorizeRole");

const router = express.Router();

router.get("/admin", authenticateToken, authorizeRole("admin"), (req, res) => {
  res.json({ message: "Accès admin autorisé" });
});

module.exports = router;
