const express=require('express');
const cookieParser = require("cookie-parser");
const cors = require("cors")

const {ServerConfig, Logger}= require('./config');
const apiRoutes= require('./routes');

const app=express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(
	cors({
		origin: "*",
		credentials: true,
	})
);

// Sleep utility
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Global middleware for delay
app.use(async (req, res, next) => {
    await sleep(3000); // 3-second delay for all routes
    next();
});


app.use('/api',apiRoutes);

app.listen(ServerConfig.PORT,()=>{
    console.log(`Successfully started the server on PORT: ${ServerConfig.PORT}`);
    Logger.info("Successfully started the server");
})