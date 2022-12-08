
import StudentModel from '../models/student.js'

class IndexController{

    // Show all Students
    static allstudents = async(req, res) => {
      
       if (req.isAuthenticated()){
        try{ 
            const allData = await StudentModel.find()
            res.render("index.ejs",{allData:allData })

        }catch(error){
            console.log(error)
        }
       }
       else{
        res.redirect('/')
       }
        
    }

    // Add a new Student
    static addstudent = async(req, res) => {
        if (req.isAuthenticated()){
            try{
                const {name,age,fees}=req.body
                const StudentDoc = new StudentModel({
                    name:name,
                    age:age,
                    fees:fees
                })
                await StudentDoc.save()
                this.allstudents(req,res)
    
            }catch(err){
                console.log(err)
            }
        }else{
            res.redirect('/')
        }               
    }

    // Render the update page for updating the student's details
    static editstudent = async(req,res) =>{
        if (req.isAuthenticated()){
            try{
                const id = req.params.id
                 const data = await StudentModel.findById(id)
                 res.render('details.ejs',{data:data})
             }catch(error){
                 console.log(error)
             }
        }else{
            res.redirect('/')
        }    
    }

    // Update the student details
    static updateStudent = async(req,res)=>{
        if (req.isAuthenticated()){
            try{
                const id = req.params.id
                const updatedData = req.body
                const result = await StudentModel.updateOne({_id:id},updatedData)
                res.redirect('/student/')
            }catch(error){
                console.log(error)
            }
        }else{
            res.redirect('/')
        }
        
    }

    // Delete the student from the Database
    static deleteStudent = async(req,res)=>{
        if (req.isAuthenticated()){
            try{
                const id = req.params.id
                const result = await StudentModel.deleteOne({_id:id})
                res.redirect('/student/')
            }catch(error){
                console.log(error)
            }
        }else{
            res.redirect('/')
        }
        
    }
}




export default IndexController