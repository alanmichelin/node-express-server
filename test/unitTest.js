import assert from 'assert'
import axios from 'axios'
import { connect, disconnect } from '../server/server.js'

import {
    obtenerAutos,
    agregarAuto,
    eliminarAuto, busquedaAuto
} from '../server/Autos/autos.js'

import { obtenerPersonas } from '../server/personas/personas.js'

const autoPrueba1 = {
    marca: "Auto1"
}


describe('servidor de pruebas', () => {
    let urlAutos
    let urlPersonas

    before(async () => {
        const port = await connect()
        urlCarreras = `http://localhost:${port}/api/autos`
        urlPersonas = `http://localhost:${port}/api/personas`
    })

    after(async () => {
        await disconnect()
    })

    beforeEach(() => {
        eliminarAuto()
    })

    afterEach(() => {
        eliminarAuto()
    })

    describe('el servidor esta escuchando', () => {
        describe('Personas', () => {
            describe('al intentar agregar una nueva', () => {
                describe('si los datos válidos', () => {
                    it('la crea, la guarda, y la devuelve', async () => {

                        const personasAntes = obtenerPersonas()

                        const datosPersona = {
                            nombre: 'flor',
                            dni: '789456'
                        }

                        const { data: personaAgregada, status } = await axios.post(urlPersonas, datosPersona)
                        assert.strictEqual(status, 201)

                        const personasDespues = obtenerPersonas()

                        const personaAgregadaEsperada = { ...datosPersona, id: personaAgregada.id }
                        assert.deepStrictEqual(personasDespues, personasAntes.concat(personaAgregadaEsperada))
                    })
                })

                describe('si el dni no es numerico', () => {
                    it('no agrega nada y devuelve un error', async () => {
                        const personasAntes = obtenerPersonas()
                        const datosPersona = {
                            nombre: "josefa",
                            dni: 'abc'
                        }

                        await assert.rejects(
                            axios.post(urlPersonas, datosPersona),
                            error => {
                                assert.strictEqual(error.response.status, 400)
                                return true
                            }
                        )

                        const personasDespues = obtenerPersonas()
                        assert.deepStrictEqual(personasDespues, personasAntes)
                    })
                })
            })
        })

        describe('Autos', () => {
            describe('al intentar obtener todas', () => {
                it('devuelve un array con carreras', async () => {

                    await agregarAuto(autoPrueba1)
                    await agregarAuto(autoPrueba2)

                    const { data: autosObtenidos, status } = await axios.get(urlAutos)
                    assert.strictEqual(status, 200)
                    const carrerasReales = obtenerAutos()
                    assert.deepStrictEqual(autosObtenidos, autos)
                })
            })

            describe('..', () => {
                it('devuelve un array con autos relacionadas con esa marca', async () => {

                    await agregarCarrera(autoPrueba1)
                    await agregarCarrera(autoPrueba2)

                    let autosObtenidos
                    const { data, status } = await axios.get(urlAutos, { params: { tema: '..' } })
                    assert.strictEqual(status, 200)
                    autosObtenidos = data

                    const todas = obtenerAutos()
                    const autosEsperados = todas.filter(c => c.marca.includes('..'))
                    assert.deepStrictEqual(autosObtenidos, autosEsperados)
                })
            })

            describe('al pedirle un auto especifico, segun su identificador', () => {
                it('devuelve ese auto', async () => {

                    const autoAgregado1 = await agregarAuto(autoDePrueba1)
                    let autoObtenido
                    const { data, status } = await axios.get(urlAutos + '/' + autoAgregado1.id)
                    assert.strictEqual(status, 200)
                    autoObtenido = data

                    assert.deepStrictEqual(autoObtenido, autoAgregado1)
                })
            })

            describe('al pedirle un auto que no existe', () => {
                it('lanza un error 404', async () => {
                    await assert.rejects(
                        axios.get(urlAutos + '/unIdQueNoExiste'),
                        error => {
                            assert.strictEqual(error.response.status, 404)
                            return true
                        }
                    )
                })
            })

            describe('al mandarle datos válidos de un auto', () => {
                it('crea y agrega ese auto a las demas existentes', async () => {
                    const autosAntes = obtenerAutos()
                    const auto = {
                        marca: "111"
                    }
                    const { data: autoAgregado, status } = await axios.post(urlAutos, auto)
                    assert.strictEqual(status, 201)

                    const autosDespues = obtenerAutos()
                    assert.strictEqual(autosDespues.length, autosAntes.length + 1)

                    const autoAgregadoEsperado = { ...auto, id: autoAgregado.id }
                    assert.deepStrictEqual(autosDespues, autosAntes.concat(autoAgregadoEsperado))
                })
            })

            describe('al mandarle un auto mal formateado', () => {
                it('no agrega nada y devuelve un error', async () => {
                    const autosAntes = obtenerAutos()
                    const auto = {
                        titulo: "----"
                    }

                    await assert.rejects(
                        axios.post(urlAutos, auto),
                        error => {
                            assert.strictEqual(error.response.status, 400)
                            return true
                        }
                    )

                    const autosDespues = obtenerAutos()
                    assert.deepStrictEqual(autosDespues, autosAntes)
                })
            })

            describe('al pedirle que borre un auto especifico, segun su identificador', () => {
                it('borra ese auto y no devuelve nada', async () => {

                    const autoAgregado1 = await agregarAuto(autoDePrueba1)

                    const { status } = await axios.delete(urlAutos + '/' + autoAgregado1.id)
                    assert.strictEqual(status, 204)

                    const autosDespues = obtenerAutos()
                    assert.ok(autosDespues.every(c => c.id !== autoAgregado1.id))
                })
            })

            describe('al pedirle un auto que no existe', () => {
                it('lanza un error 404', async () => {
                    await assert.rejects(
                        axios.delete(urlAutos + '/unIdQueNoExiste'),
                        error => {
                            assert.strictEqual(error.response.status, 404)
                            return true
                        }
                    )
                })
            })

            describe('al mandarle un auto valido y un identificador de auto', () => {
                it('reemplaza la preexistente por la nueva', async () => {
                    const autoAgregado1 = await agregarAuto(autoDePrueba1)

                    const nuevoNombre = '123'
                    const datosActualizados = { ...autoAgregado1, marca: nuevoNombre }

                    const { status } = await axios.put(urlAutos + '/' + autoAgregado1.id, datosActualizados)
                    assert.strictEqual(status, 200)

                    const autoBuscado = obtenerAutoSegunId(autoAgregado1.id) // falta agregar fc.
                    assert.deepStrictEqual(autoBuscado, datosActualizados)
                })
            })
        })
    })
})