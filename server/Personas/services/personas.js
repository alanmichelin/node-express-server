import { insertarPersona } from "../models/persona.js";
//import { buscarDato, modificar } from "../functions.js";
import { Persona } from "../models/persona.js";
import dao from "../database/personasDao.js";

export function obtenerPersonas() {
  return dao.recuperarPersonas();
}

export function agregarPersona(datos) {
  const Persona = insertarPersona(datos);
  dao.guardarPersona(Persona);
  return Persona;
}

export function modificarPersonas(datos) {
  return dao.reemplazarPersona(datos);
}

export function busquedaPersonaPorID(id) {
  return dao.recuperarPersona(id);
}

export function borrarPersonaPorID(id) {
  return dao.eliminarPersona(id);
}
