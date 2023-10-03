require('dotenv').config(); // Cargar variables de entorno desde .env

const apiUrl = process.env.REACT_APP_BACKEND_URL;

export default apiUrl;
