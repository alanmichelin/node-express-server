import {
  validarDatos,
  generarId,
} from "../../shared/helpers/FuncionesMemoria.js";

export const insertar = (datos) => {
  let venta = new Venta(datos);
  return validarDatos(venta);
};

function Venta({ valor, vendedor }) {
  this.id = generarId();
  this.valor = valor;
  this.vendedor = vendedor;
}
