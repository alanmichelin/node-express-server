import { Router } from 'express';
import {
  agregarAuto,
  obtenerAutos,
  modificarAuto,
  busquedaAuto,
} from "../services/autos.js";
// import * as api from '../services/autos.js'
// hacer carpeta services para no pasar metodo por metodo como arriba

//import { prepararRespuestaConError } from '../../shared/errors/mappings/mappings.js'
// hacer errores especificos relacionados con auto

import { manejarErrores } from "../../functions.js";

const routerAutos = new Router();

routerAutos.get("/", (req, res) => {
  try {
    const autos = obtenerAutos();
    res.status(201).json(autos);
  } catch (err) {
    res.json(manejarErrores(err));
  }
});

routerAutos.get("/:id", (req, res) => {
  try {
    const autos = busquedaAuto(req.params.id);
    res.status(201).json(autos);
  } catch (err) {
    res.json(manejarErrores(err));
  }
});

routerAutos.delete('/:id', (req, res) => {
  try {
    eliminarAuto(req.params.id)
      res.sendStatus(204)
  } catch (error) {
      res.status(404).json({ error: error.message })
  }
})

routerAutos.post("/", (req, res) => {
  try {
    const nuevoAuto = agregarAuto(req.body);
    res.status(201).json(nuevoAuto);
  } catch (err) {
    res.json(manejarErrores(err));
  }
});

routerAutos.patch("/", (req, res) => {
  try {
    const autoModificado = modificarAuto(req.body);
    res.status(201).json(autoModificado);
  } catch (err) {
    res.json(manejarErrores(err));
  }
});

export { routerAutos };
