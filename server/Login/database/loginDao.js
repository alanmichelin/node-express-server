import { MODO_PERSISTENCIA } from "../../config/config.js";
import * as daoMemoria from "./loginDaoMemoria.js";
import * as daoBaseDeDatos from "./loginDaoBaseDeDatos.js";

let dao;

switch (MODO_PERSISTENCIA) {
  case "DATABASE":
    dao = daoBaseDeDatos;
    break;
  default:
    dao = daoMemoria;
}

export default dao;
