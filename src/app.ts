import express, { Application } from "express";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";
import helmet from "helmet";
import { RegisterRoutes } from "../public/routes";
import errorHandler from "./exceptions/errorHandler";

const app: Application = express();

app.use(express.json());
app.use(morgan("tiny"));
app.use(express.static("public"));
app.use(helmet());
app.use(
  "/docs",
  swaggerUi.serve,
  swaggerUi.setup(undefined, {
    swaggerOptions: {
      url: "/swagger.json",
    },
  }),
);

RegisterRoutes(app);
app.use(errorHandler);

export default app;
