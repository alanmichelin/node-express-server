import { MODO_PERSISTENCIA } from '../../config/config.js'
import * as apiArchivos from './personasDaoArchivo.js'
import * as apiMemoria from './personasDaoMemoria.js'

let api

switch (MODO_PERSISTENCIA) {
    case 'ARCHIVO':
        api= apiArchivos
        break
    default:
        api= apiMemoria
        
}

export default api
