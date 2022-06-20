export const manejarErrores = (error, req, res, next) => {
  const httpError = {};
  switch (error.tipo) {
    case "DATA_VALIDATION":
      httpError.mensaje = error.message;
      httpError.codigo = 400;
      break;
    case "DATOS_FALTANTES":
      httpError.mensaje = error.message;
      httpError.codigo = 400;
    case "NOT_FOUND":
      httpError.mensaje = error.message;
      httpError.codigo = 404;
      break;
    default:
      httpError.mensaje = "Error interno";
      httpError.codigo = 500;
  }
  // return httpError;
  res.status(httpError.codigo).json(httpError.mensaje);
};
