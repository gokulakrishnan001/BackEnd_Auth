const model=require('../model/UserDataSchema')
const UserService=require('../service/UserService')
require('dotenv').config()        


const register=async(req,res,next)=>{
    try{
        const {username,email,password,phone}=req.body

        const singnupResponse=await UserService.signUpPage(
            username,
            password,
            email,
            phone
        )


        res.status(200).send("new user created")
    }catch(err){
        console.log(err)
        res.status(500).send(err.message)
    }
}
 






const login=async(req,res)=>{
    try{
        const {email,password}=req.body

        console.log(email)

        const user=await UserService.checkUserInDb(email)
          
        if(!user){
            throw new Error("user cannot found ")
        }

        const isMatch=await user.comparePassword(password)

        
       if(!isMatch){
        res.status(500).send("InVaild Password")
       }
      
       
        let tokenData={
            id:user._id,
            email:user.email
        }

        const token=await UserService.generateToken(
            tokenData,
            process.env.secert_key,
            process.env.exp
        )

        res.send(
            {
                "loginStatus":isMatch,
                "token":token
            }
        )


         
        

    }catch(err){
       throw err
    }
}


const deleteAllUser=async(req,res)=>{
    try{
        const deleteAlldata=await model.deleteMany({})
        
         if(!deleteAllUser){
            res.status(400).json("Deleted UnSucessfully")
         }

        res.status(200).json(" Deleted Sucessfully")


    }catch(err){
        res.status(500).send(err.message)
    }
}

module.exports={deleteAllUser,login,register}