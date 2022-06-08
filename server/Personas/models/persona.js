import { validarDatos } from "../functions.js";

export const insertarPersona = (datos) => {
  let persona = new Persona(datos);
 // return validarDatos(datos);
 return persona
};

function Persona({ id, nombre, apellido, tipo }) {
  this.id = id;
  this.nombre = nombre;
  this.apellido = apellido;
  this.tipo = tipo;
}
