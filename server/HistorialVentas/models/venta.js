import {
  validarDatos,
  generarId,
} from "../../shared/helpers/FuncionesMemoria.js";

export const insertar = (datos) => {
  let venta = new Venta(datos);
  return validarDatos(venta);
};

export function Venta({ valor, vendedor, isTest }) {
  this.id = generarId();
  this.valor = valor;
  this.vendedor = vendedor;
  if (isTest) {
    this.isTest = isTest;
  }
}
