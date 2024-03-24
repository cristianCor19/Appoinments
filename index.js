import express from 'express';
import cors from 'cors';
import connectToDatabase  from './drivers/connect_db.js'
import userRoutes from './routes/user.routes.js'
import dotenv from 'dotenv'


const app = express();


dotenv.config()

app.set('port', process.env.PORT)
app.use(express.json())

app.listen(app.get('port'), ()=>{
    console.log(`server listening to port: ${app.get('port')}`);

})


connectToDatabase()

app.use('/user', userRoutes)
