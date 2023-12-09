import express from "express";
import configViewEngine from "./config/viewEngine";
import initWebRoutes from "./routes/web";
import initApiRoutes from "./routes/api";
import configCors from "./config/cors";
import bodyParser from "body-parser";
import cookieParser from 'cookie-parser';
import {configPassport} from "./controller/passpostController"
import configSession from "./config/session";
import flash from "connect-flash";

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 8000;


configCors(app);

// config body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true }));


// config cookie-parser
app.use(cookieParser())

// config flash
app.use(flash());

configSession(app);

//config view engine
configViewEngine(app);

//init routes
initWebRoutes(app);
initApiRoutes(app);

configPassport();

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`);
})