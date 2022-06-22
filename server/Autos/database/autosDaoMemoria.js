// import { crearErrorRecursoNoEncontrado } from "../../shared/errors/ErrorRecursoNoEncontrado.js";
import { crearErrorNoEncontrado } from "../../shared/errors/ErrorNoEncontrado.js";
// import { crearErrorDeDatosFaltantes } from "../../shared/errors/ErrorDeDatosFaltantes.js";
import { Auto } from "../models/auto.js";

const Autos = [];

export function guardarAuto(Auto) {
  const indiceBuscado = Autos.findIndex((c) => c.id === Auto.id);
  if (indiceBuscado === -1) {
    Autos.push(Auto);
  } else {
    Autos[indiceBuscado] = Auto;
  }
}

export function recuperarAuto(id) {
  const buscada = Autos.find((c) => c.id === id);
  if (buscada) {
    return copiarAuto(buscada);
  } else {
    throw crearErrorNoEncontrado(id);
  }
}

export function recuperarAutos() {
  return copiarAutos(Autos);
}

export function recuperarAutosSegunTema(tema) {
  return copiarAutos(Autos.filter((c) => c.temas.includes(tema)));
}

export function eliminarAuto(id) {
  const indiceBuscado = Autos.findIndex((c) => c.id === id);
  if (indiceBuscado === -1) {
    throw crearErrorNoEncontrado(id);
  } else {
    Autos.splice(indiceBuscado, 1);
  }
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
