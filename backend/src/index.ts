import express from "express";
import dotenv from "dotenv";
import  mongo  from "mongoose";
import routes from "./routes";
import cors from "cors"

dotenv.config()

const PORT = process.env.PORT || 3000;


const MONGODB_URI=  process.env.MONGODB_URL || "mongodb://localhost:27017/steelhard"

mongo.connect(MONGODB_URI, { serverSelectionTimeoutMS: 30000 })
    .then(() => console.log("mongodb conectado"))
    .catch((error) => {throw Error("Erro ao conectar ao mongodb: " + error)})

const app = express();

app.use(cors());

app.use(express.json());

app.use(routes);

app.listen(PORT,() => {
    console.log("Rodando na porta: ", PORT);
})