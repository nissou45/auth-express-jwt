const helmet = require("helmet");
require("dotenv").config();

const fs = require("fs");
const path = require("path");
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const app = express(); // app AVANT usage

app.use(express.json());
app.use(helmet());

// routes
const profileRoutes = require("./routes/profile");
app.use("/user", profileRoutes);

// REGISTER
app.post("/register", async (req, res) => {
  const { email, password } = req.body;

  const users = readUsers();

  const userExists = users.find((user) => user.email === email);
  if (userExists) {
    return res.status(409).json({ message: "Utilisateur déjà inscrit" });
  }

  const passwordHash = await bcrypt.hash(password, 10);

  users.push({ email, passwordHash });
  writeUsers(users);

  res.status(201).json({ message: "Utilisateur créé ✅" });
});
const loginAttempts = {};
const MAX_ATTEMPTS = 3;

// LOGIN
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // initialisation si première tentative
  if (!loginAttempts[email]) {
    loginAttempts[email] = 0;
  }

  // trop de tentatives error 429
  if (loginAttempts[email] >= MAX_ATTEMPTS) {
    return res.status(429).json({
      message:
        "Trop de tentatives de connexion ! Veuillez réessayer plus tard.",
    });
  }

  const users = readUsers();
  const user = users.find((user) => user.email === email);

  // email OU mot de passe incorrect
  if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
    loginAttempts[email] += 1;

    return res.status(401).json({
      message: `Identifiants invalides (${loginAttempts[email]}/${MAX_ATTEMPTS})`,
    });
  }

  //  succès = reset du compteur
  loginAttempts[email] = 0;

  const token = jwt.sign({ email }, SECRET, { expiresIn: "1h" });
  res.json({ token });
});

/*  Serveur */

app.listen(3000, () =>
  console.log("🚀 Serveur lancé sur http://localhost:3000"),
);
