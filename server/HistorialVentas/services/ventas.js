import dao from "../database/ventasDao.js";
const ventas = [];

export const obtenerVentas = () => {
  return dao.obtenerVentas();
};

export const agregarVenta = (datos) => {
  return dao.agregarVenta(datos);
};

export const modificarVenta = (datos) => {
  return dao.modificarVenta(datos);
};

export const busquedaVenta = (datos) => {
  return dao.busquedaVenta(datos);
};

export const borrarVenta = (datos) => {
  return dao.borrarVenta(datos);
};
