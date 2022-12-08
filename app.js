import express from 'express'
import {join} from 'path'
import dotenv from 'dotenv'
import session from 'express-session'
import passport from 'passport'
import passportLocalMoongose from 'passport-local-mongoose'
import MongoStore from 'connect-mongo'


import StudentRouter from './routers/studentRouter.js'
import AuthRouter from './routers/authRouter.js'
import dbconnect from './db/connectdb.js'
import './models/student.js'


dotenv.config()

const app = express()
const port = process.env.PORT

// session
const SessionStore = MongoStore.create({
    mongoUrl:process.env.SESSIONDBURL,
    dbName:process.env.DBNAME,
    collectionName:process.env.COLLECTIONNAME
})
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie:{maxAge:300000},
    store:SessionStore
}))


// initializing passport and let it handle the session
app.use(passport.initialize())
app.use(passport.session())

const DBUrl= process.env.DBURL
dbconnect(DBUrl)

app.use(express.urlencoded({extended:true}))

// executing middleware for using public files like css on different paths
app.use('/',express.static(join(process.cwd(),'public')))
app.use('/student',express.static(join(process.cwd(),'public')))
app.use('/student/edit',express.static(join(process.cwd(),'public')))
app.use('/signup',express.static(join(process.cwd(),'public')))


// path to Routers
app.use('/student',StudentRouter)
app.use('/', AuthRouter)



app.listen(port,()=>{
    console.log(`Server started at http://localhost:${port}`)
})