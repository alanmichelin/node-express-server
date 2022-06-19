export const crearErrorNoEncontrado = (id) => {
  const error = new Error(`ID: ${id} no encontrado`);
  error.tipo = "NOT_FOUND";
  return error;
};
