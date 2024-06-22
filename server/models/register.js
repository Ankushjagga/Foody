const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const registerSchema = mongoose.Schema({
    email:{
        type:String,
        required:[true,"this field is required"],
        unique: [true,"email already exist"], 
    },
    password:{
type:String,
required:[true,"this field is required"],

    },
    cpassword:{
        type:String,
        required:[true,"this field is required"],

    },
    
        name:{
            type:String,
            required:[true,"this field is required"]

        },
      phoneNumber : {
        type:String,
        required:[true,"this field is required"],
        unique: true 


        },
        role: {
            type: String,
            enum: ['user', 'admin'], // Example roles
            default: 'user' // Default role
        },
        messages : [{

            text :  {
                type : String 
                
            },
          
        }
        ]
      
        // tokens:[
        //     {

        //         token:{
        //      type:String,
        //     //  required:true       
        //         }
        //     }
        // ]

    
})
 
registerSchema.methods.generateAuthToken = async function(req,res){

    try {
        
        const token = await jwt.sign({_id:this._id.toString()},process.env.SECRETE_KEY)
        // this.tokens = this.tokens.concat({token:token})
        // await this.save();
        return token



    } catch (error) {
        // console.log( JSON.stringify(error.keyPattern)  + error.code +  error.name + error.keyPattern.phoneNumber + "errrrrrrrrr");
        // console.log("eoorrr---", error);
        throw new Error(JSON.stringify({name : error.name , keyPattern : error.keyPattern , code: error.code  }));
    }


} 


registerSchema.pre("save",async function(next){
if(this.isModified("password")){
    this.password =  await bcrypt.hash(this.password,10);
    console.log(this.password);
    // this.cpassword= await bcrypt.hash(this.password,10)

}
next();
})


registerSchema.methods.addMessage = async function(text) {
try {
    this.messages.push({text})
    await this.save();
    return this.messages[this.messages.length - 1];
} catch (error) {
    console.log(error);
    throw new Error("message not added");
    
}
}

registerSchema.methods.getAllmessages = async function(msg){
    return this.messages
}

const register = mongoose.model("Register",registerSchema); 
module.exports=register