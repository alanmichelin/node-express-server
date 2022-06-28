import { MongoClient } from "mongodb";
import { CONNECTION_STRING } from "../../config/config.js";

const client = new MongoClient(CONNECTION_STRING);
const connection = await client.connect();

export const database = client.db("concesionaria");
