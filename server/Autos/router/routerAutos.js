import { Router } from "express";

// hacer carpeta services para no pasar metodo por metodo como arriba

//import { prepararRespuestaConError } from '../../shared/errors/mappings/mappings.js'
// hacer errores especificos relacionados con auto

import * as controllerAutos from "../controllers/controllerAutos.js";

const routerAutos = new Router();

routerAutos.get("/", controllerAutos.getAll);
routerAutos.get("/:id", controllerAutos.getById);
routerAutos.post("/", controllerAutos.post);
// routerAutos.patch("/", controllerAutos.patch);
// routerAutos.delete("/", controllerAutos.deleteById);

export { routerAutos };
