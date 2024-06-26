const express=require('express')
const router=express.Router();

const {createUser,deleteAllUser} = require('../controller/userController.js')




router.post("/user",createUser)
router.delete("/deleteAll",deleteAllUser)

module.exports=router