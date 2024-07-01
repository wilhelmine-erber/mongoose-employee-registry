import express from 'express';
import {connect} from './db';

// server.ts ist nur um einen Server zu starten
// hier kann ich mit Browser oder Postman Daten aus Datenbank ausgeben


const app = express();

app.use(express.json());

// routes für einzelne Unterseiten erstellen

app.listen(process.env.PORT, ()=>{
    console.log('Server is running on port 3000');
})