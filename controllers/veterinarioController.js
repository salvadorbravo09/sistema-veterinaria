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

export { registrar, perfil, confirmar };
