import { crearAuto } from "../models/auto.js";
import { buscarDato, modificar, eliminar } from "../../functions.js";

import dao from '../database/autosDao.js'

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

export function obtenerAutosSegunTema(tema) {
  return dao.recuperarAutosSegunTema(tema)
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

/* export function obtenerAuto () {
  return recuperarAutos()
};

export function agregarAuto (datos) {
  const auto = insertar(datos);
  //autos.push(auto);
  guardarAuto(auto)
  return auto;
};

export function modificarAuto (datos)  {
  const autoEncontrado = buscarDato(datos, autos);
  const autoModificado = modificar(autoEncontrado, datos);
  return autoModificado;
};

export function busquedaAuto (datos)  {
  const autoEncontrado = buscarDato(datos, autos);
  return autoEncontrado;
};

export function eliminarAuto (datos) {
  const autoEncontrado = buscarDato(datos, autos);
  const autoEliminado = eliminar(autoEncontrado, datos);
  return autoEliminado;
};

function guardarAutos(auto){
    autos.push(auto);
}

function guardarAuto(auto){
  const indiceBuscado = autos.findIndex(c => c.id === auto.id)
  if(indiceBuscado === -1){
    autos.push(auto)
  }else{
    autos[indiceBuscado] = auto 
  }
}


function recuperarAuto(id) {
  const buscado = autos.find (c => c.id ===id)
  if(buscado){
    return copiarAuto(buscado) // copiar auto es recibir un auto por param y return ({ todos los params del constructor})
  } else {
    throw new Error ("auto no encontrado");
  }
}


function recuperarAutosSegunMarca(marca) {
  return autos.filter(c => c.marcas.includes(marca))
}

function recuperarAutosSegunMarca() {
  return copiarAutos(autos)
}

function eliminarAuto(id) {
  const indiceBuscado = autos.findIndex(c => c.id === id)
  if(indiceBuscado === -1){
    throw new Error ('auto no encontrado')
  } else{
    autos.splice(indiceBuscado,1)
  }
}

 */