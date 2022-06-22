import { TOKEN_KEY } from "../../config/config.js";
import jwt from "jsonwebtoken";

export function verificarToken(req, res, next) {
  console.log(req.headers["authorization"].split(" ")[1]);
  const token = req.headers["authorization"].split(" ")[1];

  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const decoded = jwt.verify(token, TOKEN_KEY);
    req.user = decoded;
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
}
