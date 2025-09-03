import swaggerJSDoc from "swagger-jsdoc";

const options = {
  definition: {
  openapi: "3.0.0",
  info: { title: "User Admin API", version: "1.0.0" },
  servers: [{ url: `http://localhost:${process.env.PORT || 5000}` }],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
},
  apis: ["./src/routes/*.ts", "./src/controllers/*.ts"], // пути к файлам с комментариями
};

export const swaggerSpec = swaggerJSDoc(options);
