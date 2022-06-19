import { Router } from "express";

import * as controllerVentas from "../controllers/controllerVentas.js";

const routerVentas = new Router();

routerVentas.get("/", controllerVentas.getAll);
routerVentas.get("/:id", controllerVentas.getById);
routerVentas.post("/", controllerVentas.post);
routerVentas.patch("/", controllerVentas.patch);
routerVentas.delete("/", controllerVentas.deleteById);

export { routerVentas };
