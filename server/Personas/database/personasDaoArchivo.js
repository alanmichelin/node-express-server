import { Persona } from "../models/persona.js";

const personas = [];

export function guardarPersona(Persona){
  
  const buscada = personas.findIndex(e => e.id === Persona.id);
   if (!(buscada === -1)) {
      personas.push(Persona);
  } else {
      personas[buscada] = Persona;
  }
 
}

export function recuperarPersona(id){
  const buscada = personas.find(e => e.id === id)

  if (buscada) {
    return copiarPersona(buscada)
  } else {
    throw new Error('persona no encontrada')  
  }

}
export function eliminarPersona(id){
  const buscada = personas.findIndex(e => e.id === id)
  if (buscada === -1) {
    throw new Error('persona no encontrada')  
  } else {
   personas.splice(buscada,1)
  }
}
export function recuperarPersonas(){
  return copiarPersonas(personas)
}
function copiarPersona(persona){

  console.log(new Persona(persona));
  return new Persona(persona);
  //return ({id:persona.id,nombre:persona.nombre,apellido:persona.apellido,tipo:persona.tipo})
}
function copiarPersonas(personas){
  return personas.map(copiarPersona)
}
export function nombreEstaDisponible(nombre){

    return personas.every(c=> c.nombre !== nombre)
}

