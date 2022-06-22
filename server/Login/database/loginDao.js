import { MODO_PERSISTENCIA } from "../../config/config.js";
import * as daoArchivos from "./ventasDaoArchivo.js";
import * as daoMemoria from "./ventasDaoMemoria.js";
import * as daoBaseDeDatos from "./loginDaoBaseDeDatos.js";

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
