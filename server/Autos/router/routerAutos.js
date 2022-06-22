import { Router } from "express";
import { verificarToken } from "../../shared/middleware/autenticacion.js";

import * as controllerAutos from "../controllers/controllerAutos.js";

const routerAutos = new Router();

routerAutos.get("/", controllerAutos.getAll);
routerAutos.post("/", verificarToken, controllerAutos.post);
routerAutos.patch("/", verificarToken, controllerAutos.patch);
routerAutos.delete("/", verificarToken, controllerAutos.deleteById);

export { routerAutos };
