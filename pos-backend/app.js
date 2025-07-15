require("dotenv").config();
const express = require("express");
const connectDB = require("./config/database");
//const { config } = require("dotenv");
const config = require("./config/config");
const globalErrorHandler = require("./middlewares/globalErrorHandler");
const createHttpError = require("http-errors");
const app = express();

const PORT = config.port;
connectDB();

// Root Endpoint
app.get("/", (req,res) => {

    const err = createHttpError(404, "something gone wrong!");
    throw err;


    res.json({message : "Hello from POS Server!"});
})

//Globval Error Handler
app.use(globalErrorHandler);

// Server
app.listen(PORT, () => {
    console.log(`POS Server is listening on port ${PORT}`);
})

