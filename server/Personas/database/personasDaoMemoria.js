import { crearErrorNoEncontrado } from "../../shared/errors/ErrorNoEncontrado.js";
import { crearErrorDeDatosFaltantes } from "../../shared/errors/ErrorDeDatosFaltantes.js";
import { insertarPersona } from "../models/persona.js";
const personas = [];

export function guardarPersona(persona) {
  return personas.push(insertarPersona(persona));
}
export function recuperarPersona(id) {
  const buscada = personas.find((e) => e.id === id);
  if (buscada) {
    return copiarPersona(buscada);
  } else {
    throw new crearErrorNoEncontrado(id);
  }
}
export function recuperarPersonasSegunApellido(criterio) {
  //recupero por apellidos
  return copiarPersonas(personas.filter((c) => c.apellido.includes(criterio)));
}
export function eliminarPersona(id) {
  const buscada = personas.findIndex((e) => e.id === id);
  if (buscada === -1) {
    throw new crearErrorNoEncontrado(id);
  } else {
    personas.splice(buscada, 1);
  }
}
export function recuperarPersonas() {
  return copiarPersonas(personas);
}
export function eliminarPersonas() {
  while (personas.length > 0) {
    personas.pop();
  }
}
function copiarPersona(persona) {
  return {
    id: persona.id,
    nombre: persona.nombre,
    apellido: persona.apellido,
    tipo: persona.tipo,
  };
}
function copiarPersonas(personas) {
  return personas.map(copiarPersona);
}

export function nombreEstaDisponible(nombre) {
  return personas.every((c) => c.nombre !== nombre);
}
