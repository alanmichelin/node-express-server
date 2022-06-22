export function crearErrorUsuarioUnico() {
  const elError = new Error("el mail debe ser único");
  elError.tipo = "MAIL_UNICO";
  return elError;
}
