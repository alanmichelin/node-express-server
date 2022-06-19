import { Router } from "express";
import { manejarErrores } from "../../shared/errors/ManejadorErrores.js";
import {
  agregarPersona,
  obtenerPersonas,
  modificarPersonas,
  busquedaPersonaPorID,
  borrarPersonaPorID,
} from "../services/personas.js";
const routerPersonas = new Router();

export async function getAll(req, res, next) {
  console.log("asdsa");
  try {
    const personas = obtenerPersonas();
    res.json(personas);
  } catch (err) {
    next(err);
  }
}

export async function getById(req, res, next) {
  try {
    const personas = busquedaPersonaPorID(req.params.id);
    res.json(personas);
  } catch (err) {
    next(err);
  }
}
export async function post(req, res, next) {
  try {
    const nuevaPersona = agregarPersona(req.body);
    res.status(201).json(nuevaPersona);
  } catch (err) {
    next(err);
  }
}
export async function patch(req, res, next) {
  try {
    const personaModificada = modificarPersonas(req.body);
    res.status(201).json(personaModificada);
  } catch (err) {
    next(err);
  }
}
routerPersonas.delete("/", (req, res) => {
  try {
    const personaBorrado = borrarPersonaPorID(req.body);
    res.status(201).json(personaBorrado);
  } catch (err) {
    res.json(manejarErrores(err));
  }
});

export { routerPersonas };
