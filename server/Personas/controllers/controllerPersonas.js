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
  if (req.query.id === undefined) {
    try {
      const personas = await obtenerPersonas();
      res.json(personas);
    } catch (err) {
      next(err);
    }
  } else {
    try {
      const persona = await busquedaPersonaPorID(req.query.id);
      res.json(persona);
    } catch (err) {
      next(err);
    }
  }
}

export async function post(req, res, next) {
  try {
    const nuevaPersona = await agregarPersona(req.body);
    res.status(201).json(nuevaPersona);
  } catch (err) {
    next(err);
  }
}
export async function patch(req, res, next) {
  try {
    //Agrego await
    const personaModificada = await modificarPersonas(req.body);
    //const personaModificada = modificarPersonas(req.body);
    res.status(201).json(personaModificada);
  } catch (err) {
    next(err);
  }
}
export async function deleteById(req, res, next) {
  try {
    const personaBorrado = await borrarPersonaPorID(req.query.id);
    res.status(201).json(personaBorrado);
  } catch (err) {
    next(err);
  }
}

export { routerPersonas };
