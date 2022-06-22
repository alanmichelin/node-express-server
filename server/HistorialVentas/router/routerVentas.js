import { Router } from "express";

import * as controllerVentas from "../controllers/controllerVentas.js";
import { verificarToken } from "../../shared/middleware/autenticacion.js";

const routerVentas = new Router();

routerVentas.get("/", controllerVentas.getVentas);
routerVentas.post("/", verificarToken, controllerVentas.post);
routerVentas.patch("/", verificarToken, controllerVentas.patch);
routerVentas.delete("/", verificarToken, controllerVentas.deleteById);

export { routerVentas };
