import * as api from "../services/login.js";
import { manejarErrores } from "../../shared/errors/ManejadorErrores.js";

export async function registrarse(req, res, next) {
  try {
    const nuevoUsuario = await api.registrarse(req.body);
    res.status(201).json(nuevoUsuario);
  } catch (err) {
    next(err);
  }
}

export async function login(req, res, next) {
  try {
    const user = await api.logearse(req.body);
    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
}
