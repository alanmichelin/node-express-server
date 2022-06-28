import { MODO_PERSISTENCIA } from "../../config/config.js";
import * as daoArchivos from "./personasDaoArchivo.js";
import * as daoMemoria from "./personasDaoMemoria.js";
import * as daoBaseDeDatos from "./personasDaoBaseDeDatos.js";
let dao;

switch (MODO_PERSISTENCIA) {
  case "MEMORIA":
    dao = daoMemoria;
    break;
  case "DATABASE":
    dao = daoBaseDeDatos;
    break;
  default:
    dao = daoArchivos;
}

export default dao;
//PROBAR EN ARCHIVO O DATABASE EN VES DE MEMORIA
