const helmet = require("helmet");
require("dotenv").config();

const express = require("express");

const app = express();

app.use(express.json());
app.use(helmet());

// ROUTERS
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/users");

app.use("/auth", authRoutes);
//app.use("/", adminRoutes);deja declarerroutes/auth.js
// SERVEUR
app.listen(3000, () => {
  console.log("🚀 Serveur lancé sur http://localhost:3000");
});
