require('dotenv').config()
const express = require("express");
const mongoose = require('mongoose');
const cors = require('cors');
const CookieParser = require("cookie-parser");
const userRoutes = require("./Routes/authRoutes");
const postRoutes = require("./Routes/postRoutes")

const app = express();
const PORT = process.env.PORT || 8080;





mongoose.connect(process.env.MONGO_URL)
        .then(()=> console.log("Database Connect..."))
        .catch((err)=> console.log("Database Not Connected", err))






app.use(CookieParser());
app.use(express.json());
app.use('/uploads', express.static("uploads") )
app.use(cors({ 
              origin: 'https://byte-breakdown1-client.onrender.com' ,  
              methods: ['GET', 'POST', 'PUT', 'DELETE'],
              credentials: true, 
        }));







app.use("/", userRoutes);
app.use("/user", postRoutes);





app.listen(PORT, ()=>  console.log("Server Started...."))