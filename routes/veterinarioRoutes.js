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
/**
 * @swagger
 * components:
 *   schemas:
 *     Veterinario:
 *       type: object
 *       required:
 *         - nombre
 *         - email
 *         - password
 *       properties:
 *         nombre:
 *           type: string
 *           description: Nombre del veterinario
 *           example: "Salvador Bravo"
 *         email:
 *           type: string
 *           description: Correo electrónico único del veterinario
 *           example: "salvador@correo.com"
 *         password:
 *           type: string
 *           description: Contraseña del veterinario
 *           example: "salvador123"
 */

/**
 * @swagger
 * /api/veterinarios:
 *   post:
 *     summary: Registrar un nuevo veterinario
 *     description: Crea una cuenta nueva para un veterinario.
 *     tags: [Veterinarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Veterinario"
 *     responses:
 *       201:
 *         description: Veterinario registrado con éxito.
 *       400:
 *         description: El email ya está registrado.
 */
router.post("/", registrar); // Ruta para registrar un nuevo veterinario

/**
 * @swagger
 * /api/veterinarios/login:
 *   post:
 *     summary: Autenticar un veterinario
 *     description: Inicia sesión con email y contraseña.
 *     tags: [Veterinarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "salvador@correo.com"
 *               password:
 *                 type: string
 *                 example: "salvador123"
 *     responses:
 *       200:
 *         description: Veterinario autenticado correctamente.
 *       401:
 *         description: Credenciales inválidas o veterinario no confirmado.
 */
router.post("/login", autenticar); // Ruta para autenticar un veterinario

/**
 * @swagger
 * /api/veterinarios/confirmar/{token}:
 *   get:
 *     summary: Confirmar cuenta de veterinario
 *     description: Confirma la cuenta de un veterinario usando un token.
 *     tags: [Veterinarios]
 *     parameters:
 *       - in: path
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *         description: Token de confirmación
 *     responses:
 *       200:
 *         description: Cuenta confirmada con éxito.
 *       404:
 *         description: Token inválido.
 */
router.get("/confirmar/:token", confirmar); // Ruta para confirmar la cuenta de un veterinario

/**
 * @swagger
 * /api/veterinarios/resetear-password:
 *   post:
 *     summary: Solicitar reseteo de contraseña
 *     description: Envia un email con instrucciones para resetear la contraseña.
 *     tags: [Veterinarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "juanperez@example.com"
 *     responses:
 *       200:
 *         description: Email enviado con éxito.
 *       404:
 *         description: Usuario no encontrado.
 */
router.post("/resetear-password", resetPassword); // Ruta para resetear la contraseña de un veterinario

/**
 * @swagger
 * /api/veterinarios/resetear-password/{token}:
 *   get:
 *     summary: Verificar token de reseteo
 *     description: Comprueba si el token de reseteo es válido.
 *     tags: [Veterinarios]
 *     parameters:
 *       - in: path
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *         description: Token de reseteo de contraseña
 *     responses:
 *       200:
 *         description: Token válido.
 *       404:
 *         description: Token inválido.
 */
router.get("/resetear-password/:token", comprobarToken); // Ruta para comprobar el token de reseteo de contraseña

/**
 * @swagger
 * /api/veterinarios/resetear-password/{token}:
 *   post:
 *     summary: Cambiar contraseña
 *     description: Establece una nueva contraseña usando un token válido.
 *     tags: [Veterinarios]
 *     parameters:
 *       - in: path
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *         description: Token de reseteo de contraseña
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               password:
 *                 type: string
 *                 example: "nuevaContraseña123"
 *     responses:
 *       200:
 *         description: Contraseña cambiada correctamente.
 *       404:
 *         description: Token inválido o usuario no encontrado.
 */
router.post("/resetear-password/:token", nuevoPassword); // Ruta para cambiar la contraseña de un veterinario

// Private Routes
router.get("/perfil", checkAuth, perfil); // Ruta para ir al perfil de un veterinario

export default router;
