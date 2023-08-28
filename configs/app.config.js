import express from "express";
import helmet from "helmet";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import path from "path";
import cors from "cors";
import morgan from "morgan";
import {fileURLToPath} from "url";
import dotenv from "dotenv";

export const appConfig = (app) =>{

    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    dotenv.config();
    app.use(express.json());
    app.use(helmet());
    app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
    app.use(bodyParser.json({ limit: "30mb", extended: true }));
    app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
    app.use(cookieParser());
    app.use("../assets", express.static(path.join(__dirname, "public/assets")));

    app.use(cors({
        credentials: true,
        origin: (process.env.NODE_ENV === 'production' ? ('') : (['http://10.0.0.8:3000','http://localhost:63342','http://127.0.0.1:5500','file:///Users/roymalka/']))

    }));


    process.env.NODE_ENV === 'dev' && app.use(morgan("common"));



}

