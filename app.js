import express from 'express'
import {join} from 'path'
import dotenv from 'dotenv'

import StudentRouter from './routers/studentRouter.js'
import AuthRouter from './routers/authRouter.js'
import dbconnect from './db/connectdb.js'
import './models/student.js'

dotenv.config()

const app = express()
const port = process.env.PORT
console.log("Hello")

const DBUrl= process.env.DBURL
dbconnect(DBUrl)

app.use(express.urlencoded({extended:true}))

app.use('/',express.static(join(process.cwd(),'public')))
app.use('/student',express.static(join(process.cwd(),'public')))
app.use('/student/edit',express.static(join(process.cwd(),'public')))
app.use('/signup',express.static(join(process.cwd(),'public')))



app.use('/student',StudentRouter)
app.use('/', AuthRouter)



app.listen(port,()=>{
    console.log(`Server started at http://localhost:${port}`)
})