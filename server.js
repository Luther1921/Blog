const express = require('express');
const app = express()
const mongoose = require('mongoose')
const connectDB = require('./config/db')
const blogRouter = require('./controller/routes')
const dotenv = require('dotenv')
const path = require('path')
dotenv.config()


app.use(express.json())
app.use(express.urlencoded({extended: true}))
connectDB()


app.use('/blog', blogRouter)










app.listen(3000, () => {
    console.log('Node API is runing on port 3000')
})

