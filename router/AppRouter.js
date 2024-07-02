const express=require('express')
const router=express.Router();

const {deleteAllUser,login,register} = require('../controller/userController.js')

const userController=require("../controller/userController.js")



router.delete("/deleteAll",deleteAllUser)
router.get("/login",login)
router.post("/registration",register)



module.exports=router