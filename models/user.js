import mongoose from 'mongoose'
import encrypt from 'mongoose-encryption'


const mailformat= /^w+([.-]?w+)*@w+([.-]?w+)*(.w{2,3})+$/

const userSchema= new mongoose.Schema({
    name:{type:String, require:true,trim:true},
    age:{type:Number, require:true,min:3},
    email:{type:String, require:true,trim:true},
    password:{type:String, require:true,trim:true}

})

 // encryption using moongoose schema
// const secret = process.env.SECRET
// userSchema.plugin(encrypt, {secret:secret, encryptedFields: ['password']})

const userModel = new mongoose.model('User',userSchema)
console.log(userModel)

export default userModel
    