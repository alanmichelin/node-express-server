export function crearErrorDeNoImplementado() {
  const errorNoImplementado = new Error("Metodo no implementado");
  errorNoImplementado.tipo = "NO_IMPLEMENTADO";
  return errorNoImplementado;
}
