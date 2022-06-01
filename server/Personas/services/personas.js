import { insertarPersona } from "../models/persona.js";
import { buscarDato, modificar } from "../../functions.js";

const personas = [];

export const obtenerPersonas = () => {
  return [...personas];
};

export const agregarPersona = (datos) => {
  const persona = insertarPersona(datos);
  personas.push(persona);
  return persona;
};

export const modificarPersonas = (datos) => {
  const personaEncontrada = buscarDato(datos, personas);
  const personaModificada = modificar(personaEncontrada, datos);
  return personaModificada;
};

export const busquedaPersona = (datos) => {
  const personaEncontrada = buscarDato(datos, personas);
  return personaEncontrada;
};

export const borrarPersona = (datos) => {
  const personaEncontrado = buscarDato(datos, personas);
  personas.splice(personaEncontrado, 1);
  return personaEncontrado;
};
