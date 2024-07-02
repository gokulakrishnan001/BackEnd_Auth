const UserModel=require('../model/UserDataSchema')
const jwt=require("jsonwebtoken")


class UserService{
    static async signUpPage(username,password,email,phone){
        try{
            const newUser = new UserModel({
                username: username,
                password: password,
                email:email,
                phone:phone
            });
            return await newUser.save()
        }catch(err){
            throw err.message
        }

    }

    static async checkUserInDb(email){
        try{
        
            return await UserModel.findOne({email})
        }catch(err){
            throw err
        }
    }

    static async generateToken(tokenData,secertKey,jwt_expire){
      return jwt.sign(tokenData,secertKey,{expiresIn:jwt_expire})
    }
}

module.exports=UserService