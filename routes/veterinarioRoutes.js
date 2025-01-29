import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Desde API/VETERINARIOS");
});

router.get("/login", (req, res) => {
  res.send("Desde API/VETERINARIOS/login");
});

export default router;
