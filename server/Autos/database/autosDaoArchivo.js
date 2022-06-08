import { crearErrorRecursoNoEncontrado } from '../../shared/errors/models/ErrorRecursoNoEncontrado.js'

const Autos = []

export function guardarAuto(Auto) {
    const indiceBuscado = Autos.findIndex(c => c.id === Auto.id)
    if (indiceBuscado === -1) {
        Autos.push(Auto)
    } else {
        Autos[indiceBuscado] = Auto
    }
}


export function recuperarAuto(id) {
    const buscada = Autos.find(c => c.id === id)
    if (buscada) {
        return copiarAuto(buscada)
    } else {
        throw crearErrorRecursoNoEncontrado('Auto')
    }
}

export function recuperarAutos() {
    return copiarAutos(Autos)
}

export function recuperarAutosSegunTema(tema) {
    return copiarAutos(Autos.filter(c => c.temas.includes(tema)))
}

export function eliminarAuto(id) {
    const indiceBuscado = Autos.findIndex(c => c.id === id)
    if (indiceBuscado === -1) {
        throw crearErrorRecursoNoEncontrado('Auto')
    } else {
        Autos.splice(indiceBuscado, 1)
    }
}

export function eliminarAutos() {
    while (Autos.length > 0) {
        Autos.pop()
    }
}

export function nombreEstaDisponible(nombre) {
    return Autos.every(c => c.nombre !== nombre)
}

function copiarAuto(Auto) {
    return ({ id: Auto.id, nombre: Auto.nombre, temas: Auto.temas })
}

function copiarAutos(Autos) {
    return Autos.map(copiarAuto)
}