import { crearAuto } from "../models/auto.js";

import dao from '../database/autosDao.js'

import { crearErrorNombreUnico } from '../../shared/errors/ErrorNombreUnico.js'

function validarNombreUnico(nombre) {
  if (!dao.nombreEstaDisponible(nombre)) throw crearErrorNombreUnico()
}

export function obtenerAutos() {
  return dao.recuperarAuto()
}

export function agregarAuto(datosAuto) {
  validarNombreUnico(datosAuto.nombre)
  const Auto = crearAuto(datosAuto)
  dao.guardarAuto(Auto)
  return Auto
}

export function borrarAutos() {
  dao.eliminarAutos()
}

export function obtenerAutosSegunMarca(marca) {
  return dao.recuperarAutosSegunMarca(marca)
}

export function obtenerAutoSegunId(id) {
  return dao.recuperarAuto(id)
}

export function borrarAutoSegunId(id) {
  dao.eliminarAuto(id)
}

export function reemplazarAuto(id, datosAuto) {
  const Auto = crearAuto(datosAuto)
  Auto.id = id
  dao.guardarAuto(Auto)
}

