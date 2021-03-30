
const express = require("express");
const dotenv = require("dotenv");
const routers = require("./routers/index");
const connectDatabase = require("./helpers/database/connectDatabase");
const customErrorHandler = require("./middlewares/errors/CustomErrorHandler");

dotenv.config({
    path: "./config/env/config.env"
});

connectDatabase();

const app = express();
const PORT = process.env.PORT;

//Routers Middleware

app.use("/api",routers);

app.use(customErrorHandler);

app.listen(PORT , ()=>{
      console.log(`App Started on ${PORT}`);
});