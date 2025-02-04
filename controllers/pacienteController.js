import pacienteModel from "../models/pacienteModel.js";

const agregarPaciente = async (req, res) => {
  const paciente = new pacienteModel(req.body);
  paciente.veterinario = req.veterinarioSchema._id;
  try {
    const pacienteGuardado = await paciente.save();
    res.json(pacienteGuardado);
  } catch (error) {
    console.log(error);
  }
};

const obtenerPacientes = (req, res) => {};

export { agregarPaciente, obtenerPacientes };
