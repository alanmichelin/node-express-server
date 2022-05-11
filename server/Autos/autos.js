import { insertar } from "./auto.js";
import { buscarDato, modificar, eliminar } from "../functions.js";
const autos = [];

export const obtenerAutos = () => {
  return [...autos];
};

export const agregarAuto = (datos) => {
  const auto = insertar(datos);
  autos.push(auto);
  return auto;
};

export const modificarAuto = (datos) => {
  const autoEncontrado = buscarDato(datos, autos);
  const autoModificado = modificar(autoEncontrado, datos);
  return autoModificado;
};

export const busquedaAuto = (datos) => {
  const autoEncontrado = buscarDato(datos, autos);
  return autoEncontrado;
};

export const eliminarAuto = (datos) => {
  const autoEncontrado = buscarDato(datos, autos);
  const autoEliminado = eliminar(autoEncontrado, datos);
  return autoEliminado;
};