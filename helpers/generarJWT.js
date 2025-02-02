import jwt from "jsonwebtoken";

const generarJWT = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d", // El JWT expira en 30 dias
  });
};

export default generarJWT;
