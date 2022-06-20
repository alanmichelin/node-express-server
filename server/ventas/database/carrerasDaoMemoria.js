import { crearErrorRecursoNoEncontrado } from '../../shared/errors/models/ErrorRecursoNoEncontrado.js'

const carreras = []

export async function guardarCarrera(carrera) {
    const indiceBuscado = carreras.findIndex(c => c.id === carrera.id)
    if (indiceBuscado === -1) {
        carreras.push(carrera)
    } else {
        carreras[indiceBuscado] = carrera
    }
}


export async function recuperarCarrera(id) {
    const buscada = carreras.find(c => c.id === id)
    if (buscada) {
        return copiarCarrera(buscada)
    } else {
        throw crearErrorRecursoNoEncontrado('carrera')
    }
}

export async function recuperarCarreras() {
    return copiarCarreras(carreras)
}

export async function recuperarCarrerasSegunTema(tema) {
    return copiarCarreras(carreras.filter(c => c.temas.includes(tema)))
}

export async function eliminarCarrera(id) {
    const indiceBuscado = carreras.findIndex(c => c.id === id)
    if (indiceBuscado === -1) {
        throw crearErrorRecursoNoEncontrado('carrera')
    } else {
        carreras.splice(indiceBuscado, 1)
    }
}

export async function eliminarCarreras() {
    while (carreras.length > 0) {
        carreras.pop()
    }
}

export async function nombreEstaDisponible(nombre) {
    return carreras.every(c => c.nombre !== nombre)
}

function copiarCarrera(carrera) {
    return ({ id: carrera.id, nombre: carrera.nombre, temas: carrera.temas })
}

function copiarCarreras(carreras) {
    return carreras.map(copiarCarrera)
}