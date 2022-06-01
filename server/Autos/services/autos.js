import { insertar } from "../models/auto.js";
import { buscarDato, modificar } from "../../functions.js";
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

export const borrarAuto = (datos) => {
  const autoEncontrado = buscarDato(datos, autos);
  autos.splice(autoEncontrado, 1);
  return autoEncontrado;
};
