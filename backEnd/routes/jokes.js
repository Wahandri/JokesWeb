const express = require("express");
const router = express.Router();

const Joke = require("../models/joke");
const User = require("../models/user");

// Recibir lista de Chistes
router.get("/", async (req, res) => {
  try {
    const PAGE_SIZE = 5;
    const page = req.query.page || 1;

    const jokes = await Joke.find({})
      .skip(PAGE_SIZE * (page - 1))
      .limit(PAGE_SIZE)
      .exec();

    const totalJokes = await Joke.countDocuments(); // Total de chistes en la base de datos

    res.status(200).json({ ok: true, jokes, totalJokes });
  } catch (error) {
    res.status(400).json({ ok: false, error });
  }
});


// CREAR CHISTE (Joke)
router.post("/create", async (req, res) => {
  try {
    const joke = new Joke({
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



// Votar chiste (Agregar o quitar "Me gusta")
router.post('/:id/like', async (req, res) => {
  const jokeId = req.params.id;
  const { userId } = req.body;

  try {
    console.log("Post enviado");
    const joke = await Joke.findById(jokeId);
    if (!joke) {
      console.log("Chiste no encontrado");
      return res.status(404).json({ error: 'Chiste no encontrado' });
    }

    const user = await User.findById(userId); // Obtener el usuario

    if (!user) {
      console.log("Usuario no encontrado");
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    if (user.favoriteJokes.includes(jokeId)) { // Si el chiste está en los favoritos del usuario, quitarlo
      joke.score -= 1; // Restar la puntuación del chiste
      user.favoriteJokes = user.favoriteJokes.filter(id => id.toString() !== jokeId); // Quitar el chiste de los favoritos
      await Promise.all([joke.save(), user.save()]); // Guardar ambos en paralelo
      return res.status(200).json({ message: 'Me gusta quitado exitosamente' });
    } else { // Si el chiste no está en los favoritos del usuario, agregarlo
      joke.score += 1; // Aumentar la puntuación del chiste
      user.favoriteJokes.push(jokeId); // Agregar el chiste a los favoritos del usuario
      await Promise.all([joke.save(), user.save()]); // Guardar ambos en paralelo
      return res.status(200).json({ message: 'Me gusta agregado exitosamente' });
    }
  } catch (error) {
    console.error('Error al manejar "Me gusta":', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});



module.exports = router;
