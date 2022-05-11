export const validarDatos = (datoAInsertar) => {
  let camposIncompletos = Object.keys(datoAInsertar).filter(
    (e) => datoAInsertar[e] === undefined
  );

  if (camposIncompletos.length > 0) {
    const error = new Error("Campos incompletos: " + camposIncompletos);
    error.tipo = "DATA_VALIDATION";
    throw error;
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
  const datoEncontrado = coleccion.find((e) => e.id == dato.id);

  if (datoEncontrado === undefined) {
    const error = new Error(`Id no encontrado`);
    error.tipo = "NOT_FOUND";
    throw error;
  } else {
    return datoEncontrado;
  }
};

export const manejarErrores = (error) => {
  const httpError = {};
  switch (error.tipo) {
    case "DATA_VALIDATION":
      httpError.mensaje = error.message;
      httpError.codigo = 400;
      break;
    case "NOT_FOUND":
      httpError.mensaje = error.message;
      httpError.codigo = 404;
      break;
    default:
      httpError.mensaje = "Error interno";
      httpError.codigo = 500;
  }
  return httpError;
};
