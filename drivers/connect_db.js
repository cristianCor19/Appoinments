import mongoose from "mongoose";


const connectToDatabase = async() =>{
    try{
        await mongoose.connect(process.env.URLMONGO);
        console.log('Sucessfully connected to database');
    }catch(error){
        console.log('Error connected to the database');
    }
}

export default connectToDatabase