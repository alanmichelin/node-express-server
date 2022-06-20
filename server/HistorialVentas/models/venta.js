import { validarDatos } from "../../shared/helpers/FuncionesMemoria.js";

export const insertar = (datos) => {
  let venta = new Venta(datos);
  return validarDatos(venta);
};

function Venta({ id, valor, vendedor }) {
  this.id = id;
  this.valor = valor;
  this.vendedor = vendedor;
}
