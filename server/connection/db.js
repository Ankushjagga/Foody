const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://ankushjagga:9876054247@cluster0.jzjho9x.mongodb.net/Recipes?retryWrites=true&w=majority").then(()=>{
    console.log("connection susssful");
}).catch((err)=>{
    console.log("something went wrong" + err);
}) 