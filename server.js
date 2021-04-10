
const express = require("express");
const dotenv = require("dotenv");
const routers = require("./routers/index");
const connectDatabase = require("./helpers/database/connectDatabase");
const customErrorHandler = require("./middlewares/errors/CustomErrorHandler");
const path = require("path");

dotenv.config({
    path: "./config/env/config.env"
});

connectDatabase();

const app = express();
const PORT = process.env.PORT;

// Express - Body Middleware
app.use(express.json());

//Routers Middleware
app.use("/api",routers);

app.use(customErrorHandler);

//Static Files
app.use(express.static(path.join(__dirname,"public")));


app.listen(PORT , ()=>{
      console.log(`App Started on ${PORT}`);
});