import pacienteModel from "../models/pacienteModel.js";

const agregarPaciente = (req, res) => {
  const paciente = new pacienteModel(req.body);
  console.log(paciente);
};

const obtenerPacientes = (req, res) => {};

export { agregarPaciente, obtenerPacientes };
