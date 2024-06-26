const express=require("express")
const mongoose=require("mongoose")
const app=express()

const userRoutes=require('./router/AppRouter.js')
require('dotenv').config()

app.use(express.json())

app.use(express.urlencoded({extended:false}))



app.use("/api",userRoutes)



mongoose.connect(process.env.DB_URL)
.then(()=>{
    console.log("DataBase Connected")
    app.listen('4000',()=>{
        console.log("Server is running")
    })
}).catch((err)=>{
    console.log(err.message)
})