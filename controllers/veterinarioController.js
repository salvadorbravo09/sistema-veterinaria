import veterinarioModel from "../models/veterinarioModel.js";

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
  res.json({ msg: "Mostrando perfil" });
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

  //TODO: Comprobar si el veterinario esta confirmado
  if (!veterinario.confirmado) {
    const error = new Error("Tu cuenta no ha sido confirmada");
    return res.status(403).json({ msg: error.message });
  }

  // Autenticar al usuario
  if (await veterinario.comprobarPassword(password)) {
    //TODO: Generar token
  } else {
    const error = new Error("Password incorrecto");
    return res.status(403).json({ msg: error.message });
  }
};

export { registrar, perfil, confirmar, autenticar };
