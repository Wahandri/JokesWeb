const dotenv = require("dotenv"); // Agrega esta línea para requerir dotenv
dotenv.config(); // Carga las variables de entorno desde el archivo .env

const users = require("./routes/users");
const jokes = require("./routes/jokes");
const login = require("./routes/login");
const mongoose = require("mongoose");
const express = require("express");
const app = express();
const port = process.env.PORT || 3001;

const cors = require("cors");
const bodyParser = require("body-parser");

// Usando middlewares para leer JSON y habilitar CORS
app.use(bodyParser.json());
app.use(cors());

app.use("/users", users);
app.use("/jokes", jokes);
app.use("/login", login);

// --Conectamos a la DB
console.log("Intentando conectarse a la DB...");
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

// --Verificacion de conexion
db.on("error", (err) => {
  console.log("[ERROR] Connection to DB failed: ", err);
});
db.once("open", () => {
  console.log("[OK] Connected to DB successfully");
});

// Secreto para firmar y verificar tokens
const SEED =
  process.env.SEED ||
  "4b343153cf67b908b5b57cf85d2e06c33cd846efa04299ecb88a77fb6af652098651c83079ad8ec68657cb15a6e34f532fcee4b1e067993e55252660ffe60907";

// Escuchando en el puerto
app.listen(port, () => {
  console.log('Conexion con el puerto:', port);
});
