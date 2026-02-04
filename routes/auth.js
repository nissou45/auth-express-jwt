const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");

const authenticateToken = require("../middleware/authenticateToken");
const authorizeRole = require("../middleware/authorizeRole");

const router = express.Router();

//  FICHIER USERS
const usersFile = path.join(__dirname, "../data/users.json");

//SECRET JWT
const SECRET = process.env.SECRET_TOKEN;

//  UTILS
const readUsers = () => {
  if (!fs.existsSync(usersFile)) {
    return [];
  }
  const data = fs.readFileSync(usersFile, "utf-8");
  return JSON.parse(data);
};

const writeUsers = (users) => {
  fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));
};

// REGISTER
router.post("/register", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email et mot de passe requis" });
  }

  const users = readUsers();

  const userExists = users.find((user) => user.email === email);
  if (userExists) {
    return res.status(409).json({ message: "Utilisateur déjà inscrit" });
  }

  const passwordHash = await bcrypt.hash(password, 10);

  users.push({
    email,
    passwordHash,
    role: "user", //  rôle par défaut
  });

  writeUsers(users);

  res.status(201).json({ message: "Utilisateur créé ✅" });
});

// LOGIN
const loginAttempts = {};
const MAX_ATTEMPTS = 3;

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!loginAttempts[email]) {
    loginAttempts[email] = 0;
  }

  if (loginAttempts[email] >= MAX_ATTEMPTS) {
    return res.status(429).json({
      message: "Trop de tentatives de connexion",
    });
  }

  const users = readUsers();
  const user = users.find((user) => user.email === email);

  if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
    loginAttempts[email] += 1;
    return res.status(401).json({
      message: `Identifiants invalides (${loginAttempts[email]}/${MAX_ATTEMPTS})`,
    });
  }

  loginAttempts[email] = 0;

  const token = jwt.sign({ email: user.email, role: user.role }, SECRET, {
    expiresIn: "1h",
  });

  res.json({ token });
});

// ROUTE ADMIN PROTÉGÉE
router.get("/admin", authenticateToken, authorizeRole("admin"), (req, res) => {
  res.json({ message: "Accès admin autorisé" });
});

module.exports = router;
