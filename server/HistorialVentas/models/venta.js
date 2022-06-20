import { validarDatos } from "../../shared/helpers/FuncionesMemoria.js";

export const insertar = (datos) => {
  let venta = new Venta(datos);
  return validarDatos(venta);
};

function Venta({ id, valor, vendedor }) {
  this.id = id.toString();
  this.valor = valor;
  this.vendedor = vendedor;
}
