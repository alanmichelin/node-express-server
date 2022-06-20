import express from "express";
import { routerAutos } from "./Autos/router/routerAutos.js";
import { routerPersonas } from "./Personas/router/routerPersonas.js";
import { routerVentas } from "./HistorialVentas/router/routerVentas.js";
import { manejarErrores } from "./shared/errors/ManejadorErrores.js";
const app = express();

app.use(express.json());
app.use("/api/autos", routerAutos);
app.use("/api/personas", routerPersonas);
app.use("/api/ventas", routerVentas);

app.use(manejarErrores);
let server;

export const connect = () => {
  return new Promise((resolve, reject) => {
    server = app.listen(3000, () => {
      resolve(server.address().port);
    });
    server.on("error", (error) => {
      reject(error);
    });
  });
};

export const disconnect = () => {
  return new Promise((resolve, reject) => {
    server.close((error) => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  });
};
