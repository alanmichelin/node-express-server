import { insertar } from "./venta.js";
import { buscarDato, modificar } from "../functions.js";
const ventas = [];

export const obtenerVentas = () => {
  return [...ventas];
};

export const agregarVenta = (datos) => {
  const venta = insertar(datos);
  ventas.push(venta);
  return venta;
};

export const modificarVenta = (datos) => {
  const ventaEncontrada = buscarDato(datos, ventas);
  const ventaModificada = modificar(ventaEncontrada, datos);
  return ventaModificada;
};

export const busquedaVenta = (datos) => {
  const ventaEncontrada = buscarDato(datos, ventas);
  return autoEncontrado;
};
