const mongoose = require("mongoose")

const   recipeSchema =  mongoose.Schema({
    name:{
        type:String,
        required: [true,"name field is required"]
    },
    description:{
        type:String,
        required:[true ,"descrption field is required"]
    },
   
    // email: {
    //     type: String,
    //     required: true
    //   },
    ingredients:{
            type:Array,
            required: true
        },
        category:{
            type:String,
            enum : ["burger","pizzas","sweets","beverage"],   
            required: [true,"category is required"]
        },
        image:{
            type:String,
            required: [true,"image  field is required"]
        }
      
    
})
recipeSchema.index({ name: 'text', description: 'text' });

const recipe = mongoose.model("recipe",recipeSchema);
 
module.exports = recipe;