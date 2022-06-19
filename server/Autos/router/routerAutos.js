import { Router } from "express";

import * as api from "../services/autos.js";
// hacer carpeta services para no pasar metodo por metodo como arriba

//import { prepararRespuestaConError } from '../../shared/errors/mappings/mappings.js'
// hacer errores especificos relacionados con auto

import { manejarErrores } from "../../functions.js";

const routerAutos = new Router();

routerAutos.get("/", (req, res, next) => {
  let Autos;
  try {
    if (req.query.marca) {
      Autos = api.obtenerAutosSegunMarca(req.query.marca);
    } else {
      Autos = api.obtenerAutos();
    }
    res.json(Autos);
  } catch (error) {
    const { mensaje, codigo } = prepararRespuestaConError(error);
    res.status(codigo).json({ mensaje });
  }
});

routerAutos.get("/:id", (req, res, next) => {
  try {
    const auto = api.obtenerAutosegunId(req.params.id);
    res.json(auto);
  } catch (error) {
    const { mensaje, codigo } = prepararRespuestaConError(error);
    res.status(codigo).json({ mensaje });
  }
});

routerAutos.post("/", (req, res, next) => {
  try {
    const auto = req.body;
    const autoAgregado = api.agregarAuto(auto);
    res.status(201).json(autoAgregado);
  } catch (error) {
    if (error.tipo === "NOMBRE_UNICO") {
      res.status(409).json({ error: error.message });
    } else {
      res.status(400).json({ error: error.message });
    }
  }
});

routerAutos.delete("/:id", (req, res, next) => {
  try {
    api.borrarAutosegunId(req.params.id);
    res.sendStatus(204);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

routerAutos.put("/:id", (req, res, next) => {
  try {
    const datosActualizados = req.body;
    const autoActualizado = api.reemplazarAuto(
      req.params.id,
      datosActualizados
    );
    res.json(autoActualizado);
  } catch (error) {
    if (error.tipo === "NO_ENCONTRADO") {
      res.status(404).json({ error: error.message });
    } else {
      res.status(400).json({ error: error.message });
    }
  }
});

export { routerAutos };
