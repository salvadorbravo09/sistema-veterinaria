import express from "express";
import {
  registrar,
  perfil,
  confirmar,
  autenticar,
  resetPassword,
  comprobarToken,
  nuevoPassword,
} from "../controllers/veterinarioController.js";
import checkAuth from "../middlewares/authMiddleware.js";

const router = express.Router();

// Public Routes
router.post("/", registrar); // Ruta para registrar un nuevo veterinario
router.post("/login", autenticar); // Ruta para autenticar un veterinario
router.get("/confirmar/:token", confirmar); // Ruta para confirmar la cuenta de un veterinario
router.post("/resetear-password", resetPassword); // Ruta para resetear la contraseña de un veterinario
router.get("/resetear-password/:token", comprobarToken); // Ruta para comprobar el token de reseteo de contraseña
router.post("/resetear-password/:token", nuevoPassword); // Ruta para cambiar la contraseña de un veterinario

// Private Routes
router.get("/perfil", checkAuth, perfil); // Ruta para ir al perfil de un veterinario

export default router;
