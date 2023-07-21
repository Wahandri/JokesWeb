const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

const User = require("../models/user");
const verifyToken = require("../middleweres/auth");


// --GRECIBIR LISTA DE USUAROS [ GET ]
router.get("/", verifyToken, async (req, res) => {
  try {

    const PAGE_SIZE = 2;
    const page = req.query.page || 1;

    //  Se añade                    "skip()" [saltos que devuelve] "limit()" [ documentos que devolverá]
    const users = await User.find({active: true}).skip(PAGE_SIZE * (page-1)).limit(PAGE_SIZE).exec();


    res.status(200).json({ ok: true, users })
  } catch (error) {
    res.status(400).json({ ok: false, error });
  }

});
// -----------

// CAMBIAR USUARIO: [ PUT ]
router.put("/change/:id", verifyToken, async (req, res) => {
  try {
    const { id } = req.params;

    // Buscar el usuario por su ID
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ ok: false, message: "Usuario no encontrado" });
    }

    // Actualizar los campos del usuario
    if (req.body.username) {
      user.username = req.body.username;
    }
    if (req.body.email) {
      user.email = req.body.email;
    }
    if (req.body.password) {
      user.password = req.body.password;
    }

    // Guardar los cambios en la base de datos
    const updatedUser = await user.save();

    res.status(200).json({ ok: true, updatedUser });
  } catch (error) {
    res.status(400).json({ ok: false, error });
  }
});
//------------

// CREAR USUARIO: [ POST ]
router.post("/create", verifyToken, async (req, res) => {
  try {
    const user = new User({
      username: req.body.username,
      email: req.body.email,
      // Utilizamos "bcrypt" para encriptar la password 
      password: bcrypt.hashSync(req.body.password, 10)
    });

    const savedUser = await user.save();

    res.status(201).json({ ok: true, savedUser });
  } catch (error) {
    res.status(400).json({ ok: false, error });
  }
});
// ------------

// --BORRAR USUARIO:  [ DELETE ]
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const { id } = req.params;

    // Buscar el usuario por su ID
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ ok: false, message: "Usuario no encontrado" });
    }

    // Actualizar los campos del usuario
    if (req.body.active !== undefined) {
      user.active = req.body.active;
    }

    // Guardar los cambios en la base de datos
    const updatedUser = await user.save();

    res.status(200).json({ ok: true, updatedUser });
  } catch (error) {
    res.status(400).json({ ok: false, error });
  }
});
// ------------


module.exports = router;
