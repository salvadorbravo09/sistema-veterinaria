import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

// Crea una instancia de la aplicación Express
const app = express();

// Configura dotenv para cargar las variables de entorno
dotenv.config();

// Llama a la función connectDB para establecer una conexión con la base de datos
connectDB();

// Inicia el servidor en el puerto 4000 y muestra un mensaje en la consola
const port = process.env.PORT || 4000;
app.listen(4000, () => {
  console.log(`Server running on port ${port}`);
});
