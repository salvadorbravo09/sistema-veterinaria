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

const obtenerPacientes = async (req, res) => {
  const pacientes = await pacienteModel
    .find()
    .where("veterinario")
    .equals(req.veterinarioSchema);
  res.json(pacientes);
};

const obtenerPaciente = async (req, res) => {
  const { id } = req.params;

  // Buscar el paciente en la base de datos
  const filter = { _id: id };

  // Obtener el paciente
  const paciente = await pacienteModel.findById(filter);

  res.json(paciente);
};

const actualizarPaciente = async (req, res) => {};

const eliminarPaciente = async (req, res) => {};

export {
  agregarPaciente,
  obtenerPacientes,
  obtenerPaciente,
  actualizarPaciente,
  eliminarPaciente,
};
