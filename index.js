import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import veterinarioRoutes from "./routes/veterinarioRoutes.js";
import pacienteRoutes from "./routes/pacienteRoutes.js";

import swaggerUi from "swagger-ui-express";
import specs from "./docs/swagger.js";

// Crea una instancia de la aplicación Express
const app = express();

// Permite a la aplicación Express recibir datos en formato JSON
app.use(express.json());

// Configura dotenv para cargar las variables de entorno
dotenv.config();

// Llama a la función connectDB para establecer una conexión con la base de datos
connectDB();

app.use("/api/veterinarios", veterinarioRoutes);
app.use("/api/pacientes", pacienteRoutes);

// Ruta para Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

// Inicia el servidor en el puerto 4000 y muestra un mensaje en la consola
const port = process.env.PORT || 4000;
app.listen(4000, () => {
  console.log(`Server running on port ${port}`);
});
