import mongoose from "mongoose";

const pacienteSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
    },
    propietario: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    fecha: {
      type: Date,
      required: true,
      default: Date.now(),
    },
    sintomas: {
      type: String,
      required: true,
    },
    veterinario: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "veterinarioModel",
    },
  },
  {
    timestamps: true,
  }
);

const pacienteModel = mongoose.model("pacienteModel", pacienteSchema);

export default pacienteModel;
