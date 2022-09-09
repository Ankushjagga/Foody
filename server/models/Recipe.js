const mongoose = require("mongoose")

const   recipeSchema =  mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    description:{
        type:String,
        required:true
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
            required: true
        },
        image:{
            type:String,
            required: true
        }
      
    
})
recipeSchema.index({ name: 'text', description: 'text' });

const recipe = mongoose.model("recipe",recipeSchema);
 
module.exports = recipe;