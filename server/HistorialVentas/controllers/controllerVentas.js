import {
  obtenerVentas,
  agregarVenta,
  modificarVenta,
  busquedaVenta,
  borrarVenta,
} from "../services/ventas.js";
import { manejarErrores } from "../../shared/errors/ManejadorErrores.js";

export async function getAll(req, res, next) {
  try {
    const ventas = obtenerVentas();
    res.json(ventas);
  } catch (err) {
    // res.json(manejarErrores(err));
    next(err);
  }
}

export async function getById(req, res, next) {
  try {
    console.log(req.params.id);
    const ventas = busquedaVenta(req.params.id);
    res.json(ventas);
  } catch (err) {
    // res.json(manejarErrores(err));
    next(err);
  }
}

export async function post(req, res, next) {
  try {
    const nuevaVenta = agregarVenta(req.body);
    res.status(201).json(nuevaVenta);
  } catch (err) {
    next(err);
  }
}

export async function patch(req, res, next) {
  try {
    const ventaModificada = modificarVenta(req.body);
    res.status(201).json(ventaModificada);
  } catch (err) {
    next(err);
  }
}

export async function deleteById(req, res, next) {
  try {
    const ventaBorrado = borrarVenta(req.body);
    res.status(201).json(ventaBorrado);
  } catch (err) {
    next(err);
  }
}
