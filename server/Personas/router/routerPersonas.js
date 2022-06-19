import { Router } from "express";

import * as controllerPersonas from "../controllers/controllerPersonas.js";

const routerPersonas = new Router();

routerPersonas.get("/", controllerPersonas.getAll);
routerPersonas.get("/:id", controllerPersonas.getById);
routerPersonas.post("/", controllerPersonas.post);
routerPersonas.patch("/", controllerPersonas.patch);
// routerPersonas.delete("/", controllerPersonas.deleteById);

export { routerPersonas };
