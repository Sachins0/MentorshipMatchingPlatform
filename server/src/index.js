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


app.use('/api',apiRoutes);

app.listen(ServerConfig.PORT,()=>{
    console.log(`Successfully started the server on PORT: ${ServerConfig.PORT}`);
    Logger.info("Successfully started the server");
})