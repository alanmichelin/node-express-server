import dao from "../database/ventasDao.js";

export const obtenerVentas = async () => {
  return await dao.obtenerVentas();
};

export const agregarVenta = (datos) => {
  return dao.agregarVenta(datos);
};

export const modificarVenta = (datos) => {
  return dao.modificarVenta(datos);
};

export const busquedaVenta = async (datos) => {
  return await dao.busquedaVenta(datos);
};

export const borrarVenta = (datos) => {
  return dao.borrarVenta(datos);
};
