export function crearErrorCredencialesIncorectas(datos) {
  const elError = new Error(`Datos de login incorrectos`);
  elError.tipo = "LOGIN_INCORRECTO";
  return elError;
}
