import veterinarioModel from "../models/veterinarioModel.js";

const registrar = async (req, res) => {
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
