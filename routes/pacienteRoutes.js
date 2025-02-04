import Router from "express";
import {
  agregarPaciente,
  obtenerPacientes,
} from "../controllers/pacienteController.js";

const router = Router();

router.post("/", agregarPaciente);
router.get("/", obtenerPacientes);

export default router;
