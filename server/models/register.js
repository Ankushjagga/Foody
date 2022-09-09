const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const registerSchema = mongoose.Schema({
    email:{
        type:String,
        required:[true,"this field is required"],
        unique: [true,"number already exist"], 
    },
    password:{
type:String,
required:[true,"this field is required"],
minlength:8

    },
    cpassword:{
        type:String,
        required:[true,"this field is required"],
        minlength:8

    },
    
        name:{
            type:String,
            required:[true,"this field is required"]

        },
      phoneNumber : {
        type:String,
        required:[true,"this field is required"],
        unique:[true,"number already exist"]


        },
        tokens:[
            {

                token:{
             type:String,
            //  required:true       
                }
            }
        ]

    
})

registerSchema.methods.generateAuthToken = async function(req,res){

    try {
        
        const token = await jwt.sign({_id:this._id.toString()},process.env.SECRETE_KEY)
        this.tokens = this.tokens.concat({token:token})
        await this.save();
        return token



    } catch (error) {
        res.send(error || "something went worng 😟")
    }


} 


registerSchema.pre("save",async function(next){
if(this.isModified("password")){
    this.password =  await bcrypt.hash(this.password,10);
    console.log(this.password);
    this.cpassword= await bcrypt.hash(this.password,10)

}
next();
})

const register = mongoose.model("Register",registerSchema);
module.exports=register
