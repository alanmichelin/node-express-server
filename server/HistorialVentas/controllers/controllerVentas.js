import {
  obtenerVentas,
  agregarVenta,
  modificarVenta,
  busquedaVenta,
  borrarVenta,
} from "../services/ventas.js";
import { manejarErrores } from "../../shared/errors/ManejadorErrores.js";

export async function getVentas(req, res, next) {
  if (req.query.id === undefined) {
    try {
      const ventas = await obtenerVentas();
      res.json(ventas);
    } catch (err) {
      next(err);
    }
  } else {
    try {
      const ventas = await busquedaVenta(req.query.id);
      res.json(ventas);
    } catch (err) {
      next(err);
    }
  }
}

export async function post(req, res, next) {
  try {
    const nuevaVenta = await agregarVenta(req.body);
    res.status(201).json(nuevaVenta);
  } catch (err) {
    next(err);
  }
}

export async function patch(req, res, next) {
  try {
    const ventaModificada = await modificarVenta(req.body);
    res.status(201).json(ventaModificada);
  } catch (err) {
    next(err);
  }
}

export async function deleteById(req, res, next) {
  try {
    const ventaBorrado = await borrarVenta(req.query.id);
    res.status(201).json(ventaBorrado);
  } catch (err) {
    next(err);
  }
}
