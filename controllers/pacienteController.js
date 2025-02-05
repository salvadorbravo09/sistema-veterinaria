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
  const pacientes = await pacienteModel.find().where('veterinario').equals(req.veterinarioSchema);
  res.json(pacientes);
};

export { agregarPaciente, obtenerPacientes };
