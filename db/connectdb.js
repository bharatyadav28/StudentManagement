import mongoose from 'mongoose'
import dotenv from 'dotenv'


dotenv.config() 

const dbconnect = async(DBUrl)=>{
    try{
        const dboptions={
            user:process.env.DBUSER,
            pass:process.env.PASS,
            dbName:process.env.DBNAME,
            authSource:process.env.AUTHSOURCE
        }
        await mongoose.connect(DBUrl,dboptions);
        console.log("Connected Successfully")

    }catch(err){
        console.log(err)
    }
    
}

export default dbconnect