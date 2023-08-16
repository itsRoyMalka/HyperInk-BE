import express from "express";
import {dbConnect} from "./db/db.js";
import {appConfig} from "./configs/app.config.js";
import createRouter from "./routes/router.js";
import {routes} from "./configs/router.config.js";

/* APP SETUP */
const app = express();

/* CONFIGURATIONS */
appConfig(app)

/* ROUTER */
createRouter(process.env.API_PREFIX,app,routes)

/* MONGOOSE SETUP */
dbConnect()
    .then(()=>
        app.listen(process.env.PORT,() => console.log(`Server started at port ${process.env.PORT}`))
    )
    .catch(error=>{
        console.log(`${error.message} did not connect`)
    })
