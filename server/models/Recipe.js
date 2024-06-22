const mongoose = require("mongoose")

const   recipeSchema =  mongoose.Schema({
    name:{
        type:String,
        required: [true,"name field is required"],
        
    },
    description:{
        type:String,
        required:[true ,"descrption field is required"]
    },
   
    username: {
        type: String,
        required: true
      },
    //   email: {
    //     type: String,
    //     required: true
    //   },
    ingredients:{
            type:Array,
            required: true
        },
        category:{
            type:String,
             
            required: [true,"category is required"]
        },
        image:{ 
            type:String
            // required: [true,"image  field is required"]
        } ,
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Register',  
            // required: true
          }
      
    
})
recipeSchema.index({ name: 'text', description: 'text' });

const recipe = mongoose.model("recipe",recipeSchema);
 
module.exports = recipe;