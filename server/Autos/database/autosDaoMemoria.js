import { crearErrorNoEncontrado } from "../../shared/errors/ErrorNoEncontrado.js";
import { Auto } from "../models/auto.js";
import {
  buscarDato,
  modificar,
} from "../../shared/helpers/FuncionesMemoria.js";
const Autos = [];

export function guardarAuto(Auto) {
  const indiceBuscado = Autos.findIndex((c) => c.id === Auto.id);
  if (indiceBuscado === -1) {
    Autos.push(Auto);
  } else {
    Autos[indiceBuscado] = Auto;
  }
}

export function recuperarAuto(_id) {
  const autoEncontrado = buscarDato(_id, Autos);
  return autoEncontrado;
}

export function recuperarAutos() {
  return copiarAutos(Autos);
}

export const reemplazarAuto = (datos) => {
  const autoEncontrado = buscarDato(datos.id, Autos);
  const autoModificado = modificar(autoEncontrado, datos);
  return autoModificado;
};

export function eliminarAuto(id) {
  const autoEncontrado = buscarDato(id, Autos);
  Autos.splice(autoEncontrado, 1);
  return {
    id: autoEncontrado.id,
    borrada: true,
  };
}

export function eliminarAutos() {
  while (Autos.length > 0) {
    Autos.pop();
  }
}

function copiarAuto(auto) {
  return new Auto(auto);
}

function copiarAutos(Autos) {
  return Autos.map(copiarAuto);
}
