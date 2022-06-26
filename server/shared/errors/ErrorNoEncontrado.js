export const crearErrorNoEncontrado = (id) => {
  const error = new Error(id ? `ID: ${id} no encontrado` : `Falta mandar ID`);
  error.tipo = "NOT_FOUND";
  return error;
};
