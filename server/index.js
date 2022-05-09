import { connect } from "./server.js";

const port = await connect();

console.log(`servidor inicializado en puerto ${port}`);
