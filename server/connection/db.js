const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_URI).then(()=>{
    console.log("connection susssful");
}).catch((err)=>{
    console.log("something went wrong" + err);
}) 