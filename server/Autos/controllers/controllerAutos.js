import * as api from "../services/autos.js";
// import { manejarErrores } from "../../functions.js";

export async function getAll(req, res, next) {
  let autos;
  if (req.query.id === undefined) {
    try {
      autos = await api.obtenerAutos();
    } catch (err) {
      next(err);
    }
  } else {
    try {
      autos = await api.obtenerAutoSegunId(req.query.id);
    } catch (err) {
      next(err);
    }
  }
  res.json(autos);
}
export async function getById(req, res, next) {
  try {
    const auto = api.obtenerAutosegunId(req.query.id);
    res.json(auto);
  } catch (error) {
    // const { mensaje, codigo } = prepararRespuestaConError(error);
    // res.status(codigo).json({ mensaje });
    next(error);
  }
}
export async function post(req, res, next) {
  try {
    const auto = req.body;
    const autoAgregado = api.agregarAuto(auto);
    res.status(201).json(autoAgregado);
  } catch (error) {
    next(error);
  }
}

export async function deleteById(req, res, next) {
  try {
    const ventaBorrado = await api.borrarAutoSegunId(req.query.id);
    res.status(201).json(ventaBorrado);
  } catch (err) {
    next(err);
  }
}

export async function patch(req, res, next) {
  try {
    const autoModificado = await api.reemplazarAuto(req.body);
    res.status(201).json(autoModificado);
  } catch (err) {
    next(err);
  }
}
