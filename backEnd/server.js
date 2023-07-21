require("./config/config");
const users = require("./routes/users");
const jokes = require("./routes/jokes");
const login = require("./routes/login");
const mongoose = require("mongoose");

const express = require("express"); //requerimos express
const app = express();
const port = process.env.PORT || 3000;

const cors = require("cors"); // Requerir el módulo cors

// --Usando middlewares para leer JSON y habilitar CORS
app.use(express.json());
app.use(cors());

app.use("/users", users);
app.use("/jokes", jokes);
app.use("/login", login);

// --Conectamos a la DB
mongoose.connect("mongodb://localhost:27017/HappyHandri", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

// --Verificacion de conexion
db.on("error", (err) => console.log("[ERROR] Connection to DB failed: ", err));
db.once("open", () => console.log("[OK] Connected to DB successfuly"));

// -----------

// Escuchando en el puerto
app.listen(port, () => {
  console.log('Conexion con el puerto:', port);
});
// -----------
