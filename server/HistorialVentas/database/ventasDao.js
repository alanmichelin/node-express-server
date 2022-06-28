import { MODO_PERSISTENCIA } from "../../config/config.js";
import * as daoArchivos from "./ventasDaoArchivo.js";
import * as daoMemoria from "./ventasDaoMemoria.js";
import * as daoBaseDeDatos from "./ventasDaoBaseDeDatos.js";

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
