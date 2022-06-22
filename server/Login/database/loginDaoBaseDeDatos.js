import { validar } from "../models/login.js";
import { crearErrorUsuarioUnico } from "../../shared/errors/ErrorUsuarioUnico.js";
import { crearErrorCredencialesIncorectas } from "../../shared/errors/ErrorCredenciales.js";
import { database } from "../../shared/databases/mongoDbClient.js";
import { TOKEN_KEY } from "../../config/config.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const users = database.collection("users");

export const registrarse = async (datos) => {
  try {
    const { email, password } = datos;

    validar(datos);

    const usuarioExiste = await users.findOne({ email });

    if (usuarioExiste) {
      throw crearErrorUsuarioUnico();
    }

    const passEncriptada = await bcrypt.hash(password, 10);

    const user = await users.insertOne({
      email: email.toLowerCase(),
      password: passEncriptada,
    });

    const token = jwt.sign({ user_id: user._id, email }, TOKEN_KEY, {
      expiresIn: "2h",
    });
    user.token = token;

    return user;
  } catch (err) {
    throw err;
  }
};

export const logearse = async (datos) => {
  try {
    const { email, password } = datos;

    validar(datos);

    const user = await users.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign({ user_id: user._id, email }, TOKEN_KEY, {
        expiresIn: "2h",
      });

      user.token = token;

      return { email: user.email, token: user.token };
    }
    throw crearErrorCredencialesIncorectas();
  } catch (err) {
    throw err;
  }
};
