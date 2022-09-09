const mongoose = require("mongoose")

const   categorySchema =  mongoose.Schema({
    name:{
        type:String,
        require: true
    },
    image:{
        type:String,
        require: true
    }
})

const Category = mongoose.model("category",categorySchema);

module.exports = Category;