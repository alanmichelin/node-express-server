import { insertar } from "../models/venta.js";
import {
  buscarDato,
  modificar,
} from "../../shared/helpers/FuncionesMemoria.js";
import { crearErrorDePersistencia } from "../../shared/errors/ErrorBaseDeDatos.js";
import { crearErrorNoEncontrado } from "../../shared/errors/errorNoEncontrado.js";
import { database } from "../../shared/databases/mongoDbClient.js";
const ventas = database.collection("ventas");

export const obtenerVentas = async () => {
  console.log("en ventas db");
  const _ventas = await ventas.find({}).toArray();
  return _ventas;
};

export const agregarVenta = (datos) => {
  const venta = insertar(datos);
  ventas.insertOne(venta);
  return venta;
};

export const modificarVenta = async (datos) => {
  console.log("modificando", datos);
  const ventaModificada = await ventas.updateOne({ id: datos.id }, datos);
  console.log(ventaModificada);
  return ventaModificada;
};

export const busquedaVenta = async (_id) => {
  console.log(typeof _id);
  let buscada;
  try {
    buscada = await ventas.findOne({ id: _id });
    console.log(buscada);
  } catch (err) {
    throw crearErrorNoEncontrado(_id);
  }
  return buscada;
};

export const borrarVenta = async (_id) => {
  let res;
  try {
    res = await ventas.deleteOne({ id: _id });
  } catch (error) {
    throw crearErrorDePersistencia();
  }

  if (res.deletedCount === 0) {
    throw crearErrorNoEncontrado(datos);
  }
};
