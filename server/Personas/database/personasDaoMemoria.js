import { crearErrorNoEncontrado } from "../../shared/errors/ErrorNoEncontrado.js";
import { crearErrorDeDatosFaltantes } from "../../shared/errors/ErrorDeDatosFaltantes.js";
import { insertarPersona } from "../models/persona.js";
import {
  buscarDato,
  modificar,
} from "../../shared/helpers/FuncionesMemoria.js";
const personas = [];

export function guardarPersona(persona) {
  return personas.push(insertarPersona(persona));
}
export async function recuperarPersona(_id) {
  const personaEncontrada = buscarDato(_id, personas);
  return personaEncontrada;
}
export function eliminarPersona(id) {
  const personaEncontrada = buscarDato(id, personas);
  personas.splice(personaEncontrada, 1);
  return {
    id: personaEncontrada.id,
    borrada: true,
  };
}

export const reemplazarPersona = (datos) => {
  const personaEncontrada = buscarDato(datos.id, personas);
  const personaModificada = modificar(personaEncontrada, datos);
  return personaModificada;
};

export function recuperarPersonas() {
  console.log("recuperando personas");
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
