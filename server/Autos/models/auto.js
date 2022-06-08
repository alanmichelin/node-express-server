// import { validarDatos } from "../../functions.js";

// function Auto({ id, anio, marca, modelo, valor, disponible }) {
//   this.id = id;
//   this.anio = anio;
//   this.marca = marca;
//   this.modelo = modelo;
//   this.valor = valor;
//   this.disponible = disponible;
// }

export function crearAuto(datos) {
  if (!datos.nombre) {
      throw crearErrorDeDatosFaltantes('nombre')
  }

  if (!datos.temas) {
      throw crearErrorDeDatosFaltantes('temas')
  }

  const Auto = {
      id: obtenerNuevoId('Auto'),
      marca: datos.marca,
      modelo: datos.modelo,
      valor: datos.valor,
      disponible: datos.disponible,
  }

  return Auto
}