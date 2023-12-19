const express = require("express");
const router = express.Router();
const Joke = require("../models/joke");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const verifyToken = require("../middleweres/auth");

// Recibir lista de Chistes (orden inverso)
router.get("/", async (req, res) => {
  try {
    const PAGE_SIZE = 5;
    const page = req.query.page || 1;
    const filter = req.query.filter || ""; // Nuevo filtro de texto
    const sortByScore = req.query.sortByScore === "true"; // Nuevo filtro de ordenación

    let query = {};

    // Aplicar filtro de texto si se proporciona
    if (filter) {
      query.$or = [
        { text: { $regex: filter, $options: "i" } }, // Filtrar por texto del chiste (insensible a mayúsculas y minúsculas)
        { author: { $regex: filter, $options: "i" } }, // Filtrar por autor del chiste (insensible a mayúsculas y minúsculas)
      ];
    }

    // Aplicar ordenación si es necesario
    if (sortByScore) {
      query = { ...query, score: -1 }; // Ordenar por puntuación descendente
    }

    const jokes = await Joke.find(query)
      .sort({ _id: -1 }) // Ordenar por _id en orden inverso (último chiste primero)
      .skip(PAGE_SIZE * (page - 1))
      .limit(PAGE_SIZE)
      .exec();

    const totalJokes = await Joke.countDocuments(query); // Total de chistes en la base de datos con filtros

    res.status(200).json({ ok: true, jokes, totalJokes });
  } catch (error) {
    res.status(400).json({ ok: false, error });
  }
});

// Recibir TODOS lo chistes
router.get("/alljokes", async (req, res) => {
  try {
    const jokes = await Joke.find();

    res.status(200).json({ ok: true, jokes });
  } catch (error) {
    res.status(400).json({ ok: false, error });
  }
});

// CREAR CHISTE (Joke)
router.post("/create", verifyToken, async (req, res) => {
  try {
    // Crear un nuevo chiste
    const joke = new Joke({
      text: req.body.text,
      author: req.body.author,
    });

    // Guardar el chiste en la base de datos
    const savedJoke = await joke.save();

    res.status(201).json({ ok: true, savedJoke });
  } catch (error) {
    console.error("Error al crear el chiste:", error);
    res.status(500).json({ ok: false, error: "Error interno del servidor" });
  }
});

