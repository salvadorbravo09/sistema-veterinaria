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
  const paciente = await pacienteModel.findById(filter);

  if (!paciente) {
    return res.status(404).json({ msg: "Paciente no encontrado" });
  }

  // Obtener el paciente
  res.json(paciente);
};

const actualizarPaciente = async (req, res) => {
  const { id } = req.params;

  // Buscar el paciente en la base de datos
  const filter = { _id: id };
  const paciente = await pacienteModel.findById(filter);

  if (!paciente) {
    return res.status(404).json({ msg: "Paciente no encontrado" });
  }

  // Actualizar paciente
  paciente.nombre = req.body.nombre;
  try {
    const pacienteActualizado = await paciente.save();
    res.json({ msg: "Paciente actualizado", paciente: pacienteActualizado });
  } catch (error) {
    res.status(500).json({ msg: "Error al actualizar el paciente" });
  }
};

const eliminarPaciente = async (req, res) => {};

export {
  agregarPaciente,
  obtenerPacientes,
  obtenerPaciente,
  actualizarPaciente,
  eliminarPaciente,
};
