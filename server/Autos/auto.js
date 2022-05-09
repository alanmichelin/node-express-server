import { validarDatos } from "../functions.js";

export const insertar = (datos) => {
  let auto = new Auto(datos);
  return validarDatos(auto);
};

function Auto({ id, anio, marca, modelo, valor, disponible }) {
  this.id = id;
  this.anio = anio;
  this.marca = marca;
  this.modelo = modelo;
  this.valor = valor;
  this.disponible = disponible;
}
