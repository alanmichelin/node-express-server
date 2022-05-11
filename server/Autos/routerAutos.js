import { Router } from "express";
import {
  agregarAuto,
  obtenerAutos,
  modificarAuto,
  busquedaAuto,
  borrarAuto,
} from "./autos.js";
import { manejarErrores } from "../functions.js";
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

routerAutos.delete('/', (req, res) => {
  try {
     const autoBorrado = borrarAuto(req.body)
     res.status(201).json(autoBorrado);
    } catch (err) {
      res.json(manejarErrores(err));
    }
  });

export { routerAutos };
