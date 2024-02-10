import mongoose from "mongoose";
export default function Conn(){
    const URL=(process.env.MONGO_URL+process.env.DB_NAME);
    const db=mongoose.connect(URL)
    console.log("Database connected");
    return db;
}