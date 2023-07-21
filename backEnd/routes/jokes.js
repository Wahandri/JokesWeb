const express = require("express");
const router = express.Router();

const Joke = require("../models/joke");


// Recibir lista de Chistes
router.get("/", async (req, res) => {
  try {
    const PAGE_SIZE = 2;
    const page = req.query.page || 1;

    const jokes = await Joke.find({})
      .skip(PAGE_SIZE * (page - 1))
      .limit(PAGE_SIZE)
      .exec();

    res.status(200).json({ ok: true, jokes });
  } catch (error) {
    res.status(400).json({ ok: false, error });
  }
});

// CREAR CHISTE (Joke)
router.post("/create", async (req, res) => {
  try {
    const joke = new Joke({
      title: req.body.title,
      text: req.body.text,
      author: req.body.author,
    });

    const savedJoke = await joke.save();

    res.status(201).json({ ok: true, savedJoke });
  } catch (error) {
    res.status(400).json({ ok: false, error });
  }
});

// Obtener un chiste aleatorio
router.get("/random", async (req, res) => {
  try {
    console.log("Entrando a /random");
    const jokeCount = await Joke.countDocuments();
    console.log("Total de chistes:", jokeCount);
    if (jokeCount === 0) {
      res.status(404).json({ ok: false, message: "No hay chistes disponibles" });
    } else {
      const randomIndex = Math.floor(Math.random() * jokeCount);
      console.log("Obteniendo chiste aleatorio en el índice:", randomIndex);
      const randomJoke = await Joke.findOne().skip(randomIndex).exec();
      console.log("Chiste aleatorio:", randomJoke.text);
      res.status(200).json({ ok: true, joke: randomJoke });

    }
  } catch (error) {
    console.error("Error al obtener el chiste:", error);
    res.status(500).json({ ok: false, error });
  }
});

module.exports = router;
