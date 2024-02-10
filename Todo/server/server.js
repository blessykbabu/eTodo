import express from "express";
import cors from "cors";
import conn from "../server/connection.js"
import dotenv from "dotenv";
import router from "../server/router.js";
dotenv.config();
const app=express();
app.use(cors());
app.use(express.json());
app.use("/api",router);
conn()
.then(()=>{
    app.listen(process.env.PORT,error=>{
        if(error){
            console.log(error);
        }else{
            console.log("server started at the port " +process.env.PORT);
        }
    })
})
.catch(error=>{
    console.log(error);
})