const generarId = () => {
  return Math.random().toString(32).substring(2);
};

export default generarId;
