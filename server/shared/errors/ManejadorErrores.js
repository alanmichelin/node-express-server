export const manejarErrores = (error, req, res, next) => {
  const httpError = {};
  console.log(`ERROR: ${error.tipo}`);
  switch (error.tipo) {
    case "DATA_VALIDATION":
      httpError.mensaje = error.message;
      httpError.codigo = 400;
      break;
    case "DATOS_FALTANTES":
      httpError.mensaje = error.message;
      httpError.codigo = 400;
      break;
    case "NOT_FOUND":
      httpError.mensaje = error.message;
      httpError.codigo = 404;
      break;
    case "NO_IMPLEMENTADO":
      httpError.mensaje = error.message;
      httpError.codigo = 501;
      break;
    case "ERROR_PERSISTENCIA":
      httpError.mensaje = error.message;
      httpError.codigo = 500;
      break;
    case "LOGIN_INCORRECTO":
      httpError.mensaje = error.message;
      httpError.codigo = 401;
      break;
    case "MAIL_UNICO":
      httpError.mensaje = error.message;
      httpError.codigo = 401;
      break;
    default:
      httpError.mensaje = "Error interno";
      httpError.codigo = 500;
      break;
  }
  res.status(httpError.codigo).json(httpError.mensaje);
};
