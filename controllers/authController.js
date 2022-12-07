import mongoose from 'mongoose'
import {join} from 'path'
import md5 from 'md5'
import bcrypt, { hash } from 'bcrypt'

import userModel from '../models/user.js'
import IndexController from './indexController.js'



class AuthController{
    static saltRounds = 10
   
    static signup = async(req,res)=>{
        try{
            res.render("signup.ejs")
        }catch(error){
            console.log(error)
        }
    }
        

    static adduser = async(req, res) => {
        
        try{
            const {name,age,email,password}=req.body
        
            bcrypt.hash(req.body.password, this.saltRounds, async(err, hash)=>{
            console.log(hash)
            const userDoc = new userModel({
                name:name,
                age:age,
                email:email,
                // password:md5(password) // hashing using md5 hash function
                password:hash             // hashing using bcrypt hash function with salt rounds

            })
            await userDoc.save()
            console.log("Users")
            IndexController.allstudents(req,res)

            });
            
          
            
            
            

        }catch(err){
            console.log(err)

        }
        
    }
    static login = async(req,res)=>{
        try{
            res.render("login.ejs",{loginerror:""})
        }catch(error){
            console.log(error)
        }
    }
    static loginauth = async(req,res)=>{
        
            // const {username,password}=req.body
            const username = req.body.username
            // const password = md5(req.body.password) // decoding gor mdf hashed password
            const password = (req.body.password)

          


        //    const result =  await userModel.findOne({email:username})
        userModel.findOne({email:username},async(err,result)=>{

            if(err){
                console.log(err)
            }
            else{
                if(result){
                    if( await bcrypt.compare(password, result.password)){
                        const isLogged = true
                        IndexController.allstudents(req,res,isLogged)
                    }else{
                        res.render("login.ejs",{loginerror:"Wrong Password!!!"})
                    }
                }else{
                    res.render("login.ejs",{loginerror:"This email id is not registered!!!"})

                }
                
                
            }
        })
            

       
    }
    
}




export default AuthController