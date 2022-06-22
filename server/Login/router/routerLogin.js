import { Router } from "express";

import * as controllerLogin from "../controllers/controllerLogin.js";

const routerLogin = new Router();

routerLogin.post("/registrarse", controllerLogin.registrarse);
routerLogin.post("/login", controllerLogin.login);

export { routerLogin };
