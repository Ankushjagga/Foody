const mongoose = require("mongoose");

const contactSchema = mongoose.Schema({
    name:{
        type:String,
        required:[true,"this field is required"]
    },
    email:{
        type:String,
        required:[true,"this field is required"]
    },
    message:{
        type:String,
        required:[true,"this field is required"]
    }
})

const Contact = mongoose.model("Contact",contactSchema);

module.exports = Contact;