import pacienteModel from "../models/pacienteModel.js";

const agregarPaciente = async (req, res) => {
  const paciente = new pacienteModel(req.body);
  paciente.veterinario = req.veterinarioSchema._id;

  try {
    const pacienteGuardado = await paciente.save();
    res.status(201).json(pacienteGuardado);
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

const obtenerPacientes = async (req, res) => {
  try {
    const pacientes = await pacienteModel
      .find()
      .where("veterinario")
      .equals(req.veterinarioSchema);
    res.status(200).json(pacientes);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
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
  res.status(200).json(paciente);
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
    res.status(200).json({ msg: "Paciente actualizado", paciente: pacienteActualizado });
  } catch (error) {
    res.status(500).json({ msg: "Error al actualizar el paciente" });
  }
};

const eliminarPaciente = async (req, res) => {
  const { id } = req.params;

  // Buscar el paciente en la base de datos
  const filter = { _id: id };
  const paciente = await pacienteModel.findById(filter);

  if (!paciente) {
    return res.status(404).json({ msg: "Paciente no encontrado" });
  }

  // Eliminar paciente
  try {
    await paciente.deleteOne();
    res.status(204).json({ msg: "Paciente eliminado" });
  } catch (error) {
    res.status(500).json({ msg: "Error al eliminar el paciente" });
  }
};

export {
  agregarPaciente,
  obtenerPacientes,
  obtenerPaciente,
  actualizarPaciente,
  eliminarPaciente,
};
