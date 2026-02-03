const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Page de profil");
});

module.exports = router;