router.put("/:id/edit", verifyToken, async (req, res) => {
  const chisteId = req.params.id;
  const { text, author } = req.body;

  try {
    // Verificar si el chiste existe
    const joke = await Joke.findById(chisteId);

    if (!joke) {
      return res.status(404).json({ error: "Chiste no encontrado" });
    }

    // Verificar si el autor del chiste coincide con el usuario que envía la solicitud
    if (joke.author !== author) {
      return res
        .status(403)
        .json({ error: "No tienes permiso para editar este chiste" });
    }

    // Actualizar el texto del chiste
    joke.text = text;

    // Guardar los cambios en la base de datos
    const updatedJoke = await joke.save();

    res.status(200).json({ ok: true, updatedJoke });
  } catch (error) {
    console.error("Error al editar el chiste:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

// Obtener un chiste aleatorio
router.get("/random", async (req, res) => {
  try {
    console.log("Entrando a /random");
    const jokeCount = await Joke.countDocuments();
    console.log("Total de chistes:", jokeCount);
    if (jokeCount === 0) {
      res
        .status(404)
        .json({ ok: false, message: "No hay chistes disponibles" });
    } else {
      const randomIndex = Math.floor(Math.random() * jokeCount);
      // console.log("Obteniendo chiste aleatorio en el índice:", randomIndex);

      const randomJoke = await Joke.findOne().skip(randomIndex).exec();
      // console.log("Chiste aleatorio:", randomJoke.text);

      res.status(200).json({ ok: true, joke: randomJoke });
    }
  } catch (error) {
    console.error("Error al obtener el chiste:", error);
    res.status(500).json({ ok: false, error });
  }
});

// Agregar un chiste a favoritos
router.post("/:id/favorite", verifyToken, async (req, res) => {
  const jokeId = req.params.id;
  const { userId } = req.body;

  try {
    const joke = await Joke.findById(jokeId);
    if (!joke) {
      return res.status(404).json({ error: "Chiste no encontrado" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    // Verifica si el chiste ya está en favoritos
    if (user.favoriteJokes.includes(jokeId)) {
      return res.status(400).json({ error: "El chiste ya está en favoritos" });
    }

    // Agrega el chiste a favoritos
    user.favoriteJokes.push(jokeId);
    await user.save();

    // Devuelve los chistes favoritos actualizados
    res.status(200).json({ favoriteJokes: user.favoriteJokes });
  } catch (error) {
    console.error("Error al agregar a favoritos:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

// Votar por un chiste
router.post("/:chisteId/vote", verifyToken, async (req, res) => {
  try {
    const { chisteId } = req.params;
    const { score, userEmail } = req.body;

    // Encuentra el chiste por su ID
    const joke = await Joke.findById(chisteId);

    if (!joke) {
      return res.status(404).json({ error: "Chiste no encontrado" });
    }

    // Verifica si el usuario ya ha votado este chiste
    const hasUserVoted = joke.userScores.some(
      (userScore) => userScore.email === userEmail
    );

    if (hasUserVoted) {
      return res
        .status(400)
        .json({ error: "El usuario ya ha votado este chiste" });
    }

    // Agrega el voto al array userScores
    joke.userScores.push({ email: userEmail, score });

    // Calcula la nueva puntuación promedio del chiste
    const totalScores = joke.userScores.reduce(
      (total, userScore) => total + userScore.score,
      0
    );
    joke.score = totalScores / joke.userScores.length;

    // Guarda los cambios en la base de datos
    await joke.save();

    res.json({ message: "Voto registrado correctamente" });
  } catch (error) {
    console.error("Error al votar por el chiste:", error);
    res.status(500).json({ error: "Error al votar por el chiste" });
  }
});

// Obtener la puntuación promedio de un chiste
router.get("/:chisteId/average-score", async (req, res) => {
  try {
    const { chisteId } = req.params;

    // Obtén el chiste por su ID y devuelve la puntuación promedio
    const joke = await Joke.findById(chisteId);

    if (!joke) {
      return res.status(404).json({ error: "Chiste no encontrado" });
    }

    const averageScore = joke.score;

    res.json({ averageScore });
  } catch (error) {
    console.error("Error al obtener la puntuación promedio:", error);
    res.status(500).json({ error: "Error al obtener la puntuación promedio" });
  }
});

// Eliminar un chiste de favoritos
router.delete("/:id/favorite", verifyToken, async (req, res) => {
  const jokeId = req.params.id;
  const { userId } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    // Verifica si el chiste está en favoritos
    if (!user.favoriteJokes.includes(jokeId)) {
      return res.status(400).json({ error: "El chiste no está en favoritos" });
    }

    // Elimina el chiste de favoritos
    user.favoriteJokes = user.favoriteJokes.filter(
      (favId) => favId.toString() !== jokeId.toString()
    );
    await user.save();

    // Devuelve los chistes favoritos actualizados
    res.status(200).json({ favoriteJokes: user.favoriteJokes });
  } catch (error) {
    console.error("Error al eliminar de favoritos:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

// Eliminar un chiste de la base de datos por su ID
router.delete("/:id", verifyToken, async (req, res) => {
  const jokeId = req.params.id;

  try {
    // Busca el chiste por su ID
    const joke = await Joke.findById(jokeId);

    if (!joke) {
      return res.status(404).json({ error: "Chiste no encontrado" });
    }

    // Elimina el chiste
    await Joke.findByIdAndDelete(jokeId);

    res.status(200).json({ message: "Chiste eliminado con éxito" });
  } catch (error) {
    console.error("Error al eliminar el chiste:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

module.exports = router;
