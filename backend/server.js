// backend/server.js
const express=require("express");
const app=express();
const db=require("./src/config/db");
const cors=require("cors");

app.use(express.json());

app.use(cors({
    origin: 'http://localhost:5173', // Frontend
    credentials: true // Allows cookies to be sent
}));

const authRoutes=require("./src/routes/auth");
app.use("/auth",authRoutes);

const notesRoutes=require("./src/routes/notes");
app.use("/notes",notesRoutes);



app.listen(8080,()=>{
    console.log("server is running");
});