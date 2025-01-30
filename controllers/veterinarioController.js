import veterinarioModel from "../models/veterinarioModel.js";

const registrar = async (req, res) => {
  const { email } = req.body;
  const emailExiste = await veterinarioModel.findOne({ email });

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

export { registrar, perfil };
