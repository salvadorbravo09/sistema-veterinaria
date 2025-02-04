import veterinarioModel from "../models/veterinarioModel.js";
import generarJWT from "../helpers/generarJWT.js";
import generarId from "../helpers/generarId.js";

const registrar = async (req, res) => {
  const { email } = req.body;
  const emailExiste = await veterinarioModel.findOne({ email });

  // Comprobar si el email ya existe
  if (emailExiste) {
    const error = new Error("El email ya esta registrado");
    return res.status(400).json({ msg: error.message });
  }

  try {
    // Guardar un nuevo veterinario en la base de datos
    const veterinario = new veterinarioModel(req.body);
    const veterinarioGuardado = await veterinario.save();
    res.json(veterinarioGuardado);
  } catch (error) {
    console.log(error);
  }
};

const perfil = (req, res) => {
  const { veterinarioSchema } = req;
  res.json({ perfil: veterinarioSchema });
};

const confirmar = async (req, res) => {
  const { token } = req.params;

  const veterinarioConfirmar = await veterinarioModel.findOne({ token });
  if (!veterinarioConfirmar) {
    const error = new Error("Token no valido");
    return res.status(404).json({ msg: error.message });
  }

  try {
    veterinarioConfirmar.token = null;
    veterinarioConfirmar.confirmado = true;
    await veterinarioConfirmar.save();
    res.json({ msg: "Veterinario confirmado" });
  } catch (error) {
    console.log(error);
  }
};

const autenticar = async (req, res) => {
  const { email, password } = req.body;

  // Comprobar si el veterinario existe
  const veterinario = await veterinarioModel.findOne({ email });
  if (!veterinario) {
    const error = new Error("El veterinario no existe");
    return res.status(403).json({ msg: error.message });
  }

  // Comprobar si el veterinario esta confirmado
  if (!veterinario.confirmado) {
    const error = new Error("Tu cuenta no ha sido confirmada");
    return res.status(403).json({ msg: error.message });
  }

  // Autenticar al usuario
  if (await veterinario.comprobarPassword(password)) {
    // Generar JWT
    res.json({ token: generarJWT(veterinario.id) });
  } else {
    const error = new Error("Password incorrecto");
    return res.status(403).json({ msg: error.message });
  }
};

const resetPassword = async (req, res) => {
  const { email } = req.body;

  const veterinario = await veterinarioModel.findOne({ email });
  // Si veterinario no existe
  if (!veterinario) {
    const error = new Error("El usuario no existe");
    return res.status(400).json({ msg: error.message });
  }

  // Si el veterinario existe
  try {
    // Generamos un nuevo token y lo guardamos
    veterinario.token = generarId();
    await veterinario.save();
    return res.json({
      msg: "Se ha enviado un email para resetear la contraseña",
    });
  } catch (error) {
    console.log(error);
  }
};

const comprobarToken = async (req, res) => {
  const { token } = req.params;
  const tokenValido = await veterinarioModel.findOne({ token });
  if (tokenValido) {
    // El token es valido
    res.json({ msg: "Token valido para resetear la contraseña" });
  } else {
    const error = new Error("Token no valido");
    return res.status(400).json({ msg: error.message });
  }
};

const nuevoPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  const veterinario = await veterinarioModel.findOne({ token });
  if (!veterinario) {
    const error = new Error("Hubo un error");
    return res.status(400).json({ msg: error.message });
  }

  try {
    // Guardamos la nueva contraseña y eliminamos el token
    veterinario.token = null;
    veterinario.password = password;
    await veterinario.save();
    res.json({ msg: "Password modificado correctamente" });
  } catch (error) {
    console.log(error);
  }
};

export {
  registrar,
  perfil,
  confirmar,
  autenticar,
  resetPassword,
  comprobarToken,
  nuevoPassword,
};
