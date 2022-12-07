import mongoose from 'mongoose'

const studentSchema=mongoose.Schema({
    name:{type:String, require:true,trim:true},
    age:{type:Number, require:true,min:3},
    fees:{type:mongoose.Decimal128, validate:(v)=>v>1000.0}

})

const StudentModel = mongoose.model('student',studentSchema)
console.log(StudentModel)

export default StudentModel
    
