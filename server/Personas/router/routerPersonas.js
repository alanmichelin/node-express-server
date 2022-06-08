import { Router } from "express";
import { manejarErrores } from "../functions.js";
import {
  agregarPersona,
  obtenerPersonas,
  modificarPersonas,
  busquedaPersonaPorID,
  borrarPersonaPorID,
} from "./personas.js";
const routerPersonas = new Router();

routerPersonas.get("/", (req, res) => {
  try {
    const personas = obtenerPersonas();
    res.status(201).json(personas);
  } catch (err) {
    res.json(manejarErrores(err));
  }
});

routerPersonas.get('/:id', (req, res) => {
  try {
    const personas = busquedaPersonaPorID(req.params.id);
    res.status(201).json(personas);
  } catch (err) {
    res.json(manejarErrores(err));
  }
});

routerPersonas.post("/", (req, res) => {
  try {
    const nuevaPersona = agregarPersona(req.body);
    res.status(201).json(nuevaPersona);
  } catch (err) {
    res.json(manejarErrores(err));
  }
});

routerPersonas.patch("/", (req, res) => {
  try {
    
    const personaModificada = modificarPersonas(req.body);
    res.status(201).json(personaModificada);
  } catch (err) {
    res.json(manejarErrores(err));
  }
});

routerPersonas.delete('/', (req, res) => {
  try {
     const personaBorrado = borrarPersonaPorID(req.body)
     res.status(201).json(personaBorrado);
    } catch (err) {
      res.json(manejarErrores(err));
    }
  });


  
export { routerPersonas };
