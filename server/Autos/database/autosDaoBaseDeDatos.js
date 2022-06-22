import { crearAuto } from "../models/auto.js";
import {
  buscarDato,
  modificar,
} from "../../shared/helpers/FuncionesMemoria.js";
import { crearErrorDePersistencia } from "../../shared/errors/ErrorBaseDeDatos.js";
import { crearErrorNoEncontrado } from "../../shared/errors/errorNoEncontrado.js";
import { crearErrorDeNoImplementado } from "../../shared/errors/ErrorNoImplementado.js";
import { database } from "../../shared/databases/mongoDbClient.js";
const autos = database.collection("autos");

export async function recuperarAutos() {
  const _autos = await autos.find({}).toArray();
  console.log(_autos);
  return _autos;
}

export const guardarAuto = (datos) => {
  const auto = crearAuto(datos);
  autos.insertOne(auto);
  return auto;
};

export function eliminarAutos() {
  crearErrorDeNoImplementado();
}

export async function reemplazarAuto(datos) {
  let autoModificado;
  try {
    autoModificado = await autos.updateOne({ id: datos.id }, { $set: datos });
  } catch (err) {
    throw crearErrorDePersistencia();
  }

  if (autoModificado.modifiedCount === 0) {
    throw crearErrorNoEncontrado(datos.id);
  }
  return datos;
}

export function recuperarAutosSegunMarca(marca) {
  crearErrorDeNoImplementado();
}

export async function recuperarAuto(_id) {
  let buscada;
  try {
    buscada = await autos.findOne({ id: _id });
  } catch (err) {
    throw crearErrorNoEncontrado(_id);
  }
  return buscada;
}

export async function eliminarAuto(_id) {
  let res;
  try {
    res = await autos.deleteOne({ id: _id });
  } catch (error) {
    throw crearErrorDePersistencia();
  }

  if (res.deletedCount === 0) {
    throw crearErrorNoEncontrado(datos);
  }
}
