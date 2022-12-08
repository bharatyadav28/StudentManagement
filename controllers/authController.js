import md5 from 'md5'
import bcrypt, { hash } from 'bcrypt'
import passport from 'passport'
import session from 'express-session'

import userModel from '../models/user.js'


class AuthController{

    // Render signup page for get request
    static signup = async(req,res)=>{
        try{
            res.render("signup.ejs")
        }catch(error){
            console.log(error)
        }
    }
        
    // Add the user with in the database
    static adduser = async(req, res) => {  
        userModel.register({username:req.body.username},req.body.password, async function(err,user){
            if(err){
                console.log(err)
                res.redirect('/')
            }
                 passport.authenticate("local")(req, res, function(){
                        res.redirect("/student");
                      });
            })
        }

       
    // Render login page for get request
    static login = async(req,res)=>{
        try{
            res.render("login.ejs",{loginerror:""})
        }catch(error){
            console.log(error)
        }
    }

    // Authenticate the User
    static loginauth = async(req,res)=>{

            const user = new userModel({
                username : req.body.username,
                password : req.body.password

            })
            

             req.login(user,function(err){
               
                if(err){
                    console.log(err)
                    return res.redirect('/',{loginerror:"Wrong username or password"})
                }else{
                   const  result =  passport.authenticate("local")(req, res, function(){    
                        return res.redirect("/student");
                      });  
                             
                }
            })
           
         }


    // logOut the logged user
    static log_out = async(req,res)=>{
        if (req.isAuthenticated()){
            req.logout(function(err){
                if(err){
                    console.log(err)
                }else{
                        req.session.destroy()
                        res.redirect("/");
                }         
            })
        }   
    }  
     
}




export default AuthController