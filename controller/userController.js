const model=require('../model/UserDataSchema')
const bcrypt=require('bcryptjs')


 

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

        let status=false

      const {password} =req.body
           
        const [userPassword]=await model.find({username:username})
       
        bcrypt.compare(password, userPassword.password, (err, isMatch) => { 
        if( err ) { 
            return err; 
        } 
          
        // If password matches then display true 

      console.log(isMatch)

        if(isMatch){
           res.status(200).send({vaildatity:true})
        }else{
            res.status(200).send({vaildatity:false})
        }
    }); 

        console.log(userPassword)
       
        
         
        

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