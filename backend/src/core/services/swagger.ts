const swaggerAutogen = require("swagger-autogen")();

const outputFile = "./src/configs/swagger.json";
const endpointsFiles = ["./src/core/services/webserver.ts"];
const doc = {
    info: {
        title: "DevBank - API documentation",
        description: "Api documentation of DevBank API using swagger-ui-express and swagger-autogen",
    },
    host: "localhost:4000",
    schemes: ["http", "https"]
};

swaggerAutogen(outputFile, endpointsFiles, doc);
