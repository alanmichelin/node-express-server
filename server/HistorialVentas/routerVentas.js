import { Router } from "express";
import {
  obtenerVentas,
  agregarVenta,
  modificarVenta,
  busquedaVenta,
} from "./ventas.js";
import { manejarErrores } from "../functions.js";
const routerVentas = new Router();

routerVentas.get("/", (req, res) => {
  try {
    const ventas = obtenerVentas();
    res.status(201).json(ventas);
  } catch (err) {
    res.json(manejarErrores(err));
  }
});

routerVentas.get("/:id", (req, res) => {
  try {
    const ventas = busquedaVenta(req.params.id);
    res.status(201).json(ventas);
  } catch (err) {
    res.json(manejarErrores(err));
  }
});

routerVentas.post("/", (req, res) => {
  try {
    const nuevaVenta = agregarVenta(req.body);
    res.status(201).json(nuevaVenta);
  } catch (err) {
    res.json(manejarErrores(err));
  }
});

routerVentas.patch("/", (req, res) => {
  try {
    const ventaModificada = modificarVenta(req.body);
    res.status(201).json(ventaModificada);
  } catch (err) {
    res.json(manejarErrores(err));
  }
});

export { routerVentas };
