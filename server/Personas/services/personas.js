import { insertarPersona } from "./persona.js";
//import { buscarDato, modificar } from "../functions.js";
import dao from './DAO/personasDao.js';

function validarNombreUnico(nombre){
  if(!dao.nombreEstaDisponible(nombre)) throw new Error('El nombre debe ser unico')
}

//=================================================================

//Vieja
export function obtenerPersonas(){
  return dao.recuperarPersonas()
}

export function agregarPersona(datos){
  validarNombreUnico(datos.nombre)
  const persona = insertarPersona(datos)
  dao.guardarPersona(persona)
  return persona
}

export function modificarPersonas(datos){
   const persona = insertarPersona(datos)
   //persona.id=datos.id
   dao.guardarPersona(persona)
}

export function busquedaPersonaPorID(id) 
{
return dao.recuperarPersona(id)
}

export function borrarPersonaPorID(id) 
{
  return dao.eliminarPersona(id.id)
}
