const model=require('../model/UserDataSchema')
const crypto = require('crypto');
const algorithm = 'aes-256-cbc'; //Using AES encryption
const key = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);
const bcrypt=require('bcryptjs')


function encrypt(text) {
    let cipher = crypto.createCipheriv(algorithm, Buffer.from(key), iv);
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return { iv: iv.toString('hex'), encryptedData: encrypted.toString('hex') };
 }

 function decrypt(text) {
    let iv = Buffer.from(text.iv, 'hex');
    let encryptedText = Buffer.from(text.encryptedData, 'hex');
    let decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key), iv);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
 }

 function encryption(password){
    bcrypt.genSalt(10, function (err, Salt) {

        // The bcrypt is used for encrypting password.
        bcrypt.hash(password, Salt, function (err, hash) {
    
            if (err) {
                return console.log(`Cannot encrypt ${err}`);
            }
    
            return hash
 })})}
 
 

const createUser=async(req,res)=>{
    try{
        const {username,password}=req.body
        
        const salt = await bcrypt.genSalt(10);
        const encryptpassword=await bcrypt.hash(password,salt);
        const newStudent = new model({
            username: username,
            password:encryptpassword
        });
        
       model.create(newStudent).then(result=>{
         res.send(result)
       })
        console.log(encryptpassword)
        
        

      }catch(err){
        res.status(500).send(err.message)
      }
}


const comparePassword=async(req,res)=>{
    try{
        const {username}=req.params



        const [userPassword]=await model.find({username:username})
       


        console.log(userPassword)

        res.send(userPassword.password)

    }catch(err){

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

module.exports={createUser,deleteAllUser,comparePassword}