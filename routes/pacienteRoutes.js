import Router from "express";
import {
  agregarPaciente,
  obtenerPacientes,
} from "../controllers/pacienteController.js";
import checkAuth from "../middlewares/authMiddleware.js";

const router = Router();

router.post("/", checkAuth, agregarPaciente);
router.get("/", checkAuth, obtenerPacientes);

export default router;
