import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();

export async function connect(){
    try{
        if(!process.env.DB_HOST){
            throw new Error('Missing environment variables for database connection');
        }
        await mongoose.connect(`${process.env.DB_HOST}`);
        console.log('Connected to the database');

    }catch(error){
        console.error('Error connecting to the database');
        console.error(error);
    }
}