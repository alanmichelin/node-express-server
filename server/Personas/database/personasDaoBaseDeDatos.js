import { insertarPersona } from "../models/persona.js";
//import {buscarDato,modificar} from "../../shared/helpers/FuncionesMemoria.js";
import { crearErrorDePersistencia } from "../../shared/errors/ErrorBaseDeDatos.js";
import { crearErrorNoEncontrado } from "../../shared/errors/errorNoEncontrado.js";
import { crearErrorDeNoImplementado } from "../../shared/errors/ErrorNoImplementado.js";
import { database } from "../../shared/databases/mongoDbClient.js";

const personas = database.collection("personas");

export async function recuperarPersonas() {
  const _personas = await personas.find({}).toArray();
  return _personas;
}

export const guardarPersona = (datos) => {
  const persona = insertarPersona(datos);
  personas.insertOne(persona);
  return persona;
};

export function eliminarPersonas() {
  crearErrorDeNoImplementado();
}

export async function reemplazarPersona(datos) {
  let personaModificada;
  try {
    personaModificada = await personas.updateOne(
      { id: datos.id },
      { $set: datos }
    );
  } catch (err) {
    throw crearErrorDePersistencia();
  }

  if (personaModificada.modifiedCount === 0) {
    throw crearErrorNoEncontrado(datos.id);
  }
  return datos;
}

export async function recuperarPersona(_id) {
  let buscada;
  try {
    buscada = await personas.findOne({ id: _id });
  } catch (err) {
    throw crearErrorNoEncontrado(_id);
  }
  if (!buscada) {
    throw crearErrorNoEncontrado(_id);
  }
  return buscada;
}

export async function eliminarPersona(_id) {
  let res;
  try {
    res = await personas.deleteOne({ id: _id });
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
}
