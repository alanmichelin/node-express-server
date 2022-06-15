

export function crearAuto(datos) {
  if (!datos.nombre) {
      throw crearErrorDeDatosFaltantes('nombre')
  }

  if (!datos.temas) {
      throw crearErrorDeDatosFaltantes('temas')
  }

  const Auto = {
      id: obtenerNuevoId('Auto'),
      marca: datos.marca,
      modelo: datos.modelo,
      valor: datos.valor,
      disponible: datos.disponible,
  }

  return Auto
}