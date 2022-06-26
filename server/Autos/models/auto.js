import {
  validarDatos,
  generarId,
} from "../../shared/helpers/FuncionesMemoria.js";

export function crearAuto(datos) {
  let auto = new Auto(datos);
  return validarDatos(auto);
}
export function Auto({ marca, anio, modelo, valor, disponible }) {
  this.id = generarId();
  this.marca = marca;
  this.anio = anio;
  this.modelo = modelo;
  this.valor = valor;
  this.disponible = disponible;
}
