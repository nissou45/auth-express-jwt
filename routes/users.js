//récupérer le profil

//modifier les infos

//supprimer un compte

//afficher une liste d’utilisateurs

const express = require("express");
const authenticateToken = require("../middleware/authenticateToken");

const router = express.Router();

router.get("/dashboard", authenticateToken, (req, res) => {
  res.send(`Bienvenue ${req.user.email} sur votre tableau de bord`);
});

module.exports = router;
