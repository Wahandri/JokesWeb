const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const User = require("../models/user");
const verifyToken = require("../middleweres/auth");

// Verificación de password encriptada
router.post("/login", async (req, res) => {
  try {
    const body = req.body;

    const userDB = await User.findOne({ email: body.email });

    if (!userDB) {
      return res.status(400).json({
        ok: false,
        error: "Email not found",
      });
    }

    if (!bcrypt.compareSync(body.password, userDB.password)) {
      return res.status(400).json({
        ok: false,
        error: "Invalid password",
      });
    }

    const token = jwt.sign(
      { user: userDB },
      process.env.SEED,
      { expiresIn: "2h" }
    );

    res.status(200).json({ ok: true, token, user: userDB });
  } catch (error) {
    res.status(500).json({ ok: false, error });
  }
});

// Recibir lista de usuarios
router.get("/", verifyToken, async (req, res) => {
  try {
    const PAGE_SIZE = 2;
    const page = req.query.page || 1;

    const users = await User.find({ active: true })
      .skip(PAGE_SIZE * (page - 1))
      .limit(PAGE_SIZE)
      .exec();

    res.status(200).json({ ok: true, users });
  } catch (error) {
    res.status(400).json({ ok: false, error });
  }
});

// Cambiar usuario
router.put("/change/:id", verifyToken, async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ ok: false, message: "User not found" });
    }

    if (req.body.username) {
      user.username = req.body.username;
    }
    if (req.body.email) {
      user.email = req.body.email;
    }
    if (req.body.password) {
      user.password = bcrypt.hashSync(req.body.password, 10);
    }

    const updatedUser = await user.save();

    res.status(200).json({ ok: true, updatedUser });
  } catch (error) {
    res.status(400).json({ ok: false, error });
  }
});

// Crear usuario
router.post("/create", async (req, res) => {
  try {
    const user = new User({
      username: req.body.username,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 10),
    });

    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).json({ ok: false, error: "El nombre de usuario o correo electrónico ya está en uso." });
    }

    const savedUser = await user.save();

    res.status(201).json({ ok: true, savedUser });
  } catch (error) {
    res.status(400).json({ ok: false, error });
  }
});

// Borrar usuario
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ ok: false, message: "User not found" });
    }

    if (req.body.active !== undefined) {
      user.active = req.body.active;
    }

    const updatedUser = await user.save();

    res.status(200).json({ ok: true, updatedUser });
  } catch (error) {
    res.status(400).json({ ok: false, error });
  }
});

module.exports = router;
