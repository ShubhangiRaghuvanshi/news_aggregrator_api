require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true })); 

const userRoutes = require("./routes/users");
const prefRoutes=require("./routes/preferences");
const newsRoutes=require("./routes/news");


const PORT =  3000; 
mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log("connected to mongodb");
}).catch(err => {
    console.log("Error connecting to MongoDB:", err);
});

app.listen(PORT, () => {
    console.log(`Server is up and running on port ${PORT}`);
});

app.use(userRoutes);
app.use(prefRoutes);

app.use(newsRoutes);
module.exports = app;
 