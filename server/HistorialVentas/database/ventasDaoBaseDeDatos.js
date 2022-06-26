import { insertar } from "../models/venta.js";
import {
  buscarDato,
  modificar,
} from "../../shared/helpers/FuncionesMemoria.js";
import { crearErrorDePersistencia } from "../../shared/errors/ErrorBaseDeDatos.js";
import { crearErrorNoEncontrado } from "../../shared/errors/errorNoEncontrado.js";
import { database } from "../../shared/databases/mongoDbClient.js";
import { Venta } from "../models/venta.js";
const ventas = database.collection("ventas");

export const obtenerVentas = async () => {
  const _ventas = await ventas.find({}).toArray();
  return _ventas;
};

export const agregarVenta = (datos) => {
  const venta = insertar(datos);
  ventas.insertOne(venta);
  return venta;
};

export const modificarVenta = async (datos) => {
  let ventaModificada;
  try {
    ventaModificada = await ventas.updateOne({ id: datos.id }, { $set: datos });
  } catch (err) {
    throw crearErrorDePersistencia();
  }

  if (ventaModificada.modifiedCount === 0) {
    throw crearErrorNoEncontrado(datos.id);
  }
  return datos;
};

export const busquedaVenta = async (_id) => {
  let buscada;
  try {
    buscada = await ventas.findOne({ id: _id });
  } catch (err) {
    throw crearErrorDePersistencia();
  }

  if (buscada === null) {
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
    throw crearErrorNoEncontrado(_id);
  }
  return {
    id: _id,
    borrada: !!res.deletedCount,
  };
};
