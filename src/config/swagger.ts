import swaggerJSDoc from "swagger-jsdoc";
// Swagger definition
const options = {
  definition: {
  openapi: "3.0.0",
  info: { title: "Sibers task 'Admin API'", version: "1.0.0" },
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
