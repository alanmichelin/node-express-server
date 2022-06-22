export function crearErrorDePersistencia() {
  const errorDePersistencia = new Error("Hubo un error en la base de datos");
  errorDePersistencia.tipo = "ERROR_PERSISTENCIA";
  return errorDePersistencia;
}
