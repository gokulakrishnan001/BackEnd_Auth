const express=require('express')
const router=express.Router();

const {createUser,deleteAllUser,comparePassword} = require('../controller/userController.js')




router.post("/user",createUser)
router.delete("/deleteAll",deleteAllUser)
router.get("/getUserName/:username",comparePassword)

module.exports=router