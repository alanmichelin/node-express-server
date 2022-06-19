import { crearErrorNoEncontrado } from "../errors/ErrorNoEncontrado.js";
import { crearErrorDeDatosFaltantes } from "../errors/ErrorDeDatosFaltantes.js";
export const validarDatos = (datoAInsertar) => {
  console.log("en validar datos");
  let camposIncompletos = Object.keys(datoAInsertar).filter(
    (e) => datoAInsertar[e] === undefined
  );
  if (camposIncompletos.length > 0) {
    throw crearErrorDeDatosFaltantes(camposIncompletos);
  } else {
    return datoAInsertar;
  }
};

export const modificar = (dato, nuevoDato) => {
  for (const key in dato) {
    if (Object.hasOwnProperty.call(dato, key)) {
      if (nuevoDato[key] !== undefined) {
        dato[key] = nuevoDato[key];
      }
    }
  }
  return dato;
};

export const buscarDato = (dato, coleccion) => {
  console.log("buscando");

  const datoEncontrado = coleccion.find((e) => e.id == dato);
  console.log(datoEncontrado);

  if (datoEncontrado === undefined) {
    throw crearErrorNoEncontrado(dato);
  } else {
    return datoEncontrado;
  }
};
