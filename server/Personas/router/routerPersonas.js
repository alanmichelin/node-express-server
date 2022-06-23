import { Router } from "express";
import { verificarToken } from "../../shared/middleware/autenticacion.js";
import * as controllerPersonas from "../controllers/controllerPersonas.js";

const routerPersonas = new Router();

routerPersonas.get("/", controllerPersonas.getAll);
routerPersonas.post("/", verificarToken, controllerPersonas.post);
routerPersonas.patch("/", verificarToken, controllerPersonas.patch);
routerPersonas.delete("/", verificarToken, controllerPersonas.deleteById);

export { routerPersonas };
