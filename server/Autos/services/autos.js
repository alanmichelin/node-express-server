import { crearAuto } from "../models/auto.js";

import dao from "../database/autosDao.js";

import { Auto } from "../models/auto.js";

export function obtenerAutos() {
  return dao.recuperarAutos();
}

export function agregarAuto(datosAuto) {
  const Auto = crearAuto(datosAuto);
  dao.guardarAuto(Auto);
  return Auto;
}

export function borrarAutos() {
  dao.eliminarAutos();
}

export function obtenerAutosSegunMarca(marca) {
  return dao.recuperarAutosSegunMarca(marca);
}

export function obtenerAutoSegunId(id) {
  return dao.recuperarAuto(id);
}

export function borrarAutoSegunId(id) {
  return dao.eliminarAuto(id);
}

export function reemplazarAuto(datos) {
  return dao.reemplazarAuto(datos);
}
