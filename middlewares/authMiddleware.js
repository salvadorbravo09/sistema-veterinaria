const checkAuth = (req, res, next) => {
  const token = req.headers.authorization;
  if (token && token.startsWith("Bearer")) {
    console.log("Si tiene el token con bearer");
  }

  const error = new Error("Token no valido");
  res.status(403).json({ msg: error.message });
  next();
};

export default checkAuth;
