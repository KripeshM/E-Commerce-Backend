// 1 automatically load  .env files into our project
require('dotenv').config()


// 2 import express
const express=require('express')

// 5 import cors
const cors=require('cors')


// 8 import db
require('./db/connection')

//import router
const router=require('./routes/router')


// 3 create a server app
const server= express()


//to store port number
const PORT=5000;

// 6 use in server application
server.use(cors())
server.use(express.json())
server.use(router)


// 7 route - localhost://5000
// server.get('/',(req,res)=>{
//     res.status(200).json('E-commerce service response')
// })

// 4 to run this server
server.listen(5000,()=>{
    console.log('server listening on port '+PORT);
})