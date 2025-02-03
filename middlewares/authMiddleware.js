import jwt from "jsonwebtoken";
import veterinarioModel from "../models/veterinarioModel.js";

const checkAuth = async (req, res, next) => {
  let decodedToken;

  // Extraer el token del header
  const token = req.headers.authorization;
  // Comprobar si el token existe y si empieza con "Bearer"
  if (token && token.startsWith("Bearer")) {
    try { // Si el token es valido se decodifica
      decodedToken = token.split(" ")[1];
      const decoded = jwt.verify(decodedToken, process.env.JWT_SECRET);
      // Se busca al veterinario en la base de datos y se le quitan los campos sensibles
      req.veterinarioSchema = await veterinarioModel
        .findById(decoded.id)
        .select("-password -token -confirmado");
      return next(); // Si todo es correcto se pasa al siguiente middleware
    } catch (err) {
      // Si el token no es valido se envia el mensaje de error
      const error = new Error("Token no valido");
      return res.status(403).json({ msg: error.message });
    }
  }

  if (!decodedToken) {
    const error = new Error("Token no valido o inexistente");
    res.status(403).json({ msg: error.message });
  }
   return next();
};

export default checkAuth;
