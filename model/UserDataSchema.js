const mongoose = require("mongoose");
const bcrypt=require("bcryptjs")


const UserDataSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      lowercase:true,
      unique:true
    },
    email:{
      type: String,
      required:true,
      lowercase:true,
      unique:true
    },
    phone:{
      type: Number,
      required:true,
      unique:true
    },
    password: {
      type: String,
      required: true,
    }
  },
);

UserDataSchema.pre('save',async function(){
  try{
     const user=this
     const salt=await bcrypt.genSalt(10)
     const hash=await bcrypt.hash(user.password,salt)

     user.password=hash
  }catch(err){
        throw err
  }
})


UserDataSchema.methods.comparePassword = async function(dbPassword){
  try{
    const isMatch=await bcrypt.compare(dbPassword,this.password)
    return isMatch
  }catch(err){
    throw err
  }
}

const userDataModel=mongoose.model("userData",UserDataSchema)



module.exports=userDataModel
