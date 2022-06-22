import dao from "../database/loginDao.js";

export const registrarse = async (datos) => {
  return await dao.registrarse(datos);
};

export const logearse = (datos) => {
  return dao.logearse(datos);
};
