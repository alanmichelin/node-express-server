export function crearErrorDeDatosFaltantes(datos) {
  const elError = new Error(
    `faltan valor(es) para los siguientes campos: '${datos}'`
  );
  elError.tipo = "DATOS_FALTANTES";
  return elError;
}
