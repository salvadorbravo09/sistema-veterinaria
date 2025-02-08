import swaggerJSDoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Sistema de Veterinaria API",
      version: "1.0.0",
      description: "API para la gestión de pacientes y veterinarios",
      contact: {
        name: "Salvador Bravo",
      },
      servers: [
        {
          url: "http://localhost:4000",
          description: "Local server",
        },
      ],
    },
  },
  apis: ["./routes/*.js"],
};

const specs = swaggerJSDoc(options);
export default specs;
