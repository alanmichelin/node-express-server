import { validarDatos } from "../../shared/helpers/FuncionesMemoria.js";

export const validar = (datos) => {
  let user = new User(datos);
  return validarDatos(user);
};

function User({ password, email }) {
  this.email = email;
  this.password = password;
}
