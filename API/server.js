const express = require("express");
const mongoose = require('mongoose');
const cors = require('cors');
const CookieParser = require("cookie-parser");
const userRoutes = require("./Routes/authRoutes");
const postRoutes = require("./Routes/postRoutes")

const app = express();
const PORT = process.env.PORT || 8080;





mongoose.connect("mongodb+srv://mosn0078600:OPzpLvXBV4af13kW@cluster0.dsq30.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
        .then(()=> console.log("Database Connect..."))
        .catch((err)=> console.log("Database Not Connected", err))






app.use(CookieParser());
app.use(express.json());
app.use('/uploads', express.static(__dirname + '/uploads') )
app.use(cors({ 
              origin: 'http://localhost:5173',  // Specify your frontend's URL
              methods: ['GET', 'POST', 'PUT', 'DELETE'],
              credentials: true,  // If you are using cookies
        }));







app.use("/", userRoutes);
app.use("/user", postRoutes);





app.listen(PORT, ()=>  console.log("Server Started...."))