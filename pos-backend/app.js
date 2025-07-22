require("dotenv").config();
const express = require("express");
const connectDB = require("./config/database");
//const { config } = require("dotenv");
const config = require("./config/config");
const globalErrorHandler = require("./middlewares/globalErrorHandler");
//const createHttpError = require("http-errors");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();

const PORT = config.port;
connectDB();

//Middlewares
app.use(cors({
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
    origin: "http://localhost:5173",// Replace with your frontend URL
    
})); // Allow cross-origin requests
app.use(express.json()); // parse incoming request in json format
app.use(cookieParser());


// Root Endpoint
app.get("/", (req,res) => {

    res.json({message : "Hello from POS Server!"});
})

//Other Endpoints
app.use("/api/user", require("./routes/userRoute"));
app.use("/api/order", require("./routes/orderRoute"));

//Global Error Handler
app.use(globalErrorHandler);

// Server
app.listen(PORT, () => {
    console.log(`POS Server is listening on port ${PORT}`);
})

