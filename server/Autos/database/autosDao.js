import { MODO_PERSISTENCIA } from "../../config/config.js";
import * as daoArchivos from "./autosDaoArchivo.js";
import * as daoMemoria from "./autosDaoMemoria.js";
import * as daoBaseDeDatos from "./autosDaoBaseDeDatos.js";

let dao;

switch (MODO_PERSISTENCIA) {
  case "ARCHIVO":
    dao = daoArchivos;
    break;
  case "DATABASE":
    dao = daoBaseDeDatos;
    break;
  default:
    dao = daoMemoria;
}

export default dao;
