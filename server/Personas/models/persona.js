import { validarDatos } from "../../shared/helpers/FuncionesMemoria.js";
import { generarId } from "../../shared/helpers/FuncionesMemoria.js";
export const insertarPersona = (datos) => {
  let persona = new Persona(datos);
  return validarDatos(persona);
};
//Agrego export
export function Persona({ nombre, apellido, tipo }) {
  this.id = generarId();
  this.nombre = nombre;
  this.apellido = apellido;
  this.tipo = tipo;
}
