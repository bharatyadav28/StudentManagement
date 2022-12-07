import mongoose from 'mongoose'
import {join} from 'path'

import StudentModel from '../models/student.js'

class IndexController{
    static isLogged = false
    static allstudents = async(req, res, isLogged) => {
        try{
            this.isLogged = isLogged
            const allData = await StudentModel.find()
            res.render("index.ejs",{allData:allData,isLogged:this.isLogged })

        }catch(error){
            console.log(error)
        }
        
    }
    static addstudent = async(req, res) => {
        try{
            const {name,age,fees}=req.body
            const StudentDoc = new StudentModel({
                name:name,
                age:age,
                fees:fees
,
            })
            await StudentDoc.save()
            this.allstudents(req,res)

        }catch(err){

        }
        
    }
    static editstudent = async(req,res) =>{
        console.log(this.isLogged)
        if (this.isLogged){
            try{
                const id = req.params.id
                 const data = await StudentModel.findById(id)
                 res.render('details.ejs',{data:data})
             }catch(error){
                 console.log(error)
             }
            
        }
    
        
    }
    static updateStudent = async(req,res)=>{
        try{
            const id = req.params.id
            const updatedData = req.body
            const result = await StudentModel.updateOne({_id:id},updatedData)
            console.log(result)
            res.redirect('/student/')
        }catch(error){
            console.log(error)
        }
    }
    static deleteStudent = async(req,res)=>{
        try{
            const id = req.params.id
            const result = await StudentModel.deleteOne({_id:id})
            console.log(result)
            res.redirect('/student/')
        }catch(error){
            console.log(error)
        }
    }
}




export default IndexController