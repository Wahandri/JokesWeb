// backend/routes/login.js
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const User = require("../models/user");
const configSeed = require("./config"); // Importar la configuración

// Verificación de password encriptada
router.post("/", async (req, res) => {
  try {
    const body = req.body;

    const userDB = await User.findOne({ email: body.email });

    if (!userDB) {
      console.log("Email not found");
      return res.status(400).json({
        ok: false,
        error: "Email not found",
      });
    }

    if (!bcrypt.compareSync(body.password, userDB.password)) {
      console.log("Invalid password");
      return res.status(400).json({
        ok: false,
        error: "Invalid password",
      });
    }

    console.log("Config SEED:", configSeed.SEED);
    const token = jwt.sign(
      { user: userDB },
      configSeed.SEED, // Usar la clave secreta de la configuración
      { expiresIn: "2h" }
    );

    console.log("Login successful");
    res.status(200).json({ ok: true, token, user: userDB });
  } catch (error) {
    console.log("Error in login:", error);
    res.status(500).json({ ok: false, error });
  }
});

module.exports = router;
