require("../config/config");

const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const User = require("../models/user");

// verificación de password encriptada
router.post("/", async (req, res) => {
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
        { user: userDB},  // payload
        process.env.SEED,
        {expiresIn: "2h"}

      )
      
      res.status(200).json({ ok: true, token, user: userDB });
    } catch (error) {
      res.status(500).json({ ok: false, error });
    }
});
  
  
  module.exports = router;